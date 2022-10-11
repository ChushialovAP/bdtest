import React, { useState } from "react";
import { FiUser } from "react-icons/fi";
import { handleSubmit } from "../handleSubmit";
import { UserInfo } from "../types";

export const WelcomeScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const changeEmail= (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const changePass= (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <section>
      <h1 className="title">Welcome, friend!</h1>
      <form onSubmit={()=>handleSubmit(email, password)} className="flex flex-col items-center gap-4">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="username"
            className="text-lg flex items-center justify-center"
          >
            <span className="mr-1">
              <FiUser />
            </span>
          </label>
          <input
            type="text"
            id="username"
            name="userName"
            value={email}
            onChange={changeEmail}
            required
            autoComplete="off"
            className="input"
          />
           <input
            type="text"
            id="pass"
            name="password"
            value={password}
            onChange={changePass}
            required
            autoComplete="off"
            className="input"
          />
        </div>
        <button className="btn-success">Start chat</button>
      </form>
    </section>
  );
};