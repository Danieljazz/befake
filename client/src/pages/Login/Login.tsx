import "./login.scss";
import { Link } from "react-router-dom";
const Login = () => {
  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Hello!</h1>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sapiente
            voluptas, voluptatibus soluta accusantium minus dignissimos
            voluptate ut, repudiandae exercitationem totam placeat esse neque!.
          </p>
          <span>New here?</span>
          <Link to="/register">
            <button type="button">Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <input type="text" placeholder="Username" />
          <input type="password" placeholder="Password" />
          <button>Login</button>
        </div>
      </div>
    </div>
  );
};
export default Login;
