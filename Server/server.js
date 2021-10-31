const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(express.json());

const port = 5000;
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cors());

// use middleware to serve static images
app.use(express.static("public"));

// read data from file
const travelDataRaw = fs.readFileSync("./travel.json", "utf-8");
const travelData = JSON.parse(travelDataRaw);

app.get("/products", (req, res) => {
  res.json(travelData.countries);
});

app.get("/options", (req, res) => {
  res.json(travelData.options);
});

app.post("/order", (req, res) => {
  const orderNumber = Math.floor(Math.random() * 1000000);
  const { products, options } = req.body;
  let order = {
    price: req.body.totals.total,
    orderNumber,
    orderList: products.concat(options),
  };
  res.status(201).json(order);
});

if (require.main === module) {
  app.listen(port, () => console.log(`listening on port ${port}`));
}

module.exports = app;
