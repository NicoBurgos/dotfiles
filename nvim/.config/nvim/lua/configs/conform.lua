local options = {
  -- formatters to use
  formatters_by_ft = {
    lua = { "stylua" },
    css = { "prettier, prettierd" },
    html = { "prettier, prettierd" },
    jsx = { "biome, prettier, prettierd" }, -- Añadido JSX
    tsx = { "biome, prettier, prettierd" }, -- Añadido TSX
    js = { "biome, prettier, prettierd" }, -- Añadido JS
    ts = { "biome, prettier, prettierd" }, -- Añadido TS
    py = { "isort", "black" },
    python = { "isort", "black" },
    sh = { "beautysh" }, -- Shell scripts
    bash = { "beautysh" },
    zsh = { "beautysh" },
    markdown = { "cbfmt" },
    yaml = { "yamlfmt" },
    yml = { "yamlfmt" },
  },

  -- Habilitar formato automático al guardar
  format_on_save = {
    timeout_ms = 500,
    lsp_fallback = true, -- Utiliza LSP si está disponible para formateo
  },
}

return options
