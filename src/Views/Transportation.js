import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Delate from '../Photos/Delate.svg'; 
import Edit from '../Photos/Edit.svg';
import EditTransport from '../Component/EditTransport';
import ItemList from '../Component/ItemList';
import Rfq from '../Component/Rgq';
import RemoveTrasnsport from '../Component/RemoveTrasnsport';

const formatDate = (dateString) => {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', options);
};

const Transportation = () => {
  const [details, setDetails] = useState({});
  const { id, itemTransportId } = useParams();
  const [popUpRemVis, setPopUpRemVis] = useState(false);
  const [popUpUpdVis, setPopUpUpdVis] = useState(false);
  const [selectedOrders, setSelectedOrders] = useState(JSON.parse(localStorage.getItem('selectedOrders')) || []);
  const [selectedTransports, setSelectedTransports] = useState(JSON.parse(localStorage.getItem('selectedTransports')) || {});
  const [activeTab, setActiveTab] = useState(null);
  const [activeTransportTab, setActiveTransportTab] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('selectedOrders')) || [];
    const savedTransports = JSON.parse(localStorage.getItem('selectedTransports')) || {};
    setSelectedOrders(savedOrders);
    setSelectedTransports(savedTransports);
    const initialActiveTab = savedOrders.indexOf(parseInt(id));
    setActiveTab(initialActiveTab !== -1 ? savedOrders[initialActiveTab] : null);
    setActiveTransportTab(savedTransports[id]?.[0] || null);
  }, [id]);

  useEffect(() => {
    const fetchDetails = async () => {
      if (!itemTransportId) return;
      try {
        const res = await axios.get(`https://localhost:7161/api/Order/${id}/itemtransport/${itemTransportId}`);
        setDetails(res.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchDetails();
  }, [id, itemTransportId]);

  useEffect(() => {
    localStorage.setItem('selectedOrders', JSON.stringify(selectedOrders));
    localStorage.setItem('selectedTransports', JSON.stringify(selectedTransports));
  }, [selectedOrders, selectedTransports]);

  const handleOrderClick = (orderId) => {
    setActiveTab(orderId);
  };

  const handleTransportClick = (orderId, transportId) => {
    setActiveTransportTab(transportId);
  };

  const handleOrderRemove = (orderId) => {
    setSelectedOrders(selectedOrders.filter((order) => order !== orderId));
    if (activeTab !== null && selectedOrders[activeTab] === orderId) {
      setActiveTab(null);
    }
    if (selectedOrders.length === 0) {
      navigate('/Orders');
    }
  };

  const handleTransportRemove = (orderId, transportId) => {
    setSelectedTransports((prevTransports) => {
      const updatedTransports = { ...prevTransports };
      if (updatedTransports[orderId]) {
        updatedTransports[orderId] = updatedTransports[orderId].filter(id => id !== transportId);
        if (updatedTransports[orderId].length === 0) {
          delete updatedTransports[orderId];
        }
      }
      return updatedTransports;
    });
    if (activeTransportTab === transportId) {
      setActiveTransportTab(null);
    }
  };

  const popUpVisible = () => setPopUpRemVis(true);
  const popUpNonVisible = () => setPopUpRemVis(false);
  const popUpVisibleUPD = () => setPopUpUpdVis(true);
  const popUpNonVisibleUPD = () => setPopUpUpdVis(false);

  return (
    <main>
      <div className="main">
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

        <div className='mmmmbb'>
          <div className="main-tabs">
            {selectedTransports[id]?.map((transportId) => (
              <div key={transportId} className={`main-tabs-select ${activeTransportTab === transportId ? 'active' : ''}`} onClick={() => handleTransportClick(id, transportId)}>
                <Link to={`/Order/${id}/Itemtransport/${transportId}`}>
                  <p>Transport {transportId}</p>
                </Link>
                <i
                  className="fa-solid fa-xmark"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTransportRemove(id, transportId);
                  }}
                ></i>
              </div>
            ))}
          </div>
        </div>
      <div className="main-info">
        <div className="main-info-begin">
          <div className="main-info-begin-name">
            <p>2893 Austin Secret Lane</p>
          </div>
          <div className="main-info-begin-options">
            <button onClick={popUpVisible} className="main-info-begin-options-btns"><img src={Delate} alt="Delete" className="delete-icon" /></button>
            <button onClick={popUpVisibleUPD} className="main-info-begin-options-btns"><img src={Edit} alt="Edit" className="delete-icon" /></button>
          </div>
        </div>
        <div className="main-info-text">
          <div className="main-info-text-tr-main">
            <div className="main-info-text-main-one">
              <p>{details.name}</p>
              <h2>{formatDate(details.plannedPU)}</h2>
            </div>
            <div className="main-info-text-main-one">
              <p>Planned DE</p>
              <h2>{formatDate(details.plannedDE)}</h2>
            </div>
            <div className="main-info-text-main-one">
              <p>Custom Start</p>
              <h2>{formatDate(details.customStart)}</h2>
            </div>
            <div className="main-info-text-main-one">
              <p>Transportation Method</p>
              <h2>{formatDate(details.transportationMethod)}</h2>
            </div>
            <div className="main-info-text-main-one">
              <p>PU</p>
              <h2>{formatDate(details.pu)}</h2>
            </div>
            <div className="main-info-text-main-one">
              <p>DE</p>
              <h2>{formatDate(details.de)}</h2>
            </div>
            <div className="main-info-text-main-one">
              <p>Custom End</p>
              <h2>{formatDate(details.customEnd)}</h2>
            </div>
            <div className="main-info-text-main-one">
              <p>Transport</p>
              <h2>{formatDate(details.transport)}</h2>
            </div>
            <div className="main-info-text-main-one">
              <p>Act PU</p>
              <h2>{formatDate(details.actPU)}</h2>
            </div>
            <div className="main-info-text-main-one">
              <p>Act DE</p>
              <h2>{formatDate(details.actDE)}</h2>
            </div>
          </div>
          <div className="main-info-text--tr-msg">
            <p className="main-info-text-msg-name">Comments</p>
            <p className="text">{details.comment}</p>
          </div>
        </div>
        <div className="main-info-blocks-tr">
          <ItemList />
          <Rfq />
        </div>
      </div>
      {popUpRemVis && <RemoveTrasnsport onClose={popUpNonVisible} />}
      {popUpUpdVis && <EditTransport onClose={popUpNonVisibleUPD} />}
    </div>
    </main>
  );
};

export default Transportation;
