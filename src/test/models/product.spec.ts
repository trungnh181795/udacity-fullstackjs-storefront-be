import { ProductStore } from "../../models/products";
import { BaseProductInterface } from "../../types";

const productStore = new ProductStore();

describe("Product Model", () => {
  const product: BaseProductInterface = {
    name: "Mono",
    price: 2000,
  };

  async function createProduct(product: BaseProductInterface) {
    return productStore.createProduct(product);
  }

  async function deleteProduct(id: number) {
    return productStore.deleteProduct(id);
  }

  it("should have an index method", () => {
    expect(productStore.getAllProducts).toBeDefined();
  });

  it("should have a show method", () => {
    expect(productStore.getProductById).toBeDefined();
  });

  it("should have a add method", () => {
    expect(productStore.createProduct).toBeDefined();
  });

  it("should have a delete method", () => {
    expect(productStore.deleteProduct).toBeDefined();
  });

  it("should add a product", async () => {
    const { data: createdProduct } = await createProduct(product);
    expect(createdProduct).toEqual({
      id: createdProduct.id,
      ...product,
    });
    await deleteProduct(createdProduct.id);
  });

  it("should return a list of products", async () => {
    const { data: productList } = await productStore.getAllProducts();
    expect(productList).toEqual([
      {
        id: 1,
        name: "Shoes",
        price: 234,
      },
    ]);
  });

  it("should return the correct product", async () => {
    const { data: createdProduct } = await createProduct(product);
    const { data: productData } = await productStore.getProductById(
      createdProduct.id
    );
    expect(productData).toEqual(createdProduct);
    await deleteProduct(createdProduct.id);
  });

  it("should update the product", async () => {
    const { data: createdProduct } = await createProduct(product);
    const newProduct: BaseProductInterface = {
      name: "New Product List",
      price: 2423,
    };
    const {
      data: { name, price },
    } = await productStore.updateProductById(createdProduct.id, newProduct);
    expect(name).toEqual(newProduct.name);
    expect(price).toEqual(newProduct.price);
    await deleteProduct(createdProduct.id);
  });

  it("should remove the product", async () => {
    const { data: createdProduct } = await createProduct(product);
    expect(createdProduct).toEqual({
      id: createdProduct.id,
      name: "Mono",
      price: 2000,
    });
  });
});
