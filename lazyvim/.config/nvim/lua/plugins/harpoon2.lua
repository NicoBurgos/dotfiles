-- ~/.config/nvim/lua/plugins/harpoon.lua
return {
  "ThePrimeagen/harpoon",
  dependencies = { "nvim-lua/plenary.nvim", "folke/snacks.nvim" },
  config = function()
    local harpoon = require("harpoon")
    harpoon:setup()

    local Snacks = require("snacks")
    local wk = require("which-key")

    -- ==========================
    -- Harpoon Keymaps (WhichKey v3)
    -- ==========================
    wk.add({
      {
        mode = "n",
        "<leader>h",
        desc = "Harpoon",
        icon = "📌", -- icono del grupo
        expand = function()
          return {
            a = {
              function()
                harpoon:list():add()
              end,
              desc = "Add File",
              icon = "➕",
            },
            m = {
              function()
                harpoon.ui:toggle_quick_menu(harpoon:list())
              end,
              desc = "Menu",
              icon = "📂",
            },
            ["1"] = {
              function()
                harpoon:list():select(1)
              end,
              desc = "Go to 1",
              icon = "1️⃣",
            },
            ["2"] = {
              function()
                harpoon:list():select(2)
              end,
              desc = "Go to 2",
              icon = "2️⃣",
            },
            ["3"] = {
              function()
                harpoon:list():select(3)
              end,
              desc = "Go to 3",
              icon = "3️⃣",
            },
            ["4"] = {
              function()
                harpoon:list():select(4)
              end,
              desc = "Go to 4",
              icon = "4️⃣",
            },
          }
        end,
      },
    })

    -- ==========================
    -- Keymaps directos (opcional)
    -- ==========================
    vim.keymap.set("n", "<leader>ha", function()
      harpoon:list():add()
    end, { desc = "Harpoon Add File" })
    vim.keymap.set("n", "<leader>hm", function()
      harpoon.ui:toggle_quick_menu(harpoon:list())
    end, { desc = "Harpoon Menu" })
    for i = 1, 4 do
      vim.keymap.set("n", "<leader>h" .. i, function()
        harpoon:list():select(i)
      end, { desc = "Harpoon Go " .. i })
    end
    vim.keymap.set("n", "<C-S-P>", function()
      harpoon:list():prev()
    end, { desc = "Harpoon Previous" })
    vim.keymap.set("n", "<C-S-N>", function()
      harpoon:list():next()
    end, { desc = "Harpoon Next" })
  end,
}
