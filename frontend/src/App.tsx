import React from "react";
import {Route, Routes} from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./features/user/Login";
import Tasks from "./features/tasks/Tasks";
import Registration from "./features/user/Registration";
import Help from "./pages/Help";
import ExtremeTasks from "./pages/ExtremeTasks";
import OneTaskPage from "./pages/OneTaskPage";
import Form from "./pages/Form";

function App() {
  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route path="/" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/vitest" element={<ExtremeTasks />} />
          <Route path="/help" element={<Help />} />
          <Route path="/tasks/:id" element={<OneTaskPage />} />
          <Route path="/form" element={<Form />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
