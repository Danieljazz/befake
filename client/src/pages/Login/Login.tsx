import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { LoginType } from "../../context/authContext";
import { AxiosError } from "axios";
const Login = () => {
  const { login } = useContext(AuthContext);

  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  } as LoginType);

  const [err, setErr] = useState<String>();

  const navigate = useNavigate();
  const inputChange = (e: React.FormEvent) => {
    const target = e.target as HTMLInputElement;
    setInputs((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
  };
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(inputs);
      navigate("/");
    } catch (err) {
      const error = err as AxiosError;
      setErr(String(error.response?.data));
    }
  };
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
          <input
            name="username"
            type="text"
            placeholder="Username"
            onChange={inputChange}
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={inputChange}
          />
          <button onClick={handleLogin}>Login</button>
          {err && <span style={{ color: "red" }}>{err}</span>}
        </div>
      </div>
    </div>
  );
};
export default Login;
