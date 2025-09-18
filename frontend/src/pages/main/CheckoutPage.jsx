// src/pages/main/CheckoutPage.jsx
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { ArrowLeft, ShoppingBag, ShoppingCart } from "lucide-react";
import { toast } from "react-toastify";
import { useCart } from "../../context/CartContext";
import { useUser } from "../../context/useUser";
import "react-toastify/dist/ReactToastify.css";

export default function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { addToCart } = useCart(); // ✅ use context directly
  const { isAuthenticated } = useUser?.() || { isAuthenticated: false };
  const toastShown = useRef(false); // ✅ prevent duplicate toast

  const product = location.state?.product;
  const region = location.state?.region;
  const city = location.state?.city;
  const shippingFee = location.state?.shippingFee ?? 0;
  const variation = location.state?.variation || "Default";

  useEffect(() => {
    if (!product && !toastShown.current) {
      toastShown.current = true; // ✅ only trigger once
      toast.error("Please select a product to checkout");
      navigate("/shop");
    }
  }, [product, navigate]);

  const handlePlaceOrder = () => {
    if (!isAuthenticated) {
      toast.info("Please login to complete your purchase");
      navigate("/login", {
        state: { from: "checkout", product, region, city, shippingFee, variation },
      });
      return;
    }

    // For now, just simulate placing order
    toast.success("✅ Order placed successfully!");
    navigate("/shop");
  };

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      toast.info("Please login to add items to your cart");
      navigate("/login", {
        state: { from: "shop", product, region, city, shippingFee, variation },
      });
      return;
    }

    // ✅ Ensure product has a proper id and variation
    const productWithId = {
      ...product,
      id: product._id || product.id, // fallback for MongoDB or mock data
      variation,
    };

    addToCart(productWithId, 1);
    toast.success(`🛒 ${product.name} (${variation}) added to cart!`);
  };

  if (!product) return null;

  const totalCost = product.price + shippingFee;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6 md:p-12">
      <div className="w-full max-w-5xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/50 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-200/70 dark:border-gray-700/70 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
          >
            <ArrowLeft className="w-5 h-5" /> Back
          </button>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Checkout</h2>
        </div>

        <div className="flex flex-col md:flex-row">
          {/* Product details */}
          <div className="p-6 md:w-1/2 border-b md:border-b-0 md:border-r border-gray-200/70 dark:border-gray-700/70">
            <div className="rounded-xl overflow-hidden bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
              <img
                src={product.image}
                alt={product.name}
                className="object-cover w-full h-64"
              />
            </div>
            <h3 className="text-2xl font-semibold mt-4 text-gray-900 dark:text-white">
              {product.name}
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Variation: <strong className="text-gray-700 dark:text-gray-300">{variation}</strong>
            </p>
            <p className="text-gray-900 dark:text-gray-100 mt-2 font-semibold text-lg">
              Price: ₱{product.price.toLocaleString()}
            </p>
          </div>

          {/* Order summary */}
          <div className="p-6 md:w-1/2 space-y-4">
            <div>
              <h4 className="text-gray-700 dark:text-gray-200 font-medium">Shipping Info</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Region: <strong className="text-gray-700 dark:text-gray-300">{region}</strong>
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                City: <strong className="text-gray-700 dark:text-gray-300">{city}</strong>
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Shipping Fee: ₱{shippingFee.toLocaleString?.() || shippingFee}
              </p>
            </div>

            <div className="mt-4 border-t border-gray-200/70 dark:border-gray-700/70 pt-4">
              <h4 className="text-gray-700 dark:text-gray-200 font-medium mb-2">Order Summary</h4>
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Item Price</span>
                <span>₱{product.price.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Shipping Fee</span>
                <span>₱{shippingFee.toLocaleString?.() || shippingFee}</span>
              </div>
              <div className="flex justify-between font-extrabold text-xl mt-2 text-gray-900 dark:text-white">
                <span>Total</span>
                <span>₱{totalCost.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <button
                onClick={handleAddToCart}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-white text-gray-800 dark:bg-gray-900 dark:text-gray-200 border border-gray-200 dark:border-gray-700 py-3 rounded-xl text-base font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <ShoppingCart className="w-5 h-5" /> Add to Cart
              </button>
              <button
                onClick={handlePlaceOrder}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-pink-600 text-white py-3 rounded-xl text-base font-semibold hover:bg-pink-700 transition-colors"
              >
                <ShoppingBag className="w-5 h-5" /> Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
