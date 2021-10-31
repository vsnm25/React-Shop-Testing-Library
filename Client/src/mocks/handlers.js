import { rest } from "msw";

export const handlers = [
  rest.get("http://localhost:5000/products", (req, res, ctx) => {
    return res(
      ctx.json([
        {
          name: "America",
          imagePath: "/images/america.jpeg",
        },
        {
          name: "England",
          imagePath: "/images/england.jpeg",
        },
      ])
    );
  }),
  rest.get("http://localhost:5000/options", (req, res, ctx) => {
    return res(ctx.json([{ name: "insurance" }, { name: "dinner" }]));
  }),
  rest.post("http://localhost:5000/order", (req, res, ctx) => {
    return res(
      ctx.json({
        options: [
          ["Insurance", 1],
          ["Dinner", 1],
          ["FirstClass", 1],
        ],
        products: [
          ["America", 1],
          ["England", 1],
          ["Germany", 1],
          ["Portland", 1],
        ],
        totals: { products: 4000, options: 1500, total: 5500 },
      })
    );
  }),
];
