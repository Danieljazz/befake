import "./leftbar.scss";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import Diversity3OutlinedIcon from "@mui/icons-material/Diversity3Outlined";
import Groups2OutlinedIcon from "@mui/icons-material/Groups2Outlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import OndemandVideoOutlinedIcon from "@mui/icons-material/OndemandVideoOutlined";
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
import EventAvailableOutlinedIcon from "@mui/icons-material/EventAvailableOutlined";
import SportsEsportsOutlinedIcon from "@mui/icons-material/SportsEsportsOutlined";
import CollectionsOutlinedIcon from "@mui/icons-material/CollectionsOutlined";
import PersonalVideoOutlinedIcon from "@mui/icons-material/PersonalVideoOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import AccountTreeOutlinedIcon from "@mui/icons-material/AccountTreeOutlined";
import GolfCourseOutlinedIcon from "@mui/icons-material/GolfCourseOutlined";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { Link } from "react-router-dom";
const Leftbar = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="leftbar">
      <ul>
        <li>
          <Link to={`/profile/${user.id}`} style={{ textDecoration: "none" }}>
            <AccountCircleOutlinedIcon sx={{ fontSize: "2rem" }} />
            <span>{`${user.name} ${user.surname}`}</span>
          </Link>
        </li>
        <li>
          <Diversity3OutlinedIcon sx={{ fontSize: "2rem" }} />
          <span>Friends</span>
        </li>
        <li>
          <Groups2OutlinedIcon sx={{ fontSize: "2rem" }} />
          <span>Groups</span>
        </li>
        <li>
          <StorefrontOutlinedIcon sx={{ fontSize: "2rem" }} />
          <span>Marketplace</span>
        </li>
        <li>
          <OndemandVideoOutlinedIcon sx={{ fontSize: "2rem" }} />
          <span>Watch</span>
        </li>
        <li>
          <TimerOutlinedIcon sx={{ fontSize: "2rem" }} />
          <span>Memories </span>
        </li>
        <div className="section-divider">
          <span>Your shortcuts</span>
        </div>
        <li>
          <EventAvailableOutlinedIcon sx={{ fontSize: "2rem" }} />
          <span>Events</span>
        </li>
        <li>
          <SportsEsportsOutlinedIcon sx={{ fontSize: "2rem" }} />
          <span>Gaming</span>
        </li>
        <li>
          <CollectionsOutlinedIcon sx={{ fontSize: "2rem" }} />
          <span>Gallery</span>
        </li>
        <li>
          <PersonalVideoOutlinedIcon sx={{ fontSize: "2rem" }} />
          <span>Videos</span>
        </li>
        <li>
          <EmailOutlinedIcon sx={{ fontSize: "2rem" }} />
          <span>Messages</span>
        </li>
        <div className="section-divider">
          <span>Other</span>
        </div>
        <li>
          <LocalMallOutlinedIcon sx={{ fontSize: "2rem" }} />
          <span>Fundraiser</span>
        </li>
        <li>
          <AccountTreeOutlinedIcon sx={{ fontSize: "2rem" }} />
          <span>Tutorials</span>
        </li>
        <li>
          <GolfCourseOutlinedIcon sx={{ fontSize: "2rem" }} />
          <span>Courses</span>
        </li>
      </ul>
    </div>
  );
};

export default Leftbar;
