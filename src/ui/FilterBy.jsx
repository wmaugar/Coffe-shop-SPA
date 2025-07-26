import { useSearchParams } from "react-router-dom";
import Select from "./Select";

function FilterBy({ filterField, options }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const categoryFilter = searchParams.get(filterField) || "all";

  function handleChange(e) {
    searchParams.set(filterField, e.target.value);
    setSearchParams(searchParams);
  }
  return (
    <Select
      options={options}
      type="white"
      value={categoryFilter}
      onChange={handleChange}
    />
  );
}

export default FilterBy;
