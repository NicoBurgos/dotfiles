-- lsp
--------------------------------------------------------------------------------
-- See https://gpanders.com/blog/whats-new-in-neovim-0-11/ for a nice overview
-- of how the lsp setup works in neovim 0.11+.

-- This actually just enables the lsp servers.
-- The configuration is found in the lsp folder inside the nvim config folder,
-- so in ~.config/lsp/lua_ls.lua for lua_ls, for example.
vim.lsp.enable {
  "html",
  "cssls", -- css-lsp
  "dockerls", -- docker-language-server
  "bashls", -- bash-language-server
  "emmet_ls",
  "pyright",
  "sqlls",
  "tailwindcss",
  "ts_ls", -- typescript-language-server
  "lua_ls", -- lua-language-server
  "nginx_language_server", -- nginx (este puede necesitar configuración especial)
}

vim.api.nvim_create_autocmd("LspAttach", {
  callback = function(ev)
    local client = vim.lsp.get_client_by_id(ev.data.client_id)
    if client and client:supports_method(vim.lsp.protocol.Methods.textDocument_completion) then
      vim.opt.completeopt = { "menu", "menuone", "noinsert", "fuzzy", "popup" }
      vim.lsp.completion.enable(true, client.id, ev.buf, { autotrigger = true })
      vim.keymap.set("i", "<C-Space>", function()
        vim.lsp.completion.get()
      end)
    end
  end,
})

vim.lsp.config("*", {
  capabilities = require("blink.cmp").get_lsp_capabilities(),
})
-- Diagnostics
vim.diagnostic.config {
  -- Use the default configuration
  -- virtual_lines = true

  -- Alternatively, customize specific options
  virtual_lines = {

    -- Only show virtual line diagnostics for the current cursor line
    current_line = true,
  },
}
