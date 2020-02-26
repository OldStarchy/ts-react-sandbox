import * as React from 'react';
import TodoItem from './TodoItem';
import Pagination from './Pagination';

export interface TodoListProps {
	title: string;
	items: {
		label: string;
		checked: boolean;
	}[];
}

const TodoList = (props: TodoListProps) => {
	// Convert the title into something we can use in an ID attribute
	const id = props.title.replace(/[^a-zA-Z0-9]+/g, '-');

	return (
		<div className="todo-list">
			<p className="todo-list__title">{props.title}</p>
			<ul className="todo-list__items">
				{props.items.map((item, index) => (
					<li className="todo-list__item">
						<TodoItem
							id={`${id}__Item-${index}`}
							label={item.label}
							checked={item.checked}
						/>
					</li>
				))}
			</ul>
			<div className="todo-list__pagination">
				<Pagination page={1} />
			</div>
		</div>
	);
};

export default TodoList;
