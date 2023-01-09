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
const Leftbar = () => {
  return (
    <div className="leftbar">
      <div className="container">
        <div className="item">
          <AccountCircleOutlinedIcon />
          <span>John Doe</span>
        </div>
        <div className="item">
          <Diversity3OutlinedIcon />
          <span>Friends</span>
        </div>
        <div className="item">
          <Groups2OutlinedIcon />
          <span>Groups</span>
        </div>
        <div className="item">
          <StorefrontOutlinedIcon />
          <span>Marketplace</span>
        </div>
        <div className="item">
          <OndemandVideoOutlinedIcon />
          <span>Watch</span>
        </div>
        <div className="item">
          <TimerOutlinedIcon />
          <span>Memories </span>
        </div>
        <hr />
        <div className="section-divider">
          <span>Your shortcuts</span>
        </div>
        <div className="item">
          <EventAvailableOutlinedIcon />
          <span>Events</span>
        </div>
        <div className="item">
          <SportsEsportsOutlinedIcon />
          <span>Gaming</span>
        </div>
        <div className="item">
          <CollectionsOutlinedIcon />
          <span>Gallery</span>
        </div>
        <div className="item">
          <PersonalVideoOutlinedIcon />
          <span>Videos</span>
        </div>
        <div className="item">
          <EmailOutlinedIcon />
          <span>Messages</span>
        </div>
        <div className="section-divider">
          <span>Other</span>
        </div>
        <div className="item">
          <LocalMallOutlinedIcon />
          <span>Fundraiser</span>
        </div>
        <div className="item">
          <AccountTreeOutlinedIcon />
          <span>Tutorials</span>
        </div>
        <div className="item">
          <GolfCourseOutlinedIcon />
          <span>Courses</span>
        </div>
      </div>
    </div>
  );
};

export default Leftbar;
