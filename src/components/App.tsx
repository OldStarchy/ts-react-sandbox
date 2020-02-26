import * as React from 'react';
import TodoList, { TodoListProps } from './TodoList';

export interface AppProps {
	title: string;
	todoList: TodoListProps;
}

const App = ({ title, todoList }: AppProps) => (
	<div className="app">
		<h1>{title}</h1>
		<TodoList {...todoList} />
	</div>
);

export default App;
