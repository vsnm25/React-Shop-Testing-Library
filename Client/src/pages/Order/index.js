import React, { useContext } from "react";
import styled from "styled-components";
import OrderContext from "../../contexts/OrderContext";
import Type from "./Type";
import { useHistory } from "react-router-dom";

const Order = () => {
  const [orderDatas] = useContext(OrderContext);
  const { push } = useHistory();
  return (
    <div>
      <h1>Travel Product</h1>
      <ul style={{ display: "flex", gap: 20 }}>
        <Type orderType="products" />
      </ul>
      <OptionWrapper>
        <ul style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <Type orderType="options" />
        </ul>
        <div>
          <h2>Total Price: {orderDatas.totals.total}</h2>
          <button style={{ height: 30 }} onClick={() => push("/summary")}>
            주문하기
          </button>
        </div>
      </OptionWrapper>
    </div>
  );
};

export default Order;

const OptionWrapper = styled.div`
  display: flex;
  gap: 100px;
  margin-top: 50px;
`;
