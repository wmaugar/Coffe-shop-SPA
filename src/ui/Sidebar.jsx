import styled from "styled-components";
import Logo from "./Logo";
import SidebarMenu from "./SidebarMenu";

// import Uploader from "../data/Uploader";

const StyledSidebar = styled.aside`
  background-color: var(--color-blue-100);
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-blue-700);

  //Expands grid from the first row to the latest
  //grid-row: 1/-1;
  //Flex display, to add some gap between elements
  display: flex;
  flex-direction: column;
  justify-content: end;
`;

function Sidebar() {
  return (
    <StyledSidebar>
      <SidebarMenu />
    </StyledSidebar>
  );
}

export default Sidebar;
