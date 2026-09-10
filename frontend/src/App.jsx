import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Navigate,
  useParams,
  useNavigate,
} from "react-router-dom";

import { useEffect, useState } from "react";
import API from "./services/api";

// ==================== NAVBAR ====================

function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = () => {
      const storedUser = localStorage.getItem("user");

      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        setUser(null);
      }
    };

    loadUser();

    window.addEventListener("login", loadUser);

    return () => {
      window.removeEventListener("login", loadUser);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);

    window.location.href = "/";
  };

 return (
  <nav
    style={{
      width: "100%",
      background: "#ffffff",
      borderBottom: "1px solid #e5e5e5",
      padding: "16px 50px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      boxSizing: "border-box",
      position: "sticky",
      top: 0,
      zIndex: 1000,
      boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
    }}
  >
    {/* ==================== LOGO ==================== */}

    <Link
      to="/"
      style={{
        textDecoration: "none",
        color: "#e63946",
        fontSize: "28px",
        fontWeight: "800",
      }}
    >
      TastyBites
    </Link>

    {/* ==================== NAVIGATION ==================== */}

    <div
      style={{
        display: "flex",
        gap: "28px",
        alignItems: "center",
      }}
    >
      <Link
        to="/"
        style={{
          textDecoration: "none",
          color: "#333",
          fontWeight: "600",
          fontSize: "16px",
        }}
      >
        Home
      </Link>

      {!user ? (
        <>
          <Link
            to="/login"
            style={{
              textDecoration: "none",
              color: "#333",
              fontWeight: "600",
            }}
          >
            Login
          </Link>

          <Link
            to="/register"
            style={{
              textDecoration: "none",
              color: "#333",
              fontWeight: "600",
            }}
          >
            Register
          </Link>

          <Link
            to="/admin/login"
            style={{
              textDecoration: "none",
              color: "#e63946",
              fontWeight: "600",
            }}
          >
            Admin Login
          </Link>
        </>
      ) : (
        <>
          <Link
            to="/cart"
            style={{
              textDecoration: "none",
              color: "#333",
              fontWeight: "600",
            }}
          >
            🛒 Cart
          </Link>

          <Link
            to="/my-orders"
            style={{
              textDecoration: "none",
              color: "#333",
              fontWeight: "600",
            }}
          >
            📦 My Orders
          </Link>

          {/* Admin Dashboard */}

          {user.role === "admin" && (
            <Link
              to="/admin/dashboard"
              style={{
                textDecoration: "none",
                color: "#e63946",
                fontWeight: "700",
              }}
            >
              ⚙️ Admin Dashboard
            </Link>
          )}

          <span
            style={{
              color: "#444",
              fontWeight: "600",
            }}
          >
            Welcome, {user.name}
          </span>

          <button
            onClick={handleLogout}
            style={{
              padding: "10px 20px",
              border: "none",
              borderRadius: "8px",
              background: "#e63946",
              color: "#fff",
              fontWeight: "700",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </>
      )}
    </div>
  </nav>
);
}
// ==================== HOME ====================

function Home() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await API.get("/menu");

        console.log("Menu response:", response.data);

        setMenuItems(response.data || []);
      } catch (error) {
        console.error("Menu fetch error:", error);

        setError("Failed to load menu items");
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  // ==================== LOADING ====================

  if (loading) {
    return (
      <div
        style={{
          padding: "40px",
          textAlign: "center",
        }}
      >
        <h2>Loading Menu...</h2>
      </div>
    );
  }

  // ==================== ERROR ====================

  if (error) {
    return (
      <div
        style={{
          padding: "40px",
          textAlign: "center",
        }}
      >
        <h2 style={{ color: "red" }}>
          {error}
        </h2>
      </div>
    );
  }

  // ==================== HOME ====================

  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "40px auto",
        padding: "20px",
      }}
    >
 
      {/* ==================== HERO SECTION ==================== */}

<div
  style={{
    background:
      "linear-gradient(135deg, #e63946, #ff6b35)",
    borderRadius: "20px",
    padding: "50px 40px",
    marginBottom: "50px",
    textAlign: "center",
    color: "#fff",
    boxShadow:
      "0 8px 25px rgba(0,0,0,0.18)",
  }}
>
  <h1
    style={{
      fontSize: "42px",
      margin: "0 0 15px",
    }}
  >
    Welcome to TastyBites 🍽️
  </h1>

  <p
    style={{
      fontSize: "20px",
      margin: "0 auto 25px",
      maxWidth: "650px",
      lineHeight: "1.6",
    }}
  >
    Delicious food, fresh ingredients and
    unforgettable taste — all in one place.
  </p>

  <a
    href="#menu"
    style={{
      display: "inline-block",
      padding: "12px 28px",
      background: "#fff",
      color: "#e63946",
      borderRadius: "8px",
      textDecoration: "none",
      fontWeight: "700",
      fontSize: "16px",
    }}
  >
    Explore Our Menu
  </a>
</div>
                             {/* ==================== MENU TITLE ==================== */}

<h1
  id="menu"
  style={{
    textAlign: "center",
    fontSize: "36px",
    marginTop: "50px",
    marginBottom: "10px",
  }}
>
  Our Menu
