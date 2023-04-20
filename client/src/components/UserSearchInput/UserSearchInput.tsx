import { useEffect, useState } from "react";
import { makeRequest } from "../../axiosRequest";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import "./userSeachInput.scss";
const UserSearchInput = ({
  placeholder,
  linkTo,
}: {
  placeholder: string;
  linkTo: string;
}) => {
  const [search, setSearch] = useState<String>("");
  const [searchVisible, setSearchVisible] = useState("none");
  const { data, isError, isLoading, refetch } = useQuery(["searchUser"], () =>
    makeRequest.get(`/users/search_user${search}`).then((res) => res.data)
  );

  const searchUser = async (e: React.FormEvent) => {
    const target = e.target as HTMLInputElement;
    if (target.value.length > 2) {
      await setSearch(`?searchUser=${target.value}`);
    }
    console.log(data);
    if (target.value.length === 0) {
      await setSearch("");
    }
  };
  useEffect(() => {
    refetch();
    console.log(data);
  }, [search]);

  return (
    <div className="user-search">
      <input
        placeholder={placeholder}
        onFocus={() => setSearchVisible("block")}
        onChange={searchUser}
      />
      <ul
        style={{ display: `${searchVisible}` }}
        className="search-result"
        onBlur={() => {
          setSearchVisible("none");
          setSearch("");
        }}
      >
        {data?.map((user) => (
          <li>
            <Link
              to={`${linkTo}${user.id}`}
            >{`${user.name} ${user.surname}`}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserSearchInput;
