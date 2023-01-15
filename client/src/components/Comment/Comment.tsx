import "./comment.scss";

export const Comment = () => {
  return (
    <div className="comment">
      <div className="comment-content">
        <div className="user">
          <img
            src="https://images.pexels.com/photos/3394658/pexels-photo-3394658.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
          />
        </div>
        <div>
          <b>
            <span>Jane Doe</span>
          </b>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quas omnis
            molestiae tenetur?
          </p>
        </div>
      </div>
      <span>12.12.12</span>
    </div>
  );
};
