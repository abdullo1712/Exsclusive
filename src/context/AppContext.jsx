import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import {
  getToken,
  clearTokens,
  getUserDetail,
  getCartItems,
  getWishlist,
  addToCart,
  removeFromCart,
  addToWishlist,
  removeFromWishlist,
} from "../api/api";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [cartLoading, setCartLoading] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);

  const isLoggedIn = !!getToken() && !!user;

  // Load user on mount if token exists
  const loadUser = useCallback(async () => {
    if (!getToken()) return;
    try {
      const data = await getUserDetail();
      setUser(data);
    } catch {
      clearTokens();
      setUser(null);
    }
  }, []);

  const loadCart = useCallback(async () => {
    if (!getToken()) return;
    try {
      setCartLoading(true);
      const data = await getCartItems();
      setCart(Array.isArray(data) ? data : data.items || []);
    } catch {
      setCart([]);
    } finally {
      setCartLoading(false);
    }
  }, []);

  const loadWishlist = useCallback(async () => {
    if (!getToken()) return;
    try {
      setWishlistLoading(true);
      const data = await getWishlist();
      setWishlist(Array.isArray(data) ? data : data.items || []);
    } catch {
      setWishlist([]);
    } finally {
      setWishlistLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  useEffect(() => {
    if (getToken()) {
      loadCart();
      loadWishlist();
    }
  }, [loadCart, loadWishlist]);

  const handleAddToCart = async (product_id, quantity = 1) => {
    if (!getToken()) return { needLogin: true };
    try {
      await addToCart({ product_id, quantity });
      await loadCart();
      return { success: true };
    } catch (err) {
      return { error: err };
    }
  };

  const handleRemoveFromCart = async (product_id) => {
    try {
      await removeFromCart(product_id);
      await loadCart();
    } catch {}
  };

  const handleAddToWishlist = async (product_id) => {
    if (!getToken()) return { needLogin: true };
    try {
      await addToWishlist(product_id);
      await loadWishlist();
      return { success: true };
    } catch (err) {
      return { error: err };
    }
  };

  const handleRemoveFromWishlist = async (product_id) => {
    try {
      await removeFromWishlist(product_id);
      await loadWishlist();
    } catch {}
  };

  const isInWishlist = (product_id) =>
    wishlist.some((item) => (item.product?.id || item.id) === product_id);

  const logout = () => {
    clearTokens();
    setUser(null);
    setCart([]);
    setWishlist([]);
  };

  const onLoginSuccess = async () => {
    await loadUser();
    await loadCart();
    await loadWishlist();
  };

  const cartCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const wishlistCount = wishlist.length;

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        cart,
        wishlist,
        cartLoading,
        wishlistLoading,
        isLoggedIn,
        cartCount,
        wishlistCount,
        handleAddToCart,
        handleRemoveFromCart,
        handleAddToWishlist,
        handleRemoveFromWishlist,
        isInWishlist,
        logout,
        onLoginSuccess,
        loadCart,
        loadWishlist,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
