#!/bin/bash

source ~/.cache/wal/colors.sh

HEX=${W_ACCENT#\#}

R=$((16#${HEX:0:2}))
G=$((16#${HEX:2:2}))
B=$((16#${HEX:4:2}))

MAX=$R
MIN=$R

((G > MAX)) && MAX=$G
((B > MAX)) && MAX=$B

((G < MIN)) && MIN=$G
((B < MIN)) && MIN=$B

DELTA=$((MAX - MIN))

# =========================
# Neutros
# =========================

if ((MAX < 35)); then
  echo "black"
  exit
fi

if ((DELTA < 12 && MAX > 220)); then
  echo "white"
  exit
fi

if ((DELTA < 18)); then
  echo "grey"
  exit
fi

# =========================
# Marrones
# =========================

if ((R > 100 && G > 60 && G < 140 && B < 80)); then
  if ((R > 170)); then
    echo "palebrown"
  else
    echo "brown"
  fi
  exit
fi

# =========================
# Amarillos / naranjas
# =========================

if ((R > 200 && G > 170 && B < 120)); then
  echo "yellow"
  exit
fi

if ((R > 220 && G > 120 && G < 190 && B < 90)); then
  echo "orange"
  exit
fi

if ((R > 220 && G > 100 && G < 170 && B < 70)); then
  echo "deeporange"
  exit
fi

if ((R > 190 && G > 140 && B < 120)); then
  echo "paleorange"
  exit
fi

# =========================
# Rojos / rosas
# =========================

if ((R > G + 40 && R > B + 40)); then

  if ((B > 140 && G < 120)); then
    echo "pink"
    exit
  fi

  if ((R > 120 && G < 70 && B < 70)); then
    echo "carmine"
    exit
  fi

  echo "red"
  exit
fi

# =========================
# Verdes
# =========================

if ((G > R + 25 && G > B + 25)); then

  if ((B > 120)); then
    echo "teal"
    exit
  fi

  if ((G < 100)); then
    echo "darkcyan"
    exit
  fi

  echo "green"
  exit
fi

# =========================
# Azules
# =========================

if ((B > R + 20 && B > G + 20)); then

  if ((G > 100)); then
    echo "cyan"
    exit
  fi

  if ((R > 70 && R < 140)); then
    echo "indigo"
    exit
  fi

  echo "blue"
  exit
fi

# =========================
# Violetas / magentas
# =========================

if ((R > 100 && B > 100)); then

  if ((R > 170 && B > 170)); then
    echo "magenta"
    exit
  fi

  echo "violet"
  exit
fi

# =========================
# Fallback
# =========================

echo "blue"
