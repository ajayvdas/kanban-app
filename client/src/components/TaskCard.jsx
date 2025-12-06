import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Trash2, GripVertical } from 'lucide-react';
import { useDeleteTaskMutation } from '../features/api/apiSlice';
import clsx from 'clsx';
import { Button } from './ui/button';

const TaskCard = ({ task }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task._id, data: { ...task, type: 'Task' } });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const [deleteTask] = useDeleteTaskMutation();

  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm('Delete this task?')) {
      deleteTask(task._id);
    }
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="bg-slate-50 border-2 border-primary/50 p-4 rounded-xl h-[100px] opacity-50"
      />
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="group bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-primary/20 transition-all cursor-grab active:cursor-grabbing"
      {...attributes}
      {...listeners}
    >
      <div className="flex items-start justify-between gap-2">
        <h4 className="font-medium text-slate-900 line-clamp-2">{task.title}</h4>
        <Button
          onClick={handleDelete}
          variant="ghost"
        >
          <Trash2 size={16} />
        </Button>
      </div>
      {task.description && (
        <p className="text-sm text-slate-500 mt-2 line-clamp-2">{task.description}</p>
      )}
    </div>
  );
};

export default TaskCard;
