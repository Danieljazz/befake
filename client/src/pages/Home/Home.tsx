import { FC, useContext } from "react";
import "./home.scss";
import { StoriesBar } from "../../components/StoriesBar/StoriesBar";
import { Posts } from "../../components/Posts/Posts";
import { AuthContext } from "../../context/authContext";
const Home: FC = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="home">
      <StoriesBar />
      <Posts userId={user.id} />
    </div>
  );
};
export default Home;
