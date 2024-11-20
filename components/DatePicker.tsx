"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";

interface DatePickerProps {
  register: UseFormRegister<any>; // `any` can be replaced with your form data type (e.g., Task)
  setValue: UseFormSetValue<any>;
  name: string;
}

export function DatePicker({ register, setValue, name }: DatePickerProps) {
  const [date, setDate] = React.useState<Date | undefined>(undefined);

  // Handle date selection and update React Hook Form state
  const handleDateChange = (newDate: Date | undefined) => {
    setDate(newDate);
    setValue(name, newDate); // Set the date value in the form
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[130px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon />
          {date ? format(date, "MMM dd") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateChange}
          initialFocus
        />
      </PopoverContent>
      {/* Register the date picker with React Hook Form */}
      <input
        type="hidden"
        {...register(name)} // Register with React Hook Form
        value={date ? format(date, "yyyy-MM-dd") : ""}
      />
    </Popover>
  );
}
