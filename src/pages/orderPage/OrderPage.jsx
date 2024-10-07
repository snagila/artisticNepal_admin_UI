import { Alert, Container, Row, Stack } from "react-bootstrap";
import OrdersTable from "./OrdersTable";

const OrderPage = () => {
  //   // Dispatch action to create the new order
  //   dispatch(createOrderAction(newOrder));

  //   // Update product quantities
  //   newOrder.products.forEach((orderProduct) => {
  //     // Find the product to update
  //     const productToUpdate = products.find(
  //       (product) => product._id === orderProduct.productId
  //     );

  //     if (productToUpdate) {
  //       // Create the updated product object
  //       const updatedProduct = {
  //         ...productToUpdate,
  //         quantity: productToUpdate.quantity - orderProduct.quantity,
  //       };

  //       // Dispatch action to update the product quantity
  //       dispatch(updateProductAction(updatedProduct));
  //     }
  //   });

  //   console.log(newOrder);
  // };

  return (
    <Container>
      <Alert className="text-center bg-dark-subtle ">
        Handling Shipping and Orders Next pet project :)
      </Alert>
      <Row className="align-items-center mb-3"></Row>
      <Stack direction="vertical" gap={2} className="mt-2">
        <OrdersTable />
      </Stack>
    </Container>
  );
};

export default OrderPage;
