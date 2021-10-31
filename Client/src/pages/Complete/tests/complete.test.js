import { createMemoryHistory } from "history";
import { Router } from "react-router";
import { render, screen } from "../../../test-util";
import Complete from "../index";

test("get my complete orders", async () => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <Complete />
    </Router>
  );
  const loading = screen.getByText(/loading/i);
  expect(loading).toBeInTheDocument();

  const completeHeader = await screen.findByRole("heading", {
    name: "주문이 성공했습니다.",
  });
  expect(completeHeader).toBeInTheDocument();

  const announceOrders = await screen.findByRole("heading", {
    name: "지금까지 모든 주문",
  });
  expect(announceOrders).toBeInTheDocument();

  const orderListCell = await screen.findByRole("columnheader", {
    name: "주문 내역",
  });
  expect(orderListCell).toBeInTheDocument();
  const countCell = await screen.findByRole("columnheader", {
    name: "수량",
  });
  expect(countCell).toBeInTheDocument();
});
