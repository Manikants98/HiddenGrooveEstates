import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { Header, ProtectedRoute } from "./components";
import { Home, AboutUs, ContactUs, Admin, Login } from "./pages";

function AppContent() {
  const location = useLocation();
  const isAdmin = location.pathname === "/admin";
  const isLogin = location.pathname === "/login";

  return (
    <div className="min-h-screen">
      {!isAdmin && !isLogin && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
