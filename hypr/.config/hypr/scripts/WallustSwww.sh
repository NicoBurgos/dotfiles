#!/bin/bash
# /* ---- 💫 https://github.com/JaKooLit 💫 ---- */  ##
# Wallust Colors for current wallpaper

cache_dir="$HOME/.cache/swww/"
monitor_outputs=($(ls "$cache_dir"))

ln_success=false

current_monitor=$(hyprctl monitors | awk '/^Monitor/{name=$2} /focused: yes/{print name}')
cache_file="$cache_dir$current_monitor"

if [ -f "$cache_file" ]; then
    wallpaper_path=$(grep -v 'Lanczos3' "$cache_file" | head -n 1)
    
    # Symlink para Rofi
    if ln -sf "$wallpaper_path" "$HOME/.config/rofi/.current_wallpaper"; then
        ln_success=true
    fi

    # Copiar para efectos visuales
    cp -r "$wallpaper_path" "$HOME/.config/hypr/wallpaper_effects/.wallpaper_current"
fi

if [ "$ln_success" = true ]; then
    echo '⏳ Ejecutando wallust...'
    echo "Wallpaper path: $wallpaper_path"
    wallust run "$wallpaper_path" 

    # Esperar un poco para que wallust genere los archivos
    sleep 2

    # Recargar Kitty
    if pgrep kitty >/dev/null; then
        pkill -SIGUSR1 kitty
        echo "✅ Kitty recargado"
    fi
fi
