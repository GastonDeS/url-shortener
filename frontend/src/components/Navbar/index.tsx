import React from "react";
import { NavContainer, NavTitle, NavButton, ButtonWrapper } from "./styles"

interface NavProps {
  isLogged : boolean;
}

function Navbar( {isLogged}:NavProps ) {
  return (
    <NavContainer>
      <NavTitle>byPS</NavTitle>
      <ButtonWrapper>
        {!isLogged && <>
        <NavButton>Login</NavButton>
        <NavButton>Register</NavButton>
        </>}
      </ButtonWrapper>
    </NavContainer>
  );
}

export default Navbar;