import styled, { css } from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import { HiEye, HiTrash } from "react-icons/hi2";
import Modal from "../../ui/Modal";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useNavigate } from "react-router";

const CommonBox = styled.div`
  display: flex;
  justify-content: center;
  font-size: 1.6rem;
  font-weight: 400;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  display: flex;
  justify-content: center;
  font-size: 1.6rem;
  font-family: "Sono";
  font-weight: 600;
`;

const options = {
  green: css`
    color: var(--color-green-700);
  `,
  red: css`
    color: var(--color-red-700);
  `,
  indigo: css`
    color: var(--color-indigo-700);
  `,
  blue: css`
    color: var(--color-blue-700);
  `,
  grey: css`
    color: var(--color-grey-700);
  `,
};

const SpecialBox = styled.div`
  display: flex;
  justify-content: center;
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
  ${(props) => options[props.$option]}
`;

function OrderRow({ order }) {
  const navigate = useNavigate();

  const {
    id,
    //created_at,
    totalPrice,
    status,
    isPaid,
    priority,
    companyUID,
    companyName,
  } = order;

  return (
    <Table.Row>
      <CommonBox>{id}</CommonBox>
      <CommonBox>{companyUID}</CommonBox>
      <CommonBox>{companyName}</CommonBox>
      <Price>{formatCurrency(totalPrice)}</Price>
      <CommonBox>{status}</CommonBox>
      {isPaid ? (
        <SpecialBox $option="green">YES</SpecialBox>
      ) : (
        <SpecialBox $option="red">NO</SpecialBox>
      )}
      {priority ? (
        <SpecialBox $option="indigo">GO FIRST</SpecialBox>
      ) : (
        <SpecialBox $option="grey">Normal </SpecialBox>
      )}

      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={id} />
          <Menus.List id={id}>
            <Menus.Button
              icon={<HiEye />}
              onClick={() => navigate(`/order/${id}`)}
            >
              See Details
            </Menus.Button>
            {/* <Modal.Open opens="delete">
              <Menus.Button icon={<HiTrash />}>Delete order</Menus.Button>
            </Modal.Open> */}
          </Menus.List>

          {/* <Modal.Window name="delete">
          <ConfirmDelete
            resourceName="order"
            disabled={isDeleting}
            onConfirm={() => deleteOrder(id)}
          />
        </Modal.Window> */}
        </Menus.Menu>
      </Modal>
    </Table.Row>
  );
}

export default OrderRow;
