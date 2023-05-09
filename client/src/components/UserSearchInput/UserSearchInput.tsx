import { useEffect, useState } from "react";
import { makeRequest } from "../../axiosRequest";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import "./userSeachInput.scss";
import { UserContextType } from "context/authContext";
const UserSearchInput = ({
  placeholder,
  linkTo,
  setModalOpen,
}: {
  placeholder: string;
  linkTo: string;
  setModalOpen?: (value: boolean | ((prevVar: boolean) => boolean)) => void;
}) => {
  const [search, setSearch] = useState<String>("");
  const [searchVisible, setSearchVisible] = useState(false);
  const { data, isError, isLoading, refetch } = useQuery(["searchUser"], () =>
    makeRequest.get(`/users/search_user${search}`).then((res) => res.data)
  );

  const searchUser = async (e: React.FormEvent) => {
    const target = e.target as HTMLInputElement;
    if (target.value.length > 2) {
      await setSearch(`?searchUser=${target.value}`);
    }
    if (target.value.length === 0) {
      await setSearch("");
    }
  };
  useEffect(() => {
    refetch();
  }, [search]);

  return (
    <div className="user-search">
      <input
        placeholder={placeholder}
        onFocus={() => setSearchVisible(true)}
        onChange={searchUser}
      />
      {searchVisible && (
        <ul
          className="search-result"
          onBlur={() => {
            setSearchVisible(false);
            setSearch("");
          }}
        >
          {data?.map((user: UserContextType) => (
            <li
              onClick={() => {
                setModalOpen && setModalOpen(false);
              }}
            >
              <Link
                key={uuidv4()}
                to={`${linkTo}${user.id}`}
              >{`${user.name} ${user.surname}`}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserSearchInput;
