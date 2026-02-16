//// Plugin originally written for Equicord at 2026-02-16 by https://github.com/Bluscream, https://antigravity.google
// region Imports
import { ChannelStore, GuildStore, SelectedChannelStore, UserStore, } from "@webpack/common";
import { sendBotMessage } from "@api/Commands";
import { Logger } from "@utils/Logger";
import definePlugin from "@utils/types";

import { settings } from "./settings";
import { findAssociatedTextChannel } from "./utils/channels";
import { PreviousVoiceState } from "./types/PreviousVoiceState";
import { VoiceStateChangeEvent } from "./types/VoiceStateChangeEvent";
// endregion Imports
// region PluginInfo
export const pluginInfo = {
    id: "voiceChannelLog",
    name: "VoiceChannelLog",
    description: "Logs voice channel joins/leaves to the associated text chat",
    color: "#7289da",
    authors: [{ name: "Bluscream", id: 467777925790564352n }, { name: "Cursor.AI", id: 0n }],
};
// endregion PluginInfo
// region Utils
function getTypeAndChannelId(
    { channelId, oldChannelId }: VoiceStateChangeEvent,
    isMe: boolean
) {
    // Track my last voice channel ID for proper move detection
    if (isMe) {
        if (channelId !== myLastVoiceChannelId) {
            oldChannelId = myLastVoiceChannelId;
            myLastVoiceChannelId = channelId;
        }
    }

    if (channelId !== oldChannelId) {
        // User connected to voice for the first time (no previous channel)
        if (channelId && !oldChannelId) return ["connect", channelId];
        // User disconnected from voice entirely (no new channel)
        if (!channelId && oldChannelId) return ["disconnect", oldChannelId];
        // User moved between channels (both channels exist)
        if (channelId && oldChannelId) return ["move", channelId]; // Move from oldChannelId to channelId
    }

    return ["", ""];
}

