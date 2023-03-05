import "./navbar.scss";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import { useContext, useState } from "react";
import { DarkModeContext } from "../../context/DarkModeContext";
import { Link } from "react-router-dom";
import UserActionsModal from "../../components/UserActionsModal/UserActionsModal";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axiosRequest";
const Navbar = () => {
  const { toggle } = useContext(DarkModeContext);
  const [openUserModal, setOpenUserModal] = useState(false);
  const [search, setSearch] = useState<String>("");
  const { data, isError, isLoading, refetch } = useQuery(["searchUser"], () =>
    makeRequest.get(`/users/search_user?searchUser=${search}`)
  );

  const searchUser = (e: React.FormEvent) => {
    const target = e.target as HTMLInputElement;
    setSearch(target.value);
    if (target.value.length > 1) {
      console.log(data);
      refetch();
    }
    if (target.value.length === 0) {
      setSearch("");
    }
  };

  return (
    <div className="navbar">
      <div className="left">
        <Link to={"/"}>
          <HomeOutlinedIcon
            sx={{ fontSize: "2rem" }}
            style={{ cursor: "pointer" }}
          />
        </Link>
        <DarkModeOutlinedIcon
          sx={{ fontSize: "2rem" }}
          onClick={toggle}
          style={{ cursor: "pointer" }}
        />
        <input placeholder="Find new friends here " onChange={searchUser} />
      </div>
      <div className="middle">
        <Link to={"/"} style={{ textDecoration: "none" }}>
          <span>BeFake</span>
        </Link>
      </div>
      <div className="right">
        {/* TODO: Add dropdown */}
        <NotificationsActiveOutlinedIcon sx={{ fontSize: "2rem" }} />
        <EmailOutlinedIcon sx={{ fontSize: "2rem" }} />
        <div
          style={{ cursor: "pointer" }}
          onClick={() => setOpenUserModal((prev) => !prev)}
        >
          <AccountCircleOutlinedIcon sx={{ fontSize: "2rem" }} />
        </div>
        {/* <span>{`${user.name} ${user.surname}`}</span> */}
        {openUserModal && <UserActionsModal />}
        {/* <Link to={`/profile/${user.id}`} style={{ textDecoration: "none" }}>
          <div className="user">
            <AccountCircleOutlinedIcon sx={{ fontSize: "2rem" }} />
            <span>{`${user.name} ${user.surname}`}</span>
          </div>
        </Link> */}
      </div>
    </div>
  );
};
export default Navbar;
