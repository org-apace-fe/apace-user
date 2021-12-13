import { Column, useTable, usePagination } from "react-table";
import React, { ReactNode } from "react";
import { background } from "../../../utils/background";
import Button from "../../button";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/outline";

type PageData = {
  current_page: number;
  next_page: number;
  previous_page: number;
  size: number;
  today_date: string;
  total: number;
  total_page: number;
};

type DataColumn = {
  data: any;
  columns: any;
  tablePage: PageData;
};
const PaginationTable = ({ data, columns, tablePage }: DataColumn) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    pageCount,
    state: { pageIndex, pageSize },
    prepareRow,
  } = useTable({ columns, data }, usePagination);

  return (
    <>
      <div className="relative overflow-x-auto">
        <div className="relative min-w-lg lg:min-w-max max-h-screen">
          <table
            className="w-full rounded-t-lg overflow-hidden text-sm"
            style={{ background: background.apacegray3 }}
            {...getTableProps()}
          >
            <thead
              style={{ background: background.apacegray4 }}
              className="h-12  "
            >
              {headerGroups?.map((headerGroup) => (
                <tr {...headerGroup?.getHeaderGroupProps()}>
                  {headerGroup?.headers?.map((column) => (
                    <th
                      className="font-normal text-lg text-left pl-4 py-2 border-b border-gray-700"
                      {...column?.getHeaderProps()}
                    >
                      {column?.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="relative " {...getTableBodyProps()}>
              {page?.map((row) => {
                prepareRow(row);
                return (
                  <tr
                    {...row?.getRowProps()}
                    className="h-14  border-b border-gray-800"
                  >
                    {row?.cells?.map((cell) => {
                      return (
                        <td className="  pl-4 " {...cell?.getCellProps()}>
                          {cell?.render("Cell")}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div
            className=" flex justify-between items-center px-4 py-2 rounded-b-lg "
            style={{ background: background.apacegray2 }}
          >
            <span>
              {pageIndex + 1} of {pageOptions.length}
              {/* {tablePage?.size} */}
            </span>
            <div className="flex items-center">
              <div className="flex items-center ">
                <p> Page </p>
                <div className="h-9 w-9 flex items-center justify-center rounded-full border ml-4 border-white">
                  {pageIndex + 1}
                </div>
              </div>
              <div className="flex ml-4">
                <div onClick={() => previousPage()} className="mr-6">
                  <ArrowLeftIcon
                    className="h-6 w-6 cursor-pointer"
                    color={`${canPreviousPage ? "white" : "gray"}`}
                  />
                </div>
                <div onClick={() => nextPage()}>
                  <ArrowRightIcon
                    className="h-6 w-6 cursor-pointer"
                    color={`${canNextPage ? "white" : "gray"}`}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaginationTable;
