# Configuración Personal de Neovim (LazyVim)

Esta es mi configuración personalizada de **Neovim** basada en el [starter de LazyVim](https://github.com/LazyVim/starter). Incluye plugins adicionales, atajos de teclado y mejoras visuales.

Todo lo relacionado con esta configuración se encuentra en la carpeta `lazyvim` dentro del repositorio `dotfiles`.

---

## Requisitos

- [`stow`](https://www.gnu.org/software/stow/) – para aplicar la configuración
- **Neovim** >= `0.11.2` (compilado con **LuaJIT**)
- **Git** >= `2.19.0` (para soporte de *partial clones*)
- Una [Nerd Font](https://www.nerdfonts.com/) (v3.0 o superior) _(opcional, pero necesaria para íconos)_
- [`lazygit`](https://github.com/jesseduffield/lazygit) _(opcional)_
- [`tree-sitter-cli`](https://github.com/tree-sitter/tree-sitter) y un compilador **C** para [`nvim-treesitter`](https://github.com/nvim-treesitter/nvim-treesitter#requirements)
- [`curl`](https://curl.se/) – requerido por [blink.cmp](https://github.com/Saghen/blink.cmp)
- Para usar [`fzf-lua`](https://github.com/ibhagwan/fzf-lua) _(opcional)_:
  - [`fzf`](https://github.com/junegunn/fzf) (>= v0.25.1)
  - [`ripgrep`](https://github.com/BurntSushi/ripgrep) – para *live grep*
  - [`fd`](https://github.com/sharkdp/fd) – para búsqueda de archivos
- Un terminal con soporte para *true color* y **undercurl**:
  - [kitty](https://github.com/kovidgoyal/kitty) (Linux & macOS)
  - [wezterm](https://github.com/wez/wezterm) (Linux, macOS & Windows)
  - [alacritty](https://github.com/alacritty/alacritty) (Linux, macOS & Windows)
  - [iTerm2](https://iterm2.com/) (macOS)

---

## Instalación

1. Clona el repositorio de dotfiles:

```bash
git clone https://github.com/NicoBurgos/dotfiles.git
cd dotfiles

```

2. Hacer backup o eliminar las carpetas de configuración existentes:

```sh
  # required
  mv ~/.config/nvim{,.bak}

  # optional but recommended
  mv ~/.local/share/nvim{,.bak}
  mv ~/.local/state/nvim{,.bak}
  mv ~/.cache/nvim{,.bak}
  ```


3. Aplicar la configuración con stow:
```sh
stow lazyvim
```

4. Abrir Neovim por primera vez. La instalación de todos los plugins se hará automáticamente.

  ```sh
  nvim
  ```

---
## Estructura de la configuración

  ```sh
dotfiles/
└── lazyvim/
    ├── lua/
    │   ├── config/
    │   │   ├── autocmds.lua      # actualmente vacío
    │   │   ├── keymaps.lua       # keymaps personalizados
    │   │   ├── lazy.lua          # configuración del gestor de paquetes lazy
    │   │   └── options.lua       # actualmente vacío
    │   └── plugins/
    │       ├── animation-scroll.lua
    │       ├── colorscheme.lua
    │       ├── dashboard.lua
    │       ├── hipatterns.lua
    │       ├── lazy-starter-overrides.lua
    │       ├── marker-groups.lua
    │       ├── multiple-cursors.lua
    │       ├── notifier.lua
    │       ├── nvim-surround.lua
    │       ├── oil.lua
    │       ├── rip.lua
    │       ├── screenkey.lua
    │       ├── snacks.lua
    │       └── transparency.lua
    ├── .gitignore
    ├── .neoconf.json
    ├── LICENSE
    ├── readme.md
    ├── init.lua
    ├── lazy-lock.json
    ├── lazyvim.json
    └── stylua.toml
```

### Config
#### Keymaps Añadidas 

| Tecla                 | Acción                                     |
| --------------------- | ------------------------------------------ |
| `;`                   | Mostrar prompt de comandos (igual que `:`) |
| `jk`                  | Volver al modo normal desde modo insert    |
| `Shift + Tab`         | Reducir indentación (en insert y visual)   |
| `Shift + ↑ / ↓`       | Duplicar línea                             |
| `Ctrl + s`            | Guardar archivo (en todos los modos)       |
| `Ctrl + Alt + ↑ / ↓`  | Mover línea actual                         |
| `q`                   | Cerrar ventana                             |
| `Tab` / `Shift + Tab` | Navegar entre buffers                      |

### Plugins
| Plugin                     | Descripción                                |
| -------------------------- | ------------------------------------------ |
| animation-scroll.lua       | Modificado: desactiva animación del scroll |
| colorscheme.lua            | Añadido: colorscheme tokyodark             |
| dashboard.lua              | Modificado: dashboard personalizado NVIM   |
| hipatterns.lua             | Añadido: colorea valores hex y HLS         |
| lazy-starter-overrides.lua | Overrides del LazyVim starter              |
| marker-groups.lua          | Añadido: gestión de marcadores y grupos    |
| multiple-cursors.lua       | Añadido: edición multicursor               |
| notifier.lua               | Modificado: notificación al guardar        |
| nvim-surround.lua          | Añadido: selección de alrededores          |
| oil.lua                    | Añadido: explorador de archivos con atajos |
| rip.lua                    | Añadido: reemplazo de ocurrencias          |
| screenkey.lua              | Añadido: mostrar teclas presionadas        |
| snacks.lua                 | Modificado: explorador lateral derecho     |
| transparency.lua           | Añadido: agrega transparencias             |


## Plugins que vienen con LazyVim (no modificados)

Se incluyen todos los plugins por defecto de LazyVim, incluyendo dependencias de LSP, utilidades y mejoras de interfaz:

- blink-copilot
- blink.cmp
- bufferline.nvim
- copilot.lua
- flash.nvim
- friendly-snippets
- fzf-lua
- gitsigns.nvim
- lazy.nvim
- lazydev.nvim
- LazyVim
- lualine.nvim
- mason-lspconfig.nvim
- mason.nvim
- mini.ai
- mini.comment
- mini.hipatterns
- mini.icons
- mini.pairs
- noice.nvim
- nui.nvim
- nvim-lint
- nvim-lspconfig
- nvim-treesitter
- nvim-treesitter-textobjects
- nvim-ts-autotag
- nvim-web-devicons
- persistence.nvim
- plenary.nvim
- todo-comments.nvim
- tokyo-dark.nvim
- trouble.nvim
- ts-comments.nvim
- vim-dadbod
- vim-dadbod-completion
- vim-visual-multi
- which-key.nvim
- yanky.nvim


Nota: Esta lista refleja los plugins cargados automáticamente por LazyVim. Los plugins añadidos o modificados están separados arriba.

## Plugins agregados con LazyExtras
### Integraciones: 
- Copilot
- blink 
- snacks
- Harpoon2
- neogen
- yanky

### Soporte de lenguajes: 
- Angular
- Astro
- Bash
- Python
- Rust
- SQL
- Tailwind
- Typescript
- Markdown
- Java
- Docker
- YAML

## Mason (LSP / DAP / Linters / Formatters)

Instalados automáticamente:

### LSP: 
* angular-language-server
* astro-language-server
* bash-language-server
* pyright
* lua-language-server
* tailwindcss-language-server
* markdownlint-cli2
* prisma-language-server
* yaml-language-server

### Linters: 
* ruff 
* shellcheck
* sqlfluff
* biome
* pylint

### Formatters: 
* black
* stylua
* shfmt
* biome

### Debuggers: 
* codelldb
* neotest-python