</h1>

      {menuItems.length === 0 && (
        <p
          style={{
            textAlign: "center",
            marginTop: "30px",
          }}
        >
          No menu items available.
        </p>
      )}

      {menuItems.length > 0 && (
        <div
          style={{
            display: "grid",
           gridTemplateColumns: "repeat(3, 1fr)",
            gap: "30px",
            marginTop: "30px",
          }}
        >

          {menuItems.map((item) => {
            const imageUrl = item.image?.startsWith("http")
              ? item.image
              : `http://localhost:5000${item.image}`;

            return (
              <div
                key={item._id}
                style={{
  background: "#fff",
  borderRadius: "16px",
  overflow: "hidden",
  border: "1px solid #eee",
  boxShadow: "0 5px 18px rgba(0,0,0,0.10)",
  transition: "transform 0.25s ease, box-shadow 0.25s ease",
}}
onMouseEnter={(e) => {
  e.currentTarget.style.transform = "translateY(-8px)";
  e.currentTarget.style.boxShadow =
    "0 12px 28px rgba(0,0,0,0.18)";
}}

onMouseLeave={(e) => {
  e.currentTarget.style.transform = "translateY(0)";
  e.currentTarget.style.boxShadow =
    "0 5px 18px rgba(0,0,0,0.10)";
}}
              >

                {/* ==================== IMAGE ==================== */}

                {item.image && (
                  <img
                    src={imageUrl}
                    alt={item.name}
                    style={{
                      width: "100%",
                      height: "210px",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                )}

                {/* ==================== CARD CONTENT ==================== */}

                <div
                  style={{
                    padding: "20px",
                  }}
                >
                  {/* Name */}

                  <h3
                    style={{
                      margin: "0 0 10px",
                      fontSize: "22px",
                      color: "#222",
                    }}
                  >
                    {item.name}
                  </h3>

                  {/* Description */}

                  <p
                    style={{
                      color: "#666",
                      lineHeight: "1.5",
                      minHeight: "48px",
                      margin: "0 0 12px",
                    }}
                  >
                    {item.description}
                  </p>

                  {/* Category */}

                  <p
                    style={{
                      margin: "8px 0",
                      color: "#777",
                      fontSize: "14px",
                    }}
                  >
                    Category:{" "}
                    <strong
                      style={{
                        color: "#e63946",
                      }}
                    >
                      {item.category}
                    </strong>
                  </p>

                  {/* ==================== PRICE + AVAILABILITY ==================== */}

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginTop: "15px",
                    }}
                  >
                    <h3
                      style={{
                        margin: 0,
                        color: "#e63946",
                        fontSize: "22px",
                      }}
                    >
                      ₹{item.price}
                    </h3>

                    <span
                      style={{
                        padding: "5px 10px",
                        borderRadius: "20px",
                        fontSize: "13px",
                        fontWeight: "600",
                        background: item.available
                          ? "#e8f7ee"
                          : "#fdeaea",
                        color: item.available
                          ? "#218838"
                          : "#dc3545",
                      }}
                    >
                      {item.available
                        ? "Available"
                        : "Not Available"}
                    </span>
                  </div>

                  {/* ==================== VIEW DETAILS ==================== */}

                  <Link
                  to={`/menu/${item._id}`}
                    style={{
  display: "block",
  textAlign: "center",
  marginTop: "18px",
  padding: "11px",
  borderRadius: "8px",
  background: "#e63946",
  color: "#fff",
  textDecoration: "none",
  fontWeight: "600",
  transition: "0.2s ease",
}}
onMouseEnter={(e) => {
  e.currentTarget.style.background = "#c92f3b";
  e.currentTarget.style.transform = "scale(1.02)";
}}

onMouseLeave={(e) => {
  e.currentTarget.style.background = "#e63946";
  e.currentTarget.style.transform = "scale(1)";
}}
                  >
                    View Details
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
      
// ==================== MENU DETAILS ====================
// ================= MENU DETAILS =================

function MenuDetails() {
  const { id } = useParams();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);
const [cartMessage, setCartMessage] = useState("");

  useEffect(() => {
    const fetchMenuItem = async () => {
      try {
        const response = await API.get(`/menu/${id}`);

        console.log("Menu details:", response.data);

        setItem(response.data);
      } catch (error) {
        console.error("Menu details error:", error);
        setError("Failed to load menu item");
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItem();
  }, [id]);
  // Loading

  if (loading) {
    return (
      <h2 style={{ padding: "40px" }}>
        Loading...
      </h2>
    );
  }

  // Error

  if (error) {
    return (
      <h2
        style={{
          padding: "40px",
          color: "red",
        }}
      >
        {error}
      </h2>
    );
  }

  // Not Found

  if (!item) {
    return (
      <h2 style={{ padding: "40px" }}>
        Menu item not found
      </h2>
    );
  }

  // Image URL

 const imageUrl = item.image?.startsWith("http")
  ? item.image
  : `http://localhost:5000${item.image}`;
 return (
  <div
    style={{
      minHeight: "100vh",
      padding: "50px 20px",
      boxSizing: "border-box",
    }}
  >
    <div
      style={{
        maxWidth: "1000px",
        margin: "0 auto",
        background: "#fff",
        borderRadius: "20px",
        overflow: "hidden",
        boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
      }}
    >
      {/* ==================== IMAGE ==================== */}

      <div
        style={{
          minHeight: "500px",
        }}
      >
        {item.image && (
          <img
            src={imageUrl}
            alt={item.name}
            style={{
              width: "100%",
              height: "100%",
              minHeight: "500px",
              objectFit: "cover",
              display: "block",
            }}
          />
        )}
      </div>

      {/* ==================== DETAILS ==================== */}

      <div
        style={{
          padding: "45px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            color: "#e63946",
            fontWeight: "700",
            fontSize: "14px",
            textTransform: "uppercase",
            marginBottom: "10px",
          }}
        >
          {item.category}
        </span>

        <h1
          style={{
            fontSize: "36px",
            margin: "0 0 15px",
            color: "#222",
          }}
        >
          {item.name}
        </h1>

        <p
          style={{
            color: "#666",
            lineHeight: "1.7",
            fontSize: "16px",
            marginBottom: "20px",
          }}
        >
          {item.description}
        </p>

        {/* Price */}

        <h2
          style={{
            color: "#e63946",
            fontSize: "30px",
            margin: "10px 0",
          }}
        >
          ₹{item.price}
        </h2>

        {/* Availability */}

        <div
          style={{
            marginTop: "10px",
          }}
        >
          <span
            style={{
              display: "inline-block",
              padding: "7px 14px",
              borderRadius: "20px",
              fontSize: "14px",
              fontWeight: "700",
              background: item.available
                ? "#e8f7ee"
                : "#fdeaea",
              color: item.available
                ? "#218838"
                : "#dc3545",
            }}
          >
            {item.available
              ? "✓ Available"
              : "✕ Not Available"}
          </span>
        </div>

        {/* ==================== QUANTITY ==================== */}

        <div
          style={{
            marginTop: "25px",
          }}
        >
          <strong>Quantity</strong>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "15px",
              marginTop: "10px",
            }}
          >
            <button
              type="button"
              onClick={() =>
                setQuantity((prev) =>
                  Math.max(1, prev - 1)
                )
              }
              style={{
  width: "42px",
  height: "42px",
  border: "1px solid #ddd",
  borderRadius: "8px",
  background: "#f5f5f5",
  color: "#222",
  cursor: "pointer",
  fontSize: "22px",
  fontWeight: "700",
}}
            >
              −
            </button>

            <strong
              style={{
                fontSize: "18px",
                minWidth: "25px",
                textAlign: "center",
              }}
            >
              {quantity}
            </strong>

            <button
              type="button"
              onClick={() =>
                setQuantity((prev) => prev + 1)
              }
              style={{
  width: "42px",
  height: "42px",
  border: "1px solid #ddd",
  borderRadius: "8px",
  background: "#f5f5f5",
  color: "#222",
  cursor: "pointer",
  fontSize: "22px",
  fontWeight: "700",
}}
            >
              +
            </button>
          </div>
        </div>

        {/* ==================== ADD TO CART ==================== */}

        <button
          type="button"
          disabled={!item.available}
          onClick={() => {
            const existingCart =
              JSON.parse(
                localStorage.getItem("cart")
              ) || [];

            const existingItemIndex =
              existingCart.findIndex(
                (cartItem) =>
                  cartItem.menuItem === item._id
              );

            if (existingItemIndex !== -1) {
              existingCart[
                existingItemIndex
              ].quantity += quantity;
            } else {
              existingCart.push({
                menuItem: item._id,
                name: item.name,
                price: item.price,
                image: item.image,
                quantity: quantity,
              });
            }

            localStorage.setItem(
              "cart",
              JSON.stringify(existingCart)
            );

            setCartMessage(
              "Item added to cart!"
            );
          }}
          style={{
            marginTop: "25px",
            padding: "14px",
            border: "none",
            borderRadius: "9px",
            background: item.available
              ? "#e63946"
              : "#999",
            color: "#fff",
            fontWeight: "700",
            fontSize: "16px",
            cursor: item.available
              ? "pointer"
              : "not-allowed",
          }}
        >
          {item.available
            ? "🛒 Add to Cart"
            : "Not Available"}
        </button>

        {/* Success Message */}

        {cartMessage && (
          <p
            style={{
              color: "#218838",
              textAlign: "center",
              marginTop: "15px",
              fontWeight: "600",
            }}
          >
            ✓ {cartMessage}
          </p>
        )}

        {/* Back */}

        <button
          type="button"
          onClick={() => window.history.back()}
          style={{
            marginTop: "12px",
            padding: "12px",
            border: "1px solid #ddd",
            borderRadius: "9px",
            background: "#fff",
            color: "#333",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          ← Back to Menu
        </button>
      </div>
    </div>
  </div>
);
}
// ==================== CART ====================

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const storedCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    setCartItems(storedCart);
  }, []);

  // Increase quantity
  const increaseQuantity = (id) => {
    const updatedCart = cartItems.map((item) =>
      item.menuItem === id
        ? {
            ...item,
            quantity: item.quantity + 1,
          }
        : item
    );

    setCartItems(updatedCart);
    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );
  };

  // Decrease quantity
  const decreaseQuantity = (id) => {
    const updatedCart = cartItems
      .map((item) =>
        item.menuItem === id
          ? {
              ...item,
              quantity: item.quantity - 1,
            }
          : item
      )
      .filter((item) => item.quantity > 0);

    setCartItems(updatedCart);
    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );
  };

  // Remove item
  const removeItem = (id) => {
    const updatedCart = cartItems.filter(
      (item) => item.menuItem !== id
    );

    setCartItems(updatedCart);
    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

    setMessage("Item removed from cart.");
  };

  // Calculate total
  const totalAmount = cartItems.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );
  // Place Order
const placeOrder = async () => {
  try {
    setMessage("");

    const token = localStorage.getItem("token");

    if (!token) {
      setMessage("Please login first.");
      return;
    }

    const orderData = {
      items: cartItems.map((item) => ({
        menuItem: item.menuItem,
        quantity: item.quantity,
      })),
    };

    const response = await API.post(
      "/orders",
      orderData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(
      "Order response:",
      response.data
    );

    // Clear cart
    localStorage.removeItem("cart");
    setCartItems([]);

    setMessage(
      "Order placed successfully!"
    );

  } catch (err) {
    console.error(
      "Place order error:",
      err
    );

    setMessage(
      err.response?.data?.message ||
      "Failed to place order."
    );
  }
};
return (
  <div
    style={{
      minHeight: "calc(100vh - 75px)",
      padding: "55px 20px 80px",
      boxSizing: "border-box",
    }}
  >
    {/* ==================== CART HEADER ==================== */}

    <div
      style={{
        textAlign: "center",
        marginBottom: "35px",
      }}
    >
      <div
        style={{
          fontSize: "42px",
          marginBottom: "8px",
        }}
      >
        🛒
      </div>

      <h1
        style={{
          margin: 0,
          fontSize: "42px",
          fontWeight: "750",
          color: "#ffffff",
        }}
      >
        My Cart
      </h1>

      <p
        style={{
          marginTop: "10px",
          color: "#c7c7d1",
          fontSize: "15px",
        }}
      >
        Review your items before placing the order
      </p>
    </div>

    {/* ==================== EMPTY CART ==================== */}

    {cartItems.length === 0 ? (
      <div
        style={{
          maxWidth: "700px",
          margin: "0 auto",
          padding: "50px 30px",
          background: "#ffffff",
          borderRadius: "18px",
          textAlign: "center",
          boxShadow: "0 12px 35px rgba(0,0,0,0.20)",
        }}
      >
        <div
          style={{
            fontSize: "55px",
            marginBottom: "15px",
          }}
        >
          🛒
        </div>

        <h2
          style={{
            color: "#222",
            marginBottom: "10px",
          }}
        >
          Your cart is empty.
        </h2>

        <p
          style={{
            color: "#777",
            fontSize: "15px",
          }}
        >
          Add some delicious food items to your cart.
        </p>
      </div>
    ) : (
      <>
        {/* ==================== CART ITEMS ==================== */}

        <div
          style={{
            maxWidth: "950px",
            margin: "0 auto",
          }}
        >
          {cartItems.map((item) => {
            const imageUrl = item.image?.startsWith("http")
              ? item.image
              : `http://localhost:5000${item.image}`;

            return (
              <div
                key={item.menuItem}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "25px",
                  background: "#ffffff",
                  borderRadius: "16px",
                  padding: "20px",
                  marginBottom: "18px",
                  boxShadow:
                    "0 8px 25px rgba(0,0,0,0.18)",
                  boxSizing: "border-box",
                }}
              >
                {/* ==================== IMAGE ==================== */}

                {item.image && (
                  <img
                    src={imageUrl}
                    alt={item.name}
                    style={{
                      width: "125px",
                      height: "110px",
                      objectFit: "cover",
                      borderRadius: "12px",
                      flexShrink: 0,
                    }}
                  />
                )}

                {/* ==================== ITEM DETAILS ==================== */}

                <div
                  style={{
                    flex: 1,
                    minWidth: 0,
                  }}
                >
                  <h2
                    style={{
                      margin: "0 0 10px",
                      color: "#222",
                      fontSize: "24px",
                      fontWeight: "700",
                    }}
                  >
                    {item.name}
                  </h2>

                  <p
                    style={{
                      color: "#666",
                      marginBottom: "6px",
                      fontSize: "15px",
                    }}
                  >
                    Price: ₹{item.price}
                  </p>

                  <p
                    style={{
                      color: "#e63946",
                      fontWeight: "700",
                      marginBottom: "12px",
                      fontSize: "15px",
                    }}
                  >
                    Subtotal: ₹
                    {item.price * item.quantity}
                  </p>

                  {/* ==================== QUANTITY ==================== */}

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        decreaseQuantity(
                          item.menuItem
                        )
                      }
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "8px",
                        background: "#f1f1f1",
                        color: "#222",
                        fontSize: "18px",
                        fontWeight: "700",
                        cursor: "pointer",
                      }}
                    >
                      -
                    </button>

                    <strong
                      style={{
                        minWidth: "25px",
                        textAlign: "center",
                        color: "#222",
                        fontSize: "16px",
                      }}
                    >
                      {item.quantity}
                    </strong>

                    <button
                      type="button"
                      onClick={() =>
                        increaseQuantity(
                          item.menuItem
                        )
                      }
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "8px",
                        background: "#e63946",
                        color: "#ffffff",
                        fontSize: "18px",
                        fontWeight: "700",
                        cursor: "pointer",
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* ==================== REMOVE ==================== */}

                <button
                  type="button"
                  onClick={() =>
                    removeItem(item.menuItem)
                  }
                  style={{
                    padding: "10px 18px",
                    borderRadius: "9px",
                    background: "#f1f1f1",
                    color: "#e63946",
                    fontWeight: "600",
                    cursor: "pointer",
                    flexShrink: 0,
                  }}
                >
                  Remove
                </button>
              </div>
            );
          })}

          {/* ==================== TOTAL & PLACE ORDER ==================== */}

          <div
            style={{
              marginTop: "30px",
              background: "#ffffff",
              borderRadius: "16px",
              padding: "25px 30px",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              gap: "25px",
              boxShadow:
                "0 8px 25px rgba(0,0,0,0.18)",
            }}
          >
            <h2
              style={{
                margin: 0,
                color: "#222",
                fontSize: "27px",
              }}
            >
              Total:{" "}
              <span
                style={{
                  color: "#e63946",
                }}
              >
                ₹{totalAmount}
              </span>
            </h2>

            <button
              type="button"
              onClick={placeOrder}
              style={{
                padding: "13px 25px",
                borderRadius: "9px",
                background:
                  "linear-gradient(135deg, #e63946, #ff633f)",
                color: "#ffffff",
                fontSize: "15px",
                fontWeight: "700",
                cursor: "pointer",
                boxShadow:
                  "0 5px 15px rgba(230,57,70,0.30)",
              }}
            >
              🛍️ Place Order
            </button>
          </div>
        </div>
      </>
    )}

    {/* ==================== MESSAGE ==================== */}

    {message && (
      <p
        style={{
          color: "#ffffff",
          background: "rgba(255,255,255,0.12)",
          maxWidth: "500px",
          margin: "25px auto 0",
          padding: "12px 18px",
          borderRadius: "8px",
          textAlign: "center",
          fontSize: "15px",
        }}
      >
        {message}
      </p>
    )}
  </div>
);
}
// ==================== MY ORDERS ====================

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("Please login first.");
          setLoading(false);
          return;
        }

        const response = await API.get(
          "/orders/my-orders",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(
          "My Orders:",
          response.data
        );

        setOrders(
          response.data.orders || []
        );
      } catch (err) {
        console.error(
          "My orders error:",
          err
        );

        setError(
          err.response?.data?.message ||
          "Failed to load orders."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // ==================== LOADING ====================

  if (loading) {
    return (
      <div
        style={{
          minHeight: "calc(100vh - 75px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: "40px",
          boxSizing: "border-box",
        }}
      >
        <div>
          <div
            style={{
              fontSize: "45px",
              marginBottom: "12px",
            }}
          >
            📦
          </div>

          <h2
            style={{
              color: "#ffffff",
              margin: 0,
            }}
          >
            Loading Orders...
          </h2>
        </div>
      </div>
    );
  }

  // ==================== ERROR ====================

  if (error) {
    return (
      <div
        style={{
          minHeight: "calc(100vh - 75px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "40px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            background: "#ffffff",
            padding: "35px",
            borderRadius: "16px",
            textAlign: "center",
            maxWidth: "500px",
            width: "100%",
            boxShadow:
              "0 10px 30px rgba(0,0,0,0.2)",
          }}
        >
          <div
            style={{
              fontSize: "45px",
              marginBottom: "10px",
            }}
          >
            ⚠️
          </div>

          <h2
            style={{
              color: "#e63946",
              margin: 0,
            }}
          >
            {error}
          </h2>
        </div>
      </div>
    );
  }

  // ==================== MAIN PAGE ====================

  return (
    <div
      style={{
        minHeight: "calc(100vh - 75px)",
        padding: "55px 20px 80px",
        boxSizing: "border-box",
      }}
    >
      {/* ==================== PAGE HEADER ==================== */}

      <div
        style={{
          textAlign: "center",
          marginBottom: "35px",
        }}
      >
        <div
          style={{
            fontSize: "42px",
            marginBottom: "8px",
          }}
        >
          📦
        </div>

        <h1
          style={{
            margin: 0,
            color: "#ffffff",
            fontSize: "42px",
            fontWeight: "750",
          }}
        >
          My Orders
        </h1>

        <p
          style={{
            marginTop: "10px",
            color: "#d0cfe0",
            fontSize: "15px",
          }}
        >
          Track your orders and view order details
        </p>
      </div>

      {/* ==================== NO ORDERS ==================== */}

      {orders.length === 0 ? (
        <div
          style={{
            maxWidth: "650px",
            margin: "0 auto",
            background: "#ffffff",
            padding: "45px 30px",
            borderRadius: "18px",
            textAlign: "center",
            boxShadow:
              "0 12px 35px rgba(0,0,0,0.22)",
          }}
        >
          <div
            style={{
              fontSize: "55px",
              marginBottom: "15px",
            }}
          >
            📦
          </div>

          <h2
            style={{
              margin: "0 0 10px",
              color: "#222222",
            }}
          >
            No Orders Yet
          </h2>

          <p
            style={{
              color: "#777777",
              fontSize: "15px",
            }}
          >
            You have no orders yet.
          </p>
        </div>
      ) : (
        /* ==================== ORDER LIST ==================== */

        <div
          style={{
            maxWidth: "950px",
            margin: "0 auto",
          }}
        >
          {orders.map((order) => (
            <div
              key={order._id}
              style={{
                background: "#ffffff",
                borderRadius: "18px",
                padding: "25px 28px",
                marginBottom: "22px",
                boxShadow:
                  "0 10px 30px rgba(0,0,0,0.20)",
                boxSizing: "border-box",
              }}
            >
              {/* ==================== ORDER HEADER ==================== */}

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "20px",
                  flexWrap: "wrap",
                  paddingBottom: "18px",
                  borderBottom:
                    "1px solid #eeeeee",
                }}
              >
                <div>
                  <p
                    style={{
                      margin: "0 0 6px",
                      color: "#777777",
                      fontSize: "13px",
                      fontWeight: "600",
                    }}
                  >
                    ORDER ID
                  </p>

                  <h2
                    style={{
                      margin: 0,
                      color: "#222222",
                      fontSize: "20px",
                      fontWeight: "700",
                      wordBreak: "break-all",
                    }}
                  >
                    {order._id}
                  </h2>
                </div>

                {/* ==================== STATUS BADGE ==================== */}

                <div
                  style={{
                    padding: "9px 16px",
                    borderRadius: "20px",
                    background:
                      order.status ===
                      "Delivered"
                        ? "#e8f8ee"
                        : order.status ===
                          "Cancelled"
                        ? "#fdeaea"
                        : order.status ===
                          "Out for Delivery"
                        ? "#fff4df"
                        : "#eeeafe",

                    color:
                      order.status ===
                      "Delivered"
                        ? "#16833b"
                        : order.status ===
                          "Cancelled"
                        ? "#d62828"
                        : order.status ===
                          "Out for Delivery"
                        ? "#c77700"
                        : "#5b3cc4",

                    fontWeight: "700",
                    fontSize: "14px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {order.status}
                </div>
              </div>

              {/* ==================== ORDER INFO ==================== */}

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fit, minmax(180px, 1fr))",
                  gap: "18px",
                  marginTop: "22px",
                  marginBottom: "22px",
                }}
              >
                {/* STATUS */}

                <div
                  style={{
                    background: "#f8f8fa",
                    padding: "15px",
                    borderRadius: "12px",
                  }}
                >
                  <p
                    style={{
                      color: "#777777",
                      fontSize: "13px",
                      marginBottom: "5px",
                    }}
                  >
                    Status
                  </p>

                  <strong
                    style={{
                      color: "#222222",
                      fontSize: "15px",
                    }}
                  >
                    {order.status}
                  </strong>
                </div>

                {/* TOTAL */}

                <div
                  style={{
                    background: "#fff5f5",
                    padding: "15px",
                    borderRadius: "12px",
                  }}
                >
                  <p
                    style={{
                      color: "#777777",
                      fontSize: "13px",
                      marginBottom: "5px",
                    }}
                  >
                    Total Amount
                  </p>

                  <strong
                    style={{
                      color: "#e63946",
                      fontSize: "18px",
                    }}
                  >
                    ₹{order.totalAmount}
                  </strong>
                </div>
              </div>

              {/* ==================== ITEMS ==================== */}

              <div>
                <h3
                  style={{
                    margin: "0 0 15px",
                    color: "#222222",
                    fontSize: "18px",
                  }}
                >
                  🍽️ Items
                </h3>

                {order.items?.map(
                  (item) => (
                    <div
                      key={item._id}
                      style={{
                        display: "flex",
                        justifyContent:
                          "space-between",
                        alignItems: "center",
                        gap: "15px",
                        padding:
                          "13px 15px",
                        marginBottom: "10px",
                        background: "#fafafa",
                        borderRadius: "10px",
                        border:
                          "1px solid #eeeeee",
                      }}
                    >
                      <p
                        style={{
                          margin: 0,
                          color: "#333333",
                          fontSize: "15px",
                          fontWeight: "600",
                        }}
                      >
                        {item.menuItem?.name ||
                          "Unknown Item"}{" "}
                        × {item.quantity}
                      </p>

                      <p
                        style={{
                          margin: 0,
                          color: "#e63946",
                          fontWeight: "700",
                          whiteSpace:
                            "nowrap",
                        }}
                      >
                        ₹{item.price}
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ==================== LOGIN ====================

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    const trimmedEmail = email.trim();

    // Email validation
    if (!trimmedEmail) {
      setError("Email is required");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setError("Please enter a valid email address");
      return;
    }

    // Password validation
    if (!password) {
      setError("Password is required");
      return;
    }

    try {
      const response = await API.post("/auth/login", {
        email: trimmedEmail,
        password,
      });

      console.log("Login response:", response.data);

  // Save token
    localStorage.setItem("token", response.data.token);

localStorage.setItem(
  "user",
  JSON.stringify(response.data.user)
);

// Navbar-কে সঙ্গে সঙ্গে update করার signal
window.dispatchEvent(new Event("login"));

setMessage("Login successful!");

setEmail("");
setPassword("");

navigate("/");
      // Clear form
      setEmail("");
      setPassword("");

    } catch (err) {
      console.error("Login error:", err);

      setError(
        err.response?.data?.message ||
        "Login failed. Please try again."
      );
    }
  };

return (
  <div
    style={{
      minHeight: "calc(100vh - 70px)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "40px 20px",
      boxSizing: "border-box",
    }}
  >
    <div
      style={{
        width: "100%",
        maxWidth: "430px",
        background: "#fff",
        padding: "40px",
        borderRadius: "18px",
        boxShadow: "0 12px 35px rgba(0,0,0,0.25)",
        boxSizing: "border-box",
      }}
    >
      {/* Heading */}

      <div
        style={{
          textAlign: "center",
          marginBottom: "30px",
        }}
      >
        <div
          style={{
            fontSize: "45px",
            marginBottom: "10px",
          }}
        >
          👋
        </div>

        <h1
          style={{
            margin: "0",
            color: "#222",
            fontSize: "32px",
            fontWeight: "700",
          }}
        >
          Welcome Back
        </h1>

        <p
          style={{
            marginTop: "8px",
            color: "#777",
            fontSize: "15px",
          }}
        >
          Login to your TastyBites account
        </p>
      </div>

      <form onSubmit={handleLogin}>

        {/* Email */}

        <div style={{ marginBottom: "20px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              color: "#333",
              fontWeight: "600",
            }}
          >
            Email
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            placeholder="Enter your email"
            required
            style={{
              width: "100%",
              padding: "13px 14px",
              border: "1px solid #ddd",
              borderRadius: "9px",
              outline: "none",
              fontSize: "15px",
              boxSizing: "border-box",
              background: "#fafafa",
            }}
          />
        </div>

        {/* Password */}

        <div style={{ marginBottom: "25px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              color: "#333",
              fontWeight: "600",
            }}
          >
            Password
          </label>

          <div
            style={{
              position: "relative",
            }}
          >
            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              placeholder="Enter your password"
              required
              style={{
                width: "100%",
                padding: "13px 70px 13px 14px",
                border: "1px solid #ddd",
                borderRadius: "9px",
                outline: "none",
                fontSize: "15px",
                boxSizing: "border-box",
                background: "#fafafa",
              }}
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
              style={{
                position: "absolute",
                right: "6px",
                top: "50%",
                transform: "translateY(-50%)",
                border: "none",
                background: "#eee",
                borderRadius: "6px",
                padding: "7px 10px",
                cursor: "pointer",
                fontSize: "13px",
              }}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        {/* Login Button */}

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "14px",
            border: "none",
            borderRadius: "9px",
            background:
              "linear-gradient(135deg, #e63946, #ff5a36)",
            color: "#fff",
            fontSize: "16px",
            fontWeight: "700",
            cursor: "pointer",
            boxShadow:
              "0 5px 15px rgba(230,57,70,0.3)",
          }}
        >
          🔐 Login
        </button>

      </form>

      {/* Success Message */}

      {message && (
        <p
          style={{
            color: "#218838",
            background: "#eaf7ee",
            padding: "10px",
            borderRadius: "7px",
            textAlign: "center",
            marginTop: "20px",
            fontWeight: "600",
          }}
        >
          ✓ {message}
        </p>
      )}

      {/* Error Message */}

      {error && (
        <p
          style={{
            color: "#dc3545",
            background: "#fdeaea",
            padding: "10px",
            borderRadius: "7px",
            textAlign: "center",
            marginTop: "20px",
            fontWeight: "600",
          }}
        >
          ⚠ {error}
        </p>
      )}

      {/* Register */}

      <div
        style={{
          textAlign: "center",
          marginTop: "25px",
          paddingTop: "20px",
          borderTop: "1px solid #eee",
          color: "#777",
          fontSize: "14px",
        }}
      >
        Don't have an account?{" "}

        <Link
          to="/register"
          style={{
            color: "#e63946",
            fontWeight: "700",
            textDecoration: "none",
          }}
        >
          Register
        </Link>
      </div>

    </div>
  </div>
);
}

// ==================== REGISTER ====================

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");

const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
  e.preventDefault();

  setMessage("");
  setError("");

  // Remove extra spaces
  const trimmedName = name.trim();
  const trimmedEmail = email.trim().toLowerCase();
  const trimmedPhone = phone.trim();

  // Name validation
  const nameRegex = /^[\p{L}]+(?:[ '\u2019-][\p{L}]+)*$/u;

  if (!nameRegex.test(trimmedName)) {
    setError("Name must contain letters only.");
    return;
  }

  // Email validation
  const emailRegex =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!emailRegex.test(trimmedEmail)) {
    setError("Please enter a valid email address.");
    return;
  }

  // Phone validation
  const phoneRegex = /^[6-9]\d{9}$/;

  if (!phoneRegex.test(trimmedPhone)) {
    setError("Enter a valid 10-digit phone number.");
    return;
  }

  // Password validation
  if (password.length < 6) {
    setError("Password must be at least 6 characters.");
    return;
  }
  // Confirm Password validation
if (password !== confirmPassword) {
  setError("Password mismatch.");
  return;
}
  try {
    const response = await API.post("/auth/register", {
      name: trimmedName,
      email: trimmedEmail,
      phone: trimmedPhone,
      password,
    });

    console.log("Register response:", response.data);

    setMessage("Registration successful!");

    // Clear form
   setName("");
setEmail("");
setPhone("");
setPassword("");
setConfirmPassword("");

setShowPassword(false);
setShowConfirmPassword(false);
  } catch (err) {
    console.error("Register error:", err);

    setError(
      err.response?.data?.message ||
      "Registration failed. Please try again."
    );
  }
};

return (
  <div
    style={{
      minHeight: "calc(100vh - 70px)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "40px 20px",
      boxSizing: "border-box",
    }}
  >
    <div
      style={{
        width: "100%",
        maxWidth: "460px",
        background: "#fff",
        padding: "40px",
        borderRadius: "18px",
        boxShadow: "0 12px 35px rgba(0,0,0,0.25)",
        boxSizing: "border-box",
      }}
    >
      {/* Heading */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "30px",
        }}
      >
        <div
          style={{
            fontSize: "44px",
            marginBottom: "10px",
          }}
        >
          🍽️
        </div>

        <h1
          style={{
            margin: 0,
            color: "#222",
            fontSize: "32px",
            fontWeight: "700",
          }}
        >
          Create Account
        </h1>

        <p
          style={{
            marginTop: "8px",
            color: "#777",
            fontSize: "15px",
          }}
        >
          Join TastyBites and start ordering delicious food
        </p>
      </div>

      <form onSubmit={handleRegister} autoComplete="off">
        {/* Name */}
        <div style={{ marginBottom: "18px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              color: "#333",
              fontWeight: "600",
            }}
          >
            Full Name
          </label>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your full name"
            required
            style={{
              width: "100%",
              padding: "13px 14px",
              border: "1px solid #ddd",
              borderRadius: "9px",
              background: "#fafafa",
              boxSizing: "border-box",
              outline: "none",
            }}
          />
        </div>

        {/* Email */}
        <div style={{ marginBottom: "18px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              color: "#333",
              fontWeight: "600",
            }}
          >
            Email
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            autoComplete="off"
            style={{
              width: "100%",
              padding: "13px 14px",
              border: "1px solid #ddd",
              borderRadius: "9px",
              background: "#fafafa",
              boxSizing: "border-box",
              outline: "none",
            }}
          />
        </div>

        {/* Phone */}
        <div style={{ marginBottom: "18px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              color: "#333",
              fontWeight: "600",
            }}
          >
            Phone
          </label>

          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter 10-digit phone number"
            required
            style={{
              width: "100%",
              padding: "13px 14px",
              border: "1px solid #ddd",
              borderRadius: "9px",
              background: "#fafafa",
              boxSizing: "border-box",
              outline: "none",
            }}
          />
        </div>

        {/* Password */}
        <div style={{ marginBottom: "24px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              color: "#333",
              fontWeight: "600",
            }}
          >
            Password
          </label>

          <div style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a strong password"
              required
              autoComplete="new-password"
              style={{
                width: "100%",
                padding: "13px 70px 13px 14px",
                border: "1px solid #ddd",
                borderRadius: "9px",
                background: "#fafafa",
                boxSizing: "border-box",
                outline: "none",
              }}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "6px",
                top: "50%",
                transform: "translateY(-50%)",
                border: "none",
                background: "#eee",
                borderRadius: "6px",
                padding: "7px 10px",
                cursor: "pointer",
                fontSize: "13px",
              }}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>
        {/* Confirm Password */}
<div style={{ marginBottom: "20px" }}>
  <label>
    <strong>Confirm Password</strong>
  </label>

  <div
    style={{
      position: "relative",
      marginTop: "8px",
    }}
  >
    <input
      type={
        showConfirmPassword
          ? "text"
          : "password"
      }
      value={confirmPassword}
      onChange={(e) =>
        setConfirmPassword(e.target.value)
      }
      placeholder="Confirm your password"
      required
      autoComplete="new-password"
      style={{
        width: "100%",
        padding: "12px 60px 12px 12px",
        boxSizing: "border-box",
      }}
    />

    <button
      type="button"
      onClick={() =>
        setShowConfirmPassword(
          !showConfirmPassword
        )
      }
      style={{
        position: "absolute",
        right: "5px",
        top: "50%",
        transform: "translateY(-50%)",
        padding: "6px 10px",
        cursor: "pointer",
        border: "none",
      }}
    >
      {showConfirmPassword
        ? "Hide"
        : "Show"}
    </button>
  </div>
</div>

        {/* Register Button */}
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "14px",
            border: "none",
            borderRadius: "9px",
            background: "linear-gradient(135deg, #e63946, #ff5a36)",
            color: "#fff",
            fontSize: "16px",
            fontWeight: "700",
            cursor: "pointer",
            boxShadow: "0 5px 15px rgba(230,57,70,0.3)",
          }}
        >
          ✨ Create Account
        </button>
      </form>

      {/* Success */}
      {message && (
        <p
          style={{
            color: "#218838",
            background: "#eaf7ee",
            padding: "10px",
            borderRadius: "7px",
            textAlign: "center",
            marginTop: "20px",
            fontWeight: "600",
          }}
        >
          ✓ {message}
        </p>
      )}

      {/* Error */}
      {error && (
        <p
          style={{
            color: "#dc3545",
            background: "#fdeaea",
            padding: "10px",
            borderRadius: "7px",
            textAlign: "center",
            marginTop: "20px",
            fontWeight: "600",
          }}
        >
          ⚠ {error}
        </p>
      )}

      {/* Login Link */}
      <div
        style={{
          textAlign: "center",
          marginTop: "25px",
          paddingTop: "20px",
          borderTop: "1px solid #eee",
          color: "#777",
          fontSize: "14px",
        }}
      >
        Already have an account?{" "}

        <Link
          to="/login"
          style={{
            color: "#e63946",
            fontWeight: "700",
            textDecoration: "none",
          }}
        >
          Login
        </Link>
      </div>
    </div>
  </div>
);
}
// ==================== PROTECTED ADMIN ROUTE ====================

function AdminProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  const storedUser = localStorage.getItem("user");

  let user = null;

  try {
    user = storedUser
      ? JSON.parse(storedUser)
      : null;
  } catch (error) {
    user = null;
  }

  if (!token || user?.role !== "admin") {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}
// ==================== ADMIN LOGIN ====================

function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleAdminLogin = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    const trimmedEmail = email.trim().toLowerCase();

    // Email validation
    if (!trimmedEmail) {
      setError("Email is required");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setError("Please enter a valid email address");
      return;
    }

    // Password validation
    if (!password) {
      setError("Password is required");
      return;
    }

    try {
      const response = await API.post("/auth/login", {
        email: trimmedEmail,
        password,
      });

      console.log("Admin login response:", response.data);

      // Check admin role
      if (response.data.user?.role !== "admin") {
        setError("Access denied. You are not an admin.");
        return;
      }

      // Save JWT token
      localStorage.setItem(
        "token",
        response.data.token
      );

      // Save admin information
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      // Update Navbar immediately
      window.dispatchEvent(
        new Event("login")
      );

      setMessage("Admin login successful!");

      // Go to admin dashboard
      setTimeout(() => {
        navigate("/admin/dashboard");
      }, 500);

    } catch (err) {
      console.error(
        "Admin login error:",
        err
      );

      setError(
        err.response?.data?.message ||
        "Admin login failed. Please check your credentials."
      );
    }
  };

