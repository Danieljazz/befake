import "./register.scss";
import { Link } from "react-router-dom";
import React, { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import indicator from "../../assets/indicator.gif";
type userData = {
  username: string;
  mail: string;
  password: string;
  repassword: string;
};

const Register: FC = () => {
  const [data, setData] = useState<userData>({
    username: "",
    mail: "",
    password: "",
    repassword: "",
  });
  const [notMatch, setNotMatch] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [registered, setRegistered] = useState<boolean>(false);
  const navigate = useNavigate();
  const dataHandle = (e: React.FormEvent): void => {
    const target = e.target as HTMLInputElement;
    setData((prev) => ({ ...prev, [target.name]: target.value }));
  };
  const registerUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (data.password !== data.repassword) {
      setNotMatch(true);
    } else {
      setNotMatch(false);
      const { repassword, ...others } = data;
      try {
        await axios.post("http://localhost:8080/api/v1/auth/register", others);
        setError(false);
        setRegistered(true);

        const interval = setInterval(() => {
          navigate("/login");
        }, 3000);
        return () => clearInterval(interval);
      } catch (e) {
        console.log(e);
        setError(true);
      }
    }
  };

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Register</h1>
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={dataHandle}
          />
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={dataHandle}
          />
          <input
            type="text"
            name="surname"
            placeholder="Surname"
            onChange={dataHandle}
          />
          <input
            type="email"
            name="mail"
            placeholder="Mail"
            onChange={dataHandle}
          />
          <input
            name="password"
            type="password"
            placeholder="Set password"
            onChange={dataHandle}
          />
          <input
            name="repassword"
            type="password"
            placeholder="Retype password"
            onChange={dataHandle}
          />
          <button onClick={registerUser}>Register</button>
          {notMatch && (
            <div style={{ color: "red" }}>Passwords are different</div>
          )}
          {error && <div style={{ color: "red" }}>Something went wrong</div>}
          {registered && (
            <div style={{ color: "green" }}>
              {"Registered properly, now you can log in :)"}
              <img
                src={indicator}
                width={40}
                style={{ margin: "-10px 20px" }}
              />
            </div>
          )}
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
