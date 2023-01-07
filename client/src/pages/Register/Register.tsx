import "./register.scss";
import { Link } from "react-router-dom";
const Register = () => {
  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Register</h1>
          <input type="text" placeholder="Username" />
          <input type="mail" placeholder="Mail" />
          <input type="password" placeholder="Set password" />
          <input type="password" placeholder="Retype password" />
          <button>Register</button>
        </div>
        <div className="right">
          <h1>Find new friends!</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum nemo
            labore illo?
          </p>
          <span>Have account?</span>
          <Link to="/Login">
            <button>Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
