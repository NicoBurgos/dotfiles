local wezterm = require("wezterm")

local config = wezterm.config_builder()

-- Usa el color_scheme generado por Wallust
config.color_scheme = nil

-- 1. Construir la ruta de manera más segura y nativa en Wezterm
local wallust_colors = wezterm.config_dir .. "/colors/wallust.toml"

-- 2. CLAVE: Obligar a Wezterm a vigilar este archivo para ignorar el caché
wezterm.add_to_config_reload_watch_list(wallust_colors)

-- 3. Cargar el esquema
config.colors = wezterm.color.load_scheme(wallust_colors)

config.font = wezterm.font_with_fallback({
	"Fira Code",
	"MesloLGS NF",
	"Noto Sans",
	"Noto Sans Hebrew",
	"Noto Color Emoji",
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
