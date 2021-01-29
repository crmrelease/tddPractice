const productController = require("../../controller/products");
const productModel = require("../../models/Product.model");
const httpMocks = require("node-mocks-http");
const testProduct = require("../testData/new-product.json");

productModel.create = jest.fn();
//mock함수 생성
let req, res, next;

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = jest.fn();
});

describe("그룹화-예시", () => {
  test("two plus two is four", () => {
    //it나 test모두 사용가능
    expect(2 + 2).toBe(4);
  });

  test("two plus two is not five", () => {
    expect(2 + 2).not.toBe(5);
  });
});

describe("Product Controller create 테스트", () => {
  beforeEach(() => {
    req.body = testProduct;
    //테스트 데이터 임포트
  });
  it("product create 함수 테스트", () => {
    expect(typeof productController.createProduct).toBe("function");
  });
  it("product 모델 호출", async () => {
    await productController.createProduct(req, res, next);
    //createProduct라는 메소들가 호출이 될때
    expect(productModel.create).toBeCalled();
    //model.create라는 모델이 호출되는지=> 이때 실제 모델을 가지고 하려면 리소스가 많이 들어 mock함수 사용
    expect(productModel.create).toBeCalledWith(testProduct);
  });
  it("product return 코드 확인", async () => {
    await productController.createProduct(req, res, next);
    expect(res.statusCode).toBe(201);
    expect(res._isEndCalled()).toBeTruthy();
  });
  it("product 리턴값 테스트", async () => {
    productModel.create.mockReturnValue(testProduct);
    await productController.createProduct(req, res, next);
    expect(res._getJSONData()).toStrictEqual(testProduct);
    //return값이 testProduct와 같은지 확인
  });
  it("에러테스트", async () => {
    const errorMessage = { message: "에러났습니다" };
    const rejectedPromise = Promise.reject(errorMessage);
    productModel.create.mockReturnValue(rejectedPromise);
    //실제는 몽고db가 알아서 쏴주나, 우리는 의존성을 떼기 위해 만듦
    await productController.createProduct(req, res, next);
    expect(next).toBeCalledWith(errorMessage);
  });
});
