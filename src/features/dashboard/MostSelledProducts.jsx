import Spinner from "../../ui/Spinner";
import RankingChart from "./RankingChart";

import { useRecentOrderDetails } from "./useRecentOrderDetails";

function MostSelledProducts({ title }) {
  //1) obtain a list from orderDetails, form each product selled

  const { isLoading, orderDetails } = useRecentOrderDetails();

  //2) Obtain an ordered list of the ranking of products Selled

  if (isLoading) return <Spinner />;

  const mostSelledProducts = getMostSelledProducts(orderDetails);

  //3) Present the top ten ranking of mostselled products, it should be presented in Total quantity, and Total Price.

  //4) Display this information inside a bar chart.

  return (
    <>
      <h2>{title}</h2>
      <RankingChart productList={mostSelledProducts} />
    </>
  );
}
export default MostSelledProducts;

function getMostSelledProducts(orderDetails) {
  const selledProducts = [];
  orderDetails.map((item) => {
    if (selledProducts.includes(item.productId)) return;
    selledProducts.push(item.productId);
  });

  const productsRanking = [];
  selledProducts.map((id) => {
    let products = orderDetails.filter((item) => item.productId === id);

    let totalSelled = products.reduce(
      (acc, item) => acc + item.subTotalPrice,
      0
    );
    productsRanking.push({
      productName: products[0].productName,
      "total sales": totalSelled,
    });
  });

  const sortedRanking = productsRanking.sort(
    (a, b) => b["total sales"] - a["total sales"]
  );

  let topTen = sortedRanking;

  if (sortedRanking.length > 10) topTen = sortedRanking.slice(0, 10);

  return topTen;
}
