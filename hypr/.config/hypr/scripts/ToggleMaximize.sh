#!/bin/bash
# Toggle the active window between "maximized" (fullscreenstate 2) and normal (fullscreenstate 0).
# Hyprland's built-in dispatchers don't expose a "togglemaximize" so this script implements it.
# Requires: hyprctl, jq.

state=$(hyprctl -j activewindow 2>/dev/null | jq -r '.fullscreen // 0')

if [ "$state" = "2" ]; then
    hyprctl dispatch fullscreenstate 0
else
    hyprctl dispatch fullscreenstate 2
fi
