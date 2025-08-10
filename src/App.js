import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";

import axios from "axios";

// Import Components
import Home from "./Components/Home";
import Login from "./Components/Login";
import About from "./Components/About";
import Register from "./Components/Register";
import Payment from "./Components/Payment";
import AddReview from "./Customer/AddReview";
import CreateRequest from "./Customer/CreateRequest";
import UserRequests from "./Customer/UserRequests";
import AskQuestion from "./Customer/AskQuestion";
import Reviews from "./Customer/Reviews";
import UserPackages from "./Customer/UserPackages";

// Admin Components
import Admin from "./Admin/Admin";
import AddPackage from "./Admin/AddPackage";
import ViewPackages from "./Admin/ViewPackages";
import ViewPayments from "./Admin/ViewPayments";
import EditPackage from "./Admin/EditPackage";
import EditProfile from "./Components/EditProfile";
import AddEngineer from "./Admin/AddEngineer";
import ViewEngineer from "./Admin/ViewEngineer";
import AdminQnA from "./Admin/AdminQnA";

// Engineer Components
import Engineer from "./Engineer/Engineer";
import ViewAppointmentsE from "./Engineer/ViewAppointmentsE";




function App() {
  return (
    <div className="App">
      <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Admin Routes */}
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/addPackage" element={<AddPackage />} />
            <Route path="/admin/viewpackages" element={<ViewPackages />} />
            <Route path="/admin/viewpaymenthistory" element={<ViewPayments/>}/>
            <Route path="/admin/editpackage/:id" element={<EditPackage/>}></Route>
            <Route path="/admin/addengineer" element={<AddEngineer/>}></Route>
            <Route path="/admin/viewengineers" element={<ViewEngineer/>}></Route>
            <Route path="/admin/questionAndAnswer" element={<AdminQnA/>}></Route>

            {/* Engineer Routes */}
            <Route path="/engineer" element={<Engineer />} />
            <Route path="/engineer/viewAppointments" element={<ViewAppointmentsE />}/>


            <Route path="/payment" element={<Payment />} />
            <Route path="/reviews" element={<Reviews/>}/>
            <Route path="/createrequest" element={<CreateRequest />} />
            <Route path="/viewpackages" element={<UserPackages />}/>
            <Route path="/editprofile/:id" element={<EditProfile/>}/>
            <Route path="/viewRequests" element={<UserRequests/>}/>
            <Route path="/customer/addreview" element={<AddReview />}/>
            <Route path="/askQuestion" element={<AskQuestion/>}/>
          </Routes>
        
      </Router>
    </div>
  );
}

export default App;
