local wezterm = require("wezterm")

local config = wezterm.config_builder()

-- Usa el color_scheme generado por Wallust
config.color_scheme = "wallust"  -- ← sólo el nombre, sin extensión ni ruta

config.font = wezterm.font_with_fallback({
  "Fira Code",
  "MesloLGS NF",
})
config.font_size = 16
config.hide_tab_bar_if_only_one_tab = true
config.enable_tab_bar = true
config.window_background_opacity = 0.80
config.window_padding = {
  top = 0,
  right = 0,
  left = 0,
  bottom = 0,
}
config.max_fps = 240
config.default_prog = { "/home/linuxbrew/.linuxbrew/bin/zellij" }

config.keys = {
  { key = "C", mods = "CTRL", action = wezterm.action({ CopyTo = "Clipboard" }) },
}

config.mouse_bindings = {
  {
    event = { Up = { streak = 1, button = "Right" } },
    mods = "NONE",
    action = wezterm.action({ PasteFrom = "PrimarySelection" }),
  },
}

config.enable_kitty_graphics = true
return config
