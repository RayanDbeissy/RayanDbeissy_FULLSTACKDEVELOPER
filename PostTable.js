// components/PostTable.js

import { useState } from 'react';
import styles from '../styles/Table.module.css';

const PostTable = ({ posts, users, deletePost, updatePost }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedUser, setSelectedUser] = useState('');
    const [editingPostId, setEditingPostId] = useState(null);
    const [editedPost, setEditedPost] = useState({});

    const filteredPosts = posts.filter(post => {
        const matchesUser = selectedUser ? post.userId === parseInt(selectedUser) : true;
        const matchesSearchTerm = post.title.includes(searchTerm) || post.body.includes(searchTerm);
        return matchesUser && matchesSearchTerm;
    });

    const startEditing = (post) => {
        setEditingPostId(post.id);
        setEditedPost(post);
    };

    const saveChanges = () => {
        updatePost(editedPost);
        setEditingPostId(null);
    };

    return (
        <div className={styles.tableContainer}>
            <div>
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
                    <option value="">All Users</option>
                    {users.map(user => (
                        <option key={user.id} value={user.id}>
                            {user.name}
                        </option>
                    ))}
                </select>
            </div>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Body</th>
                        <th>User</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredPosts.map(post => (
                        <tr key={post.id}>
                            <td>{post.id}</td>
                            <td>
                                {editingPostId === post.id ? (
                                    <input
                                        type="text"
                                        value={editedPost.title}
                                        onChange={(e) => setEditedPost({ ...editedPost, title: e.target.value })}
                                    />
                                ) : (
                                    post.title
                                )}
                            </td>
                            <td>
                                {editingPostId === post.id ? (
                                    <input
                                        type="text"
                                        value={editedPost.body}
                                        onChange={(e) => setEditedPost({ ...editedPost, body: e.target.value })}
                                    />
                                ) : (
                                    post.body
                                )}
                            </td>
                            <td>
                                {editingPostId === post.id ? (
                                    <select
                                        value={editedPost.userId}
                                        onChange={(e) => setEditedPost({ ...editedPost, userId: parseInt(e.target.value) })}
                                    >
                                        {users.map(user => (
                                            <option key={user.id} value={user.id}>
                                                {user.name}
                                            </option>
                                        ))}
                                    </select>
                                ) : (
                                    users.find(user => user.id === post.userId)?.name
                                )}
                            </td>
                            <td className={styles.actions}>
                                {editingPostId === post.id ? (
                                    <button className="edit" onClick={saveChanges}>Save</button>
                                ) : (
                                    <>
                                        <button className="edit" onClick={() => startEditing(post)}>Edit</button>
                                        <button className="delete" onClick={() => deletePost(post.id)}>Delete</button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PostTable;
