const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8500;

app.use(cors({ credentials: true, origin: "*" }));
app.use(express.json());

app.use("/api/customers", require("./routes/customersRoutes"));
app.use("/api/manufacturers", require("./routes/manufacturersRoutes"));
app.use("/api/salesAssociates", require("./routes/salesAssociatesRoutes"));
app.use("/api/products", require("./routes/productsRoutes"));
app.use("/api/sales", require("./routes/salesRoutes"));
app.use("/api/salesDetails", require("./routes/salesDetailsRoutes"));
app.use("/api/reset", require("./routes/resetRoutes"));

const os = require("os");
const hostname = os.hostname();

app.listen(PORT, () => {
  console.log(`Server running:  http://${hostname}:${PORT}...`);
});
