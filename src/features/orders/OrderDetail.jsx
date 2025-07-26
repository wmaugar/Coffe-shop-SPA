import styled from "styled-components";

//import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useOrderDetails } from "./useOrderDetails";
import { useNavigate, useParams } from "react-router";
import { HiArrowUpOnSquare } from "react-icons/hi2";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Modal from "../../ui/Modal";
import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";
import { useDeleteOrder } from "./useDeleteOrder";
import { useOrdersById } from "./useOrdersById";
import { useUpdateOrder } from "./useUpdateOrder";
import OrderDataBox from "./OrderDataBox";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

const StyledOrderDetail = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0rem 20rem;
`;

function OrderDetail() {
  //const { booking, isLoading } = useBooking();
  const { orderDetails, isLoading: isLoadingDetails } = useOrderDetails();
  const { order, isLoading: isLoadingOrder } = useOrdersById();
  const { updateOrder, isLoading: isUpdatingOrder } = useUpdateOrder();

  //const { checkout, isCheckingOut } = useCheckout();
  const { isDeleting, deleteOrder } = useDeleteOrder();
  const moveBack = useMoveBack();
  const navigate = useNavigate();

  if (isLoadingDetails || isLoadingOrder) return <Spinner />;
  if (!orderDetails) return <Empty resourceName="order details" />;
  if (!order) return <Empty resourceName="order" />;

  const { status, id: orderId } = order.at(0);
  console.log(order);

  const statusToTagName = {
    orderPlaced: "silver",
    processing: "yellow",
    preparing: "blue",
    delivered: "green",
  };

  return (
    <StyledOrderDetail>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Order #{orderId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <OrderDataBox order={order.at(0)} orderDetails={orderDetails} />

      <ButtonGroup>
        {/* {status === "unconfirmed" && (
          <Button onClick={() => navigate(`/checkin/${orderId}`)}>
            Check in
          </Button>
        )} */}

        {status === "orderPlaced" && (
          <Button
            icon={<HiArrowUpOnSquare />}
            onClick={() => {
              updateOrder({
                id: orderId,
                newOrderData: { ...order.at(0), status: "processing" },
              });
            }}
            disabled={isUpdatingOrder}
            $variation="primary"
            $size="large"
          >
            Process Order
          </Button>
        )}
        {status === "processing" && (
          <Button
            icon={<HiArrowUpOnSquare />}
            onClick={() => {
              updateOrder({
                id: orderId,
                newOrderData: { ...order.at(0), status: "preparing" },
              });
            }}
            disabled={isUpdatingOrder}
            $variation="primary"
            $size="large"
          >
            Pass to Kitchen
          </Button>
        )}
        {status === "preparing" && (
          <Button
            icon={<HiArrowUpOnSquare />}
            onClick={() => {
              updateOrder({
                id: orderId,
                newOrderData: { ...order.at(0), status: "delivered" },
              });
            }}
            disabled={isUpdatingOrder}
            $variation="primary"
            $size="large"
          >
            Ready to deliver
          </Button>
        )}

        <Modal>
          <Modal.Open opens="delete">
            <Button $variation="danger" $size="medium">
              Delete Order
            </Button>
          </Modal.Open>

          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName={"order"}
              disabled={isDeleting}
              onConfirm={() =>
                deleteOrder(orderId, {
                  onSettled: () => navigate(-1),
                })
              }
            />
          </Modal.Window>
        </Modal>

        <Button $variation="secondary" $size="medium" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </StyledOrderDetail>
  );
}

export default OrderDetail;
