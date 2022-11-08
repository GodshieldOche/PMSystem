import axios from "axios";
import React, { useState } from "react";
import { storeToken } from "../../helper";

const login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    if (!email || !password) {
      setLoading(false);
      return;
    }

    try {
      const { data } = await axios.post("/api/users", { email, password });
      console.log(data);

      const result = await storeToken(data.token);

      if (result) {
        setTimeout(() => {
          location.reload();
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  return (
    <div className="login">
      <p className="welcome">Welcome To PM System, Enter Details To Login</p>

      <div className="form">
        <input
          type="text"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button onClick={handleSubmit} className="btn-primary">
          {loading ? "loading..." : "Login"}
        </button>
      </div>
    </div>
  );
};

export default login;
