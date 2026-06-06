import CalculadoraCargaHoraria from "@procesos/components/evaluacion-planificacion/components/calculadora-carga-horaria/CalculadoraCargaHoraria";
import clsx from "clsx";
import React, { useEffect } from "react";
import Select from "react-select";
import useComisionForm from "./hooks/useComisionForm";

const ComisionForm = ({
	index,
	comision,
	handleChangeComision,
	handleDiasSemanaChange,
	servicios,
	solicitudes,
}:
	{ index: number, comision: any, handleChangeComision: (index: number, field: string, value: any) => void, handleDiasSemanaChange: (index: number, dia: string, checked: boolean) => void, servicios: any, solicitudes: any }) => {
	const {
		isModalOpen,
		openModal,
		closeModal,
		diasSemana,
		horariosOptions,
		serviciosOptions,
		solicitudesOptions,
		diasDisponibles,
		handleHorarioChange,
		cuposDisponibles,
	} = useComisionForm({
		comision,
		index,
		handleChangeComision,
		servicios,
		solicitudes,
	});

	return (
		<div className="bg-white p-5 rounded-lg shadow-sm mb-2">
			<h3 className="text-orange-500 text-lg border-b-2 border-orange-500 pb-2 mb-4">
				Comisión {index + 1}
			</h3>

			{/* Solicitud de Práctica */}
			<div id="solicitud-select">

			<label
				htmlFor="solicitud-select"
				className="block font-semibold text-gray-700 mb-3"
			>
				Solicitud de Práctica:
				<Select
					id="solicitud-select"
					value={
						solicitudesOptions.find(
							(option: any) => option.value === comision.solicitudId,
						) || ""
					}
					onChange={(selectedOption: any) =>
						handleChangeComision(
							index,
							"solicitudId",
							selectedOption?.value || "",
						)
					}
					options={solicitudesOptions}
					placeholder="Seleccione una solicitud"
					required
				/>
			</label>
			</div>

			{/* Carga Horaria */}
			<div className="flex items-center justify-between">
				<div className="w-full max-w-xs">
					<label className="block font-semibold text-gray-700 mb-3">
						Carga Horaria (Hs Reloj):
						<input
							type="number"
							value={comision.cargaHoraria}
							onChange={(e: any) =>
								handleChangeComision(index, "cargaHoraria", e.target.value)
							}
							className="w-full p-2 border border-gray-300 rounded-md"
							required
						/>
					</label>
				</div>
				<div className="w-full max-w-xs mt-2">
					<button
						id="calculadora-carga-horaria"
						type="button"
						onClick={openModal}
						className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
					>
						Calculadora de Horas Reales
					</button>
					{/* Condicionalmente renderizamos el modal */}
					<div>
						{isModalOpen && (
							<CalculadoraCargaHoraria
								closeModal={closeModal}
								handleChangeComision={handleChangeComision}
								index={index}
							/>
						)}
					</div>
				</div>
			</div>

			{/* Cantidad de Alumnos */}
			<div id="cantidad-alumnos">

			<label className="block font-semibold text-gray-700 mb-3">
				Cantidad de Alumnos:
				<input
					type="number"
					value={comision.cantidadAlumnos}
					onChange={(e: any) =>
						handleChangeComision(index, "cantidadAlumnos", e.target.value)
					}
					className="w-full p-2 border border-gray-300 rounded-md"
					required
				/>
			</label>
			</div>
			{/* Servicio */}
			<label
				htmlFor="servicio-select"
				className="block font-semibold text-gray-700 mb-3"
			>
				Servicio:
				<Select
					id="servicio-select"
					value={
						serviciosOptions.find(
							(option: any) => option.value === comision.servicioId,
						) || ""
					}
					onChange={(selectedOption: any) =>
						handleChangeComision(
							index,
							"servicioId",
							selectedOption?.value || "",
						)
					}
					options={serviciosOptions}
					required
				/>
			</label>

			{/* Horario */}
			<label
				htmlFor="horario-select"
				className="block font-semibold text-gray-700 mb-3"
			>
				Horario:
				<Select
					id="horario-select"
					value={
						horariosOptions.find(
							(option: any) => option.value === comision.horarioId,
						) || null
					}
					onChange={handleHorarioChange}
					options={horariosOptions}
					required
				/>
			</label>

			{/* Días de la Comisión (Checkboxes) */}
			<label
				htmlFor="comision-checkbox"
				className="block font-semibold text-gray-700 mb-3"
			>
				Días de la Comisión:
				<div className="flex flex-wrap" id="comision-checkbox">
					{diasSemana?.map((dia) => (
						<label key={dia} className="mr-4">
							<input
								type="checkbox"
								value={dia}
								checked={comision.diasSemana?.includes(dia)}
								onChange={(e: any) =>
									handleDiasSemanaChange(index, dia, e.target.checked)
								}
								disabled={!diasDisponibles.includes(dia)}
							/>
							<span className="ml-2">{dia}</span>
						</label>
					))}
				</div>
			</label>

			{/* Fecha Inicio y Fin */}
			<div className="flex space-x-4 mb-6">
				<div className="w-full">
					<label className="block font-semibold text-gray-700 mb-2">
						Fecha Inicio:
						<input
							type="date"
							value={comision.fechaInicio}
							onChange={(e: any) =>
								handleChangeComision(index, "fechaInicio", e.target.value)
							}
							className="w-full p-2 border border-gray-300 rounded-md"
							required
						/>
					</label>
				</div>
				<div className="w-full">
					<label className="block font-semibold text-gray-700 mb-2">
						Fecha Fin:
						<input
							type="date"
							value={comision.fechaFin}
							onChange={(e: any) =>
								handleChangeComision(index, "fechaFin", e.target.value)
							}
							className="w-full p-2 border border-gray-300 rounded-md"
							required
						/>
					</label>
				</div>
			</div>

			{/* Hora Inicio y Fin */}
			<div className="flex space-x-4 mb-6 ">
				<div className="w-full">
					<label className="block font-semibold text-gray-700 mb-2">
						Hora Inicio:
						<input
							type="time"
							value={comision.horaInicio}
							onChange={(e: any) =>
								handleChangeComision(index, "horaInicio", e.target.value)
							}
							className="w-full p-2 border border-gray-300 rounded-md"
							required
						/>
					</label>
				</div>
				<div className="w-full">
					<label className="block font-semibold text-gray-700 mb-2">
						Hora Fin:
						<input
							type="time"
							value={comision.horaFin}
							onChange={(e: any) =>
								handleChangeComision(index, "horaFin", e.target.value)
							}
							className="w-full p-2 border border-gray-300 rounded-md"
							required
						/>
					</label>
				</div>
			</div>

			<div className="flex space-x-4 mb-6 ">
				{/* Docente Responsable */}
				<div className="w-full">
					<label className="block font-semibold text-gray-700 mb-3">
						Docente Responsable:
						<input
							type="text"
							value={comision.docente || ""}
							onChange={(e: any) =>
								handleChangeComision(index, "docente", e.target.value)
							}
							className="w-full p-2 border border-gray-300 rounded-md"
							required
						/>
					</label>
				</div>
				{/* Contacto */}
				<div className="w-full">
					<label className="block font-semibold text-gray-700 mb-3">
						Contacto:
						<input
							type="text"
							value={comision.contacto || ""}
							onChange={(e: any) =>
								handleChangeComision(index, "contacto", e.target.value)
							}
							className="w-full p-2 border border-gray-300 rounded-md"
							placeholder="Ej: email o teléfono"
							required
						/>
					</label>
				</div>
			</div>

			{cuposDisponibles !== null && (
				<div
					className={clsx(
						"p-3 rounded-md font-semibold text-white",
						cuposDisponibles > 0 ? "bg-green-500" : "bg-red-500",
					)}
				>
					{cuposDisponibles > 0
						? `Hay ${cuposDisponibles} cupos disponibles. Puedes planificar la práctica.`
						: "No hay cupos disponibles para esta fecha y horario."}
				</div>
			)}
		</div>
	);
};

export default ComisionForm;
