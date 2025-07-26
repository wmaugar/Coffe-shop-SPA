import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router";
import Main from "./Main";
import Container from "./Container";
import StyledAppLayout from "./StyledAppLayout";

function AppLayout() {
  return (
    <StyledAppLayout>
      <Header />
      <Sidebar />
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayout;
