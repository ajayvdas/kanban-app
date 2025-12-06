import { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useGetTasksQuery, useUpdateTaskMutation } from '../features/api/apiSlice';
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import Column from '../components/Column';
import TaskCard from '../components/TaskCard';
import CreateTaskModal from '../components/CreateTaskModal';
import { useSelector } from 'react-redux';
import { createPortal } from 'react-dom';

const BoardView = () => {
  const { boardId } = useParams();
  const { data: tasks, isLoading } = useGetTasksQuery(boardId);
  const [updateTask] = useUpdateTaskMutation();
  const { activeModal } = useSelector((state) => state.ui);
  const [activeDragItem, setActiveDragItem] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // 5px movement required to start drag
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const columns = useMemo(() => {
    if (!tasks) return { Todo: [], 'In Progress': [], Done: [] };
    return {
      Todo: tasks.filter((t) => t.status === 'Todo'),
      'In Progress': tasks.filter((t) => t.status === 'In Progress'),
      Done: tasks.filter((t) => t.status === 'Done'),
    };
  }, [tasks]);

  const onDragStart = (event) => {
    const { active } = event;
    setActiveDragItem(active.data.current);
  };

  const onDragOver = (event) => {
    // Optional: Add visual feedback for dropping into empty columns
  };

  const onDragEnd = (event) => {
    const { active, over } = event;
    setActiveDragItem(null);

    if (!over) return;

    const activeId = active.id;
    const overId = over.id;
    const activeData = active.data.current;
    const overData = over.data.current;

    // Dropping onto a column
    if (overData?.type === 'Column') {
      const newStatus = overId;
      if (activeData.status !== newStatus) {
        updateTask({
          id: activeId,
          boardId,
          status: newStatus,
          order: 0, // Or calculate new order
        });
      }
      return;
    }

    // Dropping onto another task
    if (overData?.type === 'Task') {
      const newStatus = overData.status;
      // If status changed or order changed
      if (activeData.status !== newStatus || activeId !== overId) {
         // Simple reorder logic: just take the status of the target
         // For real reordering, we'd need to calculate the index
         updateTask({
            id: activeId,
            boardId,
            status: newStatus,
            // Order update is complex without local state management of order
            // For now, we just update status
         });
      }
    }
  };

  if (isLoading) {
    return <div className="p-8 text-center text-slate-500">Loading board...</div>;
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-x-auto overflow-y-hidden">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={onDragStart}
          onDragOver={onDragOver}
          onDragEnd={onDragEnd}
        >
          <div className="flex h-full gap-6 p-4 min-w-max">
            <Column id="Todo" title="To Do" tasks={columns.Todo} boardId={boardId} />
            <Column id="In Progress" title="In Progress" tasks={columns['In Progress']} boardId={boardId} />
            <Column id="Done" title="Done" tasks={columns.Done} boardId={boardId} />
          </div>

          {createPortal(
            <DragOverlay>
              {activeDragItem && <TaskCard task={activeDragItem} />}
            </DragOverlay>,
            document.body
          )}
        </DndContext>
      </div>

      {activeModal?.type === 'createTask' && (
        <CreateTaskModal boardId={boardId} status={activeModal.status} />
      )}
    </div>
  );
};

export default BoardView;
