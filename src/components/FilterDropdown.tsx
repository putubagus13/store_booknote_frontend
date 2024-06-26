import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Filter } from "lucide-react";
import { FC } from "react";
import { Option } from "./ui/multiple-selector";

interface IProps {
  data: Option[];
  onClick: (e: string) => void;
  selected?: string;
  parentLabel?: string;
}

const FilterDropdown: FC<IProps> = ({
  data,
  onClick,
  selected,
  parentLabel,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="outline" size="icon" className="h-8">
          <Filter size={18} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-44">
        <DropdownMenuLabel>{parentLabel || ""}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {(data ?? []).map((item, index) => {
          return (
            <DropdownMenuItem
              className={`${item.value == selected && "bg-gray-200"}`}
              onClick={() => {
                onClick(item.value);
              }}
              key={index}
            >
              {item.label}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FilterDropdown;
