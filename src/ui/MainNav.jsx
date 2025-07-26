import { NavLink } from "react-router-dom";
import styled from "styled-components";
import {
  HiOutlineCalendarDays,
  HiOutlineCog6Tooth,
  HiOutlineHomeModern,
  HiOutlineUser,
} from "react-icons/hi2";

import { HiOutlineDocumentText } from "react-icons/hi";
import { BsCupHotFill } from "react-icons/bs";

const NavList = styled.ul`
  display: flex;
  flex-direction: row;
  align-items: start;
  gap: 1rem;
`;

const ListItem = styled.li`
  display: flex;
  align-items: flex-start;

  //align-content: center;
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    color: var(--color-grey-600);
    font-size: 1.4rem;
    font-weight: 500;
    padding: 1rem 2.4rem;
    transition: all 0.3s;
  }

  /* This works because react-router places the active class on the active NavLink */
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-grey-100);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey400);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-600);
  }
`;

function MainNav() {
  return (
    <nav>
      <NavList>
        <ListItem>
          <StyledNavLink to="/orders">
            <HiOutlineDocumentText />
            <span> Orders </span>
          </StyledNavLink>
        </ListItem>
        <ListItem>
          <StyledNavLink to="/products">
            <BsCupHotFill />
            <span> Products</span>
          </StyledNavLink>
        </ListItem>
        <ListItem>
          <StyledNavLink to="/users">
            <HiOutlineUser />
            <span> Users</span>
          </StyledNavLink>
        </ListItem>
        <ListItem>
          <StyledNavLink to="/settings">
            <HiOutlineCog6Tooth />
            <span> Settings</span>
          </StyledNavLink>
        </ListItem>
      </NavList>
    </nav>
  );
}

export default MainNav;
