import React from 'react'
import  { BrowserRouter,Routes,Route}     from 'react-router-dom'
import LandingPage from './LandingPage'
import DrawingBoard from "./DrawingBoard";


const Router = () => {
    
  return (

   <BrowserRouter>
   <Routes>
   <Route path="/" element={<LandingPage />} />
   <Route path="/drawing/:BoardId" element={<DrawingBoard/>} />
   

   </Routes>
   
   </BrowserRouter>
  )
}

export default Router