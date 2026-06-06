import clsx from "clsx";
import type React from "react";
import useTabla from "./hooks/useTabla";
import type { TablaProps } from "./interfaces/tablaProps";

function Tabla<T extends { id: number | string; habilitado?: boolean }>({
	data = [],
	headers,
	onRowClick,
	renderCell,
	actions,
	filterData,
}: TablaProps<T>) {
	const { setFilter, filter, handleSort, sortColumn, sortOrder, sortedData } =
		useTabla({
			data,
			filterData,
			headers,
		});

	return (
		<div className="p-2">
			<input
				type="text"
				id="buscador"
				placeholder="Filtrar resultados..."
				className="mb-4 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
				value={filter}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
					setFilter(e.target.value)
				}
			/>
			<div className="overflow-x-auto">
				{actions && <div className="flex  mb-4 text-gray-500">{actions}</div>}
				<table id="tabla" className="min-w-full w-full table-auto border-collapse border border-gray-200">
					<thead className="bg-gray-100 text-gray-700 font-semibold">
						<tr>
							{headers.map((header) => (
								<th
									key={header.key}
									className="px-1 py-2 border border-gray-200 cursor-pointer select-none text-center"
									onClick={() => handleSort(header.key)}
									onKeyUp={(e: React.KeyboardEvent) => {
										if (e.key === "Enter" || e.key === " ") {
											handleSort(header.key);
										}
									}}
								>
									<div className="flex items-center justify-center">
										<div className="pl-2">{header.label}</div>
										<span
											className={clsx("ml-2 text-sm", {
												"text-gray-500": sortColumn !== header.key,
												"text-blue-600": sortColumn === header.key,
											})}
										>
											{sortColumn === header.key
												? sortOrder === "asc"
													? "▲"
													: "▼"
												: ""}
										</span>
									</div>
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{sortedData.length > 0 ? (
							sortedData.map((row) => (
								<tr
									key={row.id}
									onClick={() => onRowClick(row)}
									onKeyDown={(e: React.KeyboardEvent) => {
										if (e.key === "Enter" || e.key === " ") {
											onRowClick(row);
										}
									}}
									className={clsx(
										"cursor-pointer",
										"transition-colors duration-150",
										{
											"hover:bg-gray-100": row.habilitado !== false,
											"hover:bg-red-50 bg-red-50/50": row.habilitado === false,
										},
									)}
								>
									{headers.map((header) => (
										<td
											key={header.key}
											className={clsx(
												"px-2 py-2 border border-gray-200 text-center",
												{
													"text-gray-500": row.habilitado === false,
												},
											)}
										>
											{renderCell
												? renderCell(row, header)
												: String(row[header.key as keyof T])}
										</td>
									))}
								</tr>
							))
						) : (
							<tr>
								<td
									colSpan={headers.length}
									className="px-2 py-2 text-center text-gray-500"
								>
									No se encontraron resultados.
								</td>
							</tr>
						)}
					</tbody>
				</table>

				{/* <div className="flex justify-self-end mt-4 space-x-4 text-gray-500"> */}
				{/*   <p className="text-sm font-semibold text-center self-center"> */}
				{/*     Total de Filas: {sortedData.length} */}
				{/*   </p> */}
				{/* </div> */}
			</div>
		</div>
	);
}

export default Tabla;
