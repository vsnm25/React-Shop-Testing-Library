import Type from "../Type";
import { server } from "../../../mocks/server";
import { rest } from "msw";
import { render, screen } from "../../../test-util";

test("display product images from server", async () => {
  render(<Type orderType="products" />);

  const productImages = await screen.findAllByRole("img", {
    name: /product$/i,
  });
  expect(productImages).toHaveLength(2);

  const altText = productImages.map(element => element.alt);
  expect(altText).toEqual(["America Product", "England Product"]);
});

test("when fetching product datas, facing error", async () => {
  server.resetHandlers(
    rest.get("http://localhost:5000/products", (req, res, ctx) =>
      res(ctx.status(500))
    )
  );

  render(<Type orderType="products" />);

  const errorBanner = await screen.findByTestId("error-banner");
  expect(errorBanner).toHaveTextContent("에러가 발생했습니다.");
});

test("fetch option information from server", async () => {
  render(<Type orderType="options" />);

  const optionCheckboxes = await screen.findAllByRole("checkbox");
  expect(optionCheckboxes).toHaveLength(2);
});
