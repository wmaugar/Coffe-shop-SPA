import styled from "styled-components";
import ButtonIcon from "./ButtonIcon";
import { HiOutlineUser } from "react-icons/hi2";
import { useNavigate } from "react-router";
import DarkModeToggle from "./DarkModeToggle";
import Logout from "../features/authentication/Logout";

const StyledSidebarMenu = styled.ul`
  display: flex;
  color: var(--color-grey-600);
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  padding-bottom: 5rem;
`;

function SidebarMenu() {
  const navigate = useNavigate();
  return (
    <StyledSidebarMenu>
      <li>
        <ButtonIcon onClick={() => navigate("/account")}>
          <HiOutlineUser />
        </ButtonIcon>
      </li>
      <li>
        <DarkModeToggle />
      </li>
      <li>
        <Logout />
      </li>
    </StyledSidebarMenu>
  );
}

export default SidebarMenu;
