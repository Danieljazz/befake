import "./updateModal.scss";
import { useState } from "react";
import { useContext } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { makeRequest } from "../../axiosRequest";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { AuthContext } from "../../context/authContext";

type UserProps = {
  id: number;
  mail: string;
  name: string;
  surname: string;
  website: string | null;
  backgroundPhoto: string | null;
  profilePhoto: string;
  country: string | null;
};

type UpdateModalProps = {
  user: UserProps; //TODO: import from profile
  setOpenUpdate: (value: boolean | ((prevVar: boolean) => boolean)) => void;
};

const UpdateModal = ({ user, setOpenUpdate }: UpdateModalProps) => {
  const [updatedData, setUpdatedData] = useState<UserProps>(user);
  const queryClient = useQueryClient();
  const handlerChange = (e: React.FormEvent) => {
    const target = e.target as HTMLInputElement;
    setUpdatedData((prev) => ({ ...prev, [target.name]: target.value }));
  };
  const { setUser } = useContext(AuthContext);
  const updateMutate = useMutation(
    (data: UserProps) => {
      const { id, ...others } = data;
      return makeRequest
        .put("/users/update", others)
        .then(() => {
          setOpenUpdate(false);
          const { id, name, surname, profilePhoto } = data;
          setUser({ id, name, surname, profilePhoto });
        })
        .catch((err) => {
          return console.log(err);
        });
    },
    { onSuccess: () => queryClient.invalidateQueries(["users"]) }
  );

  const updateUser = () => {
    const { id, ...others } = updatedData;
    console.log(others);
    updateMutate.mutate({
      id: updatedData["id"],
      mail: updatedData["mail"],
      name: updatedData["name"],
      surname: updatedData["surname"],
      website: updatedData["website"],
      backgroundPhoto: null,
      profilePhoto: updatedData["profilePhoto"],
      country: updatedData["country"],
    });
    // return makeRequest
    //   .put("/users/update", {
    //     mail: updatedData["mail"],
    //     name: updatedData["name"],
    //     surname: updatedData["surname"],
    //     webiste: updatedData["webiste"],
    //     backgroundPhoto: null,
    //     profilePhoto: updatedData["profilePhoto"],
    //     country: updatedData["country"],
    //   })
    //   .then(() => setOpenUpdate(false))
    //   .catch((err) => {
    //     return console.log(err);
    //   });
  };
  return (
    <div className="update-modal">
      <h1>Update profile</h1>
      <button className="close" onClick={() => setOpenUpdate(false)}>
        <CloseIcon />
      </button>

      <section>
        <label>
          Name:
          <input
            type="text"
            name="name"
            id="name"
            value={updatedData.name}
            onChange={handlerChange}
          />
        </label>
        <label>
          Surname:
          <input
            type="text"
            name="surname"
            id="surname"
            value={updatedData.surname}
            onChange={handlerChange}
          />
        </label>
        <label>
          Mail:
          <input
            type="email"
            name="mail"
            id="mail"
            value={updatedData.mail}
            onChange={handlerChange}
          />
        </label>
        <label>
          Website:
          <input
            type="url"
            name="website"
            id="website"
            placeholder={updatedData.website ? updatedData.website : ""}
            onChange={handlerChange}
          />
        </label>
        <label>
          Profile photo:
          <input
            type="text"
            name="profilePhoto"
            id="profilePhoto"
            placeholder={
              updatedData.profilePhoto ? updatedData.profilePhoto : ""
            }
            onChange={handlerChange}
          />
        </label>
        <label>
          Country:
          <input
            type="text"
            name="country"
            id="country"
            placeholder={updatedData.country ? updatedData.country : ""}
            onChange={handlerChange}
          />
        </label>
      </section>
      <button className="update" onClick={updateUser}>
        Update
      </button>
    </div>
  );
};

export default UpdateModal;
