import styled, { css } from "styled-components";
import CreateProductForm from "./CreateProductForm";
import { useDeleteProduct } from "./useDeleteProduct";
import { formatCurrency } from "../../utils/helpers";
import { HiPencil, HiTrash } from "react-icons/hi2";
import { GiSightDisabled } from "react-icons/gi";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useDisableProduct } from "./useDisableProduct";

const filters = {
  turnOn: css`
    opacity: 0.7;
    filter: grayscale(1);
  `,
  turnOff: css`
    opacity: 1;
    filter: grayscale(0);
  `,
};

const Img = styled.img`
  margin: auto;
  width: 5.5rem;
  //aspect-ratio: 3 / 2;
  object-fit: cover;
  ${(props) => filters[props.$filter]}
`;

//"opacity-70 grayscale"

const Product = styled.div`
  display: flex;
  justify-content: center;
  font-size: 1.6rem;
  font-weight: 600;
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

const Discount = styled.div`
  display: flex;
  justify-content: center;
  font-family: "Sono";
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-green-700);
`;
const Category = styled.div`
  display: flex;
  justify-content: center;
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const options = {
  green: css`
    color: var(--color-green-700);
  `,
  red: css`
    color: var(--color-red-700);
  `,
};

const Availability = styled.div`
  display: flex;
  justify-content: center;
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
  ${(props) => options[props.$option]}
`;

function ProductRow({ product }) {
  const { isDeleting, deleteProduct } = useDeleteProduct();
  const { isDisabling, disableProduct } = useDisableProduct();

  const {
    id,
    productName,
    unitPrice,
    discount,
    category,
    isAvailable,
    imageUrl,
  } = product;

  return (
    <Table.Row>
      <Img src={imageUrl} $filter={isAvailable ? "turnOff" : "turnOn"} />

      <Product>
        {!isAvailable && "NOT AVAILABLE - "}
        {productName}
      </Product>
      <Price>{formatCurrency(unitPrice)}</Price>
      <Discount>
        {discount ? `${formatCurrency(discount)}` : <span>&mdash;</span>}
      </Discount>
      <Category>{category}</Category>

      {isAvailable ? (
        <Availability $option="green">YES</Availability>
      ) : (
        <Availability $option="red">NO</Availability>
      )}

      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={id} />
          <Menus.List id={id}>
            <Modal.Open opens="edit">
              <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
            </Modal.Open>

            <Menus.Button
              icon={<GiSightDisabled />}
              onClick={() => disableProduct(product)}
            >
              {isAvailable ? "Disable" : "Enable"}
            </Menus.Button>

            <Modal.Open opens="delete">
              <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
            </Modal.Open>
          </Menus.List>

          <Modal.Window name="edit">
            <CreateProductForm productToEdit={product} />
          </Modal.Window>

          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName="product"
              disabled={isDeleting}
              onConfirm={() => deleteProduct(id)}
            />
          </Modal.Window>
        </Menus.Menu>
      </Modal>
    </Table.Row>
  );
}

export default ProductRow;
