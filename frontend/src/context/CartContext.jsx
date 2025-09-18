// src/context/CartContext.jsx
import { useState, useEffect, createContext, useContext } from "react";

// ✅ Create context
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    // Load cart from localStorage if available
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // ✅ Helper function to get a stable ID (works for id or _id)
  const getId = (product) => product.id || product._id;

  // ✅ Add product to cart
  const addToCart = (product, quantity = 1) => {
    setCartItems((prevCart) => {
      const existing = prevCart.find((item) => getId(item) === getId(product));
      if (existing) {
        return prevCart.map((item) =>
          getId(item) === getId(product)
            ? { ...item, qty: item.qty + quantity }
            : item
        );
      } else {
        return [...prevCart, { ...product, qty: quantity }];
      }
    });
  };

  // ✅ Update quantity
  const updateQuantity = (productId, qty) => {
    if (qty <= 0) {
      removeFromCart(productId);
    } else {
      setCartItems((prevCart) =>
        prevCart.map((item) =>
          getId(item) === productId ? { ...item, qty } : item
        )
      );
    }
  };

  // ✅ Remove item
  const removeFromCart = (productId) => {
    setCartItems((prevCart) =>
      prevCart.filter((item) => getId(item) !== productId)
    );
  };

  // ✅ Clear cart
  const clearCart = () => {
    setCartItems([]);
  };

  // ✅ Total items in cart
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.qty, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// ✅ Hook to use cart
export const useCart = () => {
  return useContext(CartContext);
};
