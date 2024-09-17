import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Files from '../Component/Files';
import Edit from '../Photos/Edit.svg';
import EditOrder from '../Component/EditOrder';
import Item from '../Component/Item';
import Shipping from '../Component/Shipping';
import RemoveOrder from '../Component/RemoveOrder';
import RemoveTheme from '../Component/RemoveTask';
import CreateTransport from '../Component/CreateTransport';

const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
};

const Order = () => {
    const { id } = useParams();
    const [details, setDetails] = useState({});
    const [isEditPopupVisible, setIsEditPopupVisible] = useState(false);
    const [activeTab, setActiveTab] = useState(null);
    const [remPopUp, setRemPopUp] = useState(false);
    const [removeId, setRemoveId] = useState(null);
    const [selectedOrders, setSelectedOrders] = useState([]);
    const [transportPopUp, setTransportPopUp] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        const storedOrders = localStorage.getItem('selectedOrders');
        if (storedOrders) {
            const orders = JSON.parse(storedOrders).map(Number); 
            setSelectedOrders(orders);
            const activeIndex = orders.indexOf(parseInt(id));
            setActiveTab(activeIndex !== -1 ? activeIndex : 0);
        }
    }, [id]);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const res = await axios.get(`https://localhost:7161/api/Order/${id}`);
                console.log('Order Details:', res.data.data);
                setDetails(res.data.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        if (id) {
            fetchDetails();
        }
    }, [id]);
    const removeFromTabsAndStorage = (orderId) => {
        console.log('Removing order from tabs and storage:', orderId);
        const newSelectedOrders = selectedOrders.filter(item => item !== orderId);
        console.log('New selected orders:', newSelectedOrders);
        setSelectedOrders(newSelectedOrders);
        localStorage.setItem('selectedOrders', JSON.stringify(newSelectedOrders));
        if (newSelectedOrders.length === 0) {
            console.log('No more orders left. Navigating to home.');
            navigate('/Orders');
        } else {
            const newActiveIndex = newSelectedOrders.indexOf(parseInt(id));
            setActiveTab(newActiveIndex !== -1 ? newActiveIndex : 0);
            console.log('New active tab index:', newActiveIndex);
        }
    };

    const popUpVisible = () => {
        setIsEditPopupVisible(true);
    };

    const closePopUpVisible = () => {
        setIsEditPopupVisible(false);
    };
    const popUpTransportVisible = () => {
        setTransportPopUp(true);
    };

    const closeTransporPopUpVisible = () => {
        setTransportPopUp(false);
    };

    const createRemPopUp = (orderId) => {
        setRemoveId(orderId);
        setRemPopUp(true);
    };

    const closeRemPopUp = () => {
        setRemPopUp(false);
    };

    const handleOrderRemoved = (orderId) => {
        console.log('Handling order removed:', orderId);
        removeFromTabsAndStorage(parseInt(orderId));
        if (parseInt(orderId) === parseInt(id)) {
            console.log('Removed order is the current order. Navigating to home.');
            navigate('/Orders');
        }
        closeRemPopUp();
    };

    return (
        <main>
            <div className="main">
                <div className="main-tabs">
                    {selectedOrders.map((order, index) => (
                        <div key={order} className={`main-tabs-select ${activeTab === index ? 'active' : ''}`}>
                            <Link to={`/Order/${order}`} onClick={() => setActiveTab(index)}>
                                <p>Order {order}</p>
                            </Link>
                            <i className="fa-solid fa-xmark" onClick={() => removeFromTabsAndStorage(order)}></i>
                        </div>
                    ))}
                </div>
                <div className="main-info">
                    <div className="main-info-begin">
                        <div className="main-info-begin-name">
                            <p>{details.name || 'N/A'}</p>
                        </div>
                        <div className="main-info-begin-options">
                            <Link to={`/Order/${id}/ShippingRate`} className="main-info-begin-options-transport">ShippingRate</Link>
                            <button className="main-info-begin-options-btns" onClick={popUpTransportVisible}>
                                <img src={Edit} alt="Edit" className="edit-icon" />
                            </button>
                            <Link to={`/Order/${id}/Itemtransports`} className="main-info-begin-options-transport">TRANSPORTATION</Link>
                            <button className="main-info-begin-options-btns" onClick={popUpTransportVisible}>
                                <img src={Edit} alt="Edit" className="edit-icon" />
                            </button>
                            <button onClick={() => createRemPopUp(id)} className="main-info-begin-options-rem">Remove Order</button>
                            <button className="main-info-begin-options-btns" onClick={popUpVisible}>
                                <img src={Edit} alt="Edit" className="edit-icon" />
                            </button>
                        </div>
                    </div>
                    <div className="main-info-text">
                        <div className="main-info-text-main">
                            <div className="main-info-text-main-one">
                                <p>Status</p>
                                <h2>{details.status || 'N/A'}</h2>
                            </div>
                            <div className="main-info-text-main-one">
                                <p>DateTime</p>
                                <h2>{formatDate(details.orderDate) || 'N/A'}</h2>
                            </div>
                            <div className="main-info-text-main-one">
                                <p>From</p>
                                <h2>{details.from || 'N/A'}</h2>
                            </div>
                            <div className="main-info-text-main-one">
                                <p>Delivery Type</p>
                                <h2>{details.deliveryType || 'N/A'}</h2>
                            </div>
                            <div className="main-info-text-main-one">
                                <p>Transportation Method</p>
                                <h2>{details.transportationMethod || 'N/A'}</h2>
                            </div>
                            <div className="main-info-text-main-one">
                                <p>To</p>
                                <h2>{details.to || 'N/A'}</h2>
                            </div>
                        </div>
                        <div className="main-info-text-msg">
                            <p className="main-info-text-msg-name">Comments</p>
                            <p className="text">{details.comment || 'No comments'}</p>
                        </div>
                    </div>
                    <div className="main-info-blocks">
                        <Item />
                        <Shipping />
                        <Files />
                    </div>
                </div>
            </div>
            {isEditPopupVisible && <EditOrder onClose={closePopUpVisible} />}
            {remPopUp && <RemoveTheme onClose={closeRemPopUp} id={removeId} onOrderRemoved={handleOrderRemoved} />}
            {transportPopUp && <CreateTransport onClose={closeTransporPopUpVisible}/>}
        </main>
    );
};

export default Order;
