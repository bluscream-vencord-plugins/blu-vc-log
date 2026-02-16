import { definePluginSettings } from "@api/Settings";
import { OptionType } from "@utils/types";

export const settings = definePluginSettings({
    enabled: {
        type: OptionType.BOOLEAN,
        description: "Enable voice channel join/leave logging",
        default: true,
        restartNeeded: false,
    },
    onlyMonitorOwnChannel: {
        type: OptionType.BOOLEAN,
        description: "Only monitor your current voice channel or the channel you are viewing",
        default: true,
        restartNeeded: false,
    },
    triggerOnOwnEvents: {
        type: OptionType.BOOLEAN,
        description: "Trigger chat messages on your own voice events",
        default: false,
        restartNeeded: false,
    },
    consoleLogging: {
        type: OptionType.BOOLEAN,
        description: "Enable console logging for voice state updates",
        default: false,
        restartNeeded: false,
    },
    whitelistedGuilds: {
        type: OptionType.STRING,
        description: "List of guild IDs to always monitor (even if Only Monitor Own Channel is on) - Newline separated",
        default: "",
        multiline: true,
        restartNeeded: false,
    },

    // Author Settings
    authorName: {
        type: OptionType.STRING,
        description:
            "Author name for bot messages (displayed as the sender). Variables: {username}=username, {displayname}=display name, {userid}=user ID",
        default: "Clyde",
        placeholder: "Clyde or {username}",
        restartNeeded: false,
    },
    authorIconUrl: {
        type: OptionType.STRING,
        description:
            "Author icon URL for bot messages (leave empty for default). Variables: {username}=username, {displayname}=display name, {userid}=user ID, {avatar}=avatar URL",
        default: "",
        placeholder: "https://example.com/avatar.png or {avatar}",
        restartNeeded: false,
    },

    // Event Type Toggles
    eventUserJoined: {
        name: "Event: Join",
        type: OptionType.BOOLEAN,
        description: "Log user join events to voice text chat",
        default: true,
        restartNeeded: false,
    },
    eventUserLeft: {
        name: "Event: Leave",
        type: OptionType.BOOLEAN,
        description: "Log user leave events to voice text chat",
        default: true,
        restartNeeded: false,
    },
    eventUserConnected: {
        name: "Event: Connect",
        type: OptionType.BOOLEAN,
        description: "Log user connect events to voice text chat",
        default: true,
        restartNeeded: false,
    },
    eventUserDisconnected: {
        name: "Event: Disconnect",
        type: OptionType.BOOLEAN,
        description: "Log user disconnect events to voice text chat",
        default: true,
        restartNeeded: false,
    },
    eventUserMoved: {
        name: "Event: Move",
        type: OptionType.BOOLEAN,
        description: "Log user move events to voice text chat",
        default: true,
        restartNeeded: false,
    },
    eventUserDefault: {
        name: "Event: Default",
        type: OptionType.BOOLEAN,
        description: "Log user default events to voice text chat",
        default: true,
        restartNeeded: false,
    },
    eventUserMuted: {
        name: "Event: Mute",
        type: OptionType.BOOLEAN,
        description: "Log user mute events to voice text chat",
        default: true,
        restartNeeded: false,
    },
    eventUserUnmuted: {
        name: "Event: Unmute",
        type: OptionType.BOOLEAN,
        description: "Log user unmute events to voice text chat",
        default: true,
        restartNeeded: false,
    },
    eventUserDeafens: {
        name: "Event: Deafen",
        type: OptionType.BOOLEAN,
        description: "Log user deafen events to voice text chat",
        default: true,
        restartNeeded: false,
    },
    eventUserUndeafens: {
        name: "Event: Undeafen",
        type: OptionType.BOOLEAN,
        description: "Log user undeafen events to voice text chat",
        default: true,
        restartNeeded: false,
    },
    eventUserCameraOn: {
        name: "Event: Camera On",
        type: OptionType.BOOLEAN,
        description: "Log user camera on events to voice text chat",
        default: true,
        restartNeeded: false,
    },
    eventUserCameraOff: {
        name: "Event: Camera Off",
        type: OptionType.BOOLEAN,
        description: "Log user camera off events to voice text chat",
        default: true,
        restartNeeded: false,
    },
    eventUserStreamStart: {
        name: "Event: Stream Start",
        type: OptionType.BOOLEAN,
        description: "Log user stream start events to voice text chat",
        default: true,
        restartNeeded: false,
    },
    eventUserStreamStop: {
        name: "Event: Stream Stop",
        type: OptionType.BOOLEAN,
        description: "Log user stream stop events to voice text chat",
        default: true,
        restartNeeded: false,
    },
    eventUserServerMuted: {
        name: "Event: Server Mute",
        type: OptionType.BOOLEAN,
        description: "Log user server mute events to voice text chat",
        default: true,
        restartNeeded: false,
    },
    eventUserServerUnmuted: {
        name: "Event: Server Unmute",
        type: OptionType.BOOLEAN,
        description: "Log user server unmute events to voice text chat",
        default: true,
        restartNeeded: false,
    },
    eventUserServerDeafened: {
        name: "Event: Server Deafen",
        type: OptionType.BOOLEAN,
        description: "Log user server deafen events to voice text chat",
        default: true,
        restartNeeded: false,
    },
    eventUserServerUndeafened: {
        name: "Event: Server Undeafen",
        type: OptionType.BOOLEAN,
        description: "Log user server undeafen events to voice text chat",
        default: true,
        restartNeeded: false,
    },

    // Message Templates
    messageUserJoined: {
        type: OptionType.STRING,
        description: "Message format for when someone joins",
        default: "🎉 <@{userid}> joined <#{newChannelId}>",
        placeholder: "🎉 <@{userid}> joined <#{newChannelId}>",
        restartNeeded: false,
    },
    messageUserLeft: {
        type: OptionType.STRING,
        description: "Message format for when someone leaves",
        default: "👋 <@{userid}> left <#{oldChannelId}>",
        placeholder: "👋 <@{userid}> left <#{oldChannelId}>",
        restartNeeded: false,
    },
    messageUserConnected: {
        type: OptionType.STRING,
        description: "Message format for when someone connects to voice",
        default: "🔊 <@{userid}> connected to <#{newChannelId}>",
        placeholder: "🔊 <@{userid}> connected to <#{newChannelId}>",
        restartNeeded: false,
    },
    messageUserDisconnected: {
        type: OptionType.STRING,
        description: "Message format for when someone disconnects from voice",
        default: "🔇 <@{userid}> disconnected from <#{oldChannelId}>",
        placeholder: "🔇 <@{userid}> disconnected from <#{oldChannelId}>",
        restartNeeded: false,
    },
    messageUserMoved: {
        type: OptionType.STRING,
        description:
            "Message format for when someone moves between voice channels",
        default: "🔄 <@{userid}> moved to <#{newChannelId}>",
        placeholder: "🔄 <@{userid}> moved to <#{newChannelId}>",
        restartNeeded: false,
    },
    messageUserDefault: {
        type: OptionType.STRING,
        description: "Default message format for fallback",
        default: "📢 <@{userid}> changed voice channel",
        placeholder: "📢 <@{userid}> changed voice channel",
        restartNeeded: false,
    },
    messageUserMuted: {
        type: OptionType.STRING,
        description: "Message format for when someone mutes themselves",
        default: "🔇 <@{userid}> muted themselves",
        placeholder: "🔇 <@{userid}> muted themselves",
        restartNeeded: false,
    },
    messageUserUnmuted: {
        type: OptionType.STRING,
        description: "Message format for when someone unmutes themselves",
        default: "🔊 <@{userid}> unmuted themselves",
        placeholder: "🔊 <@{userid}> unmuted themselves",
        restartNeeded: false,
    },
    messageUserDeafened: {
        type: OptionType.STRING,
        description: "Message format for when someone deafens themselves",
        default: "🤐 <@{userid}> deafened themselves",
        placeholder: "🤐 <@{userid}> deafened themselves",
        restartNeeded: false,
    },
    messageUserUndeafened: {
        type: OptionType.STRING,
        description: "Message format for when someone undeafens themselves",
        default: "👂 <@{userid}> undeafened themselves",
        placeholder: "👂 <@{userid}> undeafened themselves",
        restartNeeded: false,
    },
    messageUserCameraOn: {
        type: OptionType.STRING,
        description: "Message format for when someone enables camera",
        default: "📹 <@{userid}> enabled their camera",
        placeholder: "📹 <@{userid}> enabled their camera",
        restartNeeded: false,
    },
    messageUserCameraOff: {
        type: OptionType.STRING,
        description: "Message format for when someone disables camera",
        default: "📴 <@{userid}> disabled their camera",
        placeholder: "📴 <@{userid}> disabled their camera",
        restartNeeded: false,
    },
    messageUserStreamStart: {
        type: OptionType.STRING,
        description: "Message format for when someone starts streaming",
        default: "📺 <@{userid}> started streaming",
        placeholder: "📺 <@{userid}> started streaming",
        restartNeeded: false,
    },
    messageUserStreamStop: {
        type: OptionType.STRING,
        description: "Message format for when someone stops streaming",
        default: "⏹️ <@{userid}> stopped streaming",
        placeholder: "⏹️ <@{userid}> stopped streaming",
        restartNeeded: false,
    },
    messageUserServerMuted: {
        type: OptionType.STRING,
        description:
            "Message format for when someone gets muted by server/admin",
        default: "🔇 <@{userid}> was muted by server/admin",
        placeholder: "🔇 <@{userid}> was muted by server/admin",
        restartNeeded: false,
    },
    messageUserServerUnmuted: {
        type: OptionType.STRING,
        description:
            "Message format for when someone gets unmuted by server/admin",
        default: "🔊 <@{userid}> was unmuted by server/admin",
        placeholder: "🔊 <@{userid}> was unmuted by server/admin",
        restartNeeded: false,
    },
    messageUserServerDeafened: {
        type: OptionType.STRING,
        description:
            "Message format for when someone gets deafened by server/admin",
        default: "🤐 <@{userid}> was deafened by server/admin",
        placeholder: "🤐 <@{userid}> was deafened by server/admin",
        restartNeeded: false,
    },
    messageUserServerUndeafened: {
        type: OptionType.STRING,
        description:
            "Message format for when someone gets undeafened by server/admin",
        default: "👂 <@{userid}> was undeafened by server/admin",
        placeholder: "👂 <@{userid}> was undeafened by server/admin",
        restartNeeded: false,
    },
    messageTemplateReference: {
        type: OptionType.STRING,
        description:
            "Template Reference - Variables: {username}=username, {displayname}=display name, {userid}=user ID, {oldChannelName}=previous channel name, {oldChannelId}=previous channel ID, {newChannelName}=new channel name, {newChannelId}=new channel ID, {guildName}=server name, {guildId}=server ID, {now}=current time and date",
        default:
            "{username} {displayname} {userid} {avatar} {oldChannelName} {oldChannelId} {newChannelName} {newChannelId} {guildName} {guildId} {now}",
        placeholder:
            "{username} {displayname} {userid} {avatar} {oldChannelName} {oldChannelId} {newChannelName} {newChannelId} {guildName} {guildId} {now}",
        readonly: true,
        restartNeeded: false,
        onChange(newVal: string) {
            settings.store.messageTemplateReference =
                settings.def.messageTemplateReference.default;
        },
    }
});
