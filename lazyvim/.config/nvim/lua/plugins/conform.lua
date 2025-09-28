return {
  "stevearc/conform.nvim",
  optional = true,
  ---@param opts ConformOpts
  opts = function(_, opts)
    -- Definimos los filetypes que queremos soportar
    local supported = { "javascriptreact", "javascript", "typescript", "typescriptreact" }

    opts.formatters_by_ft = opts.formatters_by_ft or {}
    for _, ft in ipairs(supported) do
      opts.formatters_by_ft[ft] = opts.formatters_by_ft[ft] or {}
      table.insert(opts.formatters_by_ft[ft], "biome")
    end

    opts.formatters = opts.formatters or {}
    opts.formatters.biome = {
      require_cwd = true,
    }
  end,
}
