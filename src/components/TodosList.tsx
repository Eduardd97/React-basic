import React, { FC, useEffect, useState } from "react";
import { TodosProps, TodosType } from "../types";

export const TodosList: FC<TodosProps> = ({ todos }) => {
    const [todoList, setTodoList] = useState<TodosType[]>(todos);

    useEffect(() => {
        setTodoList(todos);
    }, [todos]);

    const handleCheckboxChange = (id: number) => {
        const updatedTodos = todoList.map(todo => 
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        );
        setTodoList(updatedTodos);
    };

    return (
        <div>
            {todoList.map((todo) => (
                <div key={todo.id}>
                    <h1 className={todo.completed ? 'title-completed' : 'title'}>Todo title: {todo.title}</h1>
                    <input
                        type="checkbox"
                        id={`check-${todo.id}`}
                        checked={todo.completed}
                        onChange={() => handleCheckboxChange(todo.id)}
                    />
                    <label htmlFor={`check-${todo.id}`}>Todo completed</label>
                </div>
            ))}
        </div>
    );
};
