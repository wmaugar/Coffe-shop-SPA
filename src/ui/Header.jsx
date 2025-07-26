import styled from "styled-components";
import Logo from "./Logo";
import MainNav from "./MainNav";
import { NavLink } from "react-router";
import UserAvatar from "../features/authentication/UserAvatar";

const StyledHeader = styled.header`
  background-color: var(--color-green-100);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-green-700);
  display: flex;
  flex-direction: row;
  gap: 2.4rem;
  align-items: center;
  justify-content: space-between;
  grid-column: 1/-1;
`;

function Header() {
  return (
    <StyledHeader>
      <NavLink to="/dashboard">
        <Logo />
      </NavLink>
      <MainNav />
      <UserAvatar />
    </StyledHeader>
  );
}

export default Header;
