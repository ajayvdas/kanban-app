import CreateBoardModal from "@/components/CreateBoardModal";
import DeleteBoardModal from "@/components/DeleteBoardModal";
import { Button } from "@/components/ui/button";
import { useGetBoardsQuery } from "@/features/api/apiSlice";
import { openModal } from "@/features/ui/uiSlice";
import { Calendar, KanbanSquare, Plus, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Dashboard() {
    const { data: boards, isLoading, isError } = useGetBoardsQuery();
    const { activeModal } = useSelector((state) => state.ui);
    const dispatch = useDispatch();

    const handleDelete = async (e, id) => {
        e.preventDefault();
        dispatch(openModal('deleteBoard'))
    }

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="h-40 bg-slate-200 rounded-md animate-pulse" />
                ))}
            </div>
        );
    }

    if (isError) {
        return (
            <div className="text-center py-12">
                <p className="text-red-500">Failed to load boards.</p>
            </div>
        );
    }
    return (
        <div>
            {/* Dashboard Header and action */}
            <div className="flex justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold">Your Boards</h1>
                    <p className="text-slate-500 mt-1">Manage your project and boards</p>
                </div>
                <Button onClick={() => dispatch(openModal("createBoard"))}>
                    <Plus size={20} /> New Board
                </Button>
            </div>
            {/* Kanban Boards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* If there is boards */}
                {boards.map((board) => (
                    <Link
                        key={board._id}
                        to={`/board/${board._id}`}
                        className="group relative bg-white p-6 rounded-xl border border-slate-200 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <KanbanSquare size={24} />
                            </div>
                            <Button
                                onClick={e => handleDelete(e, board._id)}
                                variant="ghost"
                                className="opacity-0 group-hover:opacity-100"
                            >
                                <Trash2 size={18} />
                            </Button>
                        </div>

                        <h3 className="text-lg font-bold mb-2">{board.title}</h3>

                        <div className="flex items-center gap-2 text-sm text-slate-500">
                            <Calendar size={14} />
                            <span>{new Date(board.createdAt).toLocaleDateString()}</span>
                        </div>
                    </Link>
                ))}

                {/* If boards are empty */}
                {boards.length === 0 && (
                    <div className="col-span-full text-center py-12 bg-white rounded-xl border border-dashed border-slate-300">
                        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                            <KanbanSquare size={32} />
                        </div>
                        <h3 className="text-lg font-medium text-slate-900 mb-2">No boards yet</h3>
                        <p className="text-slate-500 mb-6">Create your first board to get started</p>
                        <button
                            // onClick={() => dispatch(openModal("createBoard"))}
                            className="text-primary font-medium hover:underline"
                        >
                            Create a board
                        </button>
                    </div>
                )}
            </div>

            {activeModal === "createBoard" && <CreateBoardModal />}
            {activeModal === "deletdBoard" && <DeleteBoardModal />}
        </div>
    );
}
