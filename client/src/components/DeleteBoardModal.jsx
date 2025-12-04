import { Loader2, X } from "lucide-react";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { closeModal } from "@/features/ui/uiSlice";
import { useCreateBoardMutation } from "@/features/api/apiSlice";

export default function DeleteBoardModal() {
    const [title, setTitle] = useState("");
    const [createBoard, { isLoading }] = useCreateBoardMutation();
    const dispatch = useDispatch();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            await createBoard({ title }).unwrap();
            dispatch(closeModal());
            setTitle("");
        } catch (err) {
            console.error("Failed to create board: ", err);
        }
    }
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-md shadow-2xl w-full max-w-md p-6 animate-in fade-in zoom-in duration-200">
                <div className="flex items-center justify-between mb-4">
                    <p className="font-2xl font-semibold">Are you sure you want to delete the board?</p>
                    <X size={24} onClick={() => dispatch(closeModal())} className="text-muted-foreground" />
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <Label className="mb-2">Board Title</Label>
                        <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <div className="mb-4 flex justify-end gap-2">
                        <Button type="button" onClick={() => dispatch(closeModal())} variant="ghost">
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? <Loader2 size={16} className="animate-spin" /> : "Delete Board"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
