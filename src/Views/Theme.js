import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
const Theme = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('https://localhost:7146/api/Theme');
                console.log('Data:', res.data.result.data);  

                // Access the correct part of the response data
                if (Array.isArray(res.data.result.data)) {
                    setData(res.data.result.data);
                } else {
                    console.error('Data is not an array:', res.data.result.data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []); 

    return (
        <div>
            {data.length > 0 ? (
                data.map((item, index) => (
                    <div key={index} className='Azik'>
                           <Link to={`/Theme/${item.id}/Task`} >{item.name}</Link>
                    </div>
                ))
            ) : (
                <div>No data available</div>
            )}
        </div>
    );
}

export default Theme;
