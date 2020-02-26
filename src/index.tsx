import * as React from 'react';
import * as ReactDOM from 'react-dom';

const App = () => (
	<div className="app">
		<h1>This is my react app</h1>
		<div className="todo-list">
			<p className="todo-list__title">My Todo List</p>
			<ul className="todo-list__items">
				<li className="todo-list__item">
					<div className="todo-item">
						<input
							className="todo-item__checkbox"
							id="TodoItem-1"
							type="checkbox"
						/>
						<label
							className="todo-item__label"
							htmlFor="TodoItem-1"
						>
							First Item
						</label>
					</div>
				</li>
				<li className="todo-list__item">
					<div className="todo-item">
						<input
							className="todo-item__checkbox"
							id="TodoItem-2"
							type="checkbox"
						/>
						<label
							className="todo-item__label"
							htmlFor="TodoItem-2"
						>
							Second Item
						</label>
					</div>
				</li>
				<li className="todo-list__item">
					<div className="todo-item">
						<input
							className="todo-item__checkbox"
							id="TodoItem-3"
							type="checkbox"
							checked
						/>
						<label
							className="todo-item__label"
							htmlFor="TodoItem-3"
						>
							Third Item
						</label>
					</div>
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
