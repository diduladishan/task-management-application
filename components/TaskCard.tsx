import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import dayjs from "dayjs";

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
import Image from "next/image";
import CustomDatePicker from "./CustomDatePicker";
import AssigneeSelector from "./AssigneeSelector";
import PrioritySelector from "./PrioritySelector";

const users = [
  { id: 1, name: "John Taylor", avatar: "/profile-photos/profilePic1.jpg" },
  { id: 2, name: "Jane Doe", avatar: "/profile-photos/profilePic2.jpg" },
  { id: 3, name: "Alice Smith", avatar: "/profile-photos/profilePic3.jpg" },
];

const priorities = ["Low", "Medium", "High"];

interface Task {
  id: number;
  name: string;
  dueDate: string | null;
  assignee: number | null | undefined;
  priority: string | null;
  description: string | null;
  status: string;
}

interface TaskCardProps {
  taskIcon: React.ReactNode;
  task: Task;
  onSave: (task: Task) => void;
  onDelete: (taskId: number) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onSave,
  onDelete,
  taskIcon,
}) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [editedTask, setEditedTask] = useState<Task>(task);
  const [dueDateMessage, setDueDateMessage] = useState<string>("");

  const getAssigneeDetails = (id: number) => {
    return users.find((user) => user.id === id) || null;
  };

  const assigneeDetails = getAssigneeDetails(+task?.assignee!);

  const handlePriorityChange = (priority: string) => {
    setSelectedPriority(priority);
    setEditedTask((prev) => ({ ...prev, priority }));
  };

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
      <div
        onClick={handleSheetOpen}
        className="border rounded-lg p-4 bg-white shadow-sm cursor-pointer"
      >
        <div className="flex gap-2 items-center">
          {taskIcon}
          <h3 className="font-semibold text-xl">{task.name}</h3>
        </div>
        <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700" />

        <p className="text-gray-600 my-2">
          {task.description && <span>{task.description}</span>}
        </p>
        <div className="my-2 mt-4 flex items-center justify-between">
          <div className="flex gap-4 items-center">
            {assigneeDetails ? (
              <>
                <Image
                  src={assigneeDetails.avatar}
                  alt={assigneeDetails.name}
                  className="w-8 h-8 rounded-full"
                  width={32}
                  height={32}
                />
              </>
            ) : (
              <span className="text-gray-500">Unassigned</span>
            )}

            <p className="text-red-600 bg-red-100 rounded py-0.5 px-1 text-xs bg-opacity-30">
              {dayjs(task.dueDate).format("MMM D") || "No due date"}
            </p>
          </div>

          <p
            className={
              task.priority === "Low"
                ? "text-red-600 bg-opacity-30 bg-red-100 rounded py-0.5 px-1 text-xs flex items-center"
                : task.priority === "Medium"
                ? "text-yellow-600 bg-yellow-100 bg-opacity-30 rounded py-0.5 px-1 text-xs flex items-center"
                : "text-blue-600 bg-blue-100 bg-opacity-30 rounded py-0.5 px-1 text-xs flex items-center"
            }
          >
            <span
              className={
                `w-2 h-2 rounded-full mr-2 ` +
                (task.priority === "Low"
                  ? "bg-red-600"
                  : task.priority === "Medium"
                  ? "bg-yellow-600"
                  : "bg-blue-600")
              }
            ></span>
            {task.priority || "None"}
          </p>
        </div>
        {task.status !== "completed" && (
          <>
            <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700" />

            <p className="text-gray-500 text-sm mt-3">{dueDateMessage}</p>
          </>
        )}
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
              <CustomDatePicker
                selectedDate={editedTask.dueDate}
                onSelectDate={(e: string) =>
                  setEditedTask({ ...editedTask, dueDate: e })
                }
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="assignee" className="text-right">
                Assignee
              </Label>
              <AssigneeSelector
                assignees={users}
                value={
                  task.assignee ? getAssigneeDetails(+task.assignee) : null
                }
                onChange={(e) =>
                  setEditedTask({ ...editedTask, assignee: e?.id })
                }
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="priority" className="text-right">
                Priority
              </Label>
              <PrioritySelector
                setSelectedPriority={handlePriorityChange}
                selectedPriority={selectedPriority}
                initialValue={task.priority!}
              />
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
