import React, { useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { updateUser } from "../redux/userReducer";

const AuthPage = (props) => {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profile_pic, setProfilePic] = useState("");
  const [registerView, setView] = useState(false);

  const handleToggle = (e) => {
    e.preventDefault();
    if (registerView === false) {
      setView(true);
    } else {
      setView(false);
    }
  };

  const login = (e) => {
    e.preventDefault();

    axios
      .post("/api/login", { email, password })
      .then((res) => {
        props.updateUser(res.data);
        props.history.push("/home");
      })
      .catch(() => alert("incorrect email or password"));
  };

  const register = (e) => {
    e.preventDefault();

    axios
      .post("/api/register", {
        first_name,
        last_name,
        email,
        password,
        profile_pic,
      })
      .then((res) => {
        props.updateUser(res.data);
        props.history.push("/home");
        alert("registered!");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className='auth-main'>
      {registerView ? (
          <>
            <h3>Register Below</h3>
            <input
              name="first_name"
              placeholder="First Name"
              value={first_name}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              placeholder="Last Name"
              name="last_name"
              value={last_name}
              onChange={(e) => setLastName(e.target.value)}
            />
            <input
              placeholder="Email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              placeholder="Profile Picture url"
              name="profile_pic"
              value={profile_pic}
              onChange={(e) => setProfilePic(e.target.value)}
            />
            <button onClick={(e) => register(e)}>Register</button>
            <p>Have an account?</p>{" "}
            <span onClick={(e) => handleToggle(e)}>Login Here</span>
            
          </>
        ) : ( <>
          <h3>Login Below</h3>
          <input
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
         <input
          placeholder="Password"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={(e) => login(e)}>Login</button>
        <p>Don't have an account?</p>{" "}
        <span onClick={(e) => handleToggle(e)}>Register Here</span>
          </>
        )}
       
    </div>
  );
};
const mapToStateProps = (reduxState) => reduxState;

export default connect(mapToStateProps, { updateUser })(AuthPage);
