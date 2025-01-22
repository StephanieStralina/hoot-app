import { useState, useEffect } from "react";
import * as postService from '../../services/postService';
import './PostListPage.css';
import PostItem from "../../components/PostItem/PostItem";

export default function PostListPage() {
    const [posts, setPosts] = useState([
        {
            content: 'Hello there',
            createdAt: '2025-01-22T05:34:01',
            user: {
                name: 'Kate', 
                email: 'Kate@email.com', 
                _id: 'a7832424'
            }
        },
        {
            content: 'Hiiiiii there',
            createdAt: '2025-01-21T08:24:22',
            user: {
                name: 'Cookie', 
                email: 'AndCream@email.com', 
                _id: 'a789afag'
            }
        },
    ]);

    useEffect(() => {
        async function fetchPosts(params) {
            const posts = await postService.index();
            setPosts(posts);
        }
        fetchPosts();
    }, []);

    const postItems = posts.map((p) => (
        <PostItem key={p._id} post={p} />
    ));

    return (
        <>
            <h1>Post List</h1>
            <section className="post-item-container">
                {postItems}
            </section>
        </>
    );
}