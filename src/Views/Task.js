import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Edit from '../Photos/Edit.svg';
import EditOrder from '../Component/EditOrder';
import RemoveOrder from '../Component/RemoveOrder';

const formatDate = (dateString) => {
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
};

const Task = () => {
    const { taskId } = useParams();
    const [details, setDetails] = useState({});
    const [isEditPopupVisible, setIsEditPopupVisible] = useState(false);
    const [remPopUp, setRemPopUp] = useState(false);
    const [removeId, setRemoveId] = useState(null);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const res = await axios.get(`http://localhost:7161/api/Task/${taskId}`);
                console.log('Task Details:', res.data);
                setDetails(res.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchDetails();
    }, [taskId]);

    const popUpVisible = () => {
        setIsEditPopupVisible(true);
    };

    const closePopUpVisible = () => {
        setIsEditPopupVisible(false);
    };

    const createRemPopUp = (taskId) => {
        setRemoveId(taskId);
        setRemPopUp(true);
    };

    const closeRemPopUp = () => {
        setRemPopUp(false);
    };

    return (
        <main>
            <div className="main">
                <div className="main-info">
                    <div className="main-info-begin">
                        <div className="main-info-begin-name">
                            <p>{details.TaskName || 'N/A'}</p>
                        </div>
                        <div className="main-info-begin-options">
                            <button onClick={() => createRemPopUp(taskId)} className="main-info-begin-options-rem">
                                Remove Task
                            </button>
                            <button className="main-info-begin-options-btns" onClick={popUpVisible}>
                                <img src={Edit} alt="Edit" className="edit-icon" />
                            </button>
                        </div>
                    </div>
                    <div className="main-info-text">
                        <div className="main-info-text-main">
                            <div className="main-info-text-main-one">
                                <p>Description</p>
                                <p>{details.TaskDescription || 'N/A'}</p>
                            </div>
                            <div className="main-info-text-main-one">
                                <p>Status</p>
                                <h2>{details.Status || 'N/A'}</h2>
                            </div>
                            <div className="main-info-text-main-one">
                                <p>Priority</p>
                                <h2>{details.Priority || 'N/A'}</h2>
                            </div>
                            <div className="main-info-text-main-one">
                                <p>Deadline</p>
                                <h2>{formatDate(details.DeadLine) || 'N/A'}</h2>
                            </div>
                            <div className="main-info-text-main-one">
                                <p>Date of Completion</p>
                                <h2>{formatDate(details.DateOfCompletion) || 'N/A'}</h2>
                            </div>
                            <div className="main-info-text-main-one">
                                <p>Create Date</p>
                                <h2>{formatDate(details.CreateDate) || 'N/A'}</h2>
                            </div>
                            <div className="main-info-text-main-one">
                                <p>Is Completed</p>
                                <h2>{details.IsCompleted ? 'Yes' : 'No'}</h2>
                            </div>
                        </div>
                        <div className="main-info-text-msg">
                            <p className="main-info-text-msg-name">Comments</p>
                            <p className="text">{details.Comments || 'No comments'}</p>
                        </div>
                    </div>
                    <div className="main-info-blocks">
                        {/* <Item /> */}
                    </div>
                </div>
            </div>
            {isEditPopupVisible && <EditOrder onClose={closePopUpVisible} />}
            {remPopUp && <RemoveOrder onClose={closeRemPopUp} id={removeId} />}
        </main>
    );
};

export default Task;
