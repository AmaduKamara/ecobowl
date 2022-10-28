import React from "react";

const Navbar = () => {
  return (
    <header className="py-5 bg-white shadow-md">
      <nav className="container mx-auto  flex justify-between items-center">
        <h1>ECO-BOWL</h1>
        <ul className="flex items-center">
          <li>Login</li>
          <li className="ml-5">Signup</li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
