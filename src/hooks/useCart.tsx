import { createContext, ReactNode, useContext, useState } from "react";
import { toast } from "react-toastify";
import { api } from "../services/api";
import { Product, Stock } from "../types";

interface CartProviderProps {
  children: ReactNode;
}

interface UpdateProductAmount {
  productId: number;
  amount: number;
}

interface CartContextData {
  cart: Product[];
  addProduct: (productId: number) => Promise<void>;
  removeProduct: (productId: number) => void;
  updateProductAmount: ({ productId, amount }: UpdateProductAmount) => void;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({ children }: CartProviderProps): JSX.Element {
  const [cart, setCart] = useState<Product[]>([] as Product[]);

  const addProduct = async (productId: number) => {
    try {
      const products: Product[] = await api
        .get("products")
        .then((res) => res.data);

      if (cart.find((productCart) => productCart.id === productId)) {
        const cartAux = cart.filter((cart) => cart);
        const productIndex = cartAux.findIndex((cart) => cart.id === productId);
        cartAux[productIndex].amount++;
        setCart(cartAux);
        return;
      }

      const newProductCart = products.find(
        (product) => product.id === productId
      );

      if (!newProductCart) {
        window.alert("Product not found");
        return;
      }

      newProductCart.amount = 1;
      setCart([...cart, newProductCart]);
    } catch {
      console.log("Error in add product");
    }
  };

  const removeProduct = (productId: number) => {
    try {
      // TODO
    } catch {
      // TODO
    }
  };

  const updateProductAmount = async ({
    productId,
    amount,
  }: UpdateProductAmount) => {
    try {
      // TODO
    } catch {
      // TODO
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, addProduct, removeProduct, updateProductAmount }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextData {
  const context = useContext(CartContext);

  return context;
}
