// components/CreatePostForm.js

import { useState } from 'react';
import styles from '../styles/Home.module.css';

const CreatePostForm = ({ addPost, users }) => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [userId, setUserId] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title && body && userId) {
            addPost({ title, body, userId: parseInt(userId) });
            setTitle('');
            setBody('');
            setUserId('');
        } else {
            alert('Please fill out all fields');
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                required
            />
            <select
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                required
            >
                <option value="">Select User</option>
                {users.map(user => (
                    <option key={user.id} value={user.id}>
                        {user.name}
                    </option>
                ))}
            </select>
            <button type="submit">Create Post</button>
        </form>
    );
};

export default CreatePostForm;
