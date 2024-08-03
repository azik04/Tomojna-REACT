import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Delate from '../Photos/Delate.svg';
import CreateItemList from './CreateItemList';

const ItemList = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = 10;
  const { itemTransportId } = useParams();
  const [createPopUp, setCreatePopUp] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`https://localhost:7161/api/Order/itemtransports/${itemTransportId}/items?pageIndex=${currentPage}&pageSize=${pageSize}`);
        console.log(res.data.data);
        setTotalPages(Math.ceil(res.data.data.totalCount / pageSize));
        setData(res.data.data.items);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [itemTransportId, currentPage]);

  const handlePrevPage = () => {
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
    <div className="main-info-block">
      <div className="main-info-block-header">
        <div className="main-info-block-header-left">
          <p>Item List</p>
          <a href="#">Label text or value</a>
        </div>
        <div className="main-info-block-header-right">
          <a href="#" onClick={() => setCreatePopUp(true)}><i className="fa-solid fa-plus"></i> Add new Item</a>
        </div>
      </div>
      <div className="main-info-block-table">
        <table>
          <thead>
            <tr>
              <th className="bold">Item Name</th>
              <th>Netto/Gross Wh.</th>
              <th>Quantity</th>
              <th className="action-column"></th>
            </tr>
          </thead>
          <tbody>
            {data.map(item => (
              <tr key={item.id}>
                <td className="bold">{item.name}</td>
                <td>{item.nettoGross}</td>
                <td>{item.quantity}</td>
                <td className="action-column">
                  <button className='pagin-btn'>
                    <img src={Delate} alt="Remove" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="main-info-block-footer">
        <button onClick={handlePrevPage} className='pagin-btn' disabled={currentPage === 0}>{"<"}</button>
        <p>{`${currentPage + 1}/${totalPages}`}</p>
        <button onClick={handleNextPage} className='pagin-btn' disabled={currentPage === totalPages - 1}>{">"}</button>
      </div>
      {createPopUp && <CreateItemList onClose={() => setCreatePopUp(false)} />}
    </div>
  );
};

export default ItemList;
