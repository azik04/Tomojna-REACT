import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Photo from '../Photos/filter-add.svg';



const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
};

const Orders = () => {
    const [items, setItems] = useState([]);
    const [selectedOrders, setSelectedOrders] = useState([]);
    const [activeTab, setActiveTab] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('https://localhost:7161/api/Order');
                console.log('Response:', res);
                console.log('Data:', res.data.data);
                setItems(res.data.data);
            } catch (error) {
                console.error('Error fetching data:', error);
                console.error('Error details:', error.response);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const storedOrders = JSON.parse(localStorage.getItem('selectedOrders')) || [];
        setSelectedOrders(storedOrders);
    }, []);

    const handleOrderClick = (order, index) => {
        if (!selectedOrders.includes(order.id)) {
            const updatedOrders = [...selectedOrders, order.id];
            setSelectedOrders(updatedOrders);
            localStorage.setItem('selectedOrders', JSON.stringify(updatedOrders));
        }
        setActiveTab(index); 
        console.log('Clicked order:', order.id);
        console.log('Active tab index:', index);
    };

    const handleOrderRemove = (orderId) => {
        const updatedOrders = selectedOrders.filter(id => id !== orderId);
        setSelectedOrders(updatedOrders);
        localStorage.setItem('selectedOrders', JSON.stringify(updatedOrders));
    };

    return (
        <main>
            <div className="main">
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
                        {selectedOrders.map((orderId, index) => (
                            <Link
                                key={index}
                                to={`/Order/${orderId}`}
                                className={`main-tabs-select ${activeTab === index ? 'active' : ''}`}
                                onClick={() => setActiveTab(index)} 
                            >
                                <p>Order {orderId}</p>
                                <i className="fa-solid fa-xmark" onClick={(e) => {
                                    e.stopPropagation();
                                    handleOrderRemove(orderId);
                                }}></i>
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
                                <th>Date</th>
                                <th>User</th>
                                <th>State</th>
                                <th>Edit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item, index) => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{formatDate(item.orderDate)}</td>
                                    <td>{item.user}</td>
                                    <td className="status">
                                        <Link to={`/Order/${item.id}`} onClick={() => handleOrderClick(item, index)}>Process</Link>
                                    </td>
                                    <td>{item.comment}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    );
}

export default Orders;
