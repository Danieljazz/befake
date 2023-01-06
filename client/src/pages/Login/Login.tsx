import "./login.scss";
const Login = () => {
  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Hello world</h1>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fuga
            provident earum sint!
          </p>
          <span>New?</span>
          <button>Register</button>
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
