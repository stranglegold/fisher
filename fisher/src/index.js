import React from 'react';
import ReactDOM from 'react-dom';
import MyNavBar from "./template/MyNavBar";
import Footer from "./template/Footer";
import "./style/mainStyle.scss";


ReactDOM.render(
  <React.StrictMode>
      <div>
          <MyNavBar/>
          <Footer/>
      </div>
  </React.StrictMode>,
  document.getElementById('root')
);

