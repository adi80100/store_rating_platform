import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Register from "./pages/Register.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import UserDashboard from "./pages/UserDashboard.jsx";
import OwnerDashboard from "./pages/OwnerDashboard.jsx";
import Login from "./pages/Login.jsx";
import AddUser from "./pages/AddUser.jsx";
import AddStore from "./pages/AddStore.jsx";
import Users from "./pages/Users.jsx";
import Stores from "./pages/Stores.jsx";
import UserDetails from "./pages/UserDetails.jsx";

import ProtectedRoutes from "./components/ProtectedRoutes.jsx";
import ChangePassword from "./pages/ChangePassword.jsx";
import AdminLayout from "./layouts/AdminLayout.jsx";
import UserLayout from "./layouts/UserLayout.jsx";
import OwnerLayout from "./layouts/OwnerLayout.jsx";
function App() {
  return (
    <BrowserRouter>

    <Routes>
      
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route 
              path="/admin/dashboard" 
              element={
                <ProtectedRoutes role="admin">
                    <AdminDashboard />
                </ProtectedRoutes>
                } />
        <Route
          path="/user/dashboard"
          element={
            <ProtectedRoutes role="user">
              <UserDashboard />
            </ProtectedRoutes>
          }/>        
        <Route
          path="/owner/dashboard"
          element={
            <ProtectedRoutes role="owner">
              <OwnerDashboard />
            </ProtectedRoutes>
          }/>
        <Route 
              path="/admin/add-user" 
              element={
                <ProtectedRoutes role="admin">
                  <AddUser />
                </ProtectedRoutes>
              
              } />
        <Route path="/admin/add-store" 
                  element={
                  <ProtectedRoutes role="admin">
                    <AddStore />
                  </ProtectedRoutes>
              } />

        <Route
            path="/admin/users"
            element={
              <ProtectedRoutes role="admin">
                <Users />
              </ProtectedRoutes>
            } />

          <Route
            path="/admin/stores"
            element={
              <ProtectedRoutes role="admin">
                <Stores />
              </ProtectedRoutes>
            }/>

          <Route
            path="/admin/user/:id"
            element={
              <ProtectedRoutes role="admin">
                <UserDetails />
              </ProtectedRoutes>
            }/>
            <Route
              path="/admin/change-password"
              element={
                <ProtectedRoutes role="admin">
                  <AdminLayout>
                    <ChangePassword />
                  </AdminLayout>
                </ProtectedRoutes>
              }
            />

            <Route
              path="/user/change-password"
              element={
                <ProtectedRoutes role="user">
                  <UserLayout>
                    <ChangePassword />
                  </UserLayout>
                </ProtectedRoutes>
              }
            />

            <Route
              path="/owner/change-password"
              element={
                <ProtectedRoutes role="owner">
                  <OwnerLayout>
                    <ChangePassword />
                  </OwnerLayout>
                </ProtectedRoutes>
              }
            />
    </Routes>

    </BrowserRouter>
  );
}

export default App;