import "./allNotificationsPanel.scss";
import { getNotifAction } from "../../utils/notificationType";
import moment from "moment";
import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axiosRequest";
import LoadingIndicator from "../../components/LoadingIndicator/LoadingIndicator";
export type NotifType = {
  notif_id: number;
  actor_id: number;
  notifier_id: number;
  notif_read: number;
  type: number;
  entity_id: number;
  createdAt: Date;
  name: string;
  surname: string;
  profilePhoto: string;
};

type NotifArray = {
  notifications: NotifType[];
};

const AllNotificationsPanel = ({ notifications }: NotifArray) => {
  const [allNotifs, setAllNotifs] = useState(true);
  const [displayNotif, setDisplayNotifs] = useState(notifications);
  const [mutationLoading, setMutationLoading] = useState(false);
  const queryClient = useQueryClient();

  const readUnreadNotification = (e: React.FormEvent, notif_read: boolean) => {
    const target = e.target as HTMLButtonElement;
    const liElement = target!.parentNode! as HTMLLIElement;
    const value = Number(liElement!.id);
    readNotifMutation.mutate({ nid: value, nread: !notif_read });
  };

  useEffect(() => {
    const reducedNotif = allNotifs
      ? notifications
      : notifications.filter((notif) => notif.notif_read === 0);
    setDisplayNotifs(reducedNotif);
  }, [allNotifs, mutationLoading]);

  const readNotifMutation = useMutation(
    ({ nid, nread }: { nid: Number; nread: Boolean }) =>
      makeRequest.post("/notifications", { id: nid, notif_read: nread }),
    {
      onSuccess: () => {
        setMutationLoading(false);
        return queryClient.invalidateQueries(["notificationsNavbar"]);
      },
      onMutate: () => setMutationLoading(true),
    }
  );

  return (
    <div className="all-notifications-panel">
      <h2>Notifications</h2>
      <div className="notifications-buttons">
        <button
          style={allNotifs ? { backgroundColor: "aliceblue" } : {}}
          onClick={() => setAllNotifs(true)}
        >
          All
        </button>
        <button
          style={!allNotifs ? { backgroundColor: "aliceblue" } : {}}
          onClick={() => setAllNotifs(false)}
        >
          Unread
        </button>
      </div>
      {mutationLoading ? (
        <LoadingIndicator />
      ) : (
        <div className="notifciation-list">
          <ul>
            {displayNotif?.map((notif) => (
              <li key={notif.notif_id} id={String(notif.notif_id)}>
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
                <button
                  onClick={(e) =>
                    readUnreadNotification(e, Boolean(notif.notif_read))
                  }
                >
                  {notif.notif_read ? "UNREAD" : "READ"}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
export default AllNotificationsPanel;
