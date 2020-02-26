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

### Basic configuration of Webpack

Create a webpack config, and tell it to use the `ts-loader` for typescript files.
Typescript also requires a config file, set it up to target "ES5" which is safe relatively for web development.

From now, running `webpack` will build the output `dist/main.js` file.
It may be a good idea to keep the dist files in the repository to prevent the need for a build step during automatic deployments, but for now they'll be ignored.
