import React from "react";
import { NavContainer, NavTitle, NavButton, ButtonWrapper } from "./styles"

function Navbar() {
  return (
    <NavContainer>
      <NavTitle>byPS</NavTitle>
      <ButtonWrapper>
        <NavButton>Login</NavButton>
        <NavButton>Register</NavButton>
      </ButtonWrapper>
    </NavContainer>
  );
}

export default Navbar;