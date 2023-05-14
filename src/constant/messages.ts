export const messages = {
  utils: {
    invalidToken: "Access denied, invalid token",
    verifiedToken: "Verified token successfully",
  },
  controllers: {
    user: {
      createUserFailed:
        "Missing required parameters: :firstname, :lastname, :username, :password",
      getUserByIdFailed: "Missing required parameters: :id",
      updateUserFailed:
        "Missing required parameters: :firstname, :lastname, :id",
      deleteUserFailed: "Missing required parameters: :id",
      authenticateFailed: "Missing required parameters: :username, :password",
    },
    product: {
      createProductFailed: "Missing required parameters: :name, :price",
      getProductByIdFailed: "Missing required parameters: :id",
      updateProductFailed: "Missing required parameters: :name, :price, :id",
      deleteProductFailed: "Missing required parameters: :id",
    },
    order: {
      createOrderFailed:
        "Missing required parameters: :products, :status, :user_id",
      getOrderByIdFailed: "Missing required parameters: :id",
      updateOrderFailed:
        "Missing required parameters: :products, :status, :user_id",
      deleteOrderFailed: "Missing required parameters: :id",
    },
  },
};
