import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LayOut from './Views/LayOut';
import LogIn from './Views/LogIn';
import Theme from './Views/Theme';
import Tasks from './Views/Tasks';
import Task from './Views/Task';
const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<LogIn />} />
                {/* <Route element={<PrivateRoutes />}> */}
                    <Route path="/" element={<LayOut />}>
                        <Route path="Theme" element={<Theme />} />
                        <Route path="Theme" element={<Theme />} />
                        <Route path="Theme/:themeId/Task" element={<Tasks />} />
                        <Route path="Task/:taskId" element={<Task />} />
                    </Route>
                {/* </Route> */}
            </Routes>
        </BrowserRouter>
    );
}

export default App;
