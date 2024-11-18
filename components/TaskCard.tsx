import React, { useState } from "react";
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

const users = ["John Doe", "Jane Smith", "Alice Brown"];
const priorities = ["Low", "Medium", "High"];

interface TaskCardProps {
  task: Task;
  onSave: (task: Task) => void;
}

interface Task {
  id: number;
  name: string;
  dueDate: string | null;
  assignee: string | null;
  priority: string | null;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onSave }) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleSheetOpen = () => setIsSheetOpen(true);
  const handleSheetClose = () => setIsSheetOpen(false);

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
      </div>

      {/* Shadcn UI Sheet */}
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
              <p id="name" className="col-span-3">
                {task.name}
              </p>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="dueDate" className="text-right">
                Due Date
              </Label>
              <p id="dueDate" className="col-span-3">
                {task.dueDate}
              </p>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="assignee" className="text-right">
                Assignee
              </Label>
              <p id="assignee" className="col-span-3">
                {task.assignee}
              </p>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="priority" className="text-right">
                Priority
              </Label>
              <p id="priority" className="col-span-3">
                {task.priority}
              </p>
            </div>
          </div>

          <SheetFooter>
            <SheetClose asChild>
              <Button type="submit">Close</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default TaskCard;
