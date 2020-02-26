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

	toggleItem(label: string) {
		let changed = false;

		const newTodoList = this.state.items.map(item => {
			if (item.label === label) {
				changed = true;
				return {
					label: item.label,
					checked: !item.checked,
				};
			} else {
				return item;
			}
		});

		if (changed) {
			this.setState({
				items: [...newTodoList],
			});
		}
	}

	render() {
		const { title } = this.props;
		const { items } = this.state;

		const uncheckedItemCount = items.filter(item => !item.checked).length;
		const s = uncheckedItemCount === 1 ? '' : 's';

		return (
			<div className="todo-list">
				<p className="todo-list__title">
					{title} ({uncheckedItemCount} item{s})
				</p>
				<ul className="todo-list__items">
					{items.map((item, index) => (
						<li className="todo-list__item">
							<TodoItem
								id={`${this.id}__Item-${index}`}
								label={item.label}
								checked={item.checked}
								onChange={() => this.toggleItem(item.label)}
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
