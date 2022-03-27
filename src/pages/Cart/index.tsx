import React from "react";
import {
  MdDelete,
  MdAddCircleOutline,
  MdRemoveCircleOutline,
} from "react-icons/md";
import { useCart } from "../../hooks/useCart";

// import { useCart } from '../../hooks/useCart';
// import { formatPrice } from '../../util/format';
import { Container, ProductTable, Total } from "./styles";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  amount: number;
}

const Cart = (): JSX.Element => {
  const { cart, removeProduct, updateProductAmount } = useCart();

  const cartFormatted = cart.map((product) => ({
    // TODO
  }));
  // const total =
  //   formatPrice(
  //     cart.reduce((sumTotal, product) => {
  //       // TODO
  //     }, 0)
  //   )

  function handleProductIncrement(product: Product) {
    // TODO
  }

  function handleProductDecrement(product: Product) {
    // TODO
    console.log("sim");
  }

  function handleRemoveProduct(productId: number) {
    // TODO
  }

  const totalPrice = cart.reduce((acc, productCart) => {
    return acc + productCart.price * productCart.amount;
  }, 0);

  return (
    <Container>
      <ProductTable>
        <thead>
          <tr>
            <th aria-label="product image" />
            <th>PRODUTO</th>
            <th>QTD</th>
            <th>SUBTOTAL</th>
            <th aria-label="delete icon" />
          </tr>
        </thead>
        <tbody>
          {cart.map((productCart) => {
            return (
              <tr data-testid="product" key={productCart.id}>
                <td>
                  <img src={productCart.image} alt={productCart.title} />
                </td>
                <td>
                  <strong>{productCart.title}</strong>
                  <span>
                    {new Intl.NumberFormat("pt-br", {
                      style: "currency",
                      currency: "BRL",
                    }).format(productCart.price)}
                  </span>
                </td>
                <td>
                  <div>
                    <button
                      type="button"
                      data-testid="decrement-product"
                      disabled={productCart.amount <= 1}
                      onClick={() => handleProductDecrement(productCart)}
                    >
                      <MdRemoveCircleOutline size={20} />
                    </button>
                    <input
                      type="text"
                      data-testid="product-amount"
                      readOnly
                      value={productCart.amount}
                    />
                    <button
                      type="button"
                      data-testid="increment-product"
                      onClick={() => handleProductIncrement(productCart)}
                    >
                      <MdAddCircleOutline size={20} />
                    </button>
                  </div>
                </td>
                <td>
                  <strong>
                    {new Intl.NumberFormat("pt-br", {
                      style: "currency",
                      currency: "BRL",
                    }).format(productCart.price * productCart.amount)}
                  </strong>
                </td>
                <td>
                  <button
                    type="button"
                    data-testid="remove-product"
                    onClick={() => handleRemoveProduct(productCart.id)}
                  >
                    <MdDelete size={20} />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </ProductTable>

      <footer>
        <button type="button">Finalizar pedido</button>

        <Total>
          <span>TOTAL</span>
          <strong>
            {new Intl.NumberFormat("pt-br", {
              style: "currency",
              currency: "BRL",
            }).format(totalPrice)}
          </strong>
        </Total>
      </footer>
    </Container>
  );
};

export default Cart;
