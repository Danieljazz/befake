import "./rightbar.scss";
import UserSuggestions from "../UserSuggestions/UserSuggestions";
import LatestActivities from "../LatestActivities/LatestActivities";
import OnlineFriends from "../OnlineFriends/OnlineFriends";
const Rightbar = () => {
  return (
    <div className="rightbar">
      <div className="container">
        <UserSuggestions />
        <LatestActivities />
        <OnlineFriends />
      </div>
    </div>
  );
};
export default Rightbar;
