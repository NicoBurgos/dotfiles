import useRecepcionSolicitudes from "@procesos/components/recepcion-solicitudes/hooks/useRecepcionSolicitudes";
import Spinner from "@shared/components/Spinner";
import type React from "react";
import Select from "react-select";

const RecepcionSolicitudes = () => {
	const {
		handleSubmit,
		carreraOptions,
		cohorteOptions,
		materiaOptions,
		sedeOptions,
		selectedAñoFormacion,
		selectedCarrera,
		selectedCohorte,
		selectedSede,
		setSelectedAñoFormacion,
		setSelectedCarrera,
		setSelectedCohorte,
		setSelectedSede,
		isLoading,
		selectedMateria,
		setSelectedMateria,
		error,
		añosFormacionOptions,
		fechaLlegada,
		setFechaLlegada,
	} = useRecepcionSolicitudes();

	if (isLoading) return <Spinner />;

	const fields = [
		{
			id: "sede",
			label: "Sede",
			options: sedeOptions,
			value: selectedSede,
			setValue: setSelectedSede,
		},
		{
			id: "carrera",
			label: "Carrera",
			options: carreraOptions,
			value: selectedCarrera,
			setValue: setSelectedCarrera,
		},
		{
			id: "cohorte",
			label: "Cohorte",
			options: cohorteOptions,
			value: selectedCohorte,
			setValue: setSelectedCohorte,
		},
		{
			id: "añoFormacion",
			label: "Año de Formación",
			options: añosFormacionOptions,
			value: selectedAñoFormacion,
			setValue: setSelectedAñoFormacion,
		},
		{
			id: "materia",
			label: "Espacio Curricular",
			options: materiaOptions,
			value: selectedMateria,
			setValue: setSelectedMateria,
		},
	];

	// 🔹 estilos por defecto
	const baseCustomSelectStyles = {
		control: (base: any, state: any) => ({
			...base,
			backgroundColor: "white",
			borderColor: state.isFocused ? "#22c55e" : "#d1d5db",
			boxShadow: state.isFocused ? "0 0 0 2px rgba(34, 197, 94, 0.3)" : "none",
			"&:hover": {
				borderColor: "#22c55e",
			},
			borderRadius: "0.5rem",
			padding: "2px",
			fontSize: "0.875rem",
		}),
		menu: (base: any) => ({
			...base,
			zIndex: 10,
		}),
		option: (base: any, state: any) => ({
			...base,
			backgroundColor: state.isSelected
				? "#22c55e"
				: state.isFocused
					? "#bbf7d0"
					: "white",
			color: state.isSelected ? "white" : "black",
		}),
	};

	return (
		<div id="recepcion-solicitudes" className="font-sans bg-gray-50 p-6 max-w-6xl mx-auto rounded-lg shadow-md">
			<h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
				Cargar Nueva Solicitud
			</h2>
			<form onSubmit={handleSubmit} className="space-y-6">
				{fields.map(({ id, label, options, value, setValue }) => {
					// 🔹 detectar si cohorte contiene No habilitado
					const isCohorteNoHabilitado =
						id === "cohorte" &&
						(value?.toString().toLowerCase().includes("no habilitado") ||
							options
								.find((opt: any) => opt.value === value)
								?.label.toLowerCase()
								.includes("no habilitado"));

					// 🔹 estilos dinámicos
					const dynamicStyles = {
						...baseCustomSelectStyles,
						control: (base: any, state: any) => ({
							...baseCustomSelectStyles.control(base, state),
							borderColor: isCohorteNoHabilitado
								? "yellow"
								: state.isFocused
									? "#22c55e"
									: "#d1d5db",
							boxShadow: isCohorteNoHabilitado
								? "0 0 0 2px rgba(220,38,38,0.3)" // rojo
								: state.isFocused
									? "0 0 0 2px rgba(34,197,94,0.3)"
									: "none",
						}),
					};

					return (
						<div key={id} id={id}>
							<label
								htmlFor={id}
								className="block text-sm font-medium text-gray-700 mb-1"
							>
								{label}
							</label>
							<Select
								inputId={id}
								value={
									options.find((option: any) => option.value === value) || ""
								}
								onChange={(selectedOption: any) =>
									setValue(selectedOption?.value || "")
								}
								options={options}
								placeholder={`Seleccione ${label.toLowerCase()}`}
								styles={dynamicStyles} // 🔹 estilos dinámicos aquí
							/>
						</div>
					);
				})}

				<div>
					<label
						htmlFor="fechaLlegada"
						className="block text-sm font-medium text-gray-700 mb-1"
					>
						Fecha de Llegada de la Solicitud
					</label>
					<input
						type="date"
						id="fechaLlegada"
						value={fechaLlegada}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setFechaLlegada(e.target.value)
						}
						className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
						required
					/>
				</div>
				{error && (
					<div className="text-red-600 bg-red-50 border border-red-300 p-3 rounded-md text-sm text-center">
						{error}
					</div>
				)}
				<button
					type="submit"
					className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold text-lg hover:bg-green-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-green-400"
				>
					Cargar Solicitud
				</button>
			</form>
		</div>
	);
};

export default RecepcionSolicitudes;
