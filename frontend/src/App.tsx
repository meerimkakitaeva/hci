import React from "react";
import {Route, Routes} from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./features/user/Login";
import Tasks from "./features/tasks/Tasks";
import Registration from "./features/user/Registration";
import Help from "./pages/Help";
import ExtremeTasks from "./pages/ExtremeTasks";

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
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
