import { makeRequest } from "../../axiosRequest";
import { useQuery } from "@tanstack/react-query";
import { getNotifAction } from "../../utils/notificationType";
import { NotifType } from "../../components/AllNotificationsPanel/AllNotificationsPanel";
import moment from "moment";

const LatestActivities = () => {
  const { isLoading, error, data } = useQuery(["notifications"], () =>
    makeRequest.get("/notifications").then((res) => {
      return res.data;
    })
  );

  return (
    <>
      {data && (
        <div className="section">
          <span>Latest activities</span>
          {data.slice(0, 5).map((notif: NotifType) => (
            <div className="event">
              <div className="user">
                <img src={notif?.profilePhoto} alt="" />
                <span>{`${notif.name} ${notif.surname}`}</span>
                <span>{getNotifAction(notif.type)}</span>
              </div>
              <span style={{ fontWeight: "100", color: "grey" }}>
                {moment(notif.createdAt).fromNow()}
              </span>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default LatestActivities;
