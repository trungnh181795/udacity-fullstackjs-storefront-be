import { defaultValues, specs } from "../../constant";
import { ProductStore } from "../../models/products";
import { BaseProductInterface } from "../../types";

const productStore = new ProductStore();

describe(specs.models.product.describe, () => {
  const product: BaseProductInterface = defaultValues.product;

  it(specs.models.product.it.haveGetAllProducts, () => {
    expect(productStore.getAllProducts).toBeDefined();
  });

  it(specs.models.product.it.haveCreateProduct, () => {
    expect(productStore.createProduct).toBeDefined();
  });

  it(specs.models.product.it.haveGetProductById, () => {
    expect(productStore.getProductById).toBeDefined();
  });

  it(specs.models.product.it.haveRemoveProduct, () => {
    expect(productStore.deleteProduct).toBeDefined();
  });

  it(specs.models.product.it.canReturnProducts, async () => {
    const { data: createdProduct } = await productStore.createProduct(product);
    const { data: productList } = await productStore.getAllProducts();
    expect(productList).toEqual([createdProduct]);
    await productStore.deleteProduct(createdProduct.id);
  });

  it(specs.models.product.it.canCreateProduct, async () => {
    const { data: createdProduct } = await productStore.createProduct(product);
    expect(createdProduct).toEqual({
      id: createdProduct.id,
      ...product,
    });
    await productStore.deleteProduct(createdProduct.id);
  });

  it(specs.models.product.it.canReturnProductById, async () => {
    const { data: createdProduct } = await productStore.createProduct(product);
    const { data: productData } = await productStore.getProductById(
      createdProduct.id
    );
    expect(productData).toEqual(createdProduct);
    await productStore.deleteProduct(createdProduct.id);
  });

  it(specs.models.product.it.canUpdateProduct, async () => {
    const { data: createdProduct } = await productStore.createProduct(product);
    const newProduct: BaseProductInterface = defaultValues.newProduct;
    const {
      data: { name, price },
    } = await productStore.updateProductById(createdProduct.id, newProduct);
    expect(name).toEqual(newProduct.name);
    expect(price).toEqual(newProduct.price);
    await productStore.deleteProduct(createdProduct.id);
  });

  it(specs.models.product.it.canRemoveProduct, async () => {
    const { data: createdProduct } = await productStore.createProduct(product);
    await productStore.deleteProduct(createdProduct.id);
    expect(createdProduct).toEqual({ id: createdProduct.id, ...product });
  });
});
