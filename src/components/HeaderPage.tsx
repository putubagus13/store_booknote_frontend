import { FC } from "react";
import { TypographyH1 } from "./ui/typograpgy";
import { Card, CardContent, CardDescription, CardHeader } from "./ui/card";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { ArrowLeft, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Props {
  children: React.ReactNode;
  label: string;
  description?: string;
  onClick?: () => void;
  overflow?: boolean;
  modalComponent?: React.ReactNode;
  buttonLable?: string;
  backButton?: boolean;
}
const HeaderPage: FC<Props> = ({
  children,
  label,
  description,
  onClick,
  overflow,
  modalComponent,
  buttonLable,
  backButton,
}) => {
  const navigate = useNavigate();
  return (
    <Card className="flex flex-col w-full h-full pt-6">
      <CardHeader>
        <div className="flex justify-between w-full items-center">
          <div className="flex flex-col gap-4">
            <div className="pt-4">
              <TypographyH1 className="lg:text-4xl dark:text-primary">
                {label}
              </TypographyH1>
              <CardDescription className="pt-2 dark:text-white">
                {description}
              </CardDescription>
            </div>
            {backButton && (
              <Button
                onClick={() => navigate(-1)}
                size="icon"
                className=" rounded-full"
              >
                <ArrowLeft size={18} />
              </Button>
            )}
          </div>

          {onClick && (
            <Button onClick={onClick} size="sm" className="gap-2">
              <Plus size={18} />
              {buttonLable ?? "Add"}
            </Button>
          )}
          {modalComponent && modalComponent}
        </div>
        <Separator className="my-4" />
      </CardHeader>
      <CardContent
        className={`w-full h-full bg-gray-500/10 pt-2 scrollbar-hide sm:overflow-auto md:${
          overflow ? "overflow-auto" : "overflow-hidden"
        }`}
      >
        {children}
      </CardContent>
    </Card>
  );
};

export default HeaderPage;
