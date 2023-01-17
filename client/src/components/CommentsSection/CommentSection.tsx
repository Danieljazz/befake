import "./commentsSection.scss";
import { AuthContext } from "../../context/authContex";
import { useContext } from "react";
import { Comment } from "../../components/Comment/Comment";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
type CommentsProps = {
  comments?: [
    {
      user: {
        id: string;
        profilePhoto: string;
        name: string;
      };
      commentContent: string;
      date: string;
    }
  ];
};

export const CommentsSection = ({ comments }: CommentsProps) => {
  const { user } = useContext(AuthContext);
  const comments2 = [
    {
      user: {
        id: "asdsasadasdasdsaadsad",
        profilePhoto:
          "https://images.pexels.com/photos/10182191/pexels-photo-10182191.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        name: "Gabriela Nineta",
      },
      commentContent:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ex eius quia animi.",
      date: "12.12.12",
    },
    {
      user: {
        id: "asdsasadasdasdsaadsad",
        profilePhoto:
          "https://images.pexels.com/photos/2269872/pexels-photo-2269872.jpeg?auto=compress&cs=tinysrgb&w=1600",
        name: "Gabriel Rados",
      },
      commentContent:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ex eius quia animi.",
      date: "10.12.12",
    },
  ];
  return (
    <div className="comments-section">
      <div className="new-comment">
        <div className="user">
          <img src={user.profilePhoto} alt="" />
        </div>
        <input type="text" placeholder="Type comment" />
        <button>Send</button>
      </div>
      {comments2 && comments2.map((comment) => <Comment comment={comment} />)}
    </div>
  );
};
