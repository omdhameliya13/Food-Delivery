import { useState } from "react";
import api from "../../api/axios";

const MenuUpload = () => {
  const [form, setForm] = useState({ name: "", description: "", price: "", image: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/menus", form);
      alert("Menu uploaded successfully");
    } catch {
      alert("Failed to upload menu");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>Upload Menu</h2>
      <input name="name" placeholder="Dish Name" onChange={handleChange} />
      <input name="description" placeholder="Description" onChange={handleChange} />
      <input name="price" placeholder="Price" onChange={handleChange} />
      <input name="image" placeholder="Image URL" onChange={handleChange} />
      <button type="submit">Upload</button>
    </form>
  );
};

export default MenuUpload;
