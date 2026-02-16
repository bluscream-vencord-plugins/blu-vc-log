import { ChannelStore, GuildChannelStore } from "@webpack/common";
import type { Channel } from "@vencord/discord-types";
import { ChannelType } from "@vencord/discord-types/enums";

export const isVoiceChannel = (channel: Channel | null | undefined): channel is Channel =>
    channel?.type === ChannelType.GUILD_VOICE || channel?.type === ChannelType.GUILD_STAGE_VOICE;

export const isStageChannel = (channel: Channel | null | undefined): channel is Channel =>
    channel?.type === ChannelType.GUILD_STAGE_VOICE;

export const isTextChannel = (channel: Channel | null | undefined): channel is Channel =>
    channel?.type === ChannelType.GUILD_TEXT;

export const isGuildChannel = (channel: Channel | null | undefined): channel is Channel =>
    channel ? !channel.isDM() && !channel.isGroupDM() : false;

export function findAssociatedTextChannel(voiceChannelId: string): string | null {
    const voiceChannel = ChannelStore.getChannel(voiceChannelId);
    if (!voiceChannel || !voiceChannel.guild_id) return null;
    const textChannel = ChannelStore.getChannel(voiceChannelId);
    if (isTextChannel(textChannel)) return voiceChannelId;
    const guildChannels = GuildChannelStore.getChannels(voiceChannel.guild_id);
    if (!guildChannels || !(guildChannels as any).SELECTABLE) return voiceChannelId;
    const associatedTextChannel = (guildChannels as any).SELECTABLE.find(
        ({ channel }) =>
            channel.name === voiceChannel.name &&
            channel.parent_id === voiceChannel.parent_id
    )?.channel;
    return associatedTextChannel ? associatedTextChannel.id : voiceChannelId;
}
