return {
  "stevearc/conform.nvim",
  event = { "BufReadPre", "BufNewFile" },
  config = function()
    local conform = require "conform"

    conform.setup {
      formatters_by_ft = {
        -- Lua
        lua = { "stylua" }, -- o "luaformatter" si prefieres

        -- Shell
        bash = { "beautysh" },
        sh = { "beautysh" },
        zsh = { "beautysh" },

        -- JavaScript / TypeScript
        javascript = { "biome", "prettier" },
        javascriptreact = { "biome", "prettier" },
        typescript = { "biome", "prettier" },
        typescriptreact = { "biome", "prettier" },
        json = { "biome", "prettier" },

        -- HTML / CSS / Markdown
        html = { "prettier" },
        css = { "prettier" },
        scss = { "prettier" },
        markdown = { "cbfmt", "prettier" },

        -- Python
        python = { "black" },

        -- YAML
        yaml = { "yamlfmt" },

        -- SQL
        sql = { "sqlfmt" },
      },

      -- Formato automático al guardar
      format_on_save = true,
      timeout_ms = 500,
    }

    -- Mapeo para formatear manualmente con <leader>l
    vim.keymap.set({ "n", "v" }, "<leader>l", function()
      conform.format {
        lsp_fallback = true,
        async = false,
        timeout_ms = 1000,
      }
    end, { desc = "Format file or range (in visual mode)" })
  end,
}
