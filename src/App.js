import "./App.css";
import AuthProvider from "./AuthProvider.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Login from "./components/Login.jsx";
import View from "./components/View.jsx";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/view" element={<View />} />
            </Route>
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}
export default App;