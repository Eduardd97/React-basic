import React, { useEffect, useState } from "react";
import { TodoVariationsType, TodosType } from "../../types";
import { todosApi } from "../../axios";
import { TodosList } from "./TodosList";
import { todos } from "../../const";
import './Todos.css'
import { Nav } from "react-bootstrap";

export const Todos = () => {
    const [todosType, setTodosType] = useState<TodoVariationsType>("server");
    const todoTypes: TodoVariationsType[] = ["local", "server"];

    const [serverTodos, setServerTodos] = useState<TodosType[]>([]);

    const changeTodosType = (todoType: TodoVariationsType) => {
        setTodosType(todoType);
        console.log(serverTodos.slice(0, 50));
    };

    useEffect(() => {
        todosApi.get("/todos").then(({ data }) => setServerTodos(data));
    }, []);

    return (
        <div className="todos">
            {" "}
            <div className="todos-variation-tabs">
                {todoTypes.map((type) => (
                    <Nav variant='tabs'>
                        <Nav.Item>
                            <Nav.Link className={type === todosType ? "active-tab" : "tab"} onClick={() => changeTodosType(type)}>
                                {type.toUpperCase()}
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                ))}
            </div>

            <TodosList
                todos={todosType === "local" ? todos : serverTodos.slice(0, 50)}
            />
        </div>
    );
};
