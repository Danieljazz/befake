import "./posts.scss";
import { Post } from "../Post/Post";

export const Posts = () => {
  const posts = [
    {
      user: "Jane Doe",
      postContent:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere distinctio perspiciatis sunt accusamus nemo, omnis est cum fugit quo tempore qui illum. Minus, alias! Ab ut, temporibus quam cumque veniam sequi odit. Quis natus possimus optio, et quod ullam earum eveniet sequi aliquam ut harum perferendis dolorem, deserunt in voluptatibus delectus laboriosam? Ratione temporibus dolore provident laboriosam a dolorem? Repellendus assumenda et suscipit, quos quam modi dolorem esse ratione id nam possimus! Saepe fuga nostrum illo possimus officiis! Quia voluptate repudiandae accusantium cum tempora ea dolores necessitatibus, consequuntur, adipisci pariatur inventore quisquam maxime in perferendis aliquid molestias dolore asperiores nostrum?",
      date: "20.12.2023",
      postPhoto:
        "https://images.pexels.com/photos/12735802/pexels-photo-12735802.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      user: "John Doe",
      postContent:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere distinctio perspiciatis sunt accusamus nemo, omnis est cum fugit quo tempore qui illum. Minus, alias! Ab ut, temporibus quam cumque veniam sequi odit. Quis natus possimus optio, et quod ullam earum eveniet sequi aliquam ut harum perferendis dolorem, deserunt in voluptatibus delectus laboriosam? Ratione temporibus dolore provident laboriosam a dolorem? Repellendus assumenda et suscipit, quos quam modi dolorem esse ratione id nam possimus! Saepe fuga nostrum illo possimus officiis! Quia voluptate repudiandae accusantium cum tempora ea dolores necessitatibus, consequuntur, adipisci pariatur inventore quisquam maxime in perferendis aliquid molestias dolore asperiores nostrum?",
      date: "13.12.2023",
    },
    {
      user: "Jane Doe",
      postContent:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere distinctio perspiciatis sunt accusamus nemo, omnis est cum fugit quo tempore qui illum. Minus, alias! Ab ut, temporibus quam cumque veniam sequi odit. Quis natus possimus optio, et quod ullam earum eveniet sequi aliquam ut harum perferendis dolorem, deserunt in voluptatibus delectus laboriosam? Ratione temporibus dolore provident laboriosam a dolorem? Repellendus assumenda et suscipit, quos quam modi dolorem esse ratione id nam possimus! Saepe fuga nostrum illo possimus officiis! Quia voluptate repudiandae accusantium cum tempora ea dolores necessitatibus, consequuntur, adipisci pariatur inventore quisquam maxime in perferendis aliquid molestias dolore asperiores nostrum?",
      date: "2.12.2023",
    },
  ];
  return (
    <div className="posts">
      {posts.map((item) => (
        <Post post={item} />
      ))}
    </div>
  );
};
