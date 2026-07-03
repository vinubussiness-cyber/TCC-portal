import { Navigate, useNavigate } from "react-router-dom";

const navigate = useNavigate();

function LogoutButton({ className = "logout-btn" }) {
  const logout = async () => {
    alert("Greetings");

    localStorage.clear();

     navigate("/");
  };

  return (
    <button className={className} onClick={logout}>
      Logout
    </button>
  );
}

export default LogoutButton;
