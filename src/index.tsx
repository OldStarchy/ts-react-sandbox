import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App, { AppProps } from './components/App';

const rootDiv = document.getElementById('react-root');

if (rootDiv === undefined) {
	throw new Error('Missing react-root div');
}

const appProps: AppProps = {
	title: 'My React App',
	todoList: {
		title: 'My Todo List',
		initialItems: [
			{
				label: 'First Item',
				checked: false,
			},
			{
				label: 'Second Item',
				checked: false,
			},
			{
				label: 'Third Item',
				checked: true,
			},
		],
	},
};

ReactDOM.render(<App {...appProps} />, rootDiv);
