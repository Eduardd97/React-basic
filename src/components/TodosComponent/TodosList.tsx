import React, { FC, useContext, useEffect, useRef, useState } from "react";
import "./Todos.css";
import "./MobileTodos.css";
import { TodosProps, TodosType } from "../../types";
import { Button, Card, Form, InputGroup } from "react-bootstrap";
import { AppContext } from "../../contexts/AppContext";
import { useNavigate } from "react-router-dom";

export const TodosList: FC<TodosProps> = ({ todos }) => {
    const navigate = useNavigate();
    const [todoList, setTodoList] = useState<TodosType[]>(todos);

    const { searchTodo } = useContext(AppContext);

    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [searchByTitle, setSearchByTitle] = useState(false);
    const [searchByText, setSearchByText] = useState(false);
    const [foundTodo, setFoundTodo] = useState<TodosType | null>(null);

    const hideTodos = useRef<HTMLDivElement | null>(null);
    const hideTodo = useRef<HTMLDivElement | null>(null);

    const handleSearch = () => {
        if (searchTodo) {
            let todo: TodosType | null = null;

            if (searchByTitle && title) {
                todo = searchTodo(title, "");
                navigate(`/todos/${title.split(' ').join('-').toLowerCase()}`);
            } else if (searchByText && text) {
                todo = searchTodo("", text);
                navigate(`/todos/${text.split(' ').join('-').toLowerCase()}`);
            } else {
                // Если ни один чекбокс не выбран, выполняем поиск по обоим полям
                todo = searchTodo(title, text);
                navigate(`/todos/${title.split(' ').join('-').toLowerCase() || text.split(' ').join('-').toLowerCase()}`);
            }

            setFoundTodo(todo);

            if (hideTodos.current) hideTodos.current.style.display = "none";
        }
    };

    useEffect(() => {
        if (window.location.pathname === "/todos") {
            if (hideTodos.current) hideTodos.current.style.display = "grid";
            if (hideTodo.current) hideTodo.current.style.display = "none";
        }
    }, [navigate]);

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
        <div>
            <InputGroup className='search-user-input mb-3'>
                <InputGroup.Checkbox
                    checked={searchByTitle}
                    onChange={() => {
                        setSearchByTitle(!searchByTitle);
                        if (searchByText) setSearchByText(false);
                    }}
                    aria-label='Checkbox for searching by title'
                />
                <span className='input-title'>Title</span>
                <InputGroup.Checkbox
                    checked={searchByText}
                    onChange={() => {
                        setSearchByText(!searchByText);
                        if (searchByTitle) setSearchByTitle(false);
                    }}
                    aria-label='Checkbox for searching by text'
                />
                <span className='input-text'>Text</span>
                <Form.Control
                    placeholder="Enter the todo's title or text"
                    aria-label="Enter the todo's title or text"
                    aria-describedby='basic-addon2'
                    value={searchByTitle ? title : text}
                    onChange={(event) => {
                        if (searchByTitle) {
                            setTitle(event.target.value);
                        } else if (searchByText) {
                            setText(event.target.value);
                        } else {
                            // Устанавливаем оба значения, если ни один чекбокс не выбран
                            setTitle(event.target.value);
                            setText(event.target.value);
                        }
                    }}
                    // disabled={!searchByTitle && !searchByText}
                />
                <Button
                    variant='outline-secondary'
                    id='button-addon2'
                    onClick={handleSearch}
                >
                    Search
                </Button>
            </InputGroup>

            <div className='todos-list' ref={hideTodos}>
                {todoList.map((todo) => (
                    <div className='todo-card' key={todo.id}>
                        <Card border='danger'>
                            <Card.Header
                                className={
                                    todo.completed ? "title-completed" : "title"
                                }
                            >
                                <Card.Title>
                                    Todo title: {todo.title}
                                </Card.Title>
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
                                    onChange={() =>
                                        handleCheckboxChange(todo.id)
                                    }
                                ></InputGroup.Checkbox>
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </div>

            {foundTodo ? (
                <Card border='danger'>
                    <Card.Header
                        className={
                            foundTodo.completed ? "title-completed" : "title"
                        }
                        ref={hideTodo}
                    >
                        <Card.Title>Todo title: {foundTodo.title}</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <Card.Text>
                            Some quick example text to build on the card title
                            and make up the bulk of the card's content.
                        </Card.Text>
                        <InputGroup.Checkbox
                            type='checkbox'
                            id={`check-${foundTodo.id}`}
                            checked={foundTodo.completed}
                            onChange={() => handleCheckboxChange(foundTodo.id)}
                        ></InputGroup.Checkbox>
                    </Card.Body>
                </Card>
            ) : (
                (title || text) && (
                    <div>Todo not found for this title or text</div>
                )
            )}
        </div>
    );
};
