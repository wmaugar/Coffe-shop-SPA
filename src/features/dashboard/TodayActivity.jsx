import styled, { css } from "styled-components";
import { HiEye } from "react-icons/hi2";
import { useNavigate } from "react-router";
import Modal from "../../ui/Modal";
import Menus from "../../ui/Menus";

const StyledTodayActivity = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--color-grey-50);
  grid-row: span 3;
`;

const StyledRow = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 1rem;
  display: grid;

  grid-template-columns: 15rem 15rem 2rem;
  column-gap: 1.6rem;
  justify-content: space-between;
  row-gap: 1rem;
  margin-bottom: 1rem;
  height: auto;
`;

const options = {
  orderPlaced: css`
    background-color: var(--color-red-100);
    color: var(--color-red-700);
  `,
  processing: css`
    background-color: var(--color-blue-100);
    color: var(--color-blue-700);
  `,
  preparing: css`
    background-color: var(--color-green-100);
    color: var(--color-green-700);
  `,
};

const StatusBox = styled.div`
  //grid-row: 1 / -1;
  //aspect-ratio: 1;

  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  border-radius: 20px;

  /* Make these dynamic, based on the received prop */
  ${(props) => options[props.$option]}
`;

const Title = styled.h5`
  align-self: end;
  align-items: center;
  font-size: 1.6rem;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-500);
`;

const Value = styled.p`
  font-size: 1.4;
  line-height: 1;
  font-weight: 400;
`;

export function TodayActivity({ orders, title }) {
  const navigate = useNavigate();

  console.log(orders);

  return (
    <StyledTodayActivity>
      <h2>{title}</h2>
      <Menus>
        {orders.map((order) => (
          <StyledRow key={order.id}>
            <Title>Order#{order.id}</Title>
            <StatusBox $option={order.status}>
              <Value>{order.status}</Value>
            </StatusBox>

            <Modal>
              <Menus.Menu>
                <Menus.Toggle id={order.id} />
                <Menus.List id={order.id}>
                  <Menus.Button
                    icon={<HiEye />}
                    onClick={() => navigate(`/order/${order.id}`)}
                  >
                    See Details
                  </Menus.Button>
                </Menus.List>
              </Menus.Menu>
            </Modal>
          </StyledRow>
        ))}
      </Menus>
    </StyledTodayActivity>
  );
}
