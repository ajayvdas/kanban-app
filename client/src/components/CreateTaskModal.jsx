import { useState } from "react";
import { useCreateTaskMutation } from "../features/api/apiSlice";
import { useDispatch } from "react-redux";
import { closeModal } from "../features/ui/uiSlice";
import { X, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

const CreateTaskModal = ({ boardId, status = "Todo" }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [createTask, { isLoading }] = useCreateTaskMutation();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createTask({ boardId, title, description, status }).unwrap();
            dispatch(closeModal());
        } catch (err) {
            console.error("Failed to create task:", err);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 animate-in fade-in zoom-in duration-200">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-slate-900">Add New Task</h3>
                    <Button
                        onClick={() => dispatch(closeModal())}
                        className="text-slate-400 hover:text-slate-600 transition-colors"
                    >
                        <X size={24} />
                    </Button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label className="block text-sm font-medium text-slate-700 mb-2">Title</Label>
                        <Input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg"
                            placeholder="Task title"
                            autoFocus
                            required
                        />
                    </div>

                    <div>
                        <Label className="block text-sm font-medium text-slate-700 mb-2">Description</Label>
                        <Textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg"
                            placeholder="Add details..."
                        />
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                        <Button type="button" onClick={() => dispatch(closeModal())} className="px-4 py-2  font-medium ">
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium shadow-lg shadow-primary/20 transition-all flex items-center gap-2"
                        >
                            {isLoading && <Loader2 size={16} className="animate-spin" />}
                            Add Task
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateTaskModal;
