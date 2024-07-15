import React, { useEffect, useState } from "react";
import { PostsType, PostVariationsType } from "../../types";
import { postApi } from "../../axios";
import { Nav } from "react-bootstrap";
import { PostsList } from "./PostsList";
import { posts } from "../../const";

export const Posts = () => {
    const [postsType, setPostsType] = useState<PostVariationsType>("server");
    const postTypes: PostVariationsType[] = ["local", "server"];

    const [serverPosts, setServerPosts] = useState<PostsType[]>([]);

    const changepostsType = (postType: PostVariationsType) => {
        setPostsType(postType);
        console.log(serverPosts.slice(0, 50));
    };

    useEffect(() => {
        postApi.get("/posts").then(({ data }) => setServerPosts(data));
    }, []);

    return (
        <div className='todos'>
            {" "}
            <div className='todos-variation-tabs'>
                {postTypes.map((type) => (
                    <Nav variant='tabs'>
                        <Nav.Item>
                            <Nav.Link
                                className={
                                    type === postsType ? "active-tab" : "tab"
                                }
                                onClick={() => changepostsType(type)}
                            >
                                {type.toUpperCase()}
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                ))}
            </div>
            <PostsList
                posts={postsType === "local" ? posts : serverPosts.slice(0, 50)}
            />
        </div>
    );
};
