import Stat from "./Stat";
import { GiMoneyStack } from "react-icons/gi";
import { IoCartOutline } from "react-icons/io5";
import { GrDeliver } from "react-icons/gr";
import styled from "styled-components";

//These are the KPIs for Coffe Shop:
// TOTAL SALES, selled vs goal
// TOTAL ORDERS, selled vs goal
// DELIVERED ORDERS, received vs delivered
const StyledStats = styled.div`
  display: flex;
  justify-content: space-evenly;
  grid-column: 1 / span 2;
`;

function Stats({
  salesGoal,
  ordersGoal,
  totalOrders,
  totalSales,
  deliveredOrders,
  title,
}) {
  //1.) SALES KPI

  const salesKPI = Math.round((1000 * totalSales) / salesGoal) / 10;

  //2)  ORDERS KPI

  const ordersKPI = Math.round((1000 * totalOrders) / ordersGoal) / 10;

  //3)  DELIVERED ORDERS KPI

  const deliveredOrdersKPI =
    Math.round((1000 * deliveredOrders) / totalOrders) / 10;

  return (
    <>
      <h2>{title}</h2>
      <StyledStats>
        <Stat
          title="Sales KPI"
          color="green"
          icon={<GiMoneyStack />}
          value={`${salesKPI}%`}
        />
        <Stat
          title="Orders KPI"
          color="red"
          icon={<IoCartOutline />}
          value={`${ordersKPI}%`}
        />

        <Stat
          title="Delivered Orders KPI"
          color="blue"
          icon={<GrDeliver />}
          value={`${deliveredOrdersKPI}%`}
        />
      </StyledStats>
    </>
  );
}

export default Stats;
