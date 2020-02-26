import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App, { AppProps } from './components/App';

const rootDiv = document.getElementById('react-root');

if (rootDiv === undefined) {
	throw new Error('Missing react-root div');
}

const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
const randomString = () => {
	const length = 4 + Math.random() * 5;

	const chars = [];
	for (let i = 0; i < length; i++) {
		chars.push(letters[Math.floor(Math.random() * letters.length)]);
	}

	return chars.join('');
};

// Randomly generate some items
const itemCount = 30;
const items = [];
for (let i = 0; i < itemCount; i++) {
	items.push({
		label: randomString(),
		checked: false,
	});
}

const appProps: AppProps = {
	title: 'My React App',
	todoList: {
		title: 'My Todo List',
		initialItems: items,
	},
};

ReactDOM.render(<App {...appProps} />, rootDiv);
