import { FC } from "react";
import { TypographyH1 } from "./ui/typograpgy";
import { Card, CardContent, CardDescription, CardHeader } from "./ui/card";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";

interface Props {
  children: React.ReactNode;
  label: string;
  description?: string;
  onClick?: () => void;
  overflow?: boolean;
}
const HeaderPage: FC<Props> = ({
  children,
  label,
  description,
  onClick,
  overflow,
}) => {
  return (
    <Card className="flex flex-col w-full h-full pt-6">
      <CardHeader>
        <div className="flex justify-between w-full items-center">
          <div>
            <TypographyH1 className="lg:text-4xl">{label}</TypographyH1>
            <CardDescription className="pt-2">{description}</CardDescription>
          </div>
          {onClick && (
            <Button onClick={onClick} size="sm" className="gap-2">
              <Plus size={18} />
              Produk
            </Button>
          )}
        </div>
        <Separator className="my-4" />
      </CardHeader>
      <CardContent
        className={`w-full h-full sm:overflow-auto md:${
          overflow ? "overflow-auto" : "overflow-hidden"
        }`}
      >
        {children}
      </CardContent>
    </Card>
  );
};

export default HeaderPage;
