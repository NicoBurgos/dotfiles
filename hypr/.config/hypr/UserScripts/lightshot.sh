#!/bin/bash

export XDG_RUNTIME_DIR=/run/user/$(id -u)

TMPIMG="/tmp/screenshot.png"
OUTPUTDIR="$HOME/Imágenes/Screenshots/"  # o "Pictures" si preferís en inglés
mkdir -p "$OUTPUTDIR"

# Fecha para nombre de archivo
TIMESTAMP=$(date +%Y%m%d-%H%M%S)
OUTPUTFILE="$OUTPUTDIR/screenshot_$TIMESTAMP.png"

# Capturar región
grim -g "$(slurp)" "$TMPIMG" || exit 1

# Abrir satty para editar, copiar al clipboard y guardar solo si elegís hacerlo (clic derecho o acción)
satty -f "$TMPIMG" \
      --copy-command wl-copy \
      --output-filename "$OUTPUTFILE" \
      --fullscreen \
      --actions-on-enter save-to-clipboard \
      --actions-on-right-click save-to-file \
      --actions-on-escape exit
