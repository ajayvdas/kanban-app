const Board = require("../models/Board");

exports.getBoards = async (req, res) => {
    try {
        const boards = await Board.find({ ownerId: req.user.id })
                                  .sort({ createdAt: -1 });

        res.json(boards);
    } catch (err) {
        console.error(err.message);
        res.status(500).json('Server Error');
    }
};


exports.createBoard = async (req, res) => {
    try {
        const { title } = req.body;

        const newBoard = new Board({
            ownerId: req.user.id,
            title,
        });

        const board = await newBoard.save();
        res.json(board);
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
};

exports.deleteBoard = async (req, res) => {
    try {
        const board = await Board.findById(req.params.id);
        if (!board) return res.status(404).json({ message: "Board not found" });
        if (board.ownerId.toString() !== req.user.id) return res.status(401).json({ message: "Not authorized" });

        await board.deleteOne();
        res.json({ message: "Board removed" });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};
