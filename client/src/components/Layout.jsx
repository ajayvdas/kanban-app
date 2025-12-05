import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { toggleSidebar } from "../features/ui/uiSlice";
import { LayoutDashboard, LogOut, Menu } from "lucide-react";

const Layout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { isSidebarOpen } = useSelector((state) => state.ui);
    const { user } = useSelector((state) => state.auth);
    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    return (
        <div className="flex h-screen  overflow-hidden">
            {/* Sidebar */}
            <aside
                className={` border-r border-slate-200  transition-all duration-300 flex flex-col fixed md:relative z-20 h-full 
                            ${
                                isSidebarOpen
                                    ? "w-64 translate-x-0"
                                    : "w-0 -translate-x-full md:w-0 md:translate-x-0 overflow-hidden"
                            }`}
            >
                <div className="p-6 border-b border-slate-100 flex items-center gap-3">
                    <div className="w-8 h-8  rounded-lg flex items-center justify-center bg-slate-200 font-bold">K</div>
                    <span className="font-bold text-xl ">KanbanApp</span>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <Link
                        to="/"
                        className={`
                            flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                            ${
                                location.pathname === "/"
                                    ? "bg-primary/10 text-primary font-medium"
                                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                            }`}
                    >
                        <LayoutDashboard size={20} />
                        Dashboard
                    </Link>
                    {/* Add more links here if needed */}
                </nav>

                <div className="p-4 border-t border-slate-100">
                    <div className="flex items-center gap-3 px-4 py-3 mb-2">
                        <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-medium">
                            {user?.username?.[0]?.toUpperCase()}
                        </div>
                        <div className="flex-1 overflow-hidden">
                            <p className="text-sm font-medium text-slate-900 truncate">{user?.username}</p>
                            <p className="text-xs text-slate-500 truncate">{user?.email}</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors text-sm font-medium"
                    >
                        <LogOut size={18} />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">
                <header className=" border-b border-slate-200 h-16 flex items-center px-6 justify-between">
                    <button
                        onClick={() => dispatch(toggleSidebar())}
                        className="p-2 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors"
                    >
                        <Menu size={20} />
                    </button>

                    {/* Header Actions */}
                    <div className="flex items-center gap-4">{/* Add header actions if needed */}</div>
                </header>

                <main className="flex-1 overflow-auto p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Layout;
