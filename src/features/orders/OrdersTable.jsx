import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";
import HeaderItem from "../../ui/HeaderItem";
import Pagination from "../../ui/Pagination";
import OrderRow from "./OrderRow";
import { useOrders } from "./useOrders";

function OrdersTable() {
  const { isLoading, orders, count } = useOrders();
  // const count = 1;
  // const orders = [
  //   {
  //     id: 1,
  //     createdAt: "",
  //     totalPrice: 240,
  //     status: "preparing",
  //     isPaid: false,
  //     priority: true,
  //     companyUID: "324789856",
  //     companyName: "Flopower",
  //     contactInfo: {
  //       customerName: "Willy garcia GARCIA",
  //       phoneNumber: "76504545",
  //       email: "wmgarciaporcel@outlook.com",
  //     },
  //   },
  // ];

  if (isLoading) return <Spinner />;

  if (!orders?.length) return <Empty resourceName="orders" />;

  return (
    <Menus>
      <Table columns="0.5fr 0.6fr 0.7fr 0.6fr 0.4fr 0.4fr 0.5fr 0.05fr">
        <Table.Header role="row">
          <HeaderItem sortBy={"id"}>Order ID</HeaderItem>
          <HeaderItem sortBy={"companyUID"}>company UID</HeaderItem>
          <HeaderItem sortBy={"companyName"}>Company Name</HeaderItem>
          <HeaderItem sortBy={"totalPrice"}>Total Price</HeaderItem>
          <HeaderItem sortBy={"status"}>Status</HeaderItem>
          <HeaderItem sortBy={"isPaid"}>is Paid</HeaderItem>
          <HeaderItem sortBy={"priority"}>Priority</HeaderItem>
        </Table.Header>

        <Table.Body
          data={orders}
          render={(order) => <OrderRow order={order} key={order.id} />}
        />
        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default OrdersTable;
