import axios from 'axios';
import { useState, useEffect } from 'react';

const Admin = () => {
  const [data, setData] = useState([]);

  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:8080/');
        setData(res.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

//Handle form subm.
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newItem = {
      name,
      type,
      description,
      image,
    };

    try {
      const res = await axios.post('http://localhost:8080/admin', newItem);
      console.log('Item created:', res.data);
      setData([...data, res.data]);
      alert('Item Successfully Added');
    } catch (error) {
      console.error('Error creating item:', error);
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-logo">StyleSphere</div>
        <div className="navbar-links">
          <a href="/">Home</a>
          <a href="#items">Items</a>
          <a href="#enquire">Enquire</a>
        </div>
      </nav>

      <div className="menu">
        {data.map((item, index) => (
          <div key={index} className="card">
            <img src={item.image} className="item-image" alt="" />
            <h2 className="item-name">{item.name}</h2>
            <h3 className="item-type">{item.type}</h3>
            <p className="item-description">{item.description}</p>
            <button className="item-button" onClick={() => setSelectedItem(item)}>
              Add New Item
            </button>
          </div>
        ))}
      </div>

      {selectedItem && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close" onClick={() => setSelectedItem(null)}>✕</button>
            <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Item name" value={name} onChange={(e) => setName(e.target.value)}/>
        <input type="text" placeholder="Item type" value={type} onChange={(e) => setType(e.target.value)}/>
        <input type="text" placeholder="Item description" value={description} onChange={(e) => setDescription(e.target.value)}/>
        <input type="text" placeholder="Item image URL" value={image} onChange={(e) => setImage(e.target.value)}/>
        <button type="submit">Submit</button>
      </form>
          </div>
        </div>
      )}

        
    </>
  );
};

export default Admin;






