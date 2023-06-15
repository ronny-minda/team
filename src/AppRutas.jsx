import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
  useLocation,
} from "react-router-dom";
import Redux from "./pages/redux";
import UseQuiery from "./pages/useQuiery";
import Layout from "./components/layout";
import { AnimatePresence } from "framer-motion";

const App = () => {
  const location = useLocation();

  return (
    <Layout>
      <AnimatePresence>
        <Routes location={location} key={location.pathname}>
          <Route path="/redux" element={<Redux />} />
          <Route element={<Protected />}>
            <Route path="/useQuiery" element={<UseQuiery />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </Layout>
  );
};

const Protected = () => {
  const admin = false;

  if (admin) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
};

export default App;
