import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AllUserDetails from './Pages/AllUserDetails';
import ShowDetail from './Pages/ShowDetail';

function App() {
 

  return (
   <div>
    <BrowserRouter>
     <Routes>
      <Route element={<AllUserDetails/>} path='/'/>
      <Route element={<ShowDetail/>} path='/show'/>

     </Routes>
    </BrowserRouter>
   </div>
  );
}

export default App;
