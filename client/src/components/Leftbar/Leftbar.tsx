import "./leftbar.scss";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
const Leftbar = () => {
  return (
    <div className="leftbar">
      <div className="container">
        <div className="item">
          <AccountCircleOutlinedIcon />
          <span>John Doe</span>
        </div>
        <div className="item">
          <AccountCircleOutlinedIcon />
          <span>Friends</span>
        </div>
        <div className="item">
          <AccountCircleOutlinedIcon />
          <span>Groups</span>
        </div>
        <div className="item">
          <AccountCircleOutlinedIcon />
          <span>Marketplace</span>
        </div>
        <div className="item">
          <AccountCircleOutlinedIcon />
          <span>Watch</span>
        </div>
        <div className="item">
          <AccountCircleOutlinedIcon />
          <span>Memories </span>
        </div>
        <div className="section-divider">
          <span>Your shortcuts</span>
        </div>
        <div className="item">
          <AccountCircleOutlinedIcon />
          <span>Events</span>
        </div>
        <div className="item">
          <AccountCircleOutlinedIcon />
          <span>Gaming</span>
        </div>
        <div className="item">
          <AccountCircleOutlinedIcon />
          <span>Gallery</span>
        </div>
        <div className="item">
          <AccountCircleOutlinedIcon />
          <span>Videos</span>
        </div>
        <div className="item">
          <AccountCircleOutlinedIcon />
          <span>Messages</span>
        </div>
        <div className="section-divider">
          <span>Other</span>
        </div>
        <div className="item">
          <AccountCircleOutlinedIcon />
          <span>Fundraiser</span>
        </div>
        <div className="item">
          <AccountCircleOutlinedIcon />
          <span>Tutorials</span>
        </div>
        <div className="item">
          <AccountCircleOutlinedIcon />
          <span>Courses</span>
        </div>
      </div>
    </div>
  );
};

export default Leftbar;
