import { useEffect, useState, useContext } from "react";
import api from "../../api/axios";
import { CartContext } from "../../context/CartContext";
import "../../styles/home.css";

const Home = () => {
  const [menus, setMenus] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    api.get("/menus").then((res) => setMenus(res.data));
  }, []);

  return (
    <div className="menu-container">
      {menus.map((menu) => (
        <div key={menu.id} className="menu-card">
          <img src={menu.image} alt={menu.name} />
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
