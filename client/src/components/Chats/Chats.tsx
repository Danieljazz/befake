import UserChat from "../../components/UserChat/UserChat";
import "./chats.scss";

const Chats = () => {
  return (
    <div className="chats">
      <h1>Chats</h1>
      <ul className="latest-chats">
        <UserChat
          profilePhoto="https://images.pexels.com/photos/3394658/pexels-photo-3394658.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          name="Joe"
          surname="Doe"
          message="Hi Jane"
          createdAt={1678807484000}
        />
      </ul>
    </div>
  );
};

export default Chats;
