import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import FilterBy from "../../ui/FilterBy";

function ProductsTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="isAvailable"
        options={[
          { value: "all", label: "All" },
          { value: "available", label: "Available" },
          { value: "notAvailable", label: "Not Available" },
        ]}
      />
      <FilterBy
        filterField="category"
        options={[
          { value: "all", label: "Filter by Category" },
          { value: "hotCoffee", label: "Hot Coffee" },
          { value: "coldCoffee", label: "Cold Coffee" },
          { value: "hotTea", label: "Hot Tea" },
          { value: "coldTea", label: "Cold Tea" },
          { value: "refreshers", label: "Refreshers" },
          { value: "frappuchino", label: "Frappuchino" },
          { value: "icedEnergy", label: "Iced Energy" },
          { value: "chocolateAndMore", label: "Chocolate And More" },
          { value: "wholeBean", label: "Whole Bean" },
        ]}
      />
    </TableOperations>
  );
}

export default ProductsTableOperations;
