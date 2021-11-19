import { Column, useTable } from "react-table";
import React, { ReactNode } from "react";
import { background } from "../../../utils/background";
import Button from "../../button";
import { PaymentAction } from "../actions";

type Data = {
  loan_amount: string;
  loan_started: string;
  date_completed: string;
  payment_status: ReactNode;
  actions: ReactNode;
};
const Table = () => {
  const data = React.useMemo<Data[]>(
    () => [
      {
        loan_amount: "N72,000",
        loan_started: "04 Oct 2021   ",
        date_completed: "07/11/2020",
        payment_status: <Button>In Progress </Button>,
        actions: <PaymentAction />,
      },
      {
        loan_amount: "N46,000",
        loan_started: "04 Oct 2021 ",
        date_completed: "07/11/2020",
        payment_status: <Button>Pending </Button>,
        actions: <PaymentAction />,
      },
      {
        loan_amount: "N100,000",
        loan_started: "04 Oct 2021 ",
        date_completed: "07/10/2020",
        payment_status: <Button>Completed</Button>,
        actions: <PaymentAction />,
      },
      {
        loan_amount: "N65,000",
        loan_started: "04 Oct 2021 ",
        date_completed: "07/09/2020",
        payment_status: <Button>In Progress </Button>,
        actions: <PaymentAction />,
      },
      {
        loan_amount: "N2,9000",
        loan_started: "04 Oct 2021 ",
        date_completed: "07/07/2020",
        payment_status: <Button>In Progress </Button>,
        actions: <PaymentAction />,
      },
    ],
    []
  );

  const columns = React.useMemo<Column<Data>[]>(
    () => [
      {
        Header: "Loan amount",
        accessor: "loan_amount",
      },

      {
        Header: "Loan started",
        accessor: "loan_started",
      },
      {
        Header: "Date completed",
        accessor: "date_completed",
      },

      {
        Header: "Payment status",
        accessor: "payment_status",
      },
      {
        Header: "Actions",
        accessor: "actions",
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <>
      <table
        className="w-full rounded-lg overflow-hidden  "
        style={{ background: background.apacegray3 }}
        {...getTableProps()}
      >
        <thead style={{ background: background.apacegray4 }} className="h-12">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  className="font-normal text-sm text-left pl-4"
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

export default Table;
