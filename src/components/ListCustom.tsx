import { FC } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Link } from "react-router-dom";
// import { Home } from "lucide-react";

interface Props {
  label: string;
  children: React.ReactElement;
  to: string;
}

const ListCustom: FC<Props> = ({ label, children, to }) => {
  const path = window.location.pathname;
  const isActive = path == to;
  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            to={to}
            className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8 ${
              isActive
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground"
            }`}
          >
            {children}
            <span className="sr-only">{label}</span>
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right">{label}</TooltipContent>
      </Tooltip>
    </>
  );
};

export default ListCustom;

// ListCustom component digunakan untuk keperluan list item yang ada pada asside bar
