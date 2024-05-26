import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TypographyBlockquote, TypographyP } from "@/components/ui/typograpgy";
import { FC } from "react";

// interface Props {

// }

const CardList: FC = () => {
  return (
    <div className="flex gap-4 h-full w-full items-center pt-4">
      <Avatar className="h-10 w-10">
        <AvatarImage
          src="https://brunchcafe.com/wp-content/uploads/2020/12/IMG_2127.jpeg"
          alt={"product"}
        />
        <AvatarFallback>CK</AvatarFallback>
      </Avatar>
      <div className="flex w-full justify-between">
        <TypographyP className="text-[14px] font-medium">Cake</TypographyP>
        <TypographyBlockquote className="font-bold text-[16px] flex gap-3">
          2x
        </TypographyBlockquote>
      </div>
    </div>
  );
};

export default CardList;
