import Summary from "../index";
import { createMemoryHistory } from "history";
import { Router } from "react-router";
import { render, screen } from "../../../test-util";

test("checkbox and button", () => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <Summary />
    </Router>
  );

  const checkbox = screen.getByRole("checkbox", {
    name: "주문하려는 것을 확인하셨나요?",
  });
  expect(checkbox.checked).toEqual(false);

  const confirmButton = screen.getByRole("button", {
    name: "주문확인",
  });
  expect(confirmButton.disabled).toBeTruthy();
});
