# OmniPro Injector

Extensão Chrome para injetar automaticamente o script de automação no painel VIPMax.

---

## 📁 Estrutura do Projeto

```
omni-pro-injector/
├── content/                   # Bundle final usado pela extensão
│   └── main.bundle.js
├── icons/                     # Ícones da extensão (16×16, 48×48, 128×128)
├── src/                       # Código-fonte modularizado
│   ├── config.js
│   ├── main.js
│   ├── utils/
│   │   ├── clipboardService.js
│   │   └── domService.js
│   └── services/
│       ├── extractionService.js
│       └── tabHandlerService.js
├── .gitignore
├── .prettierrc                # Configuração do Prettier
├── eslint.config.mjs         # Configuração do ESLint
├── manifest.json              # Chrome Extension Manifest v3
├── package.json
└── README.md
```

---

## 🚀 Instalação e Build

1. **Clonar**  
   ```bash
   git clone https://github.com/DevDeividMoura/omni-pro-injector.git
   cd omni-pro-injector
   ```

2. **Dependências**  
   ```bash
   npm install
   ```

3. **Gerar bundle**  
   ```bash
   npm run build
   ```
   > O bundle será produzido em `content/main.bundle.js`.

---

## 🔧 Desenvolvimento

- **Lint**  
  ```bash
  npm run lint
  ```
- **Format**  
  ```bash
  npm run format
  ```
- **Watch (opcional)**  
  Se configurar um watch no `package.json`:
  ```bash
  npm run watch
  ```

---

## 📦 Uso no Chrome

1. Abra `chrome://extensions/`
2. Ative **Modo de desenvolvedor**
3. Clique em **“Carregar sem compactação”**
4. Selecione a pasta raiz do projeto

A extensão será injetada automaticamente em qualquer página em `https://vipmax.matrixdobrasil.ai/Painel/*`.

---

## 🤝 Contribuições

1. Fork este repositório.
2. Crie uma branch feature:  
   ```bash
   git checkout -b feature/nome-da-feature
   ```
3. Faça suas alterações e **commit**:  
   ```bash
   git commit -m "feat: descrição breve"
   ```
4. Abra um **Pull Request**.

---

## 📄 Licença

MIT © Deivid Moura
