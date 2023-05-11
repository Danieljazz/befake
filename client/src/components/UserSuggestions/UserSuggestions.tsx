import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axiosRequest";

import { AuthContext, UserContextType } from "../../context/authContext";
import { useContext } from "react";

const UserSuggestions = () => {
  const { isError, isLoading, data } = useQuery(["recomendedUsers"], () =>
    makeRequest.get("/relationships/friendRequest").then((res) => res.data)
  );
  const { isLoading: rIsLoading, data: relationshipData } = useQuery(
    ["relationships"],
    () =>
      makeRequest
        .get(`/relationships?userId=${8}`)
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          return err;
        }),
    { initialData: [] }
  );
  const queryClient = useQueryClient();
  const followMutation = useMutation(
    ({ followed, userId }: { followed: boolean; userId: number }) => {
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

  const handleFollow = (e: React.FormEvent) => {
    const target = e.target as HTMLInputElement;
    const userId: number = Number(target.value);
    followMutation.mutate({ followed: userFriends.includes(userId), userId });
  };
  return (
    <div className="section">
      <span>Suggestions for you</span>
      {data?.map((suggestedFriend: UserContextType) => (
        <div className="event">
          <div className="user">
            <img src={suggestedFriend.profilePhoto} alt="" />
            <span>{`${suggestedFriend.name} ${suggestedFriend.surname} `}</span>
          </div>
          <div className="buttons">
            <button
              value={suggestedFriend.id}
              onClick={handleFollow}
              style={{ backgroundColor: "#00ff75", cursor: "pointer" }}
            >
              {!userFriends?.includes(suggestedFriend.id)
                ? "Follow"
                : "Unfollow"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
export default UserSuggestions;
