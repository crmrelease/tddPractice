const express = require("express");

const PORT = 8111;
const HOST = "0.0.0.0";

const app = express();
const productRouters = require("./routes/route");
const mongoose = require("mongoose");
require("dotenv").config();

if (process.env.NODE_ENV !== "test") {
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("몽고디비 연결완료"))
    .catch((err) => console.log(err));
}

app.use(express.json());
app.use("/api/products", productRouters);

app.listen(PORT, HOST);
console.log(`${PORT} 실행중`);

//에러 핸들러가 필요
app.use((error, req, res, next) => {
  res.status(500).json({ message: error.message });
});

module.exports = app; //통합테스트 사용하도록
