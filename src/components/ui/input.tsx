import * as React from "react";

import { cn } from "@/lib/utils";
import { Info } from "lucide-react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  id?: string;
  errors?: string;
  touched?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, id, errors, touched, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label htmlFor={id} className="font-medium text-[14px]">
            {label}
          </label>
        )}
        <div>
          <input
            type={type}
            className={cn(
              `flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                errors
                  ? "focus-visible:ring-destructive"
                  : "focus-visible:ring-ring"
              } focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`,
              className
            )}
            ref={ref}
            {...props}
          />
          {errors && touched && (
            <label className="text-[10px] text-destructive">
              <Info size={12} className="inline-block mr-1" />
              {errors}
            </label>
          )}
        </div>
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
