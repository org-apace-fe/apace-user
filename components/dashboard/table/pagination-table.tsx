import { Column, useTable } from "react-table";
import React, { ReactNode } from "react";
import { background } from "../../../utils/background";
import Button from "../../button";
import { PaymentAction } from "../actions";

type DataColumn = {
  data: any;
  columns: any;
};
const PaginationTable = ({ data, columns }: DataColumn) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <>
      <table
        className="w-full rounded-lg overflow-hidden text-sm"
        style={{ background: background.apacegray3 }}
        {...getTableProps()}
      >
        <thead style={{ background: background.apacegray4 }} className="h-12  ">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  className="font-normal text-lg text-left pl-4 py-2 border-b border-gray-700"
                  {...column.getHeaderProps()}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="relative " {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                className="h-14  border-b border-gray-800  "
              >
                {row.cells.map((cell) => {
                  return (
                    <td className="  pl-4 " {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default PaginationTable;
