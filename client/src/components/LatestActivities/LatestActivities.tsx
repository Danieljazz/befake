const LatestActivities = () => {
  return (
    <div className="section">
      <span>Latest activities</span>
      <div className="event">
        <div className="user">
          <img
            src="https://images.pexels.com/photos/3394658/pexels-photo-3394658.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
          />
          <span>Jane Doe</span>
          <span>changed status</span>
        </div>
        <span style={{ fontWeight: "100", color: "grey" }}> 1 min ago</span>
      </div>
      <div className="event">
        <div className="user">
          <img
            src="https://images.pexels.com/photos/3394658/pexels-photo-3394658.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
          />
          <span>Jane Doe</span>
          <span>changed status</span>
        </div>
        <span style={{ fontWeight: "100", color: "grey" }}> 9+ min ago</span>
      </div>
      <div className="event">
        <div className="user">
          <img
            src="https://images.pexels.com/photos/3394658/pexels-photo-3394658.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
          />
          <span>Jane Doe</span>
          <span>added post</span>
        </div>
        <span style={{ fontWeight: "100", color: "grey" }}> 9+ min ago</span>
      </div>
    </div>
  );
};

export default LatestActivities;
