// SolicitudesPracticaTabla.tsx

import Paginacion from "@shared/components/Paginacion";
import Tabla from "@shared/components/Tabla/Tabla";
import BotonAgregar from "@shared/components/ui/BotonAgregar";
import Etiqueta from "@shared/templates/Etiqueta";
import type { SolicitudPractica } from "@solicitudes-practica/interfaces/solicitudPractica";
import { ROUTES } from "@src/config";
import type React from "react";
import { useNavigate } from "react-router";
import useSolicitudesPracticaTabla from "./hooks/useSolicitudPracticaTabla";

interface SolicitudesPracticaTablaProps {
	data: SolicitudPractica[];
	paginaActual: number;
	totalPaginas: number;
	total: number;
	limit: number; // 👈 nuevo
	onPageChange: (pagina: number) => void;
	onLimitChange: (limit: number) => void; // 👈 nuevo
}
const SolicitudPracticaTabla: React.FC<SolicitudesPracticaTablaProps> = ({
	data,
	paginaActual,
	totalPaginas,
	total,
	limit,
	onPageChange,
	onLimitChange,
}) => {
	const { headers, handleRowClick } = useSolicitudesPracticaTabla();
	const navigate = useNavigate();
	const actions = (
		<div className="w-full flex flex-col sm:flex-row sm:justify-between items-center gap-4 ">
			{/* Selector de cantidad */}
			<div id="filas-por-pagina" className="flex items-center space-x-2 text-sm text-gray-700 h-8">
				<label htmlFor="limitSelect" className="whitespace-nowrap">
					Filas por página:
				</label>

				<select
					id="limitSelect"
					value={limit}
					onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
						onLimitChange(Number(e.target.value))
					}
					className="h-full border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
				>
					{[10, 20, 30, 50, 100].map((value) => (
						<option key={value} value={value}>
							{value}
						</option>
					))}
					<option value={999999999}>Todos</option> {/* 👈 Nuevo */}
				</select>
			</div>

			{/* Paginación */}
			<div id="paginacion" className="flex items-center h-10">
				<Paginacion
					paginaActual={paginaActual}
					totalPaginas={totalPaginas}
					onPageChange={onPageChange}
				/>
			</div>
			<div id="boton-agregar">
			<BotonAgregar onClick={() => navigate(ROUTES.recepcionSolicitudes)} />

			</div>
		</div>
	);

	return (
		<>
			<Tabla
				data={data}
				headers={headers}
				onRowClick={handleRowClick}
				actions={actions}
				renderCell={(row, header) =>
					header.key === "estado" ? (
						<Etiqueta texto={row[header.key]} />
					) : (
						row[header.key]
					)
				}
			/>
			<div id="total-registros" className="mt-4 text-sm text-gray-600 text-right">
				Mostrando {data.length} registro{data.length !== 1 && "s"} de {total}
			</div>
		</>
	);
};

export default SolicitudPracticaTabla;
