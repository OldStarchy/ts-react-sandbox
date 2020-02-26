import * as React from 'react';

interface TodoItemProps {
	id: string;
	label: string;
	checked: boolean;
}

const TodoItem = (props: TodoItemProps) => (
	<div className="todo-item">
		<input
			className="todo-item__checkbox"
			id={props.id}
			type="checkbox"
			checked={props.checked}
		/>
		<label className="todo-item__label" htmlFor={props.id}>
			{props.label}
		</label>
	</div>
);

export default TodoItem;
