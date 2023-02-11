import { makeRequest } from "../../axiosRequest";
import "./deleteDropdown.scss";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

type PostDropdownI = {
  postId: number;
};

const DeleteDropdown = ({ postId }: PostDropdownI) => {
  const clientQuery = useQueryClient();
  const deleteMutation = useMutation(
    ({ postId }: PostDropdownI) =>
      makeRequest.delete(`http://localhost:8080/api/v1/posts?postId=${postId}`),
    {
      onSuccess: () => clientQuery.invalidateQueries(["posts"]),
    }
  );
  const handleDelete = () => {
    deleteMutation.mutate({ postId });
  };
  return (
    <div className="delete-dropdown">
      <div className="options">
        <button>Edit</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

export default DeleteDropdown;
