import { makeRequest } from "../../axiosRequest";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";

const LatestActivities = () => {
  const { isLoading, error, data } = useQuery(["notifications"], () =>
    makeRequest.get("/notifications").then((res) => {
      return res.data;
    })
  );

  const getNotifAction = (action: number) => {
    switch (action) {
      case 1:
        return "posted";
      case 2:
        return "commented your post";
      case 3:
        return "liked your post";
    }
  };

  return (
    <>
      {data && (
        <div className="section">
          <span>Latest activities</span>
          {data.slice(0, 5).map((notif) => (
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
