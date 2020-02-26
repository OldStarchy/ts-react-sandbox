## Steps taken to set this project up

### Init Git

```bash
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

### Add a basic html page for testing

An empty `index.html` and modify the `ts` to show some output on the page when loaded. Remember to rebuild after changing `main.ts` file.

### Start using React

A few changes here. Generally speaking, the script for a page should be named after the page, so `main.ts` has been renamed to `index.tsx`.
The Webpack config has been updated to allow `tsx` files. It also now provides a name for the entry point which was, confusingly, `main` by deafult. It was coincidental that the typescript file was also called `main.ts`.
The typescript config has also been updated to allow react.

A simple react component has been created called `App`. Its in the `index.tsx` file for now for simplicity, but if it gets larger, it should be moved to its own component.

As you're making changes to the typescript, you can run `webpack -w` to automatically rebuild on save.

### Add webpack dev server

Now we're doing a bit more development, it would be good to get this going.
In order for this to work fully though, we need to move `index.html` into our build process so `webpack-dev-server` can see it.

```bash
yarn add webpack-dev-server html-webpack-plugin
```

`index.html` has been moved into `src` and its script tag has been removed. the `html-webpack-plugin` will automatically add the script tags in for us.

A the html plugin has been added to the webpack configuration.

In addition to adding the dev server, we've also now got some scripts defined in `package.json` to start the server, run build, and run watch.
These can be executed by `yarn dev`, `yarn build`, and `yarn watch`, etc.

### Add the basic structure for our app

Its likely you've got some html already, or you might just find it to build out plain html from your designs before diving into react.

So, now we add the basics required for a simple TODO list with pagination; some html put directly in the `App` component, and some styles added to `index.html`.

Note a caveat with html in react, some keywords are reserved, so a few attributes have changed names, in this case we use `className` instead of `class` and `htmlFor` instead of `for`.

### Breaking it down into components (TodoItem)

Now we've got roughly what we want laid out, we should separate out the different parts of the html into their own components.

For starters, lets move the `.todo-item` to its own component.

Since we're operating in Typescript, we can explicitly declare the **properties** required by our component in the `TodoItemProps` interface.

The `TodoItem` component itself is then defined as a function that takes an instance of `TodoItemProps` and renders some html based on the properties it was given.

You may notice now though, that we can no longer check / uncheck the items. This is because we've now bound the `checked` property of the checkbox to the props passed to each item and react is going to try keep them in sync. We could instead use the `defaultChecked` property of the `<input>`, but instead of doing that, we'll leave it for now, as we're going handle the change events manually later on.

Important: Now that we're going to be importing typescript files, we need to let webpack know how to find them (as imports don't explicitly add the extension). The webpack config has been updated to search for typescript files in addition to javascript ones.
