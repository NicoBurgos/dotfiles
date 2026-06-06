import Spinner from "@shared/components/Spinner";
import Tabla from "@shared/components/Tabla/Tabla";
import Etiqueta from "@shared/templates/Etiqueta";
import clsx from "clsx";
import type React from "react";
import Select from "react-select";
import CheckboxesRechazo from "./components/checkboxes-rechazo/CheckboxesRechazo";
import useEvaluacionDocumentacion from "./hooks/useEvaluacionDocumentacion";
import { TablaHeader } from "@shared/components/Tabla/interfaces/tablaHeader";

function EvaluacionDocumentacion() {
	const {
		isLoading,
		error,
		datosCompletos,
		checkboxes,
		filteredOptions,
		handleChange,
		handleConfirmar,
		headers,
		observaciones,
		setObservaciones,
		selectedOption,
		setSelectedOption,
		motivosMarcados,
		setCheckboxes,
		cohorteAlerta,
		setCohorteAlerta,
	} = useEvaluacionDocumentacion();

	const customStyles = {
		control: (base: any, state: any) => ({
			...base,
			borderRadius: "0.5rem",
			borderColor: state.isFocused ? "#60A5FA" : "#D1D5DB", // blue-400 or gray-300
			boxShadow: state.isFocused ? "0 0 0 1px #60A5FA" : "none",
			padding: "0.25rem 0.5rem",
			minHeight: "2.75rem",
			fontSize: "1rem",
			backgroundColor: "white",
		}),
		option: (base: any, state: any) => ({
			...base,
			backgroundColor: state.isSelected
				? "#2563EB" // blue-600
				: state.isFocused
					? "#EFF6FF" // blue-50
					: "white",
			color: state.isSelected ? "white" : "#111827", // gray-900
			padding: "0.5rem 1rem",
			cursor: "pointer",
		}),
		menu: (base: any) => ({
			...base,
			borderRadius: "0.5rem",
			marginTop: "0.25rem",
			zIndex: 20,
		}),
		singleValue: (base: any) => ({
			...base,
			color: "#111827", // gray-900
		}),
		placeholder: (base: any) => ({
			...base,
			color: "#9CA3AF", // gray-400
		}),
	};

	if (isLoading) {
		return (
			<div className="flex justify-center items-center min-h-screen">
				<Spinner />
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex justify-center items-center min-h-screen">
				<p className="text-lg text-red-500">{error}</p>
			</div>
		);
	}

	return (
		<div id="evaluacion-documentacion" className="font-sans bg-gray-50 p-6 max-w-6xl mx-auto rounded-lg shadow-md">
			<h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
				Evaluación de Documentación
			</h1>

			<div className="mb-6">
				<div id="solicitud-select">

				<label
					htmlFor="solicitud-select"
					className="block font-semibold text-gray-700 mb-2"
				>
					Solicitud:
				</label>
				<Select
					id="solicitud-select"
					options={filteredOptions}
					value={selectedOption}
					onChange={handleChange}
					className="mb-4"
					placeholder="Seleccione una solicitud"
					isClearable
					styles={customStyles}
				/>
				</div>

				{cohorteAlerta && (
					<div className="flex items-start gap-3 p-4 mb-4 rounded-md border-l-4 border-yellow-500 bg-yellow-50 text-yellow-800 shadow-sm">
						{/* Ícono de advertencia */}
						<svg
							className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-0.5"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M12 9v2m0 4h.01m-6.938 4h13.856c1.054 0 1.636-1.147 1.054-2.053l-6.928-11.856c-.527-.9-1.845-.9-2.372 0L3.086 16.947c-.582.906 0 2.053 1.054 2.053z"
							/>
						</svg>
						<div>
							<p className="font-bold text-yellow-700">
								Posible problema con la cohorte
							</p>
							<p className="text-sm">{cohorteAlerta}</p>
						</div>
					</div>
				)}

				<div id="checkboxes-rechazo">

				<CheckboxesRechazo
					checkboxes={checkboxes}
					setCheckboxes={setCheckboxes}
					title="Requisitos"
				/>
				</div>

				<div className="my-6" id="observaciones">
					<label
						htmlFor="observaciones-input"
						className="block font-semibold text-gray-700 mb-2"
					>
						Observaciones:
					</label>
					<textarea
						id="observaciones-input"
						value={observaciones}
						onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
							setObservaciones(e.target.value)
						}
						className="w-full p-3 border border-gray-300 rounded-md"
						rows={4}
						placeholder="Escribe tus observaciones aquí..."
					/>
				</div>

				<div className="text-center">
					<button
						type="button"
						onClick={handleConfirmar}
						className={clsx(
							"py-3 px-6 rounded-md mt-6",
							motivosMarcados
								? "bg-orange-500 hover:bg-orange-600 mb-4 -mt-4"
								: "bg-green-500 hover:bg-green-600",
							"text-white",
						)}
					>
						{motivosMarcados
							? "Confirmar Devolución de la Documentación"
							: "Confirmar Documentación en Regla"}
					</button>
				</div>
			</div>

			<div className="mt-8">
				<h2 className="text-center text-2xl font-extrabold text-gray-800 mb-6">
					Solicitudes Pendientes de Revisión
				</h2>
				<Tabla
					data={datosCompletos}
					headers={headers}
					onRowClick={(row) => {
						setSelectedOption({
							value: {
								solicitud_id: row.id,
								sede_id: row.sede_id,
								materia_id: row.materia_id,
								cohorte_habilitado: row.cohorte_habilitado,
							},
							label: `${row.sede_nombre} - ${row.carrera_nombre} - ${row.materia_nombre}`,
						});

						if (row.cohorte_habilitado === false) {
							setCohorteAlerta("Cohorte no habilitada");
						} else {
							setCohorteAlerta(null);
						}

						window.scrollTo({
							top: 0,
							left: 0,
							behavior: "smooth",
						});
					}}
					renderCell={(row: any, header: TablaHeader) => {
						if (header.key === "estado") {
							return <Etiqueta texto={row[header.key]} />;
						}
						return String(row[header.key]);
					}}
				/>
			</div>
		</div>
	);
}

export default EvaluacionDocumentacion;
