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
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  name: string;
}

export function DatePicker({ register, setValue, name }: DatePickerProps) {
  const [date, setDate] = React.useState<Date | undefined>(undefined);

  const handleDateChange = (newDate: Date | undefined) => {
    setDate(newDate);
    setValue(name, newDate);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
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
      <input
        type="hidden"
        {...register(name)}
        value={date ? format(date, "yyyy-MM-dd") : ""}
      />
    </Popover>
  );
}
