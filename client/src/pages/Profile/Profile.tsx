import { Posts } from "../../components/Posts/Posts";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import "./profile.scss";
import { useLocation } from "react-router-dom";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axiosRequest";
import { AuthContext, UserContextType } from "../../context/authContext";
import { useContext, useState } from "react";
import indicator from "../../assets/indicator.gif";
import UpdateModal from "../../components/UpdateModal/UpdateModal";
const Profile = () => {
  const userId = parseInt(useLocation().pathname.split("/")[2]);
  const { user } = useContext(AuthContext);
  const [openUpdate, setOpenUpdate] = useState(false);
  const queryClient = useQueryClient();
  const { isLoading, error, data } = useQuery(["users"], () =>
    makeRequest
      .get(`/users/find?userId=${userId}`)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return err;
      })
  );
  const { isLoading: rIsLoading, data: relationshipData } = useQuery(
    ["relationships"],
    () =>
      makeRequest
        .get(`/relationships?userId=${user.id}`)
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          return err;
        }),
    { initialData: [] }
  );

  const followMutation = useMutation(
    (followed: boolean) => {
      if (followed) {
        return makeRequest.delete(`/relationships?followedUserId=${userId}`);
      } else {
        return makeRequest.post(`/relationships`, { followedUserId: userId });
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["relationships"]);
      },
    }
  );
  const userFriends = relationshipData.map((user: UserContextType) => user.id);

  const handleFollow = () => {
    followMutation.mutate(userFriends.includes(userId));
  };

  return (
    <div className="profile">
      {isLoading ? (
        <img src={indicator} />
      ) : (
        <>
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
              src={
                data?.profilePhoto
                  ? data.profilePhoto
                  : " https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
              }
              alt=""
            />
            <div className="description-section">
              <span>
                {data?.name} {data?.surname}
              </span>
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
                  <span>{data?.country ? data.country : "N/A"}</span>
                  <LanguageOutlinedIcon />
                  <span>{data?.website ? data.website : "N/A"}</span>
                </div>
                <div className="options">
                  <MoreHorizOutlinedIcon />
                  <EmailOutlinedIcon />
                </div>
              </div>
              {rIsLoading ? (
                "Loading"
              ) : userId !== user.id ? (
                <button style={{ cursor: "pointer" }} onClick={handleFollow}>
                  {!userFriends.includes(userId) ? "Follow" : "Unfollow"}
                </button>
              ) : (
                <button onClick={() => setOpenUpdate(true)}>Update</button>
              )}
            </div>
          </div>
          <Posts userId={userId} />{" "}
          {openUpdate && (
            <UpdateModal user={data} setOpenUpdate={setOpenUpdate} />
          )}
        </>
      )}
    </div>
  );
};
export default Profile;
