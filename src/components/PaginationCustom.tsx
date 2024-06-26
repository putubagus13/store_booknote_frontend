import {
  Pagination,
  PaginationContent,
  // PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { IPaginationAtribute } from "@/models/general";
import { FC, useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface IProps {
  dataPagination: IPaginationAtribute<any>;
  page: (e: number) => void;
  limit: (e: string) => void;
}

const PaginationCustom: FC<IProps> = ({ dataPagination, page, limit }) => {
  const [active, setActive] = useState<number>(1);
  const [limitData, setLimitData] = useState<string>("10");

  useEffect(() => {
    page(active);
    if (dataPagination?.totalPage) {
      if (active <= dataPagination?.totalPage) {
        setActive(active);
      }
      if (active >= dataPagination?.totalPage) {
        setActive(dataPagination?.totalPage);
      }
      page(active);
    }
  }, [page, active, dataPagination?.totalPage]);

  const getPageNumbers = () => {
    const totalPages = dataPagination?.totalPage ?? 1;
    const visiblePages = 4;

    const startPage = Math.max(1, active - Math.floor(visiblePages / 2));
    const endPage = Math.min(totalPages, startPage + visiblePages - 1);

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, index) => index + startPage
    );
  };

  const next = () => {
    if (active === dataPagination?.totalPage) return;
    setActive(active + 1);
  };

  const prev = () => {
    if (active === 1) return;
    setActive(active - 1);
  };

  const handleOnLimit = (e: string) => {
    limit(e);
    setLimitData(e);
  };

  return (
    <div className="flex gap-4 w-full justify-center py-4">
      <Select value={limitData} onValueChange={(value) => handleOnLimit(value)}>
        <SelectTrigger className="w-[80px]">
          <SelectValue placeholder="Limit" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="10">10</SelectItem>
          <SelectItem value="20">20</SelectItem>
          <SelectItem value="50">50</SelectItem>
          <SelectItem value="100">100</SelectItem>
        </SelectContent>
      </Select>
      <Pagination className="w-[400px] m-0">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious onClick={prev} href="#" />
          </PaginationItem>
          {getPageNumbers().map((number) => (
            <PaginationItem key={number}>
              <PaginationLink
                onClick={() => setActive(number)}
                href="#"
                isActive={number === active}
              >
                {number}
              </PaginationLink>
            </PaginationItem>
          ))}
          {/* <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem> */}
          <PaginationItem>
            <PaginationNext onClick={next} href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default PaginationCustom;
