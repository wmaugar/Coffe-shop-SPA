import styled from "styled-components";

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 10rem 1fr;
  grid-template-rows: auto 1fr;
  // This convert page to auto-scalable
  height: 100vh;
`;

export default StyledAppLayout;
