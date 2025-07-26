import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";

const StyledOrderResume = styled.div`
  display: grid;
  font-size: 1.2rem;
  letter-spacing: normal;
  font-weight: normal;
  grid-template-columns: 3fr 1fr 0.5fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  justify-content: left;
  margin: auto;
  width: 400px;

  align-items: center;
`;

const Item = styled.div`
  display: flex;
`;
const Price = styled.div`
  display: flex;
  font-weight: bold;
`;

//productName, quantity, unitPrice, subTotalPrice

function OrderResume({ orderDetails }) {
  console.log(orderDetails);
  return (
    <StyledOrderResume>
      {orderDetails.map((item) => (
        <>
          <Item>{item.productName}</Item>
          <Item>{item.quantity} (pcs) </Item>
          <Item>x</Item>
          <Price>{formatCurrency(item.unitPrice)}</Price>
          <Price>{formatCurrency(item.subTotalPrice)}</Price>
        </>
      ))}
    </StyledOrderResume>
  );
}
export default OrderResume;