return (
  <div
    style={{
      minHeight: "calc(100vh - 70px)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "40px 20px",
      boxSizing: "border-box",
    }}
  >
    <div
      style={{
        width: "100%",
        maxWidth: "430px",
        background: "#fff",
        padding: "40px",
        borderRadius: "18px",
        boxShadow: "0 12px 35px rgba(0,0,0,0.25)",
        boxSizing: "border-box",
      }}
    >
      {/* Heading */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "30px",
        }}
      >
        <div
          style={{
            fontSize: "44px",
            marginBottom: "10px",
          }}
        >
          🛡️
        </div>

        <h1
          style={{
            margin: 0,
            color: "#222",
            fontSize: "32px",
            fontWeight: "700",
          }}
        >
          Admin Login
        </h1>

        <p
          style={{
            marginTop: "8px",
            color: "#777",
            fontSize: "15px",
          }}
        >
          Access the TastyBites admin dashboard
        </p>
      </div>

      <form onSubmit={handleAdminLogin}>

        {/* Email */}
        <div style={{ marginBottom: "20px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              color: "#333",
              fontWeight: "600",
            }}
          >
            Admin Email
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            placeholder="Enter admin email"
            required
            style={{
              width: "100%",
              padding: "13px 14px",
              border: "1px solid #ddd",
              borderRadius: "9px",
              outline: "none",
              fontSize: "15px",
              boxSizing: "border-box",
              background: "#fafafa",
            }}
          />
        </div>

        {/* Password */}
        <div style={{ marginBottom: "25px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              color: "#333",
              fontWeight: "600",
            }}
          >
            Password
          </label>

          <div style={{ position: "relative" }}>
            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              placeholder="Enter admin password"
              required
              style={{
                width: "100%",
                padding: "13px 70px 13px 14px",
                border: "1px solid #ddd",
                borderRadius: "9px",
                outline: "none",
                fontSize: "15px",
                boxSizing: "border-box",
                background: "#fafafa",
              }}
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
              style={{
                position: "absolute",
                right: "6px",
                top: "50%",
                transform: "translateY(-50%)",
                border: "none",
                background: "#eee",
                borderRadius: "6px",
                padding: "7px 10px",
                cursor: "pointer",
                fontSize: "13px",
              }}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "14px",
            border: "none",
            borderRadius: "9px",
            background:
              "linear-gradient(135deg, #e63946, #ff5a36)",
            color: "#fff",
            fontSize: "16px",
            fontWeight: "700",
            cursor: "pointer",
            boxShadow:
              "0 5px 15px rgba(230,57,70,0.3)",
          }}
        >
          🔐 Admin Login
        </button>

      </form>

      {/* Success Message */}
      {message && (
        <p
          style={{
            color: "#218838",
            background: "#eaf7ee",
            padding: "10px",
            borderRadius: "7px",
            textAlign: "center",
            marginTop: "20px",
            fontWeight: "600",
          }}
        >
          ✓ {message}
        </p>
      )}

      {/* Error Message */}
      {error && (
        <p
          style={{
            color: "#dc3545",
            background: "#fdeaea",
            padding: "10px",
            borderRadius: "7px",
            textAlign: "center",
            marginTop: "20px",
            fontWeight: "600",
          }}
        >
          ⚠ {error}
        </p>
      )}

      {/* Back to User Login */}
      <div
        style={{
          textAlign: "center",
          marginTop: "25px",
          paddingTop: "20px",
          borderTop: "1px solid #eee",
          color: "#777",
          fontSize: "14px",
        }}
      >
        Are you a regular user?{" "}

        <Link
          to="/login"
          style={{
            color: "#e63946",
            fontWeight: "700",
            textDecoration: "none",
          }}
        >
          User Login
        </Link>
      </div>
    </div>
  </div>
);
}
// ==================== ADMIN DASHBOARD ====================

