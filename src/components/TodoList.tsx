import * as React from 'react';
import TodoItem from './TodoItem';
import Pagination from './Pagination';

export interface TodoListProps {
	title: string;
	initialItems: {
		label: string;
		checked: boolean;
	}[];
}

export interface TodoListState {
	items: {
		label: string;
		checked: boolean;
	}[];
}

export default class TodoList extends React.Component<
	TodoListProps,
	TodoListState
> {
	//Initialize the state based on the props
	state = {
		items: this.props.initialItems.map(item => ({ ...item })),
	};

	// Convert the title into something we can use in an ID attribute
	id = this.props.title.replace(/[^a-zA-Z0-9]+/g, '-');

	render() {
		const { title } = this.props;
		const { items } = this.state;

		return (
			<div className="todo-list">
				<p className="todo-list__title">{title}</p>
				<ul className="todo-list__items">
					{items.map((item, index) => (
						<li className="todo-list__item">
							<TodoItem
								id={`${this.id}__Item-${index}`}
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
	}
}
