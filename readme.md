## Steps taken to set this project up

### Init Git

```
git init
git add -A
git commit -m "Initial commit with readme"
```

### Install Dependencies

```bash
yarn init --yes --private
yarn add webpack webpack-cli
yarn add typescript ts-loader
yarn add react @types/react react-dom @types/react-dom
```

Add gitignore for `node_modules`

### Add a test src file and a prettier config

Create `src/main.ts`
Create `.prettierrc`
