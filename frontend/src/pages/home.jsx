import axios from 'axios';
import { useState, useEffect } from 'react';
import '../app.css';

const Menu = () => {
  const [data, setData] = useState([]);
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

  const handleEnquire = async () => {
  try {
    const res = await axios.post('http://localhost:8080/');
    alert(res.data.message);
  } catch (err) {
    console.error('Failed to send enquiry:', err);
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
            <p className="item-description1">{item.description}</p>
            <button className="item-button" onClick={() => setSelectedItem(item)}>
              View Item
            </button>
          </div>
        ))}
      </div>

      {selectedItem && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close" onClick={() => setSelectedItem(null)}>✕</button>
            <img src={selectedItem.image} alt="" className="modal-image" />
            <h2>{selectedItem.name}</h2>
            <p>{selectedItem.type}</p>
            <p>{selectedItem.description}</p>
            <button className="enq-button" onClick={handleEnquire}>Enquire</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Menu;
