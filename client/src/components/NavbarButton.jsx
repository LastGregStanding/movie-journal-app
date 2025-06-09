const NavbarButton = ({ children, onClick }) => {
  return (
    <button className="navbar-button" onClick={onClick}>
      {children}
    </button>
  );
};

export default NavbarButton;
