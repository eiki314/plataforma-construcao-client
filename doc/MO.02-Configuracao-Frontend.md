# MO 02 - Configuração do Frontend

## Dependências

O projeto utiliza node, portanto o primeiro passo é realizar o [download](https://github.com/coreybutler/nvm-windows) do NVM e instalar o node v19.8.1.

```bash
$ nvm install 19.8.1
$ nvm use 19.8.1
```

Para o gerenciamento de dependências, é utilizado o yarn. Para instalar, utilize o corepack, que está incluso no download do node pelo nvm:

```bash
$ corepack enable
$ corepack prepare yarn@3.4.1 --activate
```

Então, instale as dependências do projeto com:
```bash
$ yarn
```

## Linter

O projeto está com o eslint configurado para gerar erro de build caso o estilo não seja seguido.

Para facilitar a formatação do código, é recomendado utilizar o VSCode com as extensões *Eslint* e *Prettier*, adicionando as seguintes linhas para a `settings.json` da IDE:

```json
"editor.defaultFormatter": "esbenp.prettier-vscode"
"[vue]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
},
"[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
},
"eslint.format.enable": true,
"eslint.validate": [
    "typescript",
    "typescriptreact",
    "vue",
    "html",
    "javascript"
],
"editor.codeActionsOnSave": {
    "source.fixAll": true
},
```

Assim, ao salvar o arquivo, o que for possível será corrigido automaticamente.
