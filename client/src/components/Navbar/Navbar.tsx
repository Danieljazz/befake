import "./navbar.scss";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import { useContext, useEffect, useState } from "react";
import { DarkModeContext } from "../../context/DarkModeContext";
import { Link } from "react-router-dom";
import UserActionsModal from "../../components/UserActionsModal/UserActionsModal";
import { useQuery } from "@tanstack/react-query";
import { v4 as uuidv4 } from "uuid";
import UserSearchInput from "../../components/UserSearchInput/UserSearchInput";
const Navbar = () => {
  const { toggle } = useContext(DarkModeContext);
  const [openUserModal, setOpenUserModal] = useState(false);
  // const [search, setSearch] = useState<String>("");
  // const [searchVisible, setSearchVisible] = useState("none");
  // const { data, isError, isLoading, refetch } = useQuery(["searchUser"], () =>
  //   makeRequest.get(`/users/search_user${search}`).then((res) => res.data)
  // );

  // const searchUser = async (e: React.FormEvent) => {
  //   const target = e.target as HTMLInputElement;
  //   if (target.value.length > 2) {
  //     await setSearch(`?searchUser=${target.value}`);
  //   }
  //   console.log(data);
  //   if (target.value.length === 0) {
  //     await setSearch("");
  //   }
  // };
  // useEffect(() => {
  //   refetch();
  //   console.log(data);
  // }, [search]);

  return (
    <div className="navbar">
      <div className="left">
        {/* <Link to={"/"}>
          <HomeOutlinedIcon
            sx={{ fontSize: "2rem" }}
            style={{ cursor: "pointer" }}
          />
        </Link> */}
        <DarkModeOutlinedIcon
          sx={{ fontSize: "2rem" }}
          onClick={toggle}
          style={{ cursor: "pointer" }}
        />
        <UserSearchInput
          placeholder="Find new friends"
          linkTo={`/profile/`}
          key={uuidv4()}
        />
      </div>
      <div className="middle">
        <Link to={"/"} style={{ textDecoration: "none" }}>
          <span>BeFake</span>
        </Link>
      </div>
      <div className="right">
        {/* TODO: Add modals */}
        <NotificationsActiveOutlinedIcon sx={{ fontSize: "2rem" }} />
        <Link to={"/chat"}>
          <EmailOutlinedIcon sx={{ fontSize: "2rem" }} />
        </Link>
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
