import { Navigate, useNavigate } from "react-router-dom";


function LogoutButton({ className = "logout-btn" }) {
  const navigate = useNavigate();
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
