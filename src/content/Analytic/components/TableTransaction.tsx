import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { invoices } from "@/utils/damiData";
import { conversion } from "@/utils/general";
import { ChevronsLeftRight } from "lucide-react";
import { FC } from "react";

const TableTrransaction: FC = () => {
  return (
    <Table className="w-full mt-4">
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px] flex items-center gap-1">
            Code
          </TableHead>
          <TableHead>
            <Button variant="ghost">
              Customer
              <ChevronsLeftRight size={13} className="rotate-90" />
            </Button>
          </TableHead>
          <TableHead>
            <Button variant="ghost">
              Method
              <ChevronsLeftRight size={13} className="rotate-90" />
            </Button>
          </TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.code}>
            <TableCell className="font-medium">{invoice.code}</TableCell>
            <TableCell>{invoice.customer}</TableCell>
            <TableCell>{invoice.paymentMethod}</TableCell>
            <TableCell className="text-right">
              {conversion(invoice.totalAmount)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">{conversion(2000000)}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default TableTrransaction;
