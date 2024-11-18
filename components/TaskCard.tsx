import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "./ui/input";

const users = ["John Doe", "Jane Smith", "Alice Brown"];
const priorities = ["Low", "Medium", "High"];

interface TaskCardProps {
  task: Task;
  onSave: (task: Task) => void;
  onDelete: (taskId: number) => void;
}

interface Task {
  id: number;
  name: string;
  dueDate: string | null;
  assignee: string | null;
  priority: string | null;
  description: string | null; // Add this field
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onSave, onDelete }) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [editedTask, setEditedTask] = useState<Task>(task);
  const [dueDateMessage, setDueDateMessage] = useState<string>("");

  useEffect(() => {
    if (editedTask.dueDate) {
      const dueDate = new Date(editedTask.dueDate);
      const currentDate = new Date();
      const timeDiff = dueDate.getTime() - currentDate.getTime();
      const dayDiff = Math.floor(timeDiff / (1000 * 3600 * 24)); // Difference in days

      if (dayDiff === 0) {
        setDueDateMessage("Should complete today");
      } else if (dayDiff === 1) {
        setDueDateMessage("Should’ve completed yesterday");
      } else if (dayDiff < 0) {
        setDueDateMessage(`Should’ve completed ${Math.abs(dayDiff)} days ago`);
      } else if (dayDiff === 3) {
        setDueDateMessage("Should complete within 3 days");
      } else {
        setDueDateMessage(`Should complete within ${dayDiff} days`);
      }
    }
  }, [editedTask.dueDate]);

  const handleSheetOpen = () => setIsSheetOpen(true);
  const handleSheetClose = () => setIsSheetOpen(false);

  const handleSaveEdit = () => {
    onSave(editedTask);
    handleSheetClose();
  };

  const handleDelete = () => {
    onDelete(task.id);
    handleSheetClose();
  };

  return (
    <div>
      <div
        onClick={handleSheetOpen}
        className="border rounded-lg p-4 bg-white shadow-sm cursor-pointer"
      >
        <h3 className="font-semibold">{task.name}</h3>
        <p>Due: {task.dueDate}</p>
        <p>Assignee: {task.assignee}</p>
        <p>Priority: {task.priority}</p>
        <p>{task.description && <span>{task.description}</span>}</p>

        <p>{dueDateMessage}</p>
      </div>

      <Sheet open={isSheetOpen} onOpenChange={handleSheetClose}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Task Details</SheetTitle>
            <SheetDescription>
              Review or edit the task details below.
            </SheetDescription>
          </SheetHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Task Name
              </Label>
              <input
                id="name"
                type="text"
                value={editedTask.name}
                onChange={(e) =>
                  setEditedTask({ ...editedTask, name: e.target.value })
                }
                className="col-span-3 p-2 border rounded"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="dueDate" className="text-right">
                Due Date
              </Label>
              <input
                id="dueDate"
                type="date"
                value={editedTask.dueDate ?? ""}
                onChange={(e) =>
                  setEditedTask({ ...editedTask, dueDate: e.target.value })
                }
                className="col-span-3 p-2 border rounded"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="assignee" className="text-right">
                Assignee
              </Label>
              <select
                value={editedTask.assignee ?? ""}
                onChange={(e) =>
                  setEditedTask({ ...editedTask, assignee: e.target.value })
                }
                className="col-span-3 p-2 border rounded"
              >
                <option value="" disabled>
                  Select Assignee
                </option>
                {users.map((user) => (
                  <option key={user} value={user}>
                    {user}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="priority" className="text-right">
                Priority
              </Label>
              <select
                value={editedTask.priority ?? ""}
                onChange={(e) =>
                  setEditedTask({ ...editedTask, priority: e.target.value })
                }
                className="col-span-3 p-2 border rounded"
              >
                <option value="" disabled>
                  Select Priority
                </option>
                {priorities.map((priority) => (
                  <option key={priority} value={priority}>
                    {priority}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                value={editedTask.description ?? ""}
                onChange={(e) =>
                  setEditedTask({ ...editedTask, description: e.target.value })
                }
                className="col-span-3 p-2 border rounded"
              />
            </div>
          </div>

          <SheetFooter>
            <Button onClick={handleSaveEdit}>Save Changes</Button>
            <Button
              onClick={handleDelete}
              className="ml-2"
              variant="destructive"
            >
              Delete Task
            </Button>
            <SheetClose asChild>
              <Button className="ml-2">Close</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default TaskCard;
