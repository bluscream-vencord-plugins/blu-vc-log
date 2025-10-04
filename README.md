# Blu VC Log

A Vencord user plugin that logs voice channel joins and leaves to the associated text channel.

## Features

-   **Voice Channel Logging**: Automatically logs when users join or leave voice channels
-   **Text Channel Integration**: Sends logs to the text channel associated with the voice channel
-   **Customizable Messages**: Configure custom message formats for join and leave events with multiple placeholders
-   **Selective Monitoring**: Option to only monitor your current voice channel
-   **Debug Logging**: Comprehensive debug logging with file export capability
-   **Bot-like Appearance**: Messages appear as if sent by Clyde

## Settings

-   **Enable**: Toggle the plugin on/off
-   **Only Monitor Own Channel**: When enabled, only logs events for the voice channel you're currently in
-   **Debug Logging**: Enable detailed console logging and file export functionality for debugging
-   **Join Message**: Custom format for join messages
-   **Leave Message**: Custom format for leave messages
-   **Connect Message**: Custom format for connection messages when users first connect to voice
-   **Disconnect Message**: Custom format for disconnection messages when users disconnect from voice entirely
-   **Moved Message**: Custom format for move messages when users move between voice channels
-   **Default Message**: Default fallback message format
-   **Template Reference**: Copy/paste reference for all available template variables and examples

## Available Placeholders

**Note**: For a complete reference with copy/paste variables and examples, see the **Template Reference** setting in the plugin configuration.

-   `{user}` - Username of the user who joined/left
-   `{userid}` - User ID (for mentions like `<@123456789>`)
-   `{oldChannelName}` - Name of the previous voice channel
-   `{oldChannelId}` - ID of the previous voice channel
-   `{newChannelName}` - Name of the new voice channel
-   `{newChannelId}` - ID of the new voice channel
-   `{guildName}` - Name of the server/guild
-   `{guildId}` - ID of the server/guild
-   `{now}` - Current date and time

## Default Messages

-   Join: `User <@{userid}> joined.`
-   Leave: `User <@{userid}> left.`
-   Connect: `User <@{userid}> connected.`
-   Disconnect: `User <@{userid}> disconnected.`
-   Moved: `User <@{userid}> moved to {newChannelName}.`
-   Default: `User <@{userid}> changed voice channel.`

## Event Types

The plugin now distinguishes between different types of voice events:

-   **Join**: User moves from one voice channel to another (or joins from no channel)
-   **Leave**: User moves from a voice channel to another (or leaves to no channel)
-   **Connect**: User connects to voice for the first time (no previous channel)
-   **Disconnect**: User disconnects from voice entirely (no new channel)
-   **Moved**: User moves between voice channels (when not monitoring own channel)

## Empty Template Behavior

If any message template is left empty, the plugin will skip processing that event type entirely. This allows you to disable specific event types by simply clearing their message templates.

## Example Custom Messages

-   Join: `[{now}] <@{userid}> joined {newChannelName} in {guildName}`
-   Leave: `[{now}] <@{userid}> left {oldChannelName} in {guildName}`
-   Connect: `[{now}] <@{userid}> connected to {newChannelName} in {guildName}`
-   Disconnect: `[{now}] <@{userid}> disconnected from {oldChannelName} in {guildName}`
-   Moved: `[{now}] <@{userid}> moved from {oldChannelName} to {newChannelName} in {guildName}`

## Debug Logging

When debug logging is enabled, the plugin will:

-   Log detailed information to Discord's renderer log (same format as Vencord core messages)
-   Track all processing steps and decisions with formatted JSON data
-   Store logs in memory for file export
-   Provide a `/voicelog-export-debug` command to export logs to a text file
-   Show plugin configuration and current settings on startup

### Using Debug Logging

1. Enable "Debug Logging" in the plugin settings
2. Reload Discord to see startup configuration logs
3. Perform voice channel actions (join/leave) to generate debug data
4. Use `/voicelog-export-debug` command to export logs to a file
5. Check Discord's renderer log or exported file for detailed debugging information

### Log Locations

-   **Discord Renderer Log**: `%APPDATA%\discord\logs\renderer_js.log`
-   **Console**: Open Discord DevTools (Ctrl+Shift+I) → Console tab
-   **Exported File**: Use `/voicelog-export-debug` command to save logs

Debug logs include:

-   Plugin startup and configuration details
-   Voice state update events with full data objects
-   Channel and guild information
-   Message formatting details
-   Decision logic and filtering reasons
-   Error conditions and troubleshooting info

## How It Works

The plugin listens to Discord's `VOICE_STATE_UPDATES` flux events to detect when users join or leave voice channels. When an event is detected:

1. It determines if the event should be logged based on your settings
2. Finds the associated text channel for the voice channel
3. Formats the message using your custom templates
4. Sends the message as Clyde to the text channel

## Installation

1. Place the plugin in your Vencord userplugins folder
2. Reload Discord or restart Vencord
3. Enable the plugin in Vencord settings
4. Configure your preferred message formats

## Author

Created by Bluscream
