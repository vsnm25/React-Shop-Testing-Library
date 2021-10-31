import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import ErrorBanner from "../../components/ErrorBanner";
import OrderContext from "../../contexts/OrderContext";
import Option from "./Option";
import Product from "./Product";

const Type = ({ orderType }) => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);
  const [orderDatas, updateItemCount] = useContext(OrderContext);

  const loadItems = async orderType => {
    try {
      const { data } = await axios.get(`http://localhost:5000/${orderType}`);
      setItems(data);
    } catch (error) {
      setError(true);
    }
  };

  useEffect(() => {
    loadItems(orderType);
  }, [orderType]);

  if (error) return <ErrorBanner message="에러가 발생했습니다." />;

  const ItemComponent = orderType === "products" ? Product : Option;

  const optionItems = items.map(item => (
    <ItemComponent
      key={item.name}
      {...item}
      updateItemCount={(itemName, newItemCount) =>
        updateItemCount(itemName, newItemCount, orderType)
      }
    />
  ));

  return (
    <>
      <h2>주문 종류</h2>
      <p>하나의 가격</p>
      <p>상품 총 가격: {orderDatas.totals[orderType]}</p>
      <div
        style={{
          display: "flex",
          flexDirection: orderType === "options" && "column",
        }}
      >
        {optionItems}
      </div>
    </>
  );
};

export default Type;