function Dashboard() {
  const [menuCount, setMenuCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [orders, setOrders] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [users, setUsers] = useState([]);
 

  const [editingMenu, setEditingMenu] = useState(null);
const [editName, setEditName] = useState("");
const [editDescription, setEditDescription] = useState("");
const [editPrice, setEditPrice] = useState("");
const [editCategory, setEditCategory] = useState("");
const [editAvailable, setEditAvailable] = useState(true);
const [editImage, setEditImage] = useState(null);
const [editError, setEditError] = useState("");
const [editMessage, setEditMessage] = useState("");
const [updatingMenu, setUpdatingMenu] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

const [menuSearch, setMenuSearch] = useState("");

  // Add Menu states
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [menuName, setMenuName] = useState("");
  const [menuDescription, setMenuDescription] = useState("");
  const [menuPrice, setMenuPrice] = useState("");
  const [menuCategory, setMenuCategory] = useState("");
  const [menuImage, setMenuImage] = useState(null);

  const [menuMessage, setMenuMessage] = useState("");
  const [menuError, setMenuError] = useState("");
  const [addingMenu, setAddingMenu] = useState(false);

  // ==================== FETCH DASHBOARD DATA ====================

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError("");

      // Get Menu Items
      const menuResponse = await API.get("/menu");
      setMenuItems(menuResponse.data);

      // Get Users
      const userResponse = await API.get("/users");
      setUsers(userResponse.data.users);

      // Get All Orders
      const orderResponse = await API.get("/orders/all");
      setOrders(orderResponse.data.orders);

      console.log("Menu:", menuResponse.data);
      console.log("Users:", userResponse.data);
      console.log("Orders:", orderResponse.data);

      setMenuCount(menuResponse.data.length);
      setUserCount(userResponse.data.users.length);
      setOrderCount(orderResponse.data.orders.length);
      setOrders(orderResponse.data.orders);

    } catch (err) {
      console.error("Dashboard error:", err);

      setError(
        err.response?.data?.message ||
        "Failed to load dashboard data"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);
  // Update Order Status
const handleUpdateOrderStatus = async (
  orderId,
  status
) => {
  try {
    const token = localStorage.getItem("token");

    const response = await API.put(
      `/orders/${orderId}/status`,
      {
        status,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(
      "Order status updated:",
      response.data
    );

    // Update UI immediately
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order._id === orderId
          ? {
              ...order,
              status: status,
            }
          : order
      )
    );

  } catch (err) {
    console.error(
      "Update order status error:",
      err
    );

    alert(
      err.response?.data?.message ||
      "Failed to update order status"
    );
  }
};

// ==================== USER ACTIONS ====================

// Update User Role
const handleUpdateUserRole = async (userId, role) => {
  try {
    const token = localStorage.getItem("token");

    const response = await API.put(
      `/users/${userId}`,
      { role },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(
      "User role updated:",
      response.data
    );

    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user._id === userId
          ? {
              ...user,
              role: role,
            }
          : user
      )
    );

  } catch (err) {
    console.error(
      "Update user role error:",
      err
    );

    alert(
      err.response?.data?.message ||
      "Failed to update user role"
    );
  }
};


// Delete User
const handleDeleteUser = async (userId) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this user?"
  );

  if (!confirmDelete) {
    return;
  }

  try {
    const token = localStorage.getItem("token");

    await API.delete(
      `/users/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setUserCount((prevCount) => prevCount - 1);
    setUsers((prevUsers) =>
      prevUsers.filter(
        (user) => user._id !== userId
      )
    );

    console.log("User deleted successfully");

  } catch (err) {
    console.error(
      "Delete user error:",
      err
    );

    alert(
      err.response?.data?.message ||
      "Failed to delete user"
    );
  }
};
  // ==================== ADD MENU ITEM ====================

  const handleAddMenu = async (e) => {
    e.preventDefault();

    setMenuMessage("");
    setMenuError("");

    // Basic validation
    if (
      !menuName.trim() ||
      !menuDescription.trim() ||
      !menuPrice ||
      !menuCategory.trim()
    ) {
      setMenuError("All fields are required");
      return;
    }

    if (Number(menuPrice) <= 0) {
      setMenuError("Price must be greater than 0");
      return;
    }

    try {
      setAddingMenu(true);

      const formData = new FormData();

      formData.append("name", menuName.trim());
      formData.append(
        "description",
        menuDescription.trim()
      );
      formData.append("price", menuPrice);
      formData.append(
        "category",
        menuCategory.trim()
      );

      if (menuImage) {
        formData.append("image", menuImage);
      }

      const response = await API.post(
        "/menu",
        formData
      );

      console.log(
        "Menu created:",
        response.data
      );

      setMenuMessage(
        "Menu item added successfully!"
      );

      // Clear form
      setMenuName("");
      setMenuDescription("");
      setMenuPrice("");
      setMenuCategory("");
      setMenuImage(null);

      // Reset file input
      document.getElementById("menuImage").value = "";

      // Update dashboard count
      const menuResponse = await API.get("/menu");

      setMenuCount(menuResponse.data.length);

    } catch (err) {
      console.error(
        "Add menu error:",
        err
      );

      setMenuError(
        err.response?.data?.message ||
        "Failed to add menu item"
      );

    } finally {
      setAddingMenu(false);
    }
  };
  const handleDeleteMenu = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this menu item?"
  );

  if (!confirmDelete) {
    return;
  }

  try {
    const response = await API.delete(`/menu/${id}`);

    console.log("Delete response:", response.data);

    // Remove deleted item from screen
    setMenuItems((prevItems) =>
      prevItems.filter((item) => item._id !== id)
    );

    // Update total menu count
    setMenuCount((prevCount) => prevCount - 1);

  } catch (err) {
    console.error("Delete menu error:", err);

    alert(
      err.response?.data?.message ||
      "Failed to delete menu item"
    );
  }
};
const handleEditClick = (item) => {
  setEditingMenu(item);

  setEditName(item.name || "");
  setEditDescription(item.description || "");
  setEditPrice(item.price || "");
  setEditCategory(item.category || "");
  setEditAvailable(item.available ?? true);
  setEditImage(null);

  setEditError("");
  setEditMessage("");
};
const handleUpdateMenu = async (e) => {
  e.preventDefault();

  setEditError("");
  setEditMessage("");

  if (
    !editName.trim() ||
    !editDescription.trim() ||
    !editPrice ||
    !editCategory.trim()
  ) {
    setEditError("All fields are required");
    return;
  }

  if (Number(editPrice) <= 0) {
    setEditError("Price must be greater than 0");
    return;
  }

  try {
    setUpdatingMenu(true);

    const formData = new FormData();

    formData.append("name", editName.trim());
    formData.append(
      "description",
      editDescription.trim()
    );
    formData.append("price", editPrice);
    formData.append(
      "category",
      editCategory.trim()
    );
    formData.append(
      "available",
      editAvailable
    );

    if (editImage) {
      formData.append("image", editImage);
    }

    const response = await API.put(
      `/menu/${editingMenu._id}`,
      formData
    );

    console.log(
      "Update menu response:",
      response.data
    );

    // Update menu in the current list
    setMenuItems((prevItems) =>
      prevItems.map((item) =>
        item._id === editingMenu._id
          ? response.data.menuItem
          : item
      )
    );

    setMenuMessage("");
    setEditMessage(
      "Menu item updated successfully!"
    );

    setTimeout(() => {
      setEditingMenu(null);
    }, 800);

  } catch (err) {
    console.error(
      "Update menu error:",
      err
    );

    setEditError(
      err.response?.data?.message ||
      "Failed to update menu item"
    );
  } finally {
    setUpdatingMenu(false);
  }
};

const handleToggleAvailability = async (item) => {
  try {
    const response = await API.put(
      `/menu/${item._id}`,
      {
        available: !item.available,
      }
    );

    console.log(
      "Availability updated:",
      response.data
    );

    setMenuItems((prevItems) =>
      prevItems.map((menuItem) =>
        menuItem._id === item._id
          ? response.data.menuItem
          : menuItem
      )
    );

  } catch (err) {
    console.error(
      "Availability update error:",
      err
    );

    alert(
      err.response?.data?.message ||
      "Failed to update availability"
    );
  }
};

  // ==================== LOADING ====================

  if (loading) {
    return (
      <div
        style={{
          padding: "40px",
          textAlign: "center",
        }}
      >
        <h2>Loading Dashboard...</h2>
      </div>
    );
  }

  // ==================== ERROR ====================

  if (error) {
    return (
      <div
        style={{
          padding: "40px",
          textAlign: "center",
        }}
      >
        <h2 style={{ color: "red" }}>
          {error}
        </h2>
      </div>
    );
  }

  // ==================== DASHBOARD ====================

  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "40px auto",
        padding: "20px",
      }}
    >
      <h1
        style={{
          textAlign: "center",
        }}
      >
        Admin Dashboard
      </h1>

{/* ==================== DASHBOARD CARDS ==================== */}

<div
  style={{
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "24px",
    marginTop: "40px",
  }}
>
  {/* Total Menu Items */}

  <div
    style={{
      background: "#ffffff",
      borderRadius: "16px",
      padding: "28px 25px",
      textAlign: "center",
      boxShadow:
        "0 8px 25px rgba(0,0,0,0.12)",
      border: "1px solid #eeeeee",
      transition: "0.2s ease",
    }}
  >
    <div
      style={{
        fontSize: "38px",
        marginBottom: "10px",
      }}
    >
      🍽️
    </div>

    <h2
      style={{
        margin: "0",
        color: "#333",
        fontSize: "20px",
      }}
    >
      Total Menu Items
    </h2>

    <h1
      style={{
        margin: "12px 0 0",
        color: "#e63946",
        fontSize: "42px",
        fontWeight: "700",
      }}
    >
      {menuCount}
    </h1>
  </div>


  {/* Total Users */}

  <div
    style={{
      background: "#ffffff",
      borderRadius: "16px",
      padding: "28px 25px",
      textAlign: "center",
      boxShadow:
        "0 8px 25px rgba(0,0,0,0.12)",
      border: "1px solid #eeeeee",
      transition: "0.2s ease",
    }}
  >
    <div
      style={{
        fontSize: "38px",
        marginBottom: "10px",
      }}
    >
      👤
    </div>

    <h2
      style={{
        margin: "0",
        color: "#333",
        fontSize: "20px",
      }}
    >
      Total Users
    </h2>

    <h1
      style={{
        margin: "12px 0 0",
        color: "#e63946",
        fontSize: "42px",
        fontWeight: "700",
      }}
    >
      {userCount}
    </h1>
  </div>


  {/* Total Orders */}

  <div
    style={{
      background: "#ffffff",
      borderRadius: "16px",
      padding: "28px 25px",
      textAlign: "center",
      boxShadow:
        "0 8px 25px rgba(0,0,0,0.12)",
      border: "1px solid #eeeeee",
      transition: "0.2s ease",
    }}
  >
    <div
      style={{
        fontSize: "38px",
        marginBottom: "10px",
      }}
    >
      📦
    </div>

    <h2
      style={{
        margin: "0",
        color: "#333",
        fontSize: "20px",
      }}
    >
      Total Orders
    </h2>

    <h1
      style={{
        margin: "12px 0 0",
        color: "#e63946",
        fontSize: "42px",
        fontWeight: "700",
      }}
    >
      {orderCount}
    </h1>
  </div>
</div>
{/* ==================== MENU LIST ==================== */}

<div
  style={{
    marginTop: "55px",
    paddingBottom: "10px",
  }}
>
  {/* ==================== TITLE ==================== */}

  <h2
    style={{
      textAlign: "center",
      fontSize: "30px",
      margin: "0 0 22px",
      color: "#ffffff",
    }}
  >
    🍽️ Menu Items
  </h2>

  {/* ==================== SEARCH ==================== */}

  <div
    style={{
      display: "flex",
      justifyContent: "center",
      marginBottom: "30px",
    }}
  >
    <input
      type="text"
      value={menuSearch}
      onChange={(e) =>
        setMenuSearch(e.target.value)
      }
      placeholder="🔍 Search menu item..."
      style={{
        width: "100%",
        maxWidth: "540px",
        padding: "14px 18px",
        border: "1px solid #ddd",
        borderRadius: "12px",
        boxSizing: "border-box",
        fontSize: "16px",
        outline: "none",
        background: "#ffffff",
        color: "#222",
        boxShadow:
          "0 5px 18px rgba(0,0,0,0.12)",
      }}
    />
  </div>

  {/* ==================== MENU ITEMS ==================== */}

  {menuItems.length === 0 ? (
    <p
      style={{
        textAlign: "center",
        color: "#aaa",
        marginTop: "30px",
      }}
    >
      No menu items found.
    </p>
  ) : (
    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "25px",
      }}
    >
      {menuItems
        .filter((item) =>
          item.name
            ?.toLowerCase()
            .includes(
              menuSearch.toLowerCase()
            )
        )
        .map((item) => (
          <div
            key={item._id}
            style={{
              background: "#ffffff",
              borderRadius: "16px",
              overflow: "hidden",
              border:
                "1px solid rgba(255,255,255,0.25)",
              boxShadow:
                "0 8px 25px rgba(0,0,0,0.18)",
              display: "flex",
              flexDirection: "column",
              transition: "0.2s ease",
            }}
          >

            {/* ==================== IMAGE ==================== */}

            {item.image && (
              <img
                src={item.image}
                alt={item.name}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            )}

            {/* ==================== CARD CONTENT ==================== */}

            <div
              style={{
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                flex: 1,
              }}
            >

              {/* NAME */}

              <h3
                style={{
                  margin: "0 0 10px",
                  color: "#222",
                  fontSize: "21px",
                  fontWeight: "700",
                }}
              >
                {item.name}
              </h3>

              {/* DESCRIPTION */}

              <p
                style={{
                  color: "#666",
                  fontSize: "15px",
                  lineHeight: "1.5",
                  minHeight: "45px",
                  margin: "0 0 15px",
                }}
              >
                {item.description}
              </p>

              {/* PRICE */}

              <p
                style={{
                  margin: "5px 0",
                  color: "#333",
                  fontSize: "15px",
                }}
              >
                <strong>Price:</strong>{" "}

                <span
                  style={{
                    color: "#e63946",
                    fontWeight: "700",
                    fontSize: "17px",
                  }}
                >
                  ₹{item.price}
                </span>
              </p>

              {/* CATEGORY */}

              <p
                style={{
                  margin: "5px 0",
                  color: "#555",
                  fontSize: "15px",
                }}
              >
                <strong>Category:</strong>{" "}
                {item.category}
              </p>

              {/* STATUS */}

              <div
                style={{
                  marginTop: "8px",
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    padding: "6px 12px",
                    borderRadius: "20px",
                    background: item.available
                      ? "#e8f7ee"
                      : "#fdeaea",
                    color: item.available
                      ? "#218838"
                      : "#dc3545",
                    fontSize: "13px",
                    fontWeight: "700",
                  }}
                >
                  {item.available
                    ? "✓ Available"
                    : "✕ Not Available"}
                </span>
              </div>

              {/* ==================== ACTIONS ==================== */}

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(3, 1fr)",
                  gap: "8px",
                  marginTop: "20px",
                }}
              >

                {/* EDIT */}

                <button
                  type="button"
                  onClick={() =>
                    handleEditClick(item)
                  }
                  style={{
                    padding: "9px 5px",
                    border: "none",
                    borderRadius: "8px",
                    background: "#f1f1f1",
                    color: "#333",
                    fontWeight: "600",
                    cursor: "pointer",
                  }}
                >
                  ✏️ Edit
                </button>

                {/* DELETE */}

                <button
                  type="button"
                  onClick={() =>
                    handleDeleteMenu(
                      item._id
                    )
                  }
                  style={{
                    padding: "9px 5px",
                    border: "none",
                    borderRadius: "8px",
                    background: "#fdeaea",
                    color: "#dc3545",
                    fontWeight: "600",
                    cursor: "pointer",
                  }}
                >
                  🗑️ Delete
                </button>

                {/* ENABLE / DISABLE */}

                <button
                  type="button"
                  onClick={() =>
                    handleToggleAvailability(
                      item
                    )
                  }
                  style={{
                    padding: "9px 5px",
                    border: "none",
                    borderRadius: "8px",
                    background: item.available
                      ? "#fff3cd"
                      : "#e8f7ee",
                    color: item.available
                      ? "#856404"
                      : "#218838",
                    fontWeight: "600",
                    cursor: "pointer",
                  }}
                >
                  {item.available
                    ? "Disable"
                    : "Enable"}
                </button>

              </div>
            </div>
          </div>
        ))}
    </div>
  )}
</div>


{/* ==================== EDIT MENU FORM ==================== */}

{editingMenu && (
  <div
    style={{
      maxWidth: "650px",
      margin: "45px auto",
      padding: "35px",
      background: "#ffffff",
      borderRadius: "18px",
      boxShadow:
        "0 10px 30px rgba(0,0,0,0.18)",
      boxSizing: "border-box",
    }}
  >

    {/* ==================== EDIT HEADER ==================== */}

    <div
      style={{
        textAlign: "center",
        marginBottom: "30px",
      }}
    >
      <div
        style={{
          fontSize: "42px",
          marginBottom: "8px",
        }}
      >
        ✏️
      </div>

      <h2
        style={{
          margin: 0,
          color: "#222",
          fontSize: "28px",
        }}
      >
        Edit Menu Item
      </h2>

      <p
        style={{
          marginTop: "8px",
          color: "#777",
          fontSize: "14px",
        }}
      >
        Update your menu item details
      </p>
    </div>

    <form onSubmit={handleUpdateMenu}>

      {/* ==================== NAME ==================== */}

      <div
        style={{
          marginBottom: "20px",
        }}
      >
        <label
          style={{
            display: "block",
            marginBottom: "8px",
            color: "#333",
            fontWeight: "600",
          }}
        >
          Name
        </label>

        <input
          type="text"
          value={editName}
          onChange={(e) =>
            setEditName(e.target.value)
          }
          required
          placeholder="Enter menu name"
          style={{
            width: "100%",
            padding: "13px 14px",
            border: "1px solid #ddd",
            borderRadius: "10px",
            fontSize: "15px",
            boxSizing: "border-box",
            outline: "none",
          }}
        />
      </div>

      {/* ==================== DESCRIPTION ==================== */}

      <div
        style={{
          marginBottom: "20px",
        }}
      >
        <label
          style={{
            display: "block",
            marginBottom: "8px",
            color: "#333",
            fontWeight: "600",
          }}
        >
          Description
        </label>

        <textarea
          value={editDescription}
          onChange={(e) =>
            setEditDescription(
              e.target.value
            )
          }
          required
          rows="4"
          placeholder="Enter menu description"
          style={{
            width: "100%",
            padding: "13px 14px",
            border: "1px solid #ddd",
            borderRadius: "10px",
            fontSize: "15px",
            boxSizing: "border-box",
            resize: "vertical",
            fontFamily: "inherit",
            outline: "none",
          }}
        />
      </div>

      {/* ==================== PRICE ==================== */}

      <div
        style={{
          marginBottom: "20px",
        }}
      >
        <label
          style={{
            display: "block",
            marginBottom: "8px",
            color: "#333",
            fontWeight: "600",
          }}
        >
          Price
        </label>

        <div
          style={{
            position: "relative",
          }}
        >
          <span
            style={{
              position: "absolute",
              left: "14px",
              top: "50%",
              transform:
                "translateY(-50%)",
              color: "#e63946",
              fontWeight: "700",
            }}
          >
            ₹
          </span>

          <input
            type="number"
            value={editPrice}
            onChange={(e) =>
              setEditPrice(
                e.target.value
              )
            }
            min="1"
            required
            placeholder="Enter price"
            style={{
              width: "100%",
              padding:
                "13px 14px 13px 32px",
              border: "1px solid #ddd",
              borderRadius: "10px",
              fontSize: "15px",
              boxSizing: "border-box",
              outline: "none",
            }}
          />
        </div>
      </div>

      {/* ==================== CATEGORY ==================== */}

      <div
        style={{
          marginBottom: "20px",
        }}
      >
        <label
          style={{
            display: "block",
            marginBottom: "8px",
            color: "#333",
            fontWeight: "600",
          }}
        >
          Category
        </label>

        <input
          type="text"
          value={editCategory}
          onChange={(e) =>
            setEditCategory(
              e.target.value
            )
          }
          required
          placeholder="e.g. Main Course"
          style={{
            width: "100%",
            padding: "13px 14px",
            border: "1px solid #ddd",
            borderRadius: "10px",
            fontSize: "15px",
            boxSizing: "border-box",
            outline: "none",
          }}
        />
      </div>

      {/* ==================== IMAGE ==================== */}

      <div
        style={{
          marginBottom: "20px",
        }}
      >
        <label
          style={{
            display: "block",
            marginBottom: "8px",
            color: "#333",
            fontWeight: "600",
          }}
        >
          Change Image
        </label>

        <div
          style={{
            border: "1px dashed #ccc",
            borderRadius: "10px",
            padding: "15px",
            background: "#fafafa",
          }}
        >
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setEditImage(
                e.target.files[0]
              )
            }
            style={{
              width: "100%",
              cursor: "pointer",
            }}
          />
        </div>
      </div>

      {/* ==================== AVAILABILITY ==================== */}

      <div
        style={{
          marginBottom: "25px",
        }}
      >
        <label
          style={{
            display: "block",
            marginBottom: "8px",
            color: "#333",
            fontWeight: "600",
          }}
        >
          Availability
        </label>

        <select
          value={
            editAvailable
              ? "true"
              : "false"
          }
          onChange={(e) =>
            setEditAvailable(
              e.target.value === "true"
            )
          }
          style={{
            width: "100%",
            padding: "13px 14px",
            border: "1px solid #ddd",
            borderRadius: "10px",
            fontSize: "15px",
            boxSizing: "border-box",
            cursor: "pointer",
            background: "#fff",
            outline: "none",
          }}
        >
          <option value="true">
            ✓ Available
          </option>

          <option value="false">
            ✕ Not Available
          </option>
        </select>
      </div>

      {/* ==================== BUTTONS ==================== */}

      <div
        style={{
          display: "flex",
          gap: "12px",
        }}
      >

        {/* UPDATE */}

        <button
          type="submit"
          disabled={updatingMenu}
          style={{
            flex: 1,
            padding: "13px",
            border: "none",
            borderRadius: "10px",
            background: updatingMenu
              ? "#999"
              : "#e63946",
            color: "#fff",
            fontSize: "15px",
            fontWeight: "700",
            cursor: updatingMenu
              ? "not-allowed"
              : "pointer",
            boxShadow:
              "0 5px 12px rgba(230,57,70,0.25)",
          }}
        >
          {updatingMenu
            ? "Updating..."
            : "✓ Update Menu Item"}
        </button>

        {/* CANCEL */}

        <button
          type="button"
          onClick={() =>
            setEditingMenu(null)
          }
          style={{
            padding: "13px 22px",
            border: "1px solid #ddd",
            borderRadius: "10px",
            background: "#f7f7f7",
            color: "#333",
            fontSize: "15px",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          Cancel
        </button>

      </div>
    </form>

    {/* ==================== SUCCESS ==================== */}

    {editMessage && (
      <div
        style={{
          marginTop: "20px",
          padding: "12px",
          borderRadius: "8px",
          background: "#e8f7ee",
          color: "#218838",
          textAlign: "center",
          fontWeight: "600",
        }}
      >
        ✓ {editMessage}
      </div>
    )}

    {/* ==================== ERROR ==================== */}

    {editError && (
      <div
        style={{
          marginTop: "20px",
          padding: "12px",
          borderRadius: "8px",
          background: "#fdeaea",
          color: "#dc3545",
          textAlign: "center",
          fontWeight: "600",
        }}
      >
        ⚠️ {editError}
      </div>
    )}
  </div>
)}


{/* ==================== MENU MANAGEMENT ==================== */}

<div
  style={{
    marginTop: "55px",
    marginBottom: "20px",
    textAlign: "center",
    padding: "30px 20px",
    borderRadius: "16px",
    background:
      "linear-gradient(135deg, #e63946, #ff633f)",
    boxShadow:
      "0 8px 25px rgba(0,0,0,0.15)",
  }}
>
  <div
    style={{
      fontSize: "36px",
      marginBottom: "8px",
    }}
  >
    🍴
  </div>

  <h2
    style={{
      margin: "0",
      color: "#ffffff",
      fontSize: "26px",
    }}
  >
    Menu Management
  </h2>

  <p
    style={{
      color: "rgba(255,255,255,0.9)",
      margin: "8px 0 18px",
      fontSize: "14px",
    }}
  >
    Add new delicious items to your menu
  </p>

  <button
    type="button"
    onClick={() => {
      setShowAddMenu(!showAddMenu);
      setMenuMessage("");
      setMenuError("");
    }}
    style={{
      padding: "12px 28px",
      border: "none",
      borderRadius: "10px",
      background: "#ffffff",
      color: "#e63946",
      fontWeight: "700",
      fontSize: "15px",
      cursor: "pointer",
      boxShadow:
        "0 5px 15px rgba(0,0,0,0.15)",
    }}
  >
    {showAddMenu
      ? "✕ Close"
      : "＋ Add Menu Item"}
  </button>
</div>

  {/* ==================== ADD MENU FORM ==================== */}

{showAddMenu && (
  <div
    style={{
      maxWidth: "650px",
      margin: "35px auto 50px",
      padding: "35px",
      background: "#ffffff",
      borderRadius: "18px",
      boxShadow:
        "0 10px 30px rgba(0,0,0,0.18)",
      boxSizing: "border-box",
    }}
  >

    {/* ==================== HEADER ==================== */}

    <div
      style={{
        textAlign: "center",
        marginBottom: "30px",
      }}
    >
      <div
        style={{
          fontSize: "42px",
          marginBottom: "8px",
        }}
      >
        🍽️
      </div>

      <h2
        style={{
          margin: 0,
          color: "#222",
          fontSize: "28px",
          fontWeight: "700",
        }}
      >
        Add Menu Item
      </h2>

      <p
        style={{
          marginTop: "8px",
          color: "#777",
          fontSize: "14px",
        }}
      >
        Add a new delicious item to your menu
      </p>
    </div>

    <form onSubmit={handleAddMenu}>

      {/* ==================== NAME ==================== */}

      <div
        style={{
          marginBottom: "20px",
        }}
      >
        <label
          style={{
            display: "block",
            marginBottom: "8px",
            color: "#333",
            fontWeight: "600",
          }}
        >
          Name
        </label>

        <input
          type="text"
          value={menuName}
          onChange={(e) =>
            setMenuName(e.target.value)
          }
          placeholder="Enter menu name"
          required
          style={{
            width: "100%",
            padding: "13px 14px",
            border: "1px solid #ddd",
            borderRadius: "10px",
            fontSize: "15px",
            boxSizing: "border-box",
            outline: "none",
            background: "#fff",
            color: "#222",
          }}
        />
      </div>

      {/* ==================== DESCRIPTION ==================== */}

      <div
        style={{
          marginBottom: "20px",
        }}
      >
        <label
          style={{
            display: "block",
            marginBottom: "8px",
            color: "#333",
            fontWeight: "600",
          }}
        >
          Description
        </label>

        <textarea
          value={menuDescription}
          onChange={(e) =>
            setMenuDescription(
              e.target.value
            )
          }
          placeholder="Enter menu description"
          required
          rows="4"
          style={{
            width: "100%",
            padding: "13px 14px",
            border: "1px solid #ddd",
            borderRadius: "10px",
            fontSize: "15px",
            boxSizing: "border-box",
            resize: "vertical",
            fontFamily: "inherit",
            outline: "none",
            background: "#fff",
            color: "#222",
          }}
        />
      </div>

      {/* ==================== PRICE ==================== */}

      <div
        style={{
          marginBottom: "20px",
        }}
      >
        <label
          style={{
            display: "block",
            marginBottom: "8px",
            color: "#333",
            fontWeight: "600",
          }}
        >
          Price
        </label>

        <div
          style={{
            position: "relative",
          }}
        >
          <span
            style={{
              position: "absolute",
              left: "14px",
              top: "50%",
              transform:
                "translateY(-50%)",
              color: "#e63946",
              fontWeight: "700",
              fontSize: "16px",
            }}
          >
            ₹
          </span>

          <input
            type="number"
            value={menuPrice}
            onChange={(e) =>
              setMenuPrice(
                e.target.value
              )
            }
            placeholder="Enter price"
            min="1"
            required
            style={{
              width: "100%",
              padding:
                "13px 14px 13px 32px",
              border: "1px solid #ddd",
              borderRadius: "10px",
              fontSize: "15px",
              boxSizing: "border-box",
              outline: "none",
              background: "#fff",
              color: "#222",
            }}
          />
        </div>
      </div>

      {/* ==================== CATEGORY ==================== */}

      <div
        style={{
          marginBottom: "20px",
        }}
      >
        <label
          style={{
            display: "block",
            marginBottom: "8px",
            color: "#333",
            fontWeight: "600",
          }}
        >
          Category
        </label>

        <input
          type="text"
          value={menuCategory}
          onChange={(e) =>
            setMenuCategory(
              e.target.value
            )
          }
          placeholder="e.g. Main Course"
          required
          style={{
            width: "100%",
            padding: "13px 14px",
            border: "1px solid #ddd",
            borderRadius: "10px",
            fontSize: "15px",
            boxSizing: "border-box",
            outline: "none",
            background: "#fff",
            color: "#222",
          }}
        />
      </div>

      {/* ==================== IMAGE ==================== */}

      <div
        style={{
          marginBottom: "25px",
        }}
      >
        <label
          style={{
            display: "block",
            marginBottom: "8px",
            color: "#333",
            fontWeight: "600",
          }}
        >
          Menu Image
        </label>

        <div
          style={{
            border: "1px dashed #ccc",
            borderRadius: "10px",
            padding: "15px",
            background: "#fafafa",
          }}
        >
          <input
            id="menuImage"
            type="file"
            accept="image/*"
            onChange={(e) =>
              setMenuImage(
                e.target.files[0]
              )
            }
            style={{
              width: "100%",
              cursor: "pointer",
              color: "#555",
            }}
          />
        </div>
      </div>

      {/* ==================== ADD BUTTON ==================== */}

      <button
        type="submit"
        disabled={addingMenu}
        style={{
          width: "100%",
          padding: "14px",
          border: "none",
          borderRadius: "10px",
          background: addingMenu
            ? "#999"
            : "linear-gradient(135deg, #e63946, #ff633f)",
          color: "#fff",
          fontSize: "16px",
          fontWeight: "700",
          cursor: addingMenu
            ? "not-allowed"
            : "pointer",
          boxShadow:
            "0 6px 15px rgba(230,57,70,0.25)",
        }}
      >
        {addingMenu
          ? "⏳ Adding..."
          : "＋ Add Menu Item"}
      </button>

    </form>

    {/* ==================== SUCCESS MESSAGE ==================== */}

    {menuMessage && (
      <div
        style={{
          marginTop: "20px",
          padding: "12px",
          borderRadius: "9px",
          background: "#e8f7ee",
          color: "#218838",
          textAlign: "center",
          fontWeight: "600",
        }}
      >
        ✓ {menuMessage}
      </div>
    )}

    {/* ==================== ERROR MESSAGE ==================== */}

    {menuError && (
      <div
        style={{
          marginTop: "20px",
          padding: "12px",
          borderRadius: "9px",
          background: "#fdeaea",
          color: "#dc3545",
          textAlign: "center",
          fontWeight: "600",
        }}
      >
        ⚠️ {menuError}
      </div>
    )}

  </div>
)}
  {/* ==================== USER MANAGEMENT ==================== */}

<div
  style={{
    marginTop: "60px",
    paddingBottom: "50px",
  }}
>
  {/* Section Header */}

  <div
    style={{
      textAlign: "center",
      marginBottom: "25px",
    }}
  >
    <div
      style={{
        fontSize: "38px",
        marginBottom: "5px",
      }}
    >
      👥
    </div>

    <h2
      style={{
        margin: 0,
        color: "#f5f5f5",
        fontSize: "28px",
        fontWeight: "700",
      }}
    >
      User Management
    </h2>

    <p
      style={{
        marginTop: "8px",
        color: "#aaa",
        fontSize: "14px",
      }}
    >
      Manage registered users and their roles
    </p>
  </div>

  {users.length === 0 ? (
    <div
      style={{
        maxWidth: "700px",
        margin: "0 auto",
        padding: "30px",
        background: "#ffffff",
        borderRadius: "14px",
        textAlign: "center",
        color: "#555",
      }}
    >
      <p>No users found.</p>
    </div>
  ) : (
    <div
      style={{
        maxWidth: "1150px",
        margin: "0 auto",
        overflowX: "auto",
        background: "#ffffff",
        borderRadius: "14px",
        boxShadow:
          "0 8px 25px rgba(0,0,0,0.18)",
      }}
    >
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          minWidth: "900px",
          color: "#222",
        }}
      >

        {/* ==================== TABLE HEADER ==================== */}

        <thead>
          <tr
            style={{
              background:
                "linear-gradient(135deg, #e63946, #ff633f)",
              color: "#ffffff",
            }}
          >
            <th
              style={{
                padding: "15px",
                textAlign: "center",
                fontWeight: "700",
              }}
            >
              Name
            </th>

            <th
              style={{
                padding: "15px",
                textAlign: "center",
                fontWeight: "700",
              }}
            >
              Email
            </th>

            <th
              style={{
                padding: "15px",
                textAlign: "center",
                fontWeight: "700",
              }}
            >
              Phone
            </th>

            <th
              style={{
                padding: "15px",
                textAlign: "center",
                fontWeight: "700",
              }}
            >
              Role
            </th>

            <th
              style={{
                padding: "15px",
                textAlign: "center",
                fontWeight: "700",
              }}
            >
              Registration Date
            </th>

            <th
              style={{
                padding: "15px",
                textAlign: "center",
                fontWeight: "700",
              }}
            >
              Action
            </th>
          </tr>
        </thead>

        {/* ==================== TABLE BODY ==================== */}

        <tbody>
          {users.map((user, index) => (
            <tr
              key={user._id}
              style={{
                background:
                  index % 2 === 0
                    ? "#ffffff"
                    : "#fafafa",
                borderBottom:
                  "1px solid #eeeeee",
              }}
            >

              {/* Name */}

              <td
                style={{
                  padding: "14px",
                  textAlign: "center",
                  color: "#333",
                  fontWeight: "600",
                }}
              >
                {user.name}
              </td>

              {/* Email */}

              <td
                style={{
                  padding: "14px",
                  textAlign: "center",
                  color: "#555",
                }}
              >
                {user.email}
              </td>

              {/* Phone */}

              <td
                style={{
                  padding: "14px",
                  textAlign: "center",
                  color: "#555",
                }}
              >
                {user.phone || "N/A"}
              </td>

              {/* Role */}

              <td
                style={{
                  padding: "14px",
                  textAlign: "center",
                }}
              >
                <select
                  value={user.role}
                  onChange={(e) =>
                    handleUpdateUserRole(
                      user._id,
                      e.target.value
                    )
                  }
                  style={{
                    padding: "8px 12px",
                    border:
                      "1px solid #ddd",
                    borderRadius: "8px",
                    background: "#ffffff",
                    color: "#222",
                    fontSize: "14px",
                    cursor: "pointer",
                    outline: "none",
                  }}
                >
                  <option value="user">
                    User
                  </option>

                  <option value="admin">
                    Admin
                  </option>
                </select>
              </td>

             {/* Registration Date */}

<td
  style={{
    padding: "14px",
    textAlign: "center",
    color: "#555",
  }}
>
  {user.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-IN")
    : "N/A"}
</td>
              {/* Action */}

              <td
                style={{
                  padding: "14px",
                  textAlign: "center",
                }}
              >
                <button
                  type="button"
                  onClick={() =>
                    handleDeleteUser(
                      user._id
                    )
                  }
                  style={{
                    padding: "8px 16px",
                    border: "none",
                    borderRadius: "8px",
                    background: "#e63946",
                    color: "#ffffff",
                    fontWeight: "600",
                    cursor: "pointer",
                  }}
                >
                  🗑️ Delete
                </button>
              </td>

            </tr>
          ))}
        </tbody>

      </table>
    </div>
  )}
</div>
{/* ==================== ORDER MANAGEMENT ==================== */}

<div
  style={{
    marginTop: "60px",
    paddingBottom: "60px",
  }}
>
  {/* ==================== SECTION HEADER ==================== */}

  <div
    style={{
      textAlign: "center",
      marginBottom: "30px",
    }}
  >
    <div
      style={{
        fontSize: "38px",
        marginBottom: "5px",
      }}
    >
      📦
    </div>

    <h2
      style={{
        margin: "0",
        color: "#f5f5f5",
        fontSize: "30px",
        fontWeight: "700",
      }}
    >
      Order Management
    </h2>

    <p
      style={{
        marginTop: "8px",
        color: "#aaa",
        fontSize: "15px",
      }}
    >
      Manage customer orders and update order status
    </p>
  </div>

  {/* ==================== NO ORDERS ==================== */}

  {orders.length === 0 ? (
    <div
      style={{
        maxWidth: "700px",
        margin: "0 auto",
        padding: "35px",
        background: "#ffffff",
        borderRadius: "16px",
        textAlign: "center",
        color: "#555",
        boxShadow:
          "0 10px 30px rgba(0,0,0,0.20)",
      }}
    >
      <p
        style={{
          margin: 0,
          fontSize: "16px",
        }}
      >
        No orders found.
      </p>
    </div>
  ) : (
    /* ==================== ORDERS TABLE ==================== */

    <div
      style={{
        maxWidth: "1150px",
        margin: "0 auto",
        overflowX: "auto",
        background: "#ffffff",
        borderRadius: "16px",
        boxShadow:
          "0 12px 35px rgba(0,0,0,0.25)",
      }}
    >
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          minWidth: "900px",
          color: "#222",
        }}
      >
        {/* ==================== TABLE HEADER ==================== */}

        <thead>
          <tr
            style={{
              background:
                "linear-gradient(135deg, #ef3340, #ff633f)",
              color: "#ffffff",
            }}
          >
            <th
              style={{
                padding: "16px 14px",
                textAlign: "center",
                fontWeight: "700",
                fontSize: "15px",
              }}
            >
              Order ID
            </th>

            <th
              style={{
                padding: "16px 14px",
                textAlign: "center",
                fontWeight: "700",
                fontSize: "15px",
              }}
            >
              User
            </th>

            <th
              style={{
                padding: "16px 14px",
                textAlign: "center",
                fontWeight: "700",
                fontSize: "15px",
              }}
            >
              Items
            </th>

            <th
              style={{
                padding: "16px 14px",
                textAlign: "center",
                fontWeight: "700",
                fontSize: "15px",
              }}
            >
              Total
            </th>

            <th
              style={{
                padding: "16px 14px",
                textAlign: "center",
                fontWeight: "700",
                fontSize: "15px",
              }}
            >
              Status
            </th>
          </tr>
        </thead>

        {/* ==================== TABLE BODY ==================== */}

        <tbody>
          {orders.map((order, index) => (
            <tr
              key={order._id}
              style={{
                background:
                  index % 2 === 0
                    ? "#ffffff"
                    : "#fafafa",
                borderBottom:
                  "1px solid #eeeeee",
              }}
            >
              {/* ==================== ORDER ID ==================== */}

              <td
                style={{
                  padding: "16px 14px",
                  textAlign: "center",
                  color: "#666",
                  fontSize: "13px",
                }}
              >
                {order._id}
              </td>

              {/* ==================== USER ==================== */}

              <td
                style={{
                  padding: "16px 14px",
                  textAlign: "center",
                  color: "#222",
                  fontWeight: "600",
                }}
              >
                {order.user?.name ||
                  order.user?.email ||
                  "Unknown"}
              </td>

              {/* ==================== ITEMS ==================== */}

              <td
                style={{
                  padding: "16px 14px",
                  textAlign: "left",
                  color: "#555",
                  fontSize: "14px",
                }}
              >
                {order.items?.map(
                  (item, itemIndex) => (
                    <div
                      key={item._id || itemIndex}
                      style={{
                        marginBottom:
                          itemIndex <
                          order.items.length - 1
                            ? "6px"
                            : "0",
                      }}
                    >
                      {item.menuItem?.name ||
                        "Unknown Item"}{" "}
                      × {item.quantity}
                    </div>
                  )
                )}
              </td>

              {/* ==================== TOTAL ==================== */}

              <td
                style={{
                  padding: "16px 14px",
                  textAlign: "center",
                  color: "#ef3340",
                  fontWeight: "700",
                  fontSize: "15px",
                }}
              >
                ₹{order.totalAmount}
              </td>

              {/* ==================== STATUS ==================== */}

              <td
                style={{
                  padding: "16px 14px",
                  textAlign: "center",
                }}
              >
                <select
                  value={order.status}
                  onChange={(e) =>
                    handleUpdateOrderStatus(
                      order._id,
                      e.target.value
                    )
                  }
                  style={{
                    padding:
                      "9px 32px 9px 12px",
                    border:
                      "1px solid #ddd",
                    borderRadius: "9px",
                    background: "#ffffff",
                    color: "#222",
                    fontSize: "14px",
                    fontWeight: "600",
                    cursor: "pointer",
                    outline: "none",
                  }}
                >
                  <option value="Pending">
                    Pending
                  </option>

                  <option value="Confirmed">
                    Confirmed
                  </option>

                  <option value="Preparing">
                    Preparing
                  </option>

                  <option value="Out for Delivery">
                    Out for Delivery
                  </option>

                  <option value="Delivered">
                    Delivered
                  </option>

                  <option value="Cancelled">
                    Cancelled
                  </option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}
</div>
    </div>
  );
}

// ==================== ADMIN MENU ====================

function MenuItems() {
  return (
    <div style={{ padding: "40px" }}>
      <h1>Menu Items</h1>
    </div>
  );
}

// ==================== ADD MENU ====================

function AddMenuItem() {
  return (
    <div style={{ padding: "40px" }}>
      <h1>Add Menu Item</h1>
    </div>
  );
}

// ==================== EDIT MENU ====================

function EditMenuItem() {
  return (
    <div style={{ padding: "40px" }}>
      <h1>Edit Menu Item</h1>
    </div>
  );
}

// ==================== USERS ====================

function Users() {
  return (
    <div style={{ padding: "40px" }}>
      <h1>Users</h1>
    </div>
  );
}

// ==================== APP ====================

function App() {
  return (
    <BrowserRouter>

      {/* Navbar */}

      <Navbar />

      {/* Routes */}

      <Routes>

        {/* Public Routes */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/menu/:id"
          element={<MenuDetails />}
        />
        <Route
          path="/cart"
          element={<Cart />}
        />
        <Route
          path="/my-orders"
          element={<MyOrders />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />

        {/* Admin Routes */}

        <Route
  path="/admin/dashboard"
  element={
    <AdminProtectedRoute>
      <Dashboard />
    </AdminProtectedRoute>
  }
/>

        <Route
          path="/admin/menu"
          element={<MenuItems />}
        />

        <Route
          path="/admin/menu/add"
          element={<AddMenuItem />}
        />

        <Route
          path="/admin/menu/edit/:id"
          element={<EditMenuItem />}
        />

        <Route
          path="/admin/users"
          element={<Users />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;