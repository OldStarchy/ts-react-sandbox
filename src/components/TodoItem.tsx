import * as React from 'react';

interface TodoItemProps {
	id: string;
	label: string;
	checked: boolean;
	onChange: JSX.IntrinsicElements['input']['onChange'];
}

const TodoItem = ({ id, label, checked, onChange }: TodoItemProps) => (
	<div className="todo-item">
		<input
			className="todo-item__checkbox"
			id={id}
			type="checkbox"
			checked={checked}
			onChange={onChange}
		/>
		<label className="todo-item__label" htmlFor={id}>
			{label}
		</label>
	</div>
);

export default TodoItem;
