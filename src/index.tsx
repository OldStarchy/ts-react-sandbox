import * as React from 'react';
import * as ReactDOM from 'react-dom';
import TodoItem from './components/TodoItem';

const App = () => (
	<div className="app">
		<h1>This is my react app</h1>
		<div className="todo-list">
			<p className="todo-list__title">My Todo List</p>
			<ul className="todo-list__items">
				<li className="todo-list__item">
					<TodoItem id={0} label="First Item" checked={false} />
				</li>
				<li className="todo-list__item">
					<TodoItem id={1} label="Second Item" checked={false} />
				</li>
				<li className="todo-list__item">
					<TodoItem id={2} label="Third Item" checked={true} />
				</li>
			</ul>
			<div className="todo-list__pagination">
				<div className="pagination">
					<button className="pagination__btn-previous" type="button">
						Previous
					</button>
					<p className="pagination__page">1</p>
					<button className="pagination__btn-next" type="button">
						Next
					</button>
				</div>
			</div>
		</div>
	</div>
);

const rootDiv = document.getElementById('react-root');

if (rootDiv === undefined) {
	throw new Error('Missing react-root div');
}

ReactDOM.render(<App />, rootDiv);
