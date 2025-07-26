import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SearchBy from "../../ui/SearchBy";

function OrdersTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="status"
        options={[
          { value: "all", label: "All" },
          { value: "orderPlaced", label: "Order Placed" },
          { value: "processing", label: "Processing" },
          { value: "preparing", label: "Preparing" },
          { value: "delivered", label: "Delivered" },
        ]}
      />
      <SearchBy
        options={[
          { value: "id", label: "Order Id" },
          { value: "companyUID", label: "Company UID" },
          { value: "companyName", label: "Company Name" },
        ]}
        defaultValue="id"
      />
    </TableOperations>
  );
}

export default OrdersTableOperations;
