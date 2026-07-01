import { useState, useRef, useEffect } from "react";
import { FiSearch, FiBell, FiChevronDown } from "react-icons/fi";
import LogoutButton from "./LogoutButton";

function Navbar() {
  const name = localStorage.getItem("name") || "User";
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-us", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="navbar">
      <div className="navbar-greeting">
        <h2>Hello, {name}</h2>
        <h4>{formattedDate}</h4>
      </div>

      <div className="navbar-actions">
        <div className="navbar-search">
          <FiSearch />
          <input type="text" placeholder="Search..." aria-label="Search" />
        </div>

        <button className="navbar-icon-btn" aria-label="Notifications">
          <FiBell />
          <span className="notification-dot" />
        </button>

        <div className="navbar-profile" ref={dropdownRef}>
          <button
            className="navbar-profile-btn"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            aria-label="Profile menu"
          >
            <div className="navbar-avatar">{initials}</div>
            <span className="navbar-profile-name">{name}</span>
            <FiChevronDown size={14} />
          </button>

          {dropdownOpen && (
            <div className="navbar-dropdown">
              <div className="navbar-dropdown-item" style={{ cursor: "default", opacity: 0.7 }}>
                Signed in as {name}
              </div>
              <LogoutButton className="navbar-dropdown-item" />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
