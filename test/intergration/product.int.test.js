const request = require("supertest");
const app = require("../../server");
const testProduct = require("../testData/new-product.json");
const mongoose = require("mongoose");
require("dotenv").config();

describe("Temp test", () => {
  beforeAll(async () => {
    await mongoose
      .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => console.log("몽고디비 연결완료"))
      .catch((e) => console.error(e));
  });

  it("POST product", async () => {
    const response = await request(app).post("/api/products").send(testProduct);
    expect(response.statusCode).toBe(201);
    expect(response.body.name).toBe(testProduct.name);
    expect(response.body.description).toBe(testProduct.description);
  });

  it("product 리턴 에러 코드 확인", async () => {
    const response = await request(app)
      .post("/api/products")
      .send({ name: "이름만 있어서 에러날껄" });
    expect(response.statusCode).toBe(500);
    expect(response.body).toStrictEqual({
      message:
        "Product validation failed: description: Path `description` is required.",
    });
  });

  let productIdVariable;

  it("product find", async () => {
    const response = await request(app).get("/api/products");
    expect(response.statusCode).toBe(201);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body[0].name).toBeDefined();
    expect(response.body[0].description).toBeDefined();
    productIdVariable = response.body[0];
  });

  it("product findbyId", async () => {
    const response = await request(app).get(
      "/api/products/" + productIdVariable._id
    );
    expect(response.statusCode).toBe(201);
    expect(response.body.name).toBe(productIdVariable.name);
    expect(response.body.description).toBe(productIdVariable.description);
  });

  it("product findbyId 아이디 없는경우", async () => {
    const response = await request(app).get(
      "/api/products/601371e6a49d02408451c27m"
    );
    expect(response.statusCode).toBe(500);
  });
  it("product findbyIdAndUpdate", async () => {
    const response = await request(app)
      .put("/api/products/" + productIdVariable._id)
      .send({ name: "태진", description: "호호호" });
    expect(response.statusCode).toBe(200);
    expect(response.body.updatedProduct.name).toBe("태진");
    expect(response.body.updatedProduct.description).toBe("호호호");
  });
});
