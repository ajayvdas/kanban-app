import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import BoardView from "./pages/BoardView";
import { useSelector } from "react-redux";
import { useGetUserQuery } from "./features/api/apiSlice";

const PrivateRoute = ({ children }) => {
    const { isAuthenticated } = useSelector((state) => state.auth);

    return isAuthenticated ? children : <Navigate to="/login" />;
};

export default function App() {
    const { token } = useSelector((state) => state.auth);
    const { isLoading } = useGetUserQuery(undefined, { skip: !token });

    if (isLoading) {
        return <div className="flex items-center justify-center h-screen">Loading...</div>;
    }

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
