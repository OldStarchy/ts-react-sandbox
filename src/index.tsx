import * as React from 'react';
import * as ReactDOM from 'react-dom';

const App = () => <h1>This is my react app</h1>;

const rootDiv = document.getElementById('react-root');

if (rootDiv === undefined) {
	throw new Error('Missing react-root div');
}

ReactDOM.render(<App />, rootDiv);
