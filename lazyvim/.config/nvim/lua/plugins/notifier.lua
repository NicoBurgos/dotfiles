return {
  "folke/snacks.nvim",
  opts = {
    notifier = {
      enabled = true,
    },
    -- otros módulos...
  },
  config = function(_, opts)
    local Snacks = require("snacks")
    Snacks.setup(opts)

    vim.api.nvim_create_autocmd("BufWritePost", {
      callback = function(args)
        local filename = vim.fn.fnamemodify(args.file, ":t")
        Snacks.notifier.notify("Se guardó el archivo: " .. filename, vim.log.levels.INFO, {
          title = "✅ Guardado",
        })
      end,
    })
  end,
}
