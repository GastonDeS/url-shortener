import React from "react";
import PropTypes, { InferType } from "prop-types";
import { NavContainer, NavTitle, ButtonWrapper, NavButton } from "./styles";
import { useAuth } from "../../UserContext";
import { useNavigate } from "react-router-dom";

Navbar.propTypes = {
  isAuth: PropTypes.bool
}

Navbar.defaultProps = {
  isAuth: false
}

function Navbar({ isAuth }: InferType<typeof Navbar.propTypes & typeof Navbar.defaultProps>) {
  let { logout } = useAuth();
  let navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  }

  return (
    <NavContainer>
      <NavTitle>byPS</NavTitle>
      {isAuth && <ButtonWrapper>
        <NavButton onClick={handleLogout}>Logout</NavButton>
      </ButtonWrapper>}
    </NavContainer>
  );
}

export default Navbar;