import { FC } from "react";
import "./home.scss";
import { StoriesBar } from "../../components/StoriesBar/StoriesBar";
const Home: FC = () => {
  return (
    <div className="home">
      <StoriesBar />
    </div>
  );
};
export default Home;
