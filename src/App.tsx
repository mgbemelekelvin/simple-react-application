import React from "react";
import "./App.css";
import styled from "styled-components";
import { Route, Routes } from "react-router-dom";
import { Login } from "./components/login/login";
import { Register } from "./components/register";
import { ForgotPassword } from "./components/forgotPassword";
import { OnetimeLogin } from "./components/onetimeLogin";
import { ConfirmResetPassword } from "./components/confirmPasswordResetCode";
import { Home } from "./components/home";
import { Dashboard } from "./components/dashboard";
import { RequireAuth } from "react-auth-kit";

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
`;

//testing the continuous Integration
function App() {
  return (
    <AppContainer>
      <Routes>
        <Route path="/" element={
            <RequireAuth loginPath="/login">
              <Home />
            </RequireAuth>
          }
        ></Route>
        <Route path="/dashboard" element={
            <RequireAuth loginPath="/dashboard">
              <Dashboard />
            </RequireAuth>
          }
        ></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/forgot-password" element={<ForgotPassword />}></Route>
        <Route path="/onetime-login" element={<OnetimeLogin />}></Route>
        <Route path="/reset-password/:code" element={<ConfirmResetPassword />}></Route>
      </Routes>
    </AppContainer>
  );
}

export default App;
