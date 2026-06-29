import axios from "axios";

function LogoutButton() {

  const logout = async () => {

    const employeeId =
      localStorage.getItem("userId");


    alert(
      "Greetings"
    );

    localStorage.clear();

    window.location.href = "/";
  };

  return (
    <button onClick={logout}>
      Logout
    </button>
  );
}

export default LogoutButton;