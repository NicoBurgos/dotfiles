return {
  "mfussenegger/nvim-lint",
  event = { "BufReadPre", "BufNewFile" },
  config = function()
    local lint = require "lint"

    lint.linters.biome = {
      cmd = "biome",
      stdin = true,
      args = { "check", "--stdin-file-path", "$FILENAME", "-" },
      stream = "stdout",
      ignore_exitcode = true,
      parser = require("lint.parser").from_errorformat(
        [[%f:%l:%c: %trror: %m,%-G%f:%l:%c: %tarning: %m]],
        { source = "biome" }
      ),
    }

    lint.linters_by_ft = {
      python = { "pylint" },
      javascript = { "biome" },
      typescript = { "biome" },
      typescriptreact = { "biome" },
      json = { "biome" },
      dotenv = { "dotenv_linter" },
      yaml = { "cfn_lint" },
    }

    local lint_augroup = vim.api.nvim_create_augroup("lint", { clear = true })

    local function try_linting()
      local linters = lint.linters_by_ft[vim.bo.filetype]
      if linters then
        lint.try_lint(linters)
      end
    end

    vim.api.nvim_create_autocmd({ "BufEnter", "BufWritePost", "InsertLeave" }, {
      group = lint_augroup,
      callback = try_linting,
    })

    vim.keymap.set("n", "<leader>l", try_linting, { desc = "Trigger linting for current file" })
  end,
}
