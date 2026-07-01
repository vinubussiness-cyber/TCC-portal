function LogoutButton({ className = "logout-btn" }) {
  const logout = async () => {
    alert("Greetings");

    localStorage.clear();

    window.location.href = "/";
  };

  return (
    <button className={className} onClick={logout}>
      Logout
    </button>
  );
}

export default LogoutButton;
