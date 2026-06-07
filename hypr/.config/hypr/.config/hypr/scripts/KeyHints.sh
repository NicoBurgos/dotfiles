#!/bin/bash
# /* ---- 💫 https://github.com/JaKooLit 💫 ---- */  ##
# Quick cheat sheet of all keybinds. Updated to match UserKeybinds.conf.
# Each row has 3 columns: KEY | DESCRIPTION | COMMAND
# Section headers use empty key, text in description column.

# GDK BACKEND. Change to either wayland or x11 if having issues
BACKEND=wayland

# Kill any rofi/yad that might be open
if pidof rofi > /dev/null; then
  pkill rofi
fi
if pidof yad > /dev/null; then
  pkill yad
fi

GDK_BACKEND=$BACKEND yad \
    --center \
    --title="KooL Quick Cheat Sheet" \
    --no-buttons \
    --list \
    --column=Key: \
    --column=Description: \
    --column=Command: \
    --timeout-indicator=bottom \
"ESC" "close this app" "" \
"" "" "" \
"SUPER" "Windows Key (the main modifier)" "" \
"" "" "" \
"=== APPS ===" "" "" \
"SUPER+Return" "Terminal" "(wezterm)" \
"SUPER+SHIFT+Return" "Drop-down Terminal" "Q to close" \
"SUPER+SPACE" "Application Launcher" "(rofi-wayland)" \
"SUPER+E" "File Manager" "(thunar)" \
"SUPER+B" "Browser" "(default browser)" \
"SUPER+K" "Kitty terminal" "" \
"SUPER+V" "Clipboard Manager" "(cliphist)" \
"SUPER+C" "VS Code" "" \
"SUPER+P" "Bitwarden" "" \
"SUPER+O" "Obsidian" "" \
"SUPER+M" "Pear Desktop" "(YouTube Music client)" \
"SUPER+W" "WhatsApp (wasistlos)" "" \
"SUPER+ALT+N" "WhatsApp GUI (nmgui)" "" \
"SUPER+Y" "YouTube (web)" "" \
"SUPER+I" "OpenCode (linuxbrew)" "(wezterm -e /home/linuxbrew/.linuxbrew/bin/opencode)" \
"SUPER+D" "Lazydocker" "(kitty -e lazydocker)" \
"SUPER+T" "btop" "(kitty -e btop)" \
"SUPER+S" "Google search via rofi" "" \
"" "" "" \
"=== WINDOW NAVIGATION ===" "" "" \
"SUPER+arrows" "Move focus" "" \
"SUPER+CTRL+arrows" "Move window" "" \
"SUPER+SHIFT+arrows" "Resize window" "" \
"SUPER+ALT+arrows" "Swap with neighbor" "" \
"" "" "" \
"=== MASTER LAYOUT (only when toggled) ===" "" "" \
"" "Default is dwindle. Binds below are no-op unless toggled." "" \
"SUPER+CTRL+I" "Swap with master" "(focused <-> master)" \
"SUPER+CTRL+." "Master bigger" "(+40px via MasterSize.sh)" \
"SUPER+CTRL+," "Master smaller" "(-40px via MasterSize.sh)" \
"SUPER+CTRL+0" "Reset master 50/50" "(MasterSize.sh reset)" \
"SUPER+SHIFT+L" "Toggle dwindle <-> master" "" \
"" "" "" \
"=== WINDOW / FLOAT ===" "" "" \
"SUPER+Q" "Close active window" "" \
"SUPER+SHIFT+Q" "Kill active process" "" \
"SUPER+SHIFT+F" "Fullscreen" "" \
"SUPER+CTRL+F" "Fake fullscreen" "" \
"SUPER+ALT+F" "Maximize toggle (no fullscreen)" "(ToggleMaximize.sh)" \
"SUPER+F" "Toggle float" "" \
"SUPER+ALT+SPACE" "All windows to float" "" \
"" "" "" \
"=== WALLPAPER ===" "" "" \
"SUPER+SHIFT+W" "Select wallpaper" "" \
"SUPER+SHIFT+ALT+W" "Wallpaper effects" "(imagemagick + swww)" \
"SUPER+CTRL+ALT+W" "Random wallpaper" "" \
"" "" "" \
"=== SYSTEM ===" "" "" \
"SUPER+SHIFT+H" "This cheat sheet" "" \
"SUPER+SHIFT+R" "Reload waybar/swaync/rofi" "" \
"SUPER+SHIFT+O" "Toggle blur" "" \
"SUPER+SHIFT+A" "Animations menu" "" \
"SUPER+SHIFT+P" "Color picker" "(hyprpicker)" \
"SUPER+SHIFT+K" "Searchable keybinds" "" \
"SUPER+SHIFT+E" "KooL Settings Menu" "" \
"SUPER+SHIFT+Z" "Change zsh theme" "" \
"SUPER+SHIFT+V" "KVM (parrotOS)" "" \
"SUPER+SHIFT+C" "Rclone sync" "" \
"SUPER+SHIFT+D" "Sync dotfiles" "" \
"SUPER+SHIFT+B" "Sync blog" "" \
"SUPER+SHIFT+G" "Mount Gdrive" "" \
"SUPER+ALT+E" "Emoji picker (rofi)" "" \
"SUPER+CTRL+C" "Calculator (rofi)" "" \
"SUPER+CTRL+O" "Toggle opacity (active win)" "" \
"SUPER+CTRL+ALT+B" "Toggle waybar" "" \
"SUPER+CTRL+B" "Waybar styles" "" \
"SUPER+ALT+B" "Waybar layout" "" \
"" "" "" \
"=== SCREENSHOTS ===" "" "" \
"Print" "Lightshot" "" \
"SUPER+SHIFT+Print" "Region (hyprshot)" "" \
"" "" "" \
"=== MISC ===" "" "" \
"SUPER+CTRL+ALT+L" "Lock screen" "" \
"SUPER+CTRL+ALT+P" "Power menu (wlogout)" "" \
"SUPER+CTRL+ALT+Del" "Exit Hyprland" "" \
"" "" "" \
"" "Note: SUPER+, and SUPER+. (no CTRL)" "cycle workspaces" \
"" "Note: SUPER+CTRL+, and SUPER+CTRL+." "are for master size" \
"" "" "" \
"More tips:" "https://github.com/JaKooLit/Hyprland-Dots/wiki" "" \
