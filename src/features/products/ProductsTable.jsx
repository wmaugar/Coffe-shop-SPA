import Spinner from "../../ui/Spinner";
import ProductRow from "./productRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";
import HeaderItem from "../../ui/HeaderItem";
import { useProducts } from "./useProducts";
import Pagination from "../../ui/Pagination";

function ProductsTable() {
  const { isLoading, products, count } = useProducts();

  if (isLoading) return <Spinner />;

  if (!products.length) return <Empty resourceName="products" />;

  return (
    <Menus>
      <Table columns="0.4fr 1fr 0.4fr 0.4fr 0.4fr 0.4fr 0.1fr">
        <Table.Header role="row">
          <HeaderItem>Image</HeaderItem>
          <HeaderItem sortBy={"productName"}>Product</HeaderItem>
          <HeaderItem sortBy={"unitPrice"}>Price</HeaderItem>
          <HeaderItem sortBy={"discount"}>Discount</HeaderItem>
          <HeaderItem sortBy={"category"}>Category</HeaderItem>
          <HeaderItem sortBy={"isAvailable"}>Available</HeaderItem>
        </Table.Header>

        <Table.Body
          data={products}
          render={(product) => (
            <ProductRow product={product} key={product.id} />
          )}
        />
        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default ProductsTable;
