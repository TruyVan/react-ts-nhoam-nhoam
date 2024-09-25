import React from 'react';
import MainRoute from './routes/MainRoute';
import Header from './share/layout/header/Header';
import Footer from './share/layout/footer/Footer';
import { ToastContainer } from 'react-toastify';
import { Layout } from 'antd';

function App() {
  return (
    <>
        <Header/>
        <div className="App-body">
          <MainRoute/>
        </div>
        <Footer/>
      <ToastContainer/>
    </>
  );
}

export default App;
