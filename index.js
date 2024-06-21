// pages/index.js

import Head from 'next/head';
import { useState, useEffect } from 'react';
import CreatePostForm from '../components/CreatePostForm';
import PostTable from '../components/PostTable';
import styles from '../styles/Home.module.css';

export default function Home() {
    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Fetch users from an API
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(data => setUsers(data));

        // Load posts from local storage
        const savedPosts = JSON.parse(localStorage.getItem('posts')) || [];
        setPosts(savedPosts);
    }, []);

    const savePostsToLocalStorage = (posts) => {
        localStorage.setItem('posts', JSON.stringify(posts));
    };

    const addPost = (newPost) => {
        const updatedPosts = [...posts, { ...newPost, id: posts.length + 1 }];
        setPosts(updatedPosts);
        savePostsToLocalStorage(updatedPosts);
    };

    const deletePost = (id) => {
        const updatedPosts = posts.filter(post => post.id !== id);
        setPosts(updatedPosts);
        savePostsToLocalStorage(updatedPosts);
    };

    const updatePost = (updatedPost) => {
        const updatedPosts = posts.map(post => (post.id === updatedPost.id ? updatedPost : post));
        setPosts(updatedPosts);
        savePostsToLocalStorage(updatedPosts);
    };

    return (
        <div className={styles.container}>
            <Head>
                <title>My Blog App</title>
            </Head>
            <h1 className={styles.title}>My Blog App</h1>
            <CreatePostForm addPost={addPost} users={users} />
            <PostTable posts={posts} users={users} deletePost={deletePost} updatePost={updatePost} />
        </div>
    );
}
