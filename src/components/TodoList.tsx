import * as React from 'react';
import TodoItem from './TodoItem';
import Pagination from './Pagination';
import ItemService from '../ItemService';

export interface TodoListProps {
	title: string;
	itemService: ItemService;
}

export interface TodoListState {
	items: {
		label: string;
		checked: boolean;
	}[];
	itemsLoading: {
		[item: string]: boolean;
	};
	page: number;
	pageCount: number;
	loading: boolean;
	uncheckedItemCount: number;
}

export default class TodoList extends React.Component<
	TodoListProps,
	TodoListState
> {
	//Initialize the state based on the props
	state = {
		items: [],
		itemsLoading: {},
		page: 1,
		pageCount: 1,
		loading: true,
		uncheckedItemCount: 0,
	};

	// Convert the title into something we can use in an ID attribute
	id = this.props.title.replace(/[^a-zA-Z0-9]+/g, '-');
	pageSize = 7;

	toggleItem(label: string) {
		// Set the loading state
		this.setState({
			...this.state,
			itemsLoading: {
				...this.state.itemsLoading,
				[label]: true,
			},
		});

		// Run the ajax request
		this.props.itemService
			.toggleItem(label)
			.then(result => {
				if (result.success) {
					// Update the local state with the results of the ajax request
					this.setState({
						...this.state,

						// Toggle any checkboxes locally rather than doing a full refresh
						items: this.state.items.map(item => {
							if (item.label === label) {
								return {
									label: item.label,
									checked: !item.checked,
								};
							} else {
								return item;
							}
						}),

						// Update the unchecked item count based on weather or not this item is now checked
						uncheckedItemCount:
							this.state.uncheckedItemCount +
							(result.checked ? -1 : 1),

						// Clear the loading status of the item
						itemsLoading: {
							...this.state.itemsLoading,
							[label]: false,
						},
					});
				} else {
					throw new Error('Ajax request failed');
				}
			})
			.catch(e => {
				console.error(e);
				this.setState({
					...this.state,

					// Clear the loading status of the item
					itemsLoading: {
						...this.state.itemsLoading,
						[label]: false,
					},
				});
			});
	}

	switchToPage(page: number) {
		// Set the loading status
		this.setState({
			...this.state,
			loading: true,
		});

		this.props.itemService.getItemsByPage(page, this.pageSize).then(
			data => {
				this.setState({
					...this.state,
					items: data.items,
					pageCount: data.pageCount,
					page: page,
					uncheckedItemCount: data.uncheckedItems,

					// Clear the loading status
					loading: false,
					itemsLoading: {},
				});
			},
			e => {
				console.error(e);

				this.setState({
					...this.state,
					// Clear the loading status
					loading: false,
					itemsLoading: {},
				});
			}
		);
	}

	componentDidMount() {
		this.refresh();
	}

	refresh() {
		this.switchToPage(this.state.page);
	}

	render() {
		const { title } = this.props;
		const {
			loading,
			items,
			page,
			pageCount,
			uncheckedItemCount,
			itemsLoading,
		} = this.state;

		const s = uncheckedItemCount === 1 ? '' : 's';

		return (
			<div className="todo-list">
				<p className="todo-list__title">
					{title}{' '}
					{loading ? (
						<>(loading)</>
					) : (
						<>
							({uncheckedItemCount} item{s})
						</>
					)}
				</p>
				<ul className="todo-list__items">
					{items.map((item, index) => (
						<li className="todo-list__item" key={index}>
							<TodoItem
								id={`${this.id}__Item-${index}`}
								label={item.label}
								checked={item.checked}
								disabled={loading || itemsLoading[item.label]}
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
