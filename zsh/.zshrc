# If you come from bash you might have to change your $PATH.
# export PATH=$HOME/bin:/usr/local/bin:$PATH

export ZSH="$HOME/.oh-my-zsh"

ZSH_THEME="lambda"

plugins=( 
    git
    archlinux
    zsh-autosuggestions
    zsh-syntax-highlighting
)



source $ZSH/oh-my-zsh.sh


# Check archlinux plugin commands here
# https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins/archlinux


# Display Pokemon-colorscripts
# Project page: https://gitlab.com/phoneybadger/pokemon-colorscripts#on-other-distros-and-macos



### From this line is for pywal-colors
# Import colorscheme from 'wal' asynchronously
# &   # Run the process in the background.
# ( ) # Hide shell job control messages.
# Not supported in the "fish" shell.
#(cat ~/.cache/wal/sequences &)

# Alternative (blocks terminal for 0-3ms)
#cat ~/.cache/wal/sequences

# To add support for TTYs this line can be optionally added.
#source ~/.cache/wal/colors-tty.sh

# My alias 
alias ff='fastfetch'
alias cty='tty-clock -S -c -C 6 -t -n -D'
alias n='nvim'
alias cd..='cd ..'
alias gc='git clone '
alias ga='git add .'
alias gcm='git commit -m '
alias gp='git push -u orign main'
alias gs='git status'
alias ll-'ls -Alh'
alias ls='lsd --group-dirs first'
alias cat='bat'
alias gc='g++ -o o'
alias py='python3'
alias py='python3'
alias cp='rsync -avhW --no-compress --progress '
alias code='code --ozone-platform=x11'
alias kiro='kiro --ozone-platform=x11'
alias y='yazi'
alias lg='lazygit'
alias nivm='nvim'
alias cd='z'
alias ls='lsd'
alias l='ls -l'
alias la='ls -a'
alias lla='ls -la'
alias lt='ls --tree'
alias icat='kitten icat'
alias dcub='docker compose up --build -d'
alias dcu='docker compose up -d'
alias dcl='docker compose logs'
alias dce='docker compose exec'
alias dcs='docker compose stop'
alias dcdv='docker compose down -v'
alias dcd='docker compose down'
alias oc='opencode'

# Set-up FZF key bindings (CTRL R for fuzzy history finder)
source <(fzf --zsh)

HISTFILE=~/.zsh_history
HISTSIZE=10000
SAVEHIST=10000
setopt appendhistory

export LANG=es_AR.UTF-8
export LC_ALL=es_AR.UTF-8
export LC_TIME=es_AR.UTF-8
export EDITOR=nvim

[[ "$TERM_PROGRAM" == "kiro" ]] && . "$(kiro --locate-shell-integration-path zsh)"
eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"

eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"
# exports
eval "$(zoxide init zsh)"
eval "$(atuin init zsh)"
eval "$(starship init zsh)"

export XDG_CONFIG_DIR=~/.config



# Cambiar color del prompt al color blanco brillante (por ejemplo)
# El código ANSI para bright white es \e[97m o \033[97m

# PROMPT='%F{15}%n@%m %1~ %# %f'  
# %F{15} = usa el color 15 (bright white)
# %f = resetear color al final


export PATH=$PATH:/usr/local/go/bin

