import React, { FC, useContext, useEffect, useMemo, useRef, useState } from "react";
import { PostsProps, PostsType } from "../../types";
import { Button, Card, Form, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../contexts/AppContext";

export const PostsList: FC<PostsProps> = ({ posts }) => {
    const navigate = useNavigate();
    const [postsList, setPostsList] = useState<PostsType[]>(posts);
    postsList.map(post => console.log(post.body))

    const { searchPost } = useContext(AppContext);

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [searchByTitle, setSearchByTitle] = useState(false);
    const [searchByBody, setSearchByBody] = useState(false);
    // const [foundPost, setFoundPost] = useState<PostsType | null>(null);
    const [searchCriteria, setSearchCriteria] = useState({ title: "", body: "" })

    const hidePosts = useRef<HTMLDivElement | null>(null);
    const hidePost = useRef<HTMLDivElement | null>(null);

    const handleSearch = () => {
        if (searchPost) {
            let post = { title: "", body: "" };

            if (searchByTitle && title) {
                post.title = title;
                navigate(`/posts/${title.split(" ").join("-").toLowerCase()}`);
            } else if (searchByBody && body) {
                post.body = body;
                navigate(`/posts/${body.split(" ").join("-").toLowerCase()}`);
            } else {
                // Если ни один чекбокс не выбран, выполняем поиск по обоим полям
                post = {title, body};
                navigate(
                    `/posts/${
                        title.split(" ").join("-").toLowerCase() ||
                        body.split(" ").join("-").toLowerCase()
                    }`
                );
            }

            // setFoundPost(post);
            setSearchCriteria(post)

            if (hidePosts.current) hidePosts.current.style.display = "none";
        }
    };

    useEffect(() => {
        if (window.location.pathname === "/posts") {
            if (hidePosts.current) hidePosts.current.style.display = "grid";
            if (hidePost.current) hidePost.current.style.display = "none";
        }
    }, [navigate]);

    useEffect(() => {
        setPostsList(posts);
    }, [posts]);

    const foundPost = useMemo(() => {
        if (searchPost) {
            return searchPost(searchCriteria.title, searchCriteria.body);
        }
        return null;
    }, [searchPost, searchCriteria]);

    return (
        <div>
            <InputGroup className='search-user-input mb-3'>
                <InputGroup.Checkbox
                    checked={searchByTitle}
                    onChange={() => {
                        setSearchByTitle(!searchByTitle);
                        if (searchByBody) setSearchByBody(false);
                    }}
                    aria-label='Checkbox for searching by title'
                />
                <span className='input-title'>Title</span>
                <InputGroup.Checkbox
                    checked={searchByBody}
                    onChange={() => {
                        setSearchByBody(!searchByBody);
                        if (searchByTitle) setSearchByTitle(false);
                    }}
                    aria-label='Checkbox for searching by text'
                />
                <span className='input-text'>Text</span>
                <Form.Control
                    placeholder="Enter the todo's title or text"
                    aria-label="Enter the todo's title or text"
                    aria-describedby='basic-addon2'
                    value={searchByTitle ? title : body}
                    onChange={(event) => {
                        if (searchByTitle) {
                            setTitle(event.target.value);
                        } else if (searchByBody) {
                            setBody(event.target.value);
                        } else {
                            // Устанавливаем оба значения, если ни один чекбокс не выбран
                            setTitle(event.target.value);
                            setBody(event.target.value);
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

            <div className='posts-list' ref={hidePosts}>
                {postsList.map((post) => (
                    <div className='post-card' key={post.id}>
                        <Card border='danger'>
                            <Card.Header
                                className={
                                    "body-post-text"
                                }
                            >
                                <Card.Title>
                                    Post title: {post.title}
                                </Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    Post text: {post.body}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </div>

            {foundPost ? (
                <Card border='danger'>
                    <Card.Header
                        className={
                            "body-post-text"
                        }
                        ref={hidePost}
                    >
                        <Card.Title>Post title: {foundPost.title}</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <Card.Text>
                            Post text: {foundPost.body}
                        </Card.Text>
                    </Card.Body>
                </Card>
            ) : (
                (title || body) && (
                    <div>Post not found for this title or text</div>
                )
            )}
        </div>
    );
};
