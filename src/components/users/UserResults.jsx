import { useContext } from "react";
import GithubContext from "../../context/github/GithubContext";
import Spinner from "../Layout/Spinner";
import UserItem from "./UserItem";

const UserResults = () => {
  const { users, loading } = useContext(GithubContext);

  return loading ? (
    <Spinner />
  ) : (
    <div className='grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-8'>
      {users.map((user) => (
        <UserItem key={user.id} user={user} />
      ))}
    </div>
  );
};

export default UserResults;
