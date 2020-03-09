import * as React from 'react';
import './TodoItem.scss';

interface TodoItemProps {
	id: string;
	label: string;
	checked: boolean;
	disabled: boolean;
	onChange: JSX.IntrinsicElements['input']['onChange'];
}

const TodoItem = ({
	id,
	label,
	checked,
	disabled,
	onChange,
}: TodoItemProps) => (
	<div className="todo-item">
		<input
			className="todo-item__checkbox"
			id={id}
			type="checkbox"
			checked={checked}
			onChange={!disabled ? onChange : null}
			disabled={disabled}
		/>
		<label className="todo-item__label" htmlFor={id}>
			{label}
		</label>
	</div>
);

export default TodoItem;
