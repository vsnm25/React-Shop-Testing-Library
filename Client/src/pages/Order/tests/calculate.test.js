import userEvent from "@testing-library/user-event";
import Type from "../Type";
import Order from "../../Order";
import { createMemoryHistory } from "history";
import { Router } from "react-router";
import { render, screen } from "../../../test-util";

test("update product's total when products change", async () => {
  render(<Type orderType="products" />);

  const productsTotal = screen.getByText("상품 총 가격:", { exact: false });
  expect(productsTotal).toHaveTextContent("0");

  const americaInput = await screen.findByRole("spinbutton", {
    name: "America",
  });
  userEvent.clear(americaInput);
  userEvent.type(americaInput, "1");
  expect(productsTotal).toHaveTextContent("1000");
});

describe("total price of options and products", () => {
  test("total price starts with 0 and Updating total price when adding one product", async () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <Order />
      </Router>
    );
    const total = screen.getByText("Total Price:", { exact: false });
    const americaInput = await screen.findByRole("spinbutton", {
      name: "America",
    });
    userEvent.clear(americaInput);
    userEvent.type(americaInput, "5");

    expect(total).toHaveTextContent("5000");
  });

  test("updating total price when adding one option", async () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <Order />
      </Router>
    );
    const total = screen.getByText("Total Price:", { exact: false });
    const insuranceCheckbox = await screen.findByRole("checkbox", {
      name: "insurance",
    });
    userEvent.click(insuranceCheckbox);
    expect(total).toHaveTextContent("500");
  });

  test("updating total price when removing option and product", async () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <Order />
      </Router>
    );

    const insuranceCheckbox = await screen.findByRole("checkbox", {
      name: "insurance",
    });

    userEvent.click(insuranceCheckbox);

    const americaInput = await screen.findByRole("spinbutton", {
      name: "America",
    });
    userEvent.clear(americaInput);
    userEvent.type(americaInput, "3");

    userEvent.clear(americaInput);
    userEvent.type(americaInput, "1");

    const total = screen.getByText("Total Price:", { exact: false });
    expect(total).toHaveTextContent("1500");
  });
});
