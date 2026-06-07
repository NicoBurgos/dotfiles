#!/bin/bash
# wallust + papirus-folders pipeline
# Ejecutado por WallpaperSelect.sh / WallpaperRandom.sh al cambiar wallpaper.
#
# ORDEN CRÍTICO: papirus-folders DEBE correr ANTES de `pkill -SIGUSR2 waybar`.
# La recarga de waybar puede disparar SIGTERM a este script; si papirus-folders
# corre antes, los colores ya están aplicados cuando llega la señal.

set +e

wallpaper="$1"

if [ -z "$wallpaper" ]; then
  echo "No wallpaper provided"
  exit 1
fi

echo "⏳ Ejecutando wallust..."
echo "Wallpaper path: $wallpaper"

wallust run "$wallpaper"

# =====================================================
# SECCIÓN CRÍTICA — papirus-folders + gtk cache + pkill thunar + gsettings
# (DEBE correr antes de cualquier reload de UI)
# =====================================================
SCRIPTSDIR="$HOME/.config/hypr/scripts"
if [ -f "$HOME/.cache/wal/colors.sh" ] && [ -f "$SCRIPTSDIR/map_color.sh" ]; then
    source "$HOME/.cache/wal/colors.sh"
    COLOR=$("$SCRIPTSDIR/map_color.sh")
    echo "🎨 Papirus folder color: $COLOR"
    if [ -n "$COLOR" ]; then
        papirus-folders -C "$COLOR" --theme Papirus-Dark
        gtk-update-icon-cache -f -t ~/.local/share/icons/Papirus-Dark
        XDG_DATA_HOME=/usr/share sudo /usr/bin/papirus-folders -C "$COLOR" --theme Papirus-Dark
        sudo /usr/bin/gtk-update-icon-cache -f -t /usr/share/icons/Papirus-Dark
    fi
fi

pkill -x thunar 2>/dev/null

gsettings set org.cinnamon.desktop.interface icon-theme "Papirus-Dark" 2>/dev/null
gsettings set org.gnome.desktop.interface icon-theme "Papirus-Dark" 2>/dev/null
gsettings set org.gnome.desktop.interface gtk-color-scheme "prefer-dark" 2>/dev/null
gsettings set org.cinnamon.desktop.interface gtk-color-scheme "prefer-dark" 2>/dev/null

# =====================================================
# SECCIÓN NO-CRÍTICA — reloads de UI
# =====================================================

# Regenerar starship config con paleta wallust
(
  sed '1s/^\xEF\xBB\xBF//' ~/.config/starship.base.toml
  printf '\n\n'
  sed '1s/^\xEF\xBB\xBF//' ~/.config/starship-wallust.toml
) >~/.config/starship.toml

echo "✅ Starship actualizado"

# recargar kitty (opcional)
if pgrep kitty >/dev/null; then
  pkill -SIGUSR1 kitty
fi

wezterm cli reload-config 2>/dev/null
zellij action reload-config 2>/dev/null

# recargar waybar
pkill -SIGUSR2 waybar

# recargar nemo si está corriendo
if pgrep -x nemo >/dev/null; then
    pkill -x nemo
    (nemo &) &
fi
