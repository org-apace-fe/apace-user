/* eslint-disable react/jsx-key */
import { Column, useTable } from 'react-table';
import React, { ReactNode } from 'react';
import { background } from '../../../utils/background';
import Button from '../../button';

type DataColumn = {
	data: any;
	columns: any;
};
const Table = ({ data, columns }: DataColumn) => {
	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
		useTable({ columns, data });

	return (
		<>
			<div className=' overflow-x-auto'>
				<div className='min-w-lg lg:min-w-max'>
					<table
						className='w-full rounded-lg overflow-hidden text-sm'
						style={{ background: background.apacegray3 }}
						{...getTableProps()}>
						<thead
							style={{ background: background.apacegray4 }}
							className='h-12  '>
							{headerGroups?.map((headerGroup) => (
								<tr {...headerGroup?.getHeaderGroupProps()}>
									{headerGroup?.headers?.map((column) => (
										<th
											className='font-normal text-lg text-left pl-4 py-2 border-b border-gray-700'
											{...column?.getHeaderProps()}>
											{column?.render('Header')}
										</th>
									))}
								</tr>
							))}
						</thead>
						<tbody className='relative ' {...getTableBodyProps()}>
							{rows?.map((row) => {
								prepareRow(row);
								return (
									<tr
										{...row?.getRowProps()}
										className='h-14  border-b border-gray-800  '>
										{row?.cells?.map((cell) => {
											return (
												<td className='  pl-4 ' {...cell?.getCellProps()}>
													{cell?.render('Cell')}
												</td>
											);
										})}
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			</div>
		</>
	);
};

export default Table;
