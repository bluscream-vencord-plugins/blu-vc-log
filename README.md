# Vencord Voice Channel Logging Plugin

A Vencord user plugin that logs voice channel joins and leaves to the associated text channel.

## Features

- **Voice Channel Logging**: Automatically logs when users join or leave voice channels
- **Text Channel Integration**: Sends logs to the text channel associated with the voice channel
- **Customizable Messages**: Configure custom message formats for join and leave events with multiple placeholders
- **Selective Monitoring**: Option to only monitor your current voice channel
- **Debug Logging**: Comprehensive debug logging with file export capability
- **Bot-like Appearance**: Messages appear as if sent by Clyde

## Settings

- **Enable**: Toggle the plugin on/off
- **Only Monitor Own Channel**: When enabled, only logs events for the voice channel you're currently in
- **Trigger On Own Events**: Trigger chat messages on your own voice events
- **Console Logging**: Enable detailed console logging for voice state updates
- **Author Name**: Author name for bot messages (displayed as the sender)
- **Author Icon URL**: Author icon URL for bot messages (leave empty for default)
- **Event Toggles**: Enable/disable specific event types (Join, Leave, Connect, Disconnect, Move, Mute, Unmute, Deafen, Undeafen, Camera On/Off, Stream Start/Stop, Server Mute/Unmute, Server Deafen/Undeafen)
- **Message Templates**: Custom format for each event type with template variables
- **Template Reference**: Copy/paste reference for all available template variables and examples

## Available Placeholders

**Note**: For a complete reference with copy/paste variables and examples, see the **Template Reference** setting in the plugin configuration.

- `{username}` - Username of the user who joined/left
- `{displayname}` - Display name of the user
- `{userid}` - User ID (for mentions like `<@123456789>`)
- `{avatar}` - Avatar URL of the user
- `{oldChannelName}` - Name of the previous voice channel
- `{oldChannelId}` - ID of the previous voice channel
- `{newChannelName}` - Name of the new voice channel
- `{newChannelId}` - ID of the new voice channel
- `{guildName}` - Name of the server/guild
- `{guildId}` - ID of the server/guild
- `{now}` - Current date and time

## Default Messages

- **Join**: `🎉 <@{userid}> joined <#{newChannelId}>`
- **Leave**: `👋 <@{userid}> left <#{oldChannelId}>`
- **Connect**: `🔊 <@{userid}> connected to <#{newChannelId}>`
- **Disconnect**: `🔇 <@{userid}> disconnected from <#{oldChannelId}>`
- **Moved**: `🔄 <@{userid}> moved to <#{newChannelId}>`
- **Default**: `📢 <@{userid}> changed voice channel`
- **Muted**: `🔇 <@{userid}> muted themselves`
- **Unmuted**: `🔊 <@{userid}> unmuted themselves`
- **Deafened**: `🤐 <@{userid}> deafened themselves`
- **Undeafened**: `👂 <@{userid}> undeafened themselves`
- **Camera On**: `📹 <@{userid}> enabled their camera`
- **Camera Off**: `📴 <@{userid}> disabled their camera`
- **Stream Start**: `📺 <@{userid}> started streaming`
- **Stream Stop**: `⏹️ <@{userid}> stopped streaming`
- **Server Muted**: `🔇 <@{userid}> was muted by server/admin`
- **Server Unmuted**: `🔊 <@{userid}> was unmuted by server/admin`
- **Server Deafened**: `🤐 <@{userid}> was deafened by server/admin`
- **Server Undeafened**: `👂 <@{userid}> was undeafened by server/admin`

## Event Types

The plugin distinguishes between different types of voice events:

- **Join**: User moves from one voice channel to another (or joins from no channel)
- **Leave**: User moves from a voice channel to another (or leaves to no channel)
- **Connect**: User connects to voice for the first time (no previous channel)
- **Disconnect**: User disconnects from voice entirely (no new channel)
- **Moved**: User moves between voice channels (when not monitoring own channel)
- **Mute/Unmute**: User mutes or unmutes themselves
- **Deafen/Undeafen**: User deafens or undeafens themselves
- **Camera On/Off**: User enables or disables their camera
- **Stream Start/Stop**: User starts or stops streaming
- **Server Mute/Unmute**: User gets muted or unmuted by server/admin
- **Server Deafen/Undeafen**: User gets deafened or undeafened by server/admin

## Empty Template Behavior

If any message template is left empty, the plugin will skip processing that event type entirely. This allows you to disable specific event types by simply clearing their message templates.

## Example Custom Messages

- **Join**: `[{now}] <@{userid}> joined {newChannelName} in {guildName}`
- **Leave**: `[{now}] <@{userid}> left {oldChannelName} in {guildName}`
- **Connect**: `[{now}] <@{userid}> connected to {newChannelName} in {guildName}`
- **Disconnect**: `[{now}] <@{userid}> disconnected from {oldChannelName} in {guildName}`
- **Moved**: `[{now}] <@{userid}> moved from {oldChannelName} to {newChannelName} in {guildName}`

## Console Logging

When console logging is enabled, the plugin will:

- Log detailed information to Discord's console
- Track all voice state update events with formatted JSON data
- Show processing steps and decisions

### Using Console Logging

1. Enable "Console Logging" in the plugin settings
2. Open Discord DevTools (Ctrl+Shift+I) → Console tab
3. Perform voice channel actions (join/leave) to generate debug data
4. Check console for detailed debugging information

### Log Locations

- **Console**: Open Discord DevTools (Ctrl+Shift+I) → Console tab

Console logs include:

- Voice state update events with full data objects
- Channel and guild information
- Message formatting details
- Decision logic and filtering reasons

## How It Works

The plugin listens to Discord's `VOICE_STATE_UPDATES` flux events to detect when users join or leave voice channels. When an event is detected:

1. It determines if the event should be logged based on your settings
2. Finds the associated text channel for the voice channel
3. Formats the message using your custom templates
4. Sends the message as Clyde to the text channel

## Installation

1. Copy the `blu-vc-log` folder to your Vencord `src/userplugins` directory
2. Rebuild Vencord: `npm run build`
3. Restart Discord
4. Enable the plugin in Vencord settings
5. Configure your preferred message formats

## AI Disclaimer

This plugin was developed with assistance from **Cursor.AI** (Cursor's AI coding assistant). The AI was used to help with code generation, debugging, documentation, and implementation. While AI assistance was utilized, all code and features were reviewed and tested to ensure quality and functionality.

## License

GPL-3.0-or-later
