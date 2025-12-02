import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import BoardView from "./pages/BoardView";

const PrivateRoute = () => {
    // TODO: COMPLETE PRIVATE ROUTE
};

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route
                    path="/"
                    element={
                        <PrivateRoute>
                            <Layout />
                        </PrivateRoute>
                    }
                >
                  <Route index element={<Dashboard />} />
                  <Route path="board/:boardId" element={<BoardView />} />
                </Route>
            </Routes>
        </Router>
    );
}
