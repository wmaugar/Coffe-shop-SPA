import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import styled from "styled-components";
import DashboardBox from "./DashboardBox";
import Empty from "../../ui/Empty";

const StyledRankingChart = styled(DashboardBox)`
  height: 400px;
  .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;

function RankingChart({ productList }) {
  if (!productList) return <Empty resourceName="products list" />;

  let data = [];

  productList.forEach((element, index) => {
    data.push({ ...element, index: index + 1 });
  });

  return (
    <StyledRankingChart>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={400}
          height={400}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="productName" hide={true} />
          <YAxis dataKey="total sales" />
          <Tooltip dataKey="productName" />
          <Legend dataKey="productName" />

          <Bar
            dataKey="total sales"
            fill="#82ca9d"
            activeBar={<Rectangle fill="gold" stroke="purple" />}
          />
        </BarChart>
      </ResponsiveContainer>
    </StyledRankingChart>
  );
}

export default RankingChart;
