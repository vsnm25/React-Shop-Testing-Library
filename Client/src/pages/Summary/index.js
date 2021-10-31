import axios from "axios";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router";
import OrderContext from "../../contexts/OrderContext";

const Summary = () => {
  const [checked, setChecked] = useState(false);
  const [orderDatas] = useContext(OrderContext);
  const { push } = useHistory();

  return (
    <div>
      <h1>주문 확인</h1>
      <h2>Products: ₩ {orderDatas.totals.products}</h2>
      {Array.from(orderDatas.products.entries()).map(([name, count]) => (
        <li key={name}>
          {count} {name}
        </li>
      ))}
      <h2>Options: ₩ {orderDatas.totals.options}</h2>
      {Array.from(orderDatas.options.entries()).map(([name, count]) => (
        <li key={name}>
          {count} {name}
        </li>
      ))}
      <form
        style={{ marginTop: 30 }}
        onSubmit={async e => {
          e.preventDefault();
          console.log(orderDatas);
          await axios
            .post("http://localhost:5000/order", {
              ...orderDatas,
              products: Array.from(orderDatas.products.entries()),
              options: Array.from(orderDatas.products.entries()),
            })
            .then(() => {
              push("/complete");
            });
        }}
      >
        <input
          id="confirm-checked"
          type="checkbox"
          checked={checked}
          onChange={e => setChecked(e.target.checked)}
        />
        <label htmlFor="confirm-checked">주문하려는 것을 확인하셨나요?</label>
        <button
          disabled={!checked}
          type="submit"
          style={{ backgroundColor: "black", color: "white" }}
        >
          주문확인
        </button>
      </form>
    </div>
  );
};

export default Summary;
