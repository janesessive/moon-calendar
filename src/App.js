import React from 'react';
import { BrowserRouter } from 'react-router-dom';
// import Panchanga from './components/Panchanga/Panchanga';
// import UserForm from './components/UserForm/UserForm';
import Layout from './components/Layout/Layout';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
     <Layout />
     {/* <UserForm /> */}
    </div>
    </ BrowserRouter>
  );
}

export default App;
