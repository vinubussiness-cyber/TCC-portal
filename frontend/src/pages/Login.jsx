import { useState } from "react";
import axios from "axios";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password
        }
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "role",
        res.data.user.role
      );

      localStorage.setItem(
        "name",
        res.data.user.name
      );

      localStorage.setItem(
        "userId",
        res.data.user.id
      );

      // await axios.post(
      //   "http://localhost:5000/api/attendance/login",
      //   {
      //     employee_id:
      //       res.data.user.id
      //   }
      // );


      alert(
        `Welcome ${res.data.user.name}!`
      );

      if (res.data.user.role === "admin") {
        window.location.href =
          "/admin/dashboard";
      } else {
        window.location.href =
          "/employee/dashboard";
      }

    } catch (err) {
      console.log(err)

      if(err.response){
          console.log("Backend Response:", err.response.data)
        alert (
        `Error: ${JSON.stringify(err.response.data)}`
        );
      } else{
        alert("Server Connection Error");
      }     
    }

  };

 
  return (
    <div style={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <form
        onSubmit={handleLogin}
        style={{
          width: "350px",
          padding: "20px",
          border: "1px solid #ddd"
        }}
      >
        <h2>Employee Portal</h2>

        <input
          type="email"
          placeholder="Email"
          onChange={(e) =>
            setEmail(e.target.value)
          }
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px"
          }}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setPassword(e.target.value)
          }
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px"
          }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px"
          }}
        >
          Login
        </button>

      </form>
    </div>
  );
}

export default Login;