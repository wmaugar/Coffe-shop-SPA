import styled from "styled-components";
import Heading from "./Heading";
import Row from "./Row";
import ProductTableOperations from "../features/products/ProductsTableOperations";
import ProductTable from "../features/products/ProductsTable";
import AddProduct from "../features/products/AddProduct";

const StyledProductLayout = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 2rem;
`;

function ProductLayout() {
  return (
    <StyledProductLayout>
      <Row type="horizontal">
        <Heading as="h2">Products List</Heading>
        <ProductTableOperations />
        <AddProduct />
      </Row>
      <Row type="vertical">
        <ProductTable />
      </Row>
    </StyledProductLayout>
  );
}

export default ProductLayout;
