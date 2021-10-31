import axios from "axios";
import React, { useEffect, useContext, useState, useCallback } from "react";
import { useHistory } from "react-router";
import ErrorBanner from "../../components/ErrorBanner";
import OrderContext from "../../contexts/OrderContext";

function CompletePage() {
  const [orderDatas, , resetOrderDatas] = useContext(OrderContext);
  const { push } = useHistory();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const orderCompleted = useCallback(async () => {
    try {
      const { data } = await axios.post("http://localhost:5000/order", {
        ...orderDatas,
        products: Array.from(orderDatas.products.entries()),
        options: Array.from(orderDatas.options.entries()),
      });
      setOrders(data);
      setLoading(false);
    } catch (error) {
      setError(true);
    }
  }, [orderDatas]);

  useEffect(() => {
    orderCompleted();
  }, [orderCompleted]);

  if (error) {
    return <ErrorBanner message="에러가 발생했습니다." />;
  }

  const orderItems = orders?.orderList?.map(([name, price]) => (
    <tr key={name}>
      <td>{name}</td>
      <td>{price}</td>
    </tr>
  ));

  const handleClick = () => {
    resetOrderDatas();
    push("/order");
  };

  if (loading) {
    return <div>loading</div>;
  } else {
    return (
      <div style={{ textAlign: "center" }}>
        <h2>주문이 성공했습니다.</h2>
        <h3>지금까지 모든 주문</h3>
        <table style={{ margin: "auto" }}>
          <tbody>
            <tr>
              <th>주문 번호</th>
              <th>주문 가격</th>
            </tr>
            <tr key={orders.orderNumber}>
              <td>{orders.orderNumber}</td>
              <td>{orders.price}</td>
            </tr>
            <tr>
              <th>주문 내역</th>
              <th>수량</th>
            </tr>
            {orderItems}
          </tbody>
        </table>
        <button onClick={handleClick}>첫페이지로</button>
      </div>
    );
  }
}

export default CompletePage;
