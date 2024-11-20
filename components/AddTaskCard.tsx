import * as yup from "yup";
import { toast } from "react-hot-toast";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import AssigneeSelector from "./AssigneeSelector";
import PrioritySelector from "./PrioritySelector";
import { DatePicker } from "./DatePicker";

const assignees = [
  { id: 1, name: "John Taylor", avatar: "/profile-photos/profilePic1.jpg" },
  { id: 2, name: "Jane Doe", avatar: "/profile-photos/profilePic2.jpg" },
  { id: 3, name: "Alice Smith", avatar: "/profile-photos/profilePic3.jpg" },
];

interface AddTaskCardProps {
  onSave: (task: Omit<Task, "status">) => void;
}

export interface Task {
  id: number;
  name: string;
  dueDate: string | null;
  assignee: string | null;
  priority: string | null;
  description: string | null;
  status: string;
}

const schema = yup.object().shape({
  name: yup.string().required("Task Name is required"),
  dueDate: yup.string().required("Due Date is required"),
  assignee: yup.string().required("Assignee is required"),
  priority: yup.string().required("Priority is required"),
  description: yup.string().nullable(),
});

const AddTaskCard: React.FC<AddTaskCardProps> = ({ onSave }) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Task>({
    resolver: yupResolver(schema) as any,
    defaultValues: {
      name: "",
      dueDate: null,
      assignee: null,
      priority: null,
      description: null,
    },
  });

  const onSubmit = (data: Task) => {
    const newTask = {
      id: Date.now(),
      name: data.name,
      dueDate: data.dueDate,
      assignee: data.assignee,
      priority: data.priority,
      description: data.description,
    };

    onSave(newTask);
    reset();
  };

  const selectedAssignee = assignees.find(
    (assignee) => assignee.id.toString() === watch("assignee")
  );

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      toast.error("Please fill in all the required fields.");
    }
  }, [errors]);

  return (
    <div className="border rounded-lg p-6 bg-white shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Add New Task</h3>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="name">Task Name</label>
          <input
            id="name"
            type="text"
            {...register("name")}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label htmlFor="dueDate">Due Date</label>
          <DatePicker
            register={register}
            setValue={setValue}
            name="dueDate" // The field name in the form data
          />
        </div>

        <div>
          <label htmlFor="assignee">Assignee</label>
          <AssigneeSelector
            assignees={assignees}
            value={selectedAssignee || null}
            onChange={(assignee) =>
              setValue("assignee", assignee?.id.toString() as any)
            }
            name="assignee"
            register={register}
          />
        </div>

        <div>
          <label htmlFor="priority">Priority</label>
          <PrioritySelector
            register={register}
            setValue={setValue}
            name="priority"
          />
        </div>

        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            {...register("description")}
            className="w-full p-2 border rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded mt-3"
        >
          Save Task
        </button>
      </form>
    </div>
  );
};

export default AddTaskCard;
