import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Photo from '../Photos/filter-add.svg';

const Transportations = () => {
  const { id } = useParams();
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedOrders, setSelectedOrders] = useState(JSON.parse(localStorage.getItem('selectedOrders')) || []);
  const [selectedTransports, setSelectedTransports] = useState(JSON.parse(localStorage.getItem('selectedTransports')) || {});
  const [activeTab, setActiveTab] = useState(null);
  const [activeTransportTab, setActiveTransportTab] = useState(null);
  const pageSize = 5;

  useEffect(() => {
    const fetchData = async (page) => {
      try {
        const res = await axios.get(`https://localhost:7161/api/Order/${id}/itemtransport/page/${page}/${pageSize}`);
        setTotalPages(Math.ceil(res.data.data.totalCount / pageSize));
        setItems(res.data.data.items || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData(currentPage);
  }, [id, currentPage]);

  useEffect(() => {
    localStorage.setItem('selectedOrders', JSON.stringify(selectedOrders));
    localStorage.setItem('selectedTransports', JSON.stringify(selectedTransports));
  }, [selectedOrders, selectedTransports]);

  const handleOrderClick = (orderId, transportId = null) => {
    setSelectedOrders((prev) => [...prev, orderId]);
    setSelectedTransports((prev) => ({
      ...prev,
      [orderId]: transportId ? [transportId] : [],
    }));
    setActiveTab(orderId);
  };

  const handleOrderRemove = (orderId) => {
    setSelectedOrders((prev) => prev.filter((order) => order !== orderId));
    setSelectedTransports((prev) => {
      const updated = { ...prev };
      delete updated[orderId];
      return updated;
    });
    if (activeTab === orderId) {
      setActiveTab(null);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <main>
      <div className="main">
        <div className='mmmmm'>
          <div className="main-tabs">
            {selectedOrders.map((orderId) => (
              <div
                key={orderId}
                className={`main-tabs-select ${activeTab === orderId ? 'active' : ''}`}
              >
                <Link to={`/Order/${orderId}`} onClick={() => handleOrderClick(orderId)}>
                  <p>Order {orderId}</p>
                </Link>
                <i
                  className="fa-solid fa-xmark"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOrderRemove(orderId);
                  }}
                ></i>
              </div>
            ))}
          </div>
        </div>
        <div className="main-filter">
          <div className="main-filter-total">
            <p><strong>Всего: {items.length} заказов</strong></p>
          </div>
          <div className="main-filter-sort">
            <div className="main-filter-sort-left">
              <select name="sortOptions" id="sortOptions">
                <option value="ff">ff</option>
                <option value="fffff">fffff</option>
              </select>
            </div>
            <div className="main-filter-sort-right">
              <p>Фильтр</p>
              <img src={Photo} alt="Добавить фильтр" />
            </div>
          </div>
        </div>
        <div className='mmmmm'>
          <div className="main-tabs">
            {selectedOrders.map((orderId) => (
              <Link
                key={orderId}
                to={`/Order/${orderId}`}
                className={`main-tabs-select ${activeTab === orderId ? 'active' : ''}`}
                onClick={() => handleOrderClick(orderId)}
              >
                <p>Order {orderId}</p>
                <i
                  className="fa-solid fa-xmark"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOrderRemove(orderId);
                  }}
                ></i>
              </Link>
            ))}
          </div>
        </div>
        <div className="main-table">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th className="main-table-name">Name</th>
              </tr>
            </thead>
            <tbody>
              {items.length > 0 ? (
                items.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td className="status">
                      <Link to={`/Order/${id}/Itemtransport/${item.id}`} onClick={() => handleOrderClick(id, item.id)}>Process</Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">No data available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="main-info-block-footer">
          <button className='pagin-btn' onClick={handlePreviousPage} disabled={currentPage === 0}>{"<"}</button>
          <p>{`${currentPage + 1}/${totalPages}`}</p>
          <button className='pagin-btn' onClick={handleNextPage} disabled={currentPage === totalPages - 1}>{">"}</button>
        </div>
      </div>
    </main>
  );
}

export default Transportations;
