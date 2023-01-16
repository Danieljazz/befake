import { Posts } from "../../components/Posts/Posts";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import "./profile.scss";

const Profile = () => {
  return (
    <div className="profile">
      <div
        className="profile-background"
        style={{
          backgroundImage:
            "url(https://images.pexels.com/photos/547114/pexels-photo-547114.jpeg?auto=compress&cs=tinysrgb&w=1600)",
          objectFit: "contain",
        }}
      ></div>
      <div className="profile-description">
        <img
          src="https://images.pexels.com/photos/3394658/pexels-photo-3394658.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt=""
        />
        <div className="description-section">
          <span>Jane Doe</span>
          <div className="profile-socials">
            <div className="socials">
              <i className="lab la-linkedin"></i>
              <i className="lab la-instagram"></i>
              <i className="lab la-pinterest"></i>
              <i className="lab la-twitter"></i>
              <i className="lab la-facebook"></i>
            </div>
            <div className="localisation">
              <FmdGoodOutlinedIcon />
              <span>USA</span>
              <LanguageOutlinedIcon />
              <span>web.dev</span>
            </div>
            <div className="options">
              <MoreHorizOutlinedIcon />
              <EmailOutlinedIcon />
            </div>
          </div>
          <button>Follow</button>
        </div>
      </div>
      <Posts />
    </div>
  );
};
export default Profile;
