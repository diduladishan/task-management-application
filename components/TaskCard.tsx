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
import { Input } from "@/components/ui/input";
import Modal from "./Modal";

const users = [
  { id: "1", name: "John Taylor", avatar: "/profile-photos/profilePic1.jpg" },
  { id: "2", name: "Jane Doe", avatar: "/profile-photos/profilePic2.jpg" },
  { id: "3", name: "Alice Smith", avatar: "/profile-photos/profilePic3.jpg" },
];

const priorities = ["Low", "Medium", "High"];

interface Task {
  id: number;
  name: string;
  dueDate: string | null;
  assignee: string | null;
  priority: string | null;
  description: string | null;
  status: string;
}

interface TaskCardProps {
  task: Task;
  onSave: (task: Task) => void;
  onDelete: (taskId: number) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onSave, onDelete }) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [editedTask, setEditedTask] = useState<Task>(task);
  const [dueDateMessage, setDueDateMessage] = useState<string>("");

  const getAssigneeDetails = (id: string | null) => {
    return users.find((user) => user.id === id) || null;
  };

  const assigneeDetails = getAssigneeDetails(task.assignee);

  useEffect(() => {
    if (editedTask.dueDate) {
      const dueDate = new Date(editedTask.dueDate);
      const currentDate = new Date();
      const timeDiff = dueDate.getTime() - currentDate.getTime();
      const dayDiff = Math.floor(timeDiff / (1000 * 3600 * 24));

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
      {/* Task Display */}
      <div
        onClick={handleSheetOpen}
        className="border rounded-lg p-4 bg-white shadow-sm cursor-pointer"
      >
        <h3 className="font-semibold">{task.name}</h3>
        <p>Due: {task.dueDate || "No due date"}</p>

        {/* Display the assignee's avatar and name */}
        <p className="flex items-center gap-2">
          Assignee:{" "}
          {assigneeDetails ? (
            <>
              <img
                src={assigneeDetails.avatar}
                alt={assigneeDetails.name}
                className="w-6 h-6 rounded-full"
              />
              <span>{assigneeDetails.name}</span>
            </>
          ) : (
            <span className="text-gray-500">Unassigned</span>
          )}
        </p>

        <p>Priority: {task.priority || "None"}</p>
        <p>{task.description && <span>{task.description}</span>}</p>
        <p>{dueDateMessage}</p>
      </div>

      {/* Task Edit Sheet */}
      <Sheet open={isSheetOpen} onOpenChange={handleSheetClose}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Edit Task</SheetTitle>
            <SheetDescription>
              Update the details of your task below.
            </SheetDescription>
          </SheetHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Task Name
              </Label>
              <Input
                id="name"
                value={editedTask.name}
                onChange={(e) =>
                  setEditedTask({ ...editedTask, name: e.target.value })
                }
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="dueDate" className="text-right">
                Due Date
              </Label>
              <Input
                id="dueDate"
                type="date"
                value={editedTask.dueDate ?? ""}
                onChange={(e) =>
                  setEditedTask({ ...editedTask, dueDate: e.target.value })
                }
                className="col-span-3"
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
                <option value="">Select Assignee</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
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
                <option value="">Select Priority</option>
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
                className="col-span-3"
              />
            </div>
          </div>

          <SheetFooter>
            <Button onClick={handleSaveEdit}>Save Changes</Button>
            <Button
              onClick={() => {
                setOpenModal!(true);
                setIsSheetOpen(false);
              }}
              variant="destructive"
              className="ml-2"
            >
              Delete Task
            </Button>
            <SheetClose asChild>
              <Button className="ml-2">Close</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
      <Modal
        isOpen={openModal!}
        handleDelete={handleDelete}
        setIsOpen={setOpenModal!}
      />
    </div>
  );
};

export default TaskCard;
