# Vencord Voice Channel Logging Plugin

A Vencord user plugin that logs voice channel joins and leaves to the associated text channel.

## Features

- **Voice Channel Logging**: Automatically logs when users join or leave voice channels
- **Text Channel Integration**: Sends logs to the text channel associated with the voice channel
- **Customizable Messages**: Configure custom message formats for join and leave events with multiple placeholders
- **Selective Monitoring**: Option to only monitor your current voice channel
- **Debug Logging**: Comprehensive debug logging with file export capability
- **Bot-like Appearance**: Messages appear as if sent by Clyde

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

## Installation

### 🪄 Installation Wizard
The easiest way to install this plugin is to use the **[Plugin Installer Generator](https://bluscream-vencord-plugins.github.io)**.
Simply select this plugin from the list and download your custom install script.

### 💻 Manual Installation (PowerShell)
Alternatively, you can run this snippet in your Equicord/Vencord source directory:
```powershell
$ErrorActionPreference = "Stop"
winget install -e --id Git.Git
winget install -e --id OpenJS.NodeJS
npm install -g pnpm
git clone https://github.com/Equicord/Equicord Equicord
New-Item -ItemType Directory -Force -Path "Equicord\src\userplugins" | Out-Null
git clone https://github.com/bluscream-vencord-plugins/voiceChannelLog.git -b "main" "Equicord\src\userplugins\voiceChannelLog"
cd "Equicord"
npm install -g pnpm
pnpm install --frozen-lockfile
pnpm build
pnpm buildWeb
pnpm inject
```
