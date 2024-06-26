import * as React from "react";
import { format, startOfMonth } from "date-fns";
import { Calendar as CalendarIcon, RotateCcw } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerWithRangeProps
  extends React.HTMLAttributes<HTMLDivElement> {
  selectedDate?: (e: DateRange) => void;
}

const DatePickerWithRange: React.FC<DatePickerWithRangeProps> = ({
  className,
  selectedDate,
}) => {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: startOfMonth(new Date()),
    to: new Date(),
  });

  React.useEffect(() => {
    if (date) {
      selectedDate && selectedDate(date);
    }
  }, [date]);

  const handleReset = () => {
    setDate({
      from: startOfMonth(new Date()),
      to: new Date(),
    });
  };

  return (
    <div className={cn("flex", className)}>
      <Popover>
        <PopoverTrigger asChild className="border-r-none rounded-r-none">
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
      <Button
        size="icon"
        variant="outline"
        className=" border-l-0 rounded-l-none"
        onClick={handleReset}
      >
        <RotateCcw size={18} />
      </Button>
    </div>
  );
};

export default DatePickerWithRange;
