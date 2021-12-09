import { useEffect, useState } from 'react';

const UserResults = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const res = await fetch(`${process.env.REACT_APP_GITHUB_URL}/users`, {
            headers: {
                Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
            },
        });
        const data = await res.json();
        setUsers(data);
        setLoading(false);
    };

    return loading ? (
        <div>Loading...</div>
    ) : (
        <div className='grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-8'>
            {users.map((user) => (
                <p key={user.id}>{user.login}</p>
            ))}
        </div>
    );
};

export default UserResults;
