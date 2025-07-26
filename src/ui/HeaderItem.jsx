import styled from "styled-components";
import { HiOutlineChevronDown } from "react-icons/hi";
import { HiOutlineChevronUp } from "react-icons/hi";
import { useSearchParams } from "react-router";
import Button from "./Button";

const StyledHeaderItem = styled.div`
  margin: auto;
`;

function HeaderItem({ sortBy = null, children }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortyByValue = searchParams.get("sortBy") || null;
  const arrowDirection = () => {
    if (sortyByValue) {
      const [field, direction] = sortyByValue.split("-");
      if (field === sortBy) return direction;
    } else return "asc";
  };

  function activeSortBy() {
    searchParams.set(
      "sortBy",
      `${sortBy}-${arrowDirection() === "asc" ? "desc" : "asc"}`
    );
    setSearchParams(searchParams);
  }

  return (
    <StyledHeaderItem>
      {children}{" "}
      {sortBy && (
        <Button $variation="secondary" $size="small" onClick={activeSortBy}>
          {arrowDirection() === "asc" ? (
            <HiOutlineChevronUp />
          ) : (
            <HiOutlineChevronDown />
          )}
        </Button>
      )}
    </StyledHeaderItem>
  );
}

export default HeaderItem;
