// src/pages/main/CheckoutPage.jsx
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { ArrowLeft, ShoppingBag, ShoppingCart } from "lucide-react";
import { toast } from "react-toastify";
import { useCart } from "../../context/CartContext.jsx";
import "react-toastify/dist/ReactToastify.css";

export default function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems, addToCart, updateQuantity, removeFromCart, clearCart } =
    useCart(); // full cart context

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const toastShown = useRef(false);

  // Optional: single product passed from Buy Now
  const product = location.state?.product;
  const region = location.state?.region;
  const city = location.state?.city;
  const shippingFee = location.state?.shippingFee ?? 0;
  const variation = location.state?.variation || "Default";

  // Check user login & redirect if no product (for single buy)
  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);

    if (!cartItems.length && !product && !toastShown.current) {
      toastShown.current = true;
      toast.error("Please select a product to checkout.");
      navigate("/shop");
    }
  }, [cartItems, product, navigate]);

  const handlePlaceOrder = () => {
    if (!isLoggedIn) {
      toast.info("Please login to complete your purchase");
      navigate("/login", {
        state: { from: "checkout" },
      });
      return;
    }

    // For now: just simulate placing order
    toast.success("✅ Order placed successfully!");
    clearCart();
    navigate("/shop");
  };

  const handleAddToCart = (productToAdd) => {
    if (!isLoggedIn) {
      toast.info("Please login to add items to your cart");
      navigate("/login", {
        state: { from: "shop" },
      });
      return;
    }

    const productWithId = {
      ...productToAdd,
      id: productToAdd._id || productToAdd.id,
      variation,
    };

    addToCart(productWithId, 1);
    toast.success(`🛒 ${productToAdd.name} (${variation}) added to cart!`);
  };

  // If a single product exists, treat it as Buy Now
  const checkoutItems = product ? [product] : cartItems;

  // Calculate totals
  const subtotal = checkoutItems.reduce(
    (sum, item) => sum + item.price * (item.qty || 1),
    0
  );
  const totalCost = subtotal + (product ? shippingFee : 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 p-6 md:p-12">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden">
        <div className="p-6 border-b flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
          >
            <ArrowLeft /> Back to Shop
          </button>
          <h2 className="text-xl font-bold text-gray-800">Checkout</h2>
        </div>

        <div className="flex flex-col md:flex-row">
          {/* Product / Cart Items */}
          <div className="p-6 md:w-1/2 border-r space-y-4">
            {checkoutItems.map((item) => (
              <div
                key={item._id || item.id}
                className="flex items-center justify-between border p-4 rounded-lg"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-contain rounded"
                />
                <div className="flex-1 mx-4">
                  <p className="font-medium">{item.name}</p>
                  {item.variation && (
                    <p className="text-sm text-gray-500">Variation: {item.variation}</p>
                  )}
                  <p className="text-gray-700 mt-1">
                    ₱{item.price.toLocaleString()}
                  </p>
                </div>
                {product ? null : (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        updateQuantity(item._id || item.id, (item.qty || 1) - 1)
                      }
                      className="px-2 py-1 bg-gray-200 rounded"
                    >
                      -
                    </button>
                    <span>{item.qty || 1}</span>
                    <button
                      onClick={() =>
                        updateQuantity(item._id || item.id, (item.qty || 1) + 1)
                      }
                      className="px-2 py-1 bg-gray-200 rounded"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeFromCart(item._id || item.id)}
                      className="ml-2 text-red-500 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
            ))}

            {/* Single product Buy Now Add to Cart */}
            {product && !cartItems.includes(product) && (
              <button
                onClick={() => handleAddToCart(product)}
                className="mt-4 w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
              >
                <ShoppingCart className="inline mr-2" /> Add to Cart
              </button>
            )}
          </div>

          {/* Order summary */}
          <div className="p-6 md:w-1/2 space-y-4">
            <div>
              <h4 className="text-gray-700 font-medium">Shipping Info</h4>
              {product && (
                <>
                  <p className="text-sm text-gray-600">Region: {region}</p>
                  <p className="text-sm text-gray-600">City: {city}</p>
                  <p className="text-sm text-gray-600">
                    Shipping Fee: ₱{shippingFee}
                  </p>
                </>
              )}
            </div>

            <div className="mt-4 border-t pt-4">
              <h4 className="text-gray-700 font-medium mb-2">Order Summary</h4>
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>₱{subtotal.toLocaleString()}</span>
              </div>
              {product && (
                <div className="flex justify-between text-gray-600">
                  <span>Shipping Fee</span>
                  <span>₱{shippingFee}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-lg mt-2 text-gray-900">
                <span>Total</span>
                <span>₱{totalCost.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={handlePlaceOrder}
                className="flex-1 bg-green-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition"
              >
                <ShoppingBag className="inline mr-2" /> Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
