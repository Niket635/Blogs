import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Login = () => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmail = (event) => {
    setemail(event.target.value);
  };

  const handlepassword = (event) => {
    setPassword(event.target.value);
  };

  const savedata = (event) => {
    event.preventDefault();

    localStorage.setItem("email", "password");

    let user = { email, password };
    axios
      .post("https://blog-api-dev.octalinfotech.com/api/login", user)
      .then((res) => {
        console.log(res.data.data.name);
        console.log(res.data.data.email);
        localStorage.setItem("token", res.data.data.token);
        navigate("/admin/dashboard");

        Toast.fire({
          icon: "success",
          title: res.data.message,
        });
      })

      .catch((error) => {
        console.log(error.message);

        Toast.fire({
          icon: "error",
          title: error.response.data.message,
        });
      });

    return <navigate to="/src/components/Navbar.jsx" replace={true} />;
  };

  return (
    <>
      <div
        class="login-box"
        style={{
          fontFamily: " sans-serif",
          background: " linear-gradient(#141e30, #243b55)",
          backgroundPosition: "center center",
          backgroundSize: "cover",
          backgroundRepeat: " no-repeat",
        }}
      >
        <h2> Login</h2>

        <form action="" class="form" onSubmit={savedata}>
          <div class="user-box">
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleEmail}
              className="input in-put"
            />
            <label className="label" for="">
              E-mail :
            </label>
          </div>

          <div class="user-box">
            <input
              type="password"
              name="password"
              value={password}
              onChange={handlepassword}
              className="input in-put"
            />
            <label className="label">Password : </label>
          </div>
          <button className="btnInput  float-end">
            <span></span>
            <span></span>
            Login
            <span></span>
            <span></span>
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
