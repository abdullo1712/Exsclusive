const BASE_URL = "https://ecommercev01.pythonanywhere.com";

// Token helpers
export const getToken = () => localStorage.getItem("access_token");
export const getRefreshToken = () => localStorage.getItem("refresh_token");
export const setTokens = (access, refresh) => {
  localStorage.setItem("access_token", access);
  localStorage.setItem("refresh_token", refresh);
};
export const clearTokens = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("user");
};

// Image URL helper
export const imgUrl = (path) => {
  if (!path) return "/imgs/odam.png";
  if (path.startsWith("http")) return path;
  return `${BASE_URL}${path}`;
};

// Auth headers
const authHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${getToken()}`,
});

// Refresh access token
export const refreshAccessToken = async () => {
  const refresh = getRefreshToken();
  if (!refresh) return null;
  const res = await fetch(`${BASE_URL}/user/token-refresh/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh }),
  });
  if (!res.ok) {
    clearTokens();
    return null;
  }
  const data = await res.json();
  localStorage.setItem("access_token", data.access);
  return data.access;
};

// Generic fetch with auto token refresh
const apiFetch = async (url, options = {}) => {
  let res = await fetch(url, options);
  if (res.status === 401) {
    const newToken = await refreshAccessToken();
    if (newToken) {
      options.headers = { ...options.headers, Authorization: `Bearer ${newToken}` };
      res = await fetch(url, options);
    }
  }
  return res;
};

// ─── USER ───────────────────────────────────────────────────────────────────

export const registerUser = async ({ first_name, last_name, email_or_phone, password }) => {
  const res = await fetch(`${BASE_URL}/user/register/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ first_name, last_name, email_or_phone, password }),
  });
  const data = await res.json();
  if (!res.ok) throw data;
  return data;
};

export const loginUser = async ({ email_or_phone, password }) => {
  const res = await fetch(`${BASE_URL}/user/token/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email_or_phone, password }),
  });
  const data = await res.json();
  if (!res.ok) throw data;
  setTokens(data.access, data.refresh);
  return data;
};

export const getUserDetail = async () => {
  const res = await apiFetch(`${BASE_URL}/user/detail/`, {
    headers: authHeaders(),
  });
  const data = await res.json();
  if (!res.ok) throw data;
  return data;
};

export const updateProfile = async (profileData) => {
  const res = await apiFetch(`${BASE_URL}/user/update-profile/`, {
    method: "PATCH",
    headers: authHeaders(),
    body: JSON.stringify(profileData),
  });
  const data = await res.json();
  if (!res.ok) throw data;
  return data;
};

// ─── PRODUCTS ────────────────────────────────────────────────────────────────

export const getProducts = async () => {
  const res = await fetch(`${BASE_URL}/product/list/`);
  const data = await res.json();
  if (!res.ok) throw data;
  return data;
};

export const getProductDetail = async (product_id) => {
  const res = await fetch(`${BASE_URL}/product/detail/?product_id=${product_id}`);
  const data = await res.json();
  if (!res.ok) throw data;
  return data;
};

export const getCategories = async () => {
  const res = await fetch(`${BASE_URL}/product/categories/`);
  const data = await res.json();
  if (!res.ok) throw data;
  return data;
};

// ─── CART ────────────────────────────────────────────────────────────────────

export const getCartItems = async () => {
  const res = await apiFetch(`${BASE_URL}/order/cart-items/`, {
    headers: authHeaders(),
  });
  const data = await res.json();
  if (!res.ok) throw data;
  return data;
};

export const addToCart = async ({ product_id, quantity = 1 }) => {
  const res = await apiFetch(`${BASE_URL}/order/add-to-cart/`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({ product_id, quantity }),
  });
  const data = await res.json();
  if (!res.ok) throw data;
  return data;
};

export const removeFromCart = async (product_id) => {
  const res = await apiFetch(`${BASE_URL}/order/remove-from-cart`, {
    method: "DELETE",
    headers: authHeaders(),
    body: JSON.stringify({ product_id }),
  });
  if (res.status === 204) return { success: true };
  const data = await res.json();
  if (!res.ok) throw data;
  return data;
};

export const createOrder = async () => {
  const res = await apiFetch(`${BASE_URL}/order/create/`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({}),
  });
  const data = await res.json();
  if (!res.ok) throw data;
  return data;
};

export const getOrders = async () => {
  const res = await apiFetch(`${BASE_URL}/order/list/`, {
    headers: authHeaders(),
  });
  const data = await res.json();
  if (!res.ok) throw data;
  return data;
};

// ─── WISHLIST ────────────────────────────────────────────────────────────────

export const getWishlist = async () => {
  const res = await apiFetch(`${BASE_URL}/action/my-wishlist/`, {
    headers: authHeaders(),
  });
  const data = await res.json();
  if (!res.ok) throw data;
  return data;
};

export const addToWishlist = async (product_id) => {
  const res = await apiFetch(`${BASE_URL}/action/add-to-wishlist/`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({ product_id }),
  });
  const data = await res.json();
  if (!res.ok) throw data;
  return data;
};

export const removeFromWishlist = async (product_id) => {
  const res = await apiFetch(`${BASE_URL}/action/remove-from-wishlist/`, {
    method: "DELETE",
    headers: authHeaders(),
    body: JSON.stringify({ product_id }),
  });
  if (res.status === 204) return { success: true };
  const data = await res.json();
  if (!res.ok) throw data;
  return data;
};

// ─── REVIEWS ─────────────────────────────────────────────────────────────────

export const getProductReviews = async (product_id) => {
  const res = await apiFetch(`${BASE_URL}/action/product-reviews/?product_id=${product_id}`, {
    headers: authHeaders(),
  });
  const data = await res.json();
  if (!res.ok) throw data;
  return data;
};

export const submitReview = async ({ product_id, stars, comment }) => {
  const res = await apiFetch(`${BASE_URL}/action/submit-review/`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({ product_id, stars, comment }),
  });
  const data = await res.json();
  if (!res.ok) throw data;
  return data;
};
