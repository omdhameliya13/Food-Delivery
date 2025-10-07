import { useEffect, useState, useContext } from "react";
import api from "../../api/axios";
import { CartContext } from "../../context/CartContext";
import "../../styles/home.css";

const Home = () => {
  const [menus, setMenus] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    api.get("/homechef/menu/items/getItems")
      .then((res) => setMenus(res.data))
      .catch((err) => console.error("Failed to fetch menus:", err));
  }, []);

  return (
    <div className="menu-container">
      {menus.map((menu) => (
        <div key={menu._id} className="menu-card">
          <img 
            src={`http://localhost:5000/uploads/${menu.image}`} 
            alt={menu.name}
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
            }}
          />
          <h3>{menu.name}</h3>
          <p>{menu.description}</p>
          <p className="price">₹{menu.price}</p>
          <button onClick={() => addToCart(menu)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
};

export default Home;
