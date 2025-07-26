import styled from "styled-components";
import OrdersTableOperations from "../features/orders/OrdersTableOperations";
import Row from "./Row";
import Heading from "./Heading";
import OrdersTable from "../features/orders/OrdersTable";

const StyledOrderLayout = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 2rem;
`;

function OrderLayout() {
  return (
    <StyledOrderLayout>
      <Row type="horizontal">
        <Heading as="h2">Order List</Heading>
        <OrdersTableOperations />
      </Row>
      <Row type="vertical">
        <OrdersTable />
      </Row>
    </StyledOrderLayout>
  );
}

export default OrderLayout;
