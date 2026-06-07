return {
  "jameswolensky/marker-groups.nvim",
  lazy = false,
  dependencies = {
    "nvim-lua/plenary.nvim",
    "ibhagwan/fzf-lua",
    "folke/snacks.nvim",
    "nvim-telescope/telescope.nvim",
  },
  config = function()
    require("marker-groups").setup({
      picker = "snacks",
      keymaps = {
        enabled = true,
        prefix = "<leader>m",
      },
    })

    local wk = require("which-key")

    wk.add({
      { "<leader>m", group = "Markers", icon = "󰍉" },
      { "<leader>mg", group = "Marker Groups", icon = "" },
    })
  end,
}
