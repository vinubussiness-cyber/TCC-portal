import LogoutButton from "./LogoutButton";

function Navbar() {

  const name = localStorage.getItem("name");
  const today = new Date();

  const formattedDate = today.toLocaleDateString("en-us",{
    weekday: 'long',
    month: "long",
    day:"numeric"
  })

  return (
    <div
      style={{
        height: "90px",
        background: "#ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
        borderBottom: "1px solid #ddd"
      }}
    >
      <div>
        <h2>Hello {name} !</h2>
       <h4>{formattedDate}</h4>
      </div>

      
      <LogoutButton/>
      
    </div>
  );
}

export default Navbar;