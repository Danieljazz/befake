import { FC } from "react";
import "./home.scss";
import { StoriesBar } from "../../components/StoriesBar/StoriesBar";
import { Posts } from "../../components/Posts/Posts";
const Home: FC = () => {
  return (
    <div className="home">
      <StoriesBar />
      <Posts />
    </div>
  );
};
export default Home;
