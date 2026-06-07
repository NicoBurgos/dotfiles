#!/bin/bash

wallpaper="$1"

if [ -z "$wallpaper" ]; then
  echo "No wallpaper provided"
  exit 1
fi

echo "⏳ Ejecutando wallust..."
echo "Wallpaper path: $wallpaper"

wallust run "$wallpaper"

sleep 1

# recargar waybar
pkill -SIGUSR2 waybar

# Regenerar starship config con paleta wallust
(
  sed '1s/^\xEF\xBB\xBF//' ~/.config/starship.base.toml
  printf '\n\n'
  sed '1s/^\xEF\xBB\xBF//' ~/.config/starship-wallust.toml
) >~/.config/starship.toml

echo "✅ Starship actualizado"

# opcional: recargar kitty
if pgrep kitty >/dev/null; then
  pkill -SIGUSR1 kitty
fi

wezterm cli reload-config
zellij action reload-config

# === Actualizar color de carpetas (papirus-folders) ===
# Wallust regenera colors.sh; map_color.sh mapea el accent a un nombre de color
# reconocido por papirus-folders. Necesitamos actualizar TANTO el tema del
# usuario (~/.local/share/icons/Papirus-Dark) COMO el del sistema
# (/usr/share/icons/Papirus-Dark), porque GTK usa el del sistema por defecto
# si XDG_DATA_HOME no está seteado en el env de Hyprland.
SCRIPTSDIR="$HOME/.config/hypr/scripts"
if [ -f "$HOME/.cache/wal/colors.sh" ] && [ -f "$SCRIPTSDIR/map_color.sh" ]; then
    source "$HOME/.cache/wal/colors.sh"
    COLOR=$("$SCRIPTSDIR/map_color.sh")
    echo "🎨 Papirus folder color: $COLOR"
    if [ -n "$COLOR" ]; then
        # tema del usuario
        papirus-folders -C "$COLOR" --theme Papirus-Dark
        gtk-update-icon-cache -f -t ~/.local/share/icons/Papirus-Dark
        # tema del sistema (NOPASSWD via sudoers para papirus-folders + gtk-update-icon-cache)
        XDG_DATA_HOME=/usr/share sudo /usr/bin/papirus-folders -C "$COLOR" --theme Papirus-Dark
        sudo /usr/bin/gtk-update-icon-cache -f -t /usr/share/icons/Papirus-Dark
    fi
fi

# Matar Thunar y Nemo (ambos cachean iconos y no se actualizan solos)
pkill -x thunar 2>/dev/null

# Asegurar que Cinnamon y GNOME apunten al icono theme correcto.
# Nemo es de Cinnamon y respeta org.cinnamon.desktop.interface, no la
# config de GNOME. Si el icono theme está mal seteado, Nemo ignora Papirus
# y carga el theme default (gnome), que no tiene los color variants.
gsettings set org.cinnamon.desktop.interface icon-theme "Papirus-Dark" 2>/dev/null
gsettings set org.gnome.desktop.interface icon-theme "Papirus-Dark" 2>/dev/null

# gtk-color-scheme es lo que Brave/Chromium/Electron revisan para decidir
# modo dark. Si está vacío, esas apps pueden mostrar UI en modo claro
# aunque el theme sea "*-dark".
gsettings set org.gnome.desktop.interface gtk-color-scheme "prefer-dark" 2>/dev/null
gsettings set org.cinnamon.desktop.interface gtk-color-scheme "prefer-dark" 2>/dev/null

# recargar nemo si está corriendo (no tiene reload nativo de CSS)
if pgrep -x nemo >/dev/null; then
    pkill -x nemo
    (nemo &) &
fi
