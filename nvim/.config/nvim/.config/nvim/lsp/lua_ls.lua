local util = require "lspconfig.util"

return {
  cmd = { "lua-language-server" },
  settings = {
    Lua = {
      diagnostics = {
        globals = { "vim" },
      },
      workspace = {
        library = vim.api.nvim_get_runtime_file("", true),
      },
    },
  },
  root_dir = function(cwd)
    return util.root_pattern ".git"(cwd) or cwd
  end,
}
