import { createContext, useReducer } from 'react';
import githubReducer from './GithubReducer';

const GithubContext = createContext();

export const GithubProvider = ({ children }) => {
    const initialState = {
        users: [],
        loading: false,
    };

    const [state, dispatch] = useReducer(githubReducer, initialState);

    const searchUsers = async (text) => {
        setLoading();

        const params = new URLSearchParams({
            q: text,
        });

        const res = await fetch(
            `${process.env.REACT_APP_GITHUB_URL}/search/users?${params}`,
            {
                //   headers: {
                //     Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
                //   },
            }
        );
        const { items } = await res.json();
        dispatch({
            type: 'GET_USERS',
            payload: items,
        });
    };

    const resetSearch = () => dispatch({ type: 'RESET_SEARCH' });

    const setLoading = () => dispatch({ type: 'SET_LOADING' });

    return (
        <GithubContext.Provider
            value={{
                users: state.users,
                loading: state.loading,
                searchUsers,
                resetSearch,
            }}
        >
            {children}
        </GithubContext.Provider>
    );
};

export default GithubContext;