async function sendFormattedMessage(
    messageTemplate: string,
    voiceState: VoiceStateChangeEvent,
    userId: string,
    targetChannelId: string,
    user: any,
    guild?: any
) {
    if (!messageTemplate || messageTemplate.trim() === "") {
        return;
    }

    const now = new Date().toLocaleString();
    const newVoiceChannel = voiceState.channelId
        ? ChannelStore.getChannel(voiceState.channelId)
        : null;
    const oldVoiceChannel = voiceState.oldChannelId
        ? ChannelStore.getChannel(voiceState.oldChannelId)
        : null;

    const message = messageTemplate
        .replace(/{username}/g, user.username)
        .replace(/{displayname}/g, user.globalName || user.username)
        .replace(/{userid}/g, userId)
        .replace(
            /{oldChannelName}/g,
            oldVoiceChannel?.name || "Unknown Channel"
        )
        .replace(/{oldChannelId}/g, voiceState.oldChannelId || "")
        .replace(
            /{newChannelName}/g,
            newVoiceChannel?.name || "Unknown Channel"
        )
        .replace(/{newChannelId}/g, voiceState.channelId || "")
        .replace(/{guildName}/g, guild?.name || "Unknown Guild")
        .replace(/{guildId}/g, guild?.id || "")
        .replace(/{now}/g, now);

    try {
        // Process template variables in author settings
        const authorName = settings.store.authorName
            .replace(/{username}/g, user.username)
            .replace(/{displayname}/g, user.globalName || user.username)
            .replace(/{userid}/g, userId);

        const authorIconUrl = settings.store.authorIconUrl
            .replace(/{username}/g, user.username)
            .replace(/{displayname}/g, user.globalName || user.username)
            .replace(/{userid}/g, userId)
            .replace(/{avatar}/g, user.getAvatarURL?.() || "");

        const authorConfig: { username: string; avatar_url?: string } = {
            username: authorName,
        };

        if (authorIconUrl.trim()) {
            authorConfig.avatar_url = authorIconUrl.trim();
        }

        sendBotMessage(targetChannelId, {
            content: message,
            author: authorConfig,
        });
    } catch (error) {
        // Silently handle errors
    }
}
// endregion Utils
// region Variables
let myLastVoiceChannelId: string | undefined;
const previousVoiceStates = new Map<string, PreviousVoiceState>();
const logger = new Logger(pluginInfo.name, pluginInfo.color);
// endregion Variables
// region Main
// Function to detect and handle voice state changes
async function detectVoiceStateChanges(
    voiceState: VoiceStateChangeEvent,
    userId: string,
    isMe: boolean
) {
    const previousState = previousVoiceStates.get(userId);

    // Log all voice state changes to console if enabled
    if (settings.store.consoleLogging) {
        logger.log(
            `Voice state update for user ${userId}:`,
            JSON.stringify(voiceState, null, 2)
        );
    }

    // Skip my own events if triggerOnOwnEvents is disabled
    if (!settings.store.triggerOnOwnEvents && isMe) {
        return;
    }

    // Get current voice channel for filtering
    const currentUserId = UserStore.getCurrentUser().id;
    const myCurrentVoiceChannelId = SelectedChannelStore.getVoiceChannelId();
    const currentChannelId = voiceState.channelId || voiceState.oldChannelId;

    // If only monitoring own channel, skip events not related to my channel or selected channel
    if (settings.store.onlyMonitorOwnChannel) {
        const voiceChannel = currentChannelId ? ChannelStore.getChannel(currentChannelId) : null;
        const guildId = voiceChannel?.guild_id;
        const whitelistedGuilds = settings.store.whitelistedGuilds.split(/\r?\n/).map(id => id.trim()).filter(id => id.length > 0);

        if (!guildId || !whitelistedGuilds.includes(guildId)) {
            const selectedChannelId = SelectedChannelStore.getChannelId();
            if (
                currentChannelId !== myCurrentVoiceChannelId &&
                currentChannelId !== selectedChannelId
            ) {
                return;
            }
        }
    }

    // Get user information
    const user = UserStore.getUser(userId);
    if (!user) {
        return;
    }

    // Get voice channel and guild information
    const voiceChannel = currentChannelId
        ? ChannelStore.getChannel(currentChannelId)
        : null;
    const guildId = voiceChannel?.guild_id;
    const guild = guildId ? GuildStore.getGuild(guildId) : null;

    // Get the text channel to send the message to
    const targetTextChannelId = currentChannelId
        ? findAssociatedTextChannel(currentChannelId)
        : null;
    if (!targetTextChannelId) {
        return;
    }

    const now = new Date().toLocaleString();

    // Check for mute/unmute changes (self-mute)
    if (previousState && previousState.selfMute !== voiceState.selfMute) {
        if (voiceState.selfMute && settings.store.eventUserMuted) {
            await sendFormattedMessage(
                settings.store.messageUserMuted,
                voiceState,
                userId,
                targetTextChannelId,
                user,
                guild
            );
        } else if (!voiceState.selfMute && settings.store.eventUserUnmuted) {
            await sendFormattedMessage(
                settings.store.messageUserUnmuted,
                voiceState,
                userId,
                targetTextChannelId,
                user,
                guild
            );
        }
    }

    // Check for deafen/undeafen changes (self-deafen)
    if (previousState && previousState.selfDeaf !== voiceState.selfDeaf) {
        if (voiceState.selfDeaf && settings.store.eventUserDeafens) {
            await sendFormattedMessage(
                settings.store.messageUserDeafened,
                voiceState,
                userId,
                targetTextChannelId,
                user,
                guild
            );
        } else if (!voiceState.selfDeaf && settings.store.eventUserUndeafens) {
            await sendFormattedMessage(
                settings.store.messageUserUndeafened,
                voiceState,
                userId,
                targetTextChannelId,
                user,
                guild
            );
        }
    }

    // Check for camera on/off changes
    if (previousState && previousState.selfVideo !== voiceState.selfVideo) {
        if (voiceState.selfVideo && settings.store.eventUserCameraOn) {
            await sendFormattedMessage(
                settings.store.messageUserCameraOn,
                voiceState,
                userId,
                targetTextChannelId,
                user,
                guild
            );
        } else if (!voiceState.selfVideo && settings.store.eventUserCameraOff) {
            await sendFormattedMessage(
                settings.store.messageUserCameraOff,
                voiceState,
                userId,
                targetTextChannelId,
                user,
                guild
            );
        }
    }

    // Check for stream start/stop changes
    if (previousState && previousState.selfStream !== voiceState.selfStream) {
        if (voiceState.selfStream && settings.store.eventUserStreamStart) {
            await sendFormattedMessage(
                settings.store.messageUserStreamStart,
                voiceState,
                userId,
                targetTextChannelId,
                user,
                guild
            );
        } else if (
            !voiceState.selfStream &&
            settings.store.eventUserStreamStop
        ) {
            await sendFormattedMessage(
                settings.store.messageUserStreamStop,
                voiceState,
                userId,
                targetTextChannelId,
                user,
                guild
            );
        }
    }

    // Check for server mute/unmute (mute field changes without self-mute changing)
    if (
        previousState &&
        previousState.mute !== voiceState.mute &&
        previousState.selfMute === voiceState.selfMute
    ) {
        if (voiceState.mute && settings.store.eventUserServerMuted) {
            await sendFormattedMessage(
                settings.store.messageUserServerMuted,
                voiceState,
                userId,
                targetTextChannelId,
                user,
                guild
            );
        } else if (!voiceState.mute && settings.store.eventUserServerUnmuted) {
            await sendFormattedMessage(
                settings.store.messageUserServerUnmuted,
                voiceState,
                userId,
                targetTextChannelId,
                user,
                guild
            );
        }
    }

    // Check for server deafen/undeafen (deaf field changes without self-deafen changing)
    if (
        previousState &&
        previousState.deaf !== voiceState.deaf &&
        previousState.selfDeaf === voiceState.selfDeaf
    ) {
        if (voiceState.deaf && settings.store.eventUserServerDeafened) {
            await sendFormattedMessage(
                settings.store.messageUserServerDeafened,
                voiceState,
                userId,
                targetTextChannelId,
                user,
                guild
            );
        } else if (
            !voiceState.deaf &&
            settings.store.eventUserServerUndeafened
        ) {
            await sendFormattedMessage(
                settings.store.messageUserServerUndeafened,
                voiceState,
                userId,
                targetTextChannelId,
                user,
                guild
            );
        }
    }

    // Check for join/leave/move events
    const [type, targetVoiceChannelId] = getTypeAndChannelId(voiceState, isMe);

    if (type === "move" && settings.store.eventUserMoved) {
        // Handle move events - post to both old and new channels
        const newVoiceChannelId = voiceState.channelId;
        const oldVoiceChannelId = voiceState.oldChannelId;

        if (newVoiceChannelId && oldVoiceChannelId) {
            // Post to old channel (leave message)
            const oldChannelTextId =
                findAssociatedTextChannel(oldVoiceChannelId);
            if (oldChannelTextId) {
                await sendFormattedMessage(
                    settings.store.messageUserMoved,
                    voiceState,
                    userId,
                    oldChannelTextId,
                    user,
                    guild
                );
            }

            // Post to new channel (join message)
            const newChannelTextId =
                findAssociatedTextChannel(newVoiceChannelId);
            if (newChannelTextId) {
                await sendFormattedMessage(
                    settings.store.messageUserMoved,
                    voiceState,
                    userId,
                    newChannelTextId,
                    user,
                    guild
                );
            }
        }
    } else if (type) {
        // Handle connect/disconnect events
        let messageTemplate;
        let shouldSend = false;

        switch (type) {
            case "join":
                messageTemplate = settings.store.messageUserJoined;
                shouldSend = settings.store.eventUserJoined;
                break;
            case "leave":
                messageTemplate = settings.store.messageUserLeft;
                shouldSend = settings.store.eventUserLeft;
                break;
            case "connect":
                messageTemplate = settings.store.messageUserConnected;
                shouldSend = settings.store.eventUserConnected;
                break;
            case "disconnect":
                messageTemplate = settings.store.messageUserDisconnected;
                shouldSend = settings.store.eventUserDisconnected;
                break;
            default:
                messageTemplate = settings.store.messageUserDefault;
                shouldSend = settings.store.eventUserDefault;
        }

        if (shouldSend) {
            await sendFormattedMessage(
                messageTemplate,
                voiceState,
                userId,
                targetTextChannelId,
                user,
                guild
            );
        }
    }

    // Update the previous state for this user
    previousVoiceStates.set(userId, {
        deaf: voiceState.deaf,
        mute: voiceState.mute,
        selfDeaf: voiceState.selfDeaf,
        selfMute: voiceState.selfMute,
        selfVideo: voiceState.selfVideo,
        selfStream: voiceState.selfStream,
    });
}

async function handleVoiceStateUpdate(voiceStates: VoiceStateChangeEvent[]) {
    if (!settings.store.enabled) return;

    const currentUserId = UserStore.getCurrentUser().id;

    for (const voiceState of voiceStates) {
        const { userId } = voiceState;
        const isMe = userId === currentUserId;

        // Handle all voice state changes in one place
        await detectVoiceStateChanges(voiceState, userId, isMe);
    }
}
// endregion Main
// region Definition
export default definePlugin({
    name: pluginInfo.name,
    description: pluginInfo.description,
    authors: pluginInfo.authors,
    settings,

    start() { },

    flux: {
        VOICE_STATE_UPDATES({
            voiceStates,
        }: {
            voiceStates: VoiceStateChangeEvent[];
        }) {
            handleVoiceStateUpdate(voiceStates).catch(() => {
                // Silently handle async errors
            });
        },
    },
});
// endregion Definition
