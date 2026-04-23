import { Suspense, lazy } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";

/* Lazy-load every page so Three.js / R3F modules never block MUI init */
const LandingPage    = lazy(() => import("./pages/landing/LandingPage"));
const Login          = lazy(() => import("./pages/landing/Login"));
const Register       = lazy(() => import("./pages/landing/Register"));
const ForgotPassword = lazy(() => import("./pages/landing/ForgotPassword"));
const Marketplace    = lazy(() => import("./pages/Marketplace"));
const Home           = lazy(() => import("./pages/Home"));
const About          = lazy(() => import("./pages/About"));
const Setting        = lazy(() => import("./pages/Setting"));
const Profile        = lazy(() => import("./pages/settingpages/Profile"));
const Account        = lazy(() => import("./pages/settingpages/Account"));
const Dashboard      = lazy(() => import("./pages/settingpages/Dashboard"));
const User           = lazy(() => import("./pages/admin/User"));
const Role           = lazy(() => import("./pages/admin/Role"));
const Group          = lazy(() => import("./pages/admin/Group"));
const AboutCards     = lazy(() => import("./pages/admin/AboutCards"));
const Asset          = lazy(() => import("./pages/asset/Asset"));
const Models         = lazy(() => import("./modelComponents/Models"));
const Car            = lazy(() => import("./modelComponents/Car"));

function PageLoader() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0a0f",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}>
      <div style={{
        width: 40, height: 40, borderRadius: "50%",
        border: "3px solid #1e1e2e",
        borderTopColor: "#7c3aed",
        animation: "spin 0.8s linear infinite",
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Public */}
          <Route path="/"              element={<LandingPage />} />
          <Route path="/login"         element={<Login />} />
          <Route path="/register"      element={<Register />} />
          <Route path="/reset-password" element={<ForgotPassword />} />
          <Route path="/marketplace"   element={<Marketplace />} />

          {/* App */}
          <Route path="/home"      element={<Home />} />
          <Route path="/about"     element={<About />} />
          <Route path="/setting"   element={<Setting />} />
          <Route path="/profile"   element={<Profile />} />
          <Route path="/account"   element={<Account />} />
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Admin */}
          <Route path="/userdata"  element={<User />} />
          <Route path="/roledata"  element={<Role />} />
          <Route path="/group"     element={<Group />} />
          <Route path="/admincard" element={<AboutCards />} />

          {/* Assets & 3D */}
          <Route path="/asset"  element={<Asset />} />
          <Route path="/models" element={<Models />} />
          <Route path="/car"    element={<Car />} />

          <Route path="/logout" element={<LandingPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
