import styled from "styled-components";
import { format, isToday } from "date-fns";
import {
  HiOutlineChatBubbleBottomCenterText,
  HiOutlineCheckCircle,
  HiOutlineCurrencyDollar,
  HiOutlineHomeModern,
} from "react-icons/hi2";

import { BsPersonVcard } from "react-icons/bs";

import DataItem from "../../ui/DataItem";

import { formatCurrency } from "../../utils/helpers";
import OrderResume from "./OrderResume";
import Heading from "../../ui/Heading";

const StyledOrderDataBox = styled.section`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  overflow: hidden;
`;

const Header = styled.header`
  background-color: var(--color-brand-500);
  padding: 2rem 4rem;
  color: #e0e7ff;
  font-size: 1.8rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;

  svg {
    height: 3.2rem;
    width: 3.2rem;
  }

  & div:first-child {
    display: flex;
    align-items: center;
    gap: 1.6rem;
    font-weight: 600;
    font-size: 1.8rem;
  }

  & span {
    font-family: "Sono";
    font-size: 2rem;
    margin-left: 4px;
  }
`;

const Section = styled.section`
  padding: 3.2rem 4rem 1.2rem;
`;

const ContacInfo = styled.div`
  display: flex;
  font-size: 1.4rem;
  flex-direction: column;
  padding-bottom: 3rem;
  margin: auto;
  width: 400px;
  color: var(--color-grey-500);

  & span:first-of-type {
    font-weight: 500;
    color: var(--color-grey-700);
  }
`;

const Price = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.6rem 3.2rem;
  border-radius: var(--border-radius-sm);
  margin-top: 2.4rem;

  background-color: ${(props) =>
    props.isPaid ? "var(--color-green-100)" : "var(--color-yellow-100)"};
  color: ${(props) =>
    props.isPaid ? "var(--color-green-700)" : "var(--color-yellow-700)"};

  & p:last-child {
    text-transform: uppercase;
    font-size: 1.4rem;
    font-weight: 600;
  }

  svg {
    height: 2.4rem;
    width: 2.4rem;
    color: currentColor !important;
  }
`;

const Footer = styled.footer`
  padding: 1.6rem 4rem;
  font-size: 1.2rem;
  color: var(--color-grey-500);
  text-align: right;
`;

// A purely presentational component

function OrderDataBox({ order, orderDetails }) {
  const {
    id,
    created_at,
    totalPrice,
    status,
    isPaid,
    priority,
    companyUID,
    companyName,
    contactInfo,
  } = order;
  const { customerName, phoneNumber, email } = contactInfo;

  return (
    <StyledOrderDataBox>
      <Header>
        <div>
          <p>Company Name: {companyName}</p>
          <p>Company UID: {companyUID}</p>
        </div>
      </Header>

      <Section>
        <DataItem
          icon={<BsPersonVcard />}
          label="CONTACT INFORMATION"
        ></DataItem>
        <ContacInfo>
          <p>
            {" "}
            <span>&bull;</span> Fullname: {customerName}
          </p>

          <p>
            <span>&bull;</span> Phone Number: {phoneNumber}
          </p>

          <p>
            <span>&bull;</span> Email: {email}
          </p>
        </ContacInfo>

        <DataItem
          icon={<HiOutlineChatBubbleBottomCenterText />}
          label="ORDER DETAILS"
        ></DataItem>

        <OrderResume orderDetails={orderDetails} />

        <Price isPaid={isPaid}>
          <p>{isPaid ? "Paid" : "Will pay at delivery"}</p>
          <DataItem icon={<HiOutlineCurrencyDollar />} label={`Total price`}>
            {formatCurrency(totalPrice)}
          </DataItem>
        </Price>
      </Section>

      <Footer>
        <p>Ordered {format(new Date(created_at), "EEE, MMM dd yyyy, p")}</p>
      </Footer>
    </StyledOrderDataBox>
  );
}

export default OrderDataBox;
