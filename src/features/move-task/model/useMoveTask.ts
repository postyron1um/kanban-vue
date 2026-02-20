import type { ITask } from "@/entities/task";
import { useUpdateTask } from "./useUpdateTask";

export const useMoveTask = (projectId: string) => {
  const { mutate: updateTask } = useUpdateTask(projectId);

  const handleTaskMove = (tasks: ITask[], taskId: string, newColumnId: string, targetId?: string) => {
    const sortedTasks = tasks
      .filter(t => t.id !== taskId)
      .sort((a, b) => (a.order || 0) - (b.order || 0));

    const targetIndex = targetId ? sortedTasks.findIndex(t => t.id === targetId) : -1;
    let newOrder: number;

    if (targetIndex === -1) {
      newOrder = (sortedTasks[sortedTasks.length - 1]?.order ?? 0) + 1000;
    } else {
      const targetTask = sortedTasks[targetIndex];
      const prevOrder = sortedTasks[targetIndex - 1]?.order ?? 0;
      newOrder = (prevOrder + targetTask.order) / 2;
    }

    updateTask({ taskId, data: { columnId: newColumnId, order: newOrder } });
  };

  return { handleTaskMove };
};