import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import TaskCard from './TaskCard';
import { Plus } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { openModal } from '../features/ui/uiSlice';
import clsx from 'clsx';

const Column = ({ id, title, tasks, boardId }) => {
  const { setNodeRef } = useDroppable({
    id: id,
    data: { type: 'Column', id },
  });

  const dispatch = useDispatch();

  return (
    <div className="flex flex-col h-full w-80 shrink-0">
      <div className="flex items-center justify-between mb-4 px-1">
        <div className="flex items-center gap-2">
          <h3 className="font-bold text-slate-700">{title}</h3>
          <span className="bg-slate-200 text-slate-600 text-xs font-bold px-2 py-0.5 rounded-full">
            {tasks.length}
          </span>
        </div>
        <button
          onClick={() => dispatch(openModal({ type: 'createTask', status: id, boardId }))}
          className="p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded transition-colors"
        >
          <Plus size={20} />
        </button>
      </div>

      <div
        ref={setNodeRef}
        className={clsx(
          "flex-1 bg-slate-100/50 rounded-xl p-3 space-y-3 overflow-y-auto min-h-[150px]",
          "border-2 border-transparent transition-colors"
        )}
      >
        <SortableContext items={tasks.map((t) => t._id)} strategy={verticalListSortingStrategy}>
          {tasks.map((task) => (
            <TaskCard key={task._id} task={task} />
          ))}
        </SortableContext>
      </div>
    </div>
  );
};

export default Column;
