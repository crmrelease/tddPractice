const express = require("express");

const PORT = 8111;
const HOST = "0.0.0.0";

const app = express();
const productRouters = require("./routes/route");
const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://taejin:taejin@cluster0.vqjyq.mongodb.net/tddPractice?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("몽고디비 연결완료"))
  .catch((err) => console.log(err));
app.use(express.json());
app.use("/api/products", productRouters);

app.listen(PORT, HOST);
console.log(`${PORT} 실행중`);
