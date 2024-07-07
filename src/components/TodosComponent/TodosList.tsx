import React, { FC, useEffect, useState } from "react";
import "./Todos.css";
import { TodosProps, TodosType } from "../../types";
import { Card, InputGroup } from "react-bootstrap";

export const TodosList: FC<TodosProps> = ({ todos }) => {
    const [todoList, setTodoList] = useState<TodosType[]>(todos);

    useEffect(() => {
        setTodoList(todos);
    }, [todos]);

    const handleCheckboxChange = (id: number) => {
        const updatedTodos = todoList.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        );
        setTodoList(updatedTodos);
    };

    return (
        <div className="todos-list">
            {todoList.map((todo) => (
                <div className="todo-card" key={todo.id}>
                    <Card border='danger'>
                        <Card.Header
                            className={
                                todo.completed ? "title-completed" : "title"
                            }
                        >
                            <Card.Title>Todo title: {todo.title}</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Card.Text>
                                Some quick example text to build on the card
                                title and make up the bulk of the card's
                                content.
                            </Card.Text>
                            <InputGroup.Checkbox
                                type='checkbox'
                                id={`check-${todo.id}`}
                                checked={todo.completed}
                                onChange={() => handleCheckboxChange(todo.id)}
                            ></InputGroup.Checkbox>
                        </Card.Body>
                    </Card>
                </div>
            ))}
        </div>
    );
};
