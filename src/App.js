// import * as React from "react";
import React, { Component } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Auth/Login/Login";
import Register from "./Auth/Register/Register";
import ChatBoard from "./Components/ChatBoard/ChatBoard";
import Home from "./Components/Home/Home";
import NavSection from "./Components/Nav/NavSection";
import { auth, onAuthStateChanged } from "./firebaseCon";
import { setUser, clearUser } from "./Redux/Action/ActionIndex";
import { connect } from "react-redux";

class App extends Component {
  state = {
    isLoggedIn: false,
  };

  componentDidMount() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.setState({ isLoggedIn: true });
        this.props.setUser(user);
      } else {
        this.setState({ isLoggedIn: false });
        this.props.clearUser();
      }
    });
  }

  render() {
    return (
      <div className="App">
        <NavSection />
        {this.state.isLoggedIn ? (
          <Routes>
            <Route path="/" element={<ChatBoard />} />
            <Route path="/chatboard" element={<ChatBoard />} />
            <Route path="login" element={<Navigate to="/chatboard" />} />
            <Route path="register" element={<Navigate to="/chatboard" />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="chatboard" element={<Navigate to="/login" />} />
          </Routes>
        )}
      </div>

      
    );
  }
}

export default connect(null, { setUser, clearUser })(App);
