import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App, { AppProps } from './components/App';
import ItemService from './ItemService';

const rootDiv = document.getElementById('ReactRoot');

if (rootDiv === undefined) {
	throw new Error('Missing react-root div');
}

const itemService = new ItemService();

const appProps: AppProps = {
	title: 'My React App',
	todoList: {
		title: 'My Todo List',
		itemService,
	},
};

ReactDOM.render(<App {...appProps} />, rootDiv);
