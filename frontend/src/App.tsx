import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./features/user/Login";
import Tasks from "./features/tasks/Tasks";
import Registration from "./features/user/Registration";

function App() {
  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route path="/" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/tasks" element={<Tasks />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
