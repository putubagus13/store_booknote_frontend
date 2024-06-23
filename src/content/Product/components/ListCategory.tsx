import { useCategory } from "@/api/useCategory";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { FC } from "react";

const ListCategory: FC = () => {
  const { data } = useCategory();
  return (
    <Command>
      <CommandInput placeholder="cari kategory" />
      <CommandList>
        <CommandEmpty>hasil tidak ditemukan</CommandEmpty>
        <CommandGroup heading="Kategory">
          {(data?.data ?? []).map((item) => (
            <CommandItem key={item.id}>{item.name}</CommandItem>
          ))}
          {/* <CommandItem>Makanan</CommandItem>
          <CommandItem>Minuman</CommandItem>
          <CommandItem>Electronik</CommandItem>
          <CommandItem>Pakaian</CommandItem> */}
        </CommandGroup>
      </CommandList>
    </Command>
  );
};

export default ListCategory;
