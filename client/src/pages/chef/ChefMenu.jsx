import { useEffect, useState } from "react";
import { addMenuItem, getMenuItemsByChef, updateMenuItem, deleteMenuItem } from "../../api/menu";

const ChefMenu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    available: true,
    image: null
  });

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const token = localStorage.getItem('token');
      
      if (!token || user.role !== 'homechef') {
        alert("Please login as a chef");
        setLoading(false);
        return;
      }

      // Fetch chef's own menu items
      const response = await fetch('http://localhost:5000/api/v1/homechef/menu/items/myItems', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch menu items');
      }
      
      const data = await response.json();
      setMenuItems(data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch menu items:", error);
      alert("Failed to load menu items: " + error.message);
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('description', form.description);
    formData.append('price', form.price);
    formData.append('available', form.available);
    if (form.image) {
      formData.append('image', form.image);
    }

    try {
      if (editingItem) {
        await updateMenuItem(editingItem._id, formData);
        alert("Menu item updated successfully!");
      } else {
        await addMenuItem(formData);
        alert("Menu item added successfully!");
      }
      
      setShowForm(false);
      setEditingItem(null);
      setForm({ name: "", description: "", price: "", available: true, image: null });
      fetchMenuItems();
    } catch (error) {
      alert("Failed to save menu item: " + (error.response?.data?.message || error.message));
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setForm({
      name: item.name,
      description: item.description,
      price: item.price,
      available: item.available,
      image: null
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      await deleteMenuItem(id);
      alert("Menu item deleted successfully!");
      fetchMenuItems();
    } catch (error) {
      alert("Failed to delete item: " + (error.response?.data?.message || error.message));
    }
  };

  const cancelForm = () => {
    setShowForm(false);
    setEditingItem(null);
    setForm({ name: "", description: "", price: "", available: true, image: null });
  };

  if (loading) return <div style={styles.loading}>Loading menu items...</div>;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>My Menu Items</h1>
        <button style={styles.addButton} onClick={() => setShowForm(true)}>
          + Add New Item
        </button>
      </div>

      {showForm && (
        <div style={styles.formOverlay}>
          <div style={styles.formCard}>
            <h2>{editingItem ? "Edit Menu Item" : "Add New Menu Item"}</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.inputGroup}>
                <label>Item Name *</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g., Chicken Biryani"
                  style={styles.input}
                  required
                />
              </div>

              <div style={styles.inputGroup}>
                <label>Description *</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Describe your dish..."
                  style={{...styles.input, minHeight: '80px'}}
                  required
                />
              </div>

              <div style={styles.inputGroup}>
                <label>Price (₹) *</label>
                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="299"
                  style={styles.input}
                  required
                  min="0"
                />
              </div>

              <div style={styles.inputGroup}>
                <label>Image *</label>
                <input
                  type="file"
                  name="image"
                  onChange={handleChange}
                  accept="image/*"
                  style={styles.input}
                  required={!editingItem}
                />
                {editingItem && <small style={styles.hint}>Leave empty to keep current image</small>}
              </div>

              <div style={styles.checkboxGroup}>
                <label>
                  <input
                    type="checkbox"
                    name="available"
                    checked={form.available}
                    onChange={handleChange}
                  />
                  {" "}Available for orders
                </label>
              </div>

              <div style={styles.formActions}>
                <button type="submit" style={styles.submitButton}>
                  {editingItem ? "Update Item" : "Add Item"}
                </button>
                <button type="button" onClick={cancelForm} style={styles.cancelButton}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div style={styles.stats}>
        <div style={styles.statCard}>
          <h3>{menuItems.length}</h3>
          <p>Total Items</p>
        </div>
        <div style={styles.statCard}>
          <h3>{menuItems.filter(i => i.available).length}</h3>
          <p>Available</p>
        </div>
        <div style={styles.statCard}>
          <h3>{menuItems.filter(i => !i.available).length}</h3>
          <p>Unavailable</p>
        </div>
      </div>

      {menuItems.length === 0 ? (
        <div style={styles.empty}>
          <h3>No menu items yet</h3>
          <p>Click "Add New Item" to create your first menu item</p>
        </div>
      ) : (
        <div style={styles.grid}>
          {menuItems.map((item) => (
            <div key={item._id} style={styles.card}>
              <img
                src={`http://localhost:5000/uploads/${item.image}`}
                alt={item.name}
                style={styles.image}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
                }}
              />
              <div style={styles.cardContent}>
                <h3 style={styles.itemName}>{item.name}</h3>
                <p style={styles.description}>{item.description}</p>
                <div style={styles.priceRow}>
                  <span style={styles.price}>₹{item.price}</span>
                  <span style={{
                    ...styles.badge,
                    background: item.available ? '#4CAF50' : '#f44336'
                  }}>
                    {item.available ? 'Available' : 'Unavailable'}
                  </span>
                </div>
                <div style={styles.actions}>
                  <button onClick={() => handleEdit(item)} style={styles.editButton}>
                    Edit
                  </button>
                  <button onClick={() => handleDelete(item._id)} style={styles.deleteButton}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '20px auto',
    padding: '20px',
  },
  loading: {
    textAlign: 'center',
    padding: '50px',
    fontSize: '18px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
  },
  addButton: {
    padding: '12px 24px',
    background: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  formOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '20px',
  },
  formCard: {
    background: 'white',
    borderRadius: '12px',
    padding: '30px',
    maxWidth: '500px',
    width: '100%',
    maxHeight: '90vh',
    overflowY: 'auto',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  input: {
    padding: '12px',
    border: '2px solid #e0e0e0',
    borderRadius: '6px',
    fontSize: '14px',
  },
  hint: {
    fontSize: '12px',
    color: '#999',
    fontStyle: 'italic',
  },
  checkboxGroup: {
    display: 'flex',
    alignItems: 'center',
  },
  formActions: {
    display: 'flex',
    gap: '10px',
  },
  submitButton: {
    flex: 1,
    padding: '12px',
    background: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  cancelButton: {
    flex: 1,
    padding: '12px',
    background: '#666',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  stats: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
    marginBottom: '30px',
  },
  statCard: {
    background: '#f5f5f5',
    padding: '20px',
    borderRadius: '8px',
    textAlign: 'center',
  },
  empty: {
    textAlign: 'center',
    padding: '60px 20px',
    color: '#666',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px',
  },
  card: {
    border: '1px solid #ddd',
    borderRadius: '12px',
    overflow: 'hidden',
    background: 'white',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  image: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
  },
  cardContent: {
    padding: '20px',
  },
  itemName: {
    margin: '0 0 10px 0',
    fontSize: '20px',
  },
  description: {
    margin: '0 0 15px 0',
    color: '#666',
    fontSize: '14px',
    lineHeight: '1.5',
  },
  priceRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '15px',
  },
  price: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  badge: {
    padding: '4px 12px',
    borderRadius: '12px',
    color: 'white',
    fontSize: '12px',
    fontWeight: 'bold',
  },
  actions: {
    display: 'flex',
    gap: '10px',
  },
  editButton: {
    flex: 1,
    padding: '10px',
    background: '#2196F3',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600',
  },
  deleteButton: {
    flex: 1,
    padding: '10px',
    background: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600',
  },
};

export default ChefMenu;
