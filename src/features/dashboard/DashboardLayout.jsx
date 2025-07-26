import styled from "styled-components";

// import { useRecentStays } from "./useRecentStays";
// import { useRecentBookings } from "./useRecentBookings";
// import { useCabins } from "../../features/cabins/useCabins";

import Spinner from "../../ui/Spinner";
import Stats from "./Stats";
import { useSettings } from "../settings/useSettings";
import { useRecentOrders } from "./useRecentOrders";
import { TodayActivity } from "./TodayActivity";
import { useTodayOrders } from "./useTodayOrders";
import MostSelledProducts from "./MostSelledProducts";
import SalesChart from "./SalesChart";

// import SalesChart from "./SalesChart";
// import DurationChart from "./DurationChart";
// import TodayActivity from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 2fr;
  gap: 2rem;
`;

function DashboardLayout() {
  const { isLoading: isLoading1, settings } = useSettings();
  const { isLoading: isLoading2, orders, numDays } = useRecentOrders();
  const { isLoading: isLoading3, orders: todayOrders } = useTodayOrders();

  // const { isLoading: isLoading1, bookings } = useRecentBookings();
  // const { isLoading: isLoading2, confirmedStays, numDays } = useRecentStays();
  // const { cabins, isLoading: isLoading3 } = useCabins();

  if (isLoading1 || isLoading2 || isLoading3) return <Spinner />;

  const { monthlySalesGoal, monthlyOrdersGoal } = settings;

  const totalOrders = orders.length;
  const deliveredOrders = orders.filter(
    (order) => order.status === "delivered"
  ).length;

  const totalSales = orders
    .filter((order) => order.status === "delivered")
    .reduce((acc, item) => acc + item.totalPrice, 0);
  let salesGoal = monthlySalesGoal;
  let ordersGoal = monthlyOrdersGoal;

  if (numDays === 90) {
    salesGoal = salesGoal * 3;
    ordersGoal = ordersGoal * 3;
  }
  if (numDays === 7) {
    salesGoal = Math.round((7 * salesGoal) / 30);
    ordersGoal = Math.round((7 * ordersGoal) / 30);
  }

  const ordersToDeliver = todayOrders.filter(
    (order) => order.status !== "delivered"
  );

  return (
    <StyledDashboardLayout>
      <Stats
        title="STATS"
        salesGoal={salesGoal}
        ordersGoal={ordersGoal}
        totalOrders={totalOrders}
        deliveredOrders={deliveredOrders}
        totalSales={totalSales}
      />

      <TodayActivity orders={ordersToDeliver} title="TODAY ACTIVITY" />

      <MostSelledProducts title="MOST SELLED PRODUCTS CHART" />

      <SalesChart
        orders={orders}
        numDays={numDays}
        title="TOTAL SALES PER MONTH"
      />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
