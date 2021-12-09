import { createContext, useState } from 'react';

const GithubContext = createContext();

export const GithubProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchUsers = async () => {
        const res = await fetch(`${process.env.REACT_APP_GITHUB_URL}/users`, {
            headers: {
                Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
            },
        });
        const data = await res.json();
        setUsers(data);
        console.log(data);
        setLoading(false);
    };
    return (
        <GithubContext.Provider value={{ users, loading, fetchUsers }}>
            {children}
        </GithubContext.Provider>
    );
};

export default GithubContext;
