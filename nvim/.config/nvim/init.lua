vim.g.base46_cache = vim.fn.stdpath "data" .. "/base46/"

-- leader key
vim.g.mapleader = " "

-- python3 path
vim.g.python3_host_prog = "/usr/bin/python3"

-- clipboard de windows compartido
-- vim.g.clipboard = {
--     name = "win32yank",
--     copy = {
--     ["+"] = "win32yank.exe -i --crlf",
--     ["*"] = "win32yank.exe -i --crlf",
--     },
--     paste = {
--     ["+"] = "win32yank.exe -o --lf",
--     ["*"] = "win32yank.exe -o --lf",
--     },
--     cache_enabled = false,
-- }
--
-- Clipboard de Linux
-- Wayland
vim.g.clipboard = {
  name = "wl-clipboard",
  copy = {
    ["+"] = "wl-copy --type text/plain", -- Command to copy to the system clipboard
    ["*"] = "wl-copy --primary --type text/plain", -- Command to copy to the primary clipboard
  },
  paste = {
    ["+"] = "wl-paste --no-newline", -- Command to paste from the system clipboard
    ["*"] = "wl-paste --primary --no-newline", -- Command to paste from the primary clipboard
  },
  cache_enabled = false, -- Disable clipboard caching
}

-- bootstrap lazy and all plugins
local lazypath = vim.fn.stdpath "data" .. "/lazy/lazy.nvim"

if not vim.uv.fs_stat(lazypath) then
  local repo = "https://github.com/folke/lazy.nvim.git"
  vim.fn.system { "git", "clone", "--filter=blob:none", repo, "--branch=stable", lazypath }
end

vim.opt.rtp:prepend(lazypath)

local lazy_config = require "configs.lazy"

-- load plugins
require("lazy").setup({
  {
    "NvChad/NvChad",
    lazy = false,
    branch = "v2.5",
    import = "nvchad.plugins",
  },

  { import = "plugins" },
}, lazy_config)

-- load theme
dofile(vim.g.base46_cache .. "defaults")
dofile(vim.g.base46_cache .. "statusline")

require "options"
require "nvchad.autocmds"
require "configs.lsp"

vim.schedule(function()
  require "mappings"
end)
