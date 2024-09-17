import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Tasks = () => {
    const [items, setItems] = useState([]);
    const [notDone, setNotDone] = useState([]);

    useEffect(() => {
        const fetchDone = async () => {
            try {
                const res = await axios.get('https://localhost:7146/api/Task/notdone');
                console.log('Done:', res.data.result.data);

                    setItems(res.data.result.data);
                } 
             catch (error) {
                console.error('Error fetching data:', error);
                console.error('Error details:', error.response);
                setItems([]);
            }
        };
        fetchDone();
    }, []);
    useEffect(() => {
        const fetchNotDone = async () => {
            try {
                const res = await axios.get('https://localhost:7146/api/Task/done');
                console.log('Not Data:', res.data.result.data);

                setNotDone(res.data.result.data);
                } 
             catch (error) {
                console.error('Error fetching data:', error);
                console.error('Error details:', error.response);
                setNotDone([]);
            }
        };
        fetchNotDone();
    }, []);
    return (
        <main>
            <div className="main">
                <div className="main-filter">
                    <div className="main-filter-total">
                        <h2>Complited</h2>
                        <p><strong>Total: {items.length} tasks</strong></p>
                    </div>
                </div>
                <div className="main-table">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Task Name</th>
                                <th>Description</th>
                                <th>Status</th>
                                <th>Priority</th>
                                <th>Deadline</th>
                                <th>Completed</th>
                                <th>More</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.length > 0 ? (
                                items.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.taskName}</td>
                                        <td>{item.taskDescription}</td>
                                        <td>{item.status}</td>
                                        <td>{item.priority}</td>
                                        <td>{item.deadLine}</td>
                                        <td>{item.isCompleted ? 'Yes' : 'No'}</td>
                                        <td>
                                            <Link to={`/Task/${item.id}`}>More</Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8">No tasks available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="main-filter">
                    <div className="main-filter-total">
                        <h2>Not Complited</h2>
                        <p><strong>Total: {notDone.length} tasks</strong></p>
                    </div>
                </div>
                <div className="main-table">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Task Name</th>
                                <th>Description</th>
                                <th>Status</th>
                                <th>Priority</th>
                                <th>Deadline</th>
                                <th>Completed</th>
                                <th>More</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.length > 0 ? (
                                items.map((item) => (
                                    <tr key={notDone.id}>
                                        <td>{notDone.id}</td>
                                        <td>{notDone.taskName}</td>
                                        <td>{notDone.taskDescription}</td>
                                        <td>{notDone.status}</td>
                                        <td>{notDone.priority}</td>
                                        <td>{notDone.deadLine}</td>
                                        <td>{notDone.isCompleted ? 'Yes' : 'No'}</td>
                                        <td>
                                        <Link to={`/Task/${notDone.id}`}>More</Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8">No tasks available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    );
}

export default Tasks;
