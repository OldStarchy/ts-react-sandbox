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
	page: number;
}

export default class TodoList extends React.Component<
	TodoListProps,
	TodoListState
> {
	//Initialize the state based on the props
	state = {
		items: this.props.initialItems.map(item => ({ ...item })),
		page: 1,
	};

	// Convert the title into something we can use in an ID attribute
	id = this.props.title.replace(/[^a-zA-Z0-9]+/g, '-');
	pageSize = 7;

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

	switchToPage(page: number) {
		this.setState({
			...this.state,
			page,
		});
	}

	render() {
		const { title } = this.props;
		const { items, page } = this.state;

		const uncheckedItemCount = items.filter(item => !item.checked).length;
		const s = uncheckedItemCount === 1 ? '' : 's';

		const pageCount = Math.ceil(items.length / this.pageSize);
		const thisPageItems = items.slice(
			(page - 1) * this.pageSize,
			page * this.pageSize
		);

		return (
			<div className="todo-list">
				<p className="todo-list__title">
					{title} ({uncheckedItemCount} item{s})
				</p>
				<ul className="todo-list__items">
					{thisPageItems.map((item, index) => (
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
					<Pagination
						page={page}
						pageCount={pageCount}
						onSwitchPage={p => this.switchToPage(p)}
					/>
				</div>
			</div>
		);
	}
}
