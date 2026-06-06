import ComisionForm from "@procesos/components/evaluacion-planificacion/components/comision/comision-form/ComisionForm";
import useEvaluacionPlanificacion from "@procesos/components/evaluacion-planificacion/hooks/useEvaluacionPlanificacion";
import type React from "react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const EvaluacionPlanificacion = () => {
	const {
		solicitudes,
		servicios,
		comisiones,
		handleAddComision,
		handleChangeComision,
		handleDiasSemanaChange,
		handleRemoveComision,
		handleSubmit,
		resetComisiones,
		fetchData,
	} = useEvaluacionPlanificacion();

	const handleConfirmar = async (e: React.FormEvent) => {
		e.preventDefault();

		const hayComisionSinDias = comisiones.some(
			(comision: any) => comision.diasSemana.length === 0,
		);

		if (hayComisionSinDias) {
			toast.error("Debes seleccionar al menos un día de la semana.");
			return;
		}

		// Validar comisiones
		for (const comision of comisiones) {
			const servicio = servicios.find(
				(s: any) => s.servicio_id === Number(comision.servicioId),
			);
			const horario = servicio?.horarios.find(
				(h: any) => h.horario_id === Number(comision.horarioId),
			);

			if (!horario) {
				toast.error("Horario no válido seleccionado.");
				return;
			}

			// Validar cantidad de alumnos positiva
			if (Number(comision.cantidadAlumnos) <= 0) {
				toast.error(
					`La comisión "${comision.nombre}" debe tener al menos 1 alumno.`,
				);
				return;
			}

			// Validar rango horario
			if (
				comision.horaInicio < horario.hora_inicio ||
				comision.horaFin > horario.hora_fin
			) {
				toast.error(
					`La comisión "${comision.nombre || "sin nombre"}" tiene un horario fuera del rango permitido (${horario.hora_inicio} - ${horario.hora_fin}).`,
				);
				return;
			}

			// Validar cupos
			const cantidadAlumnos = Number(comision.cantidadAlumnos);
			const cuposDisponibles = Number(horario.cupos);

			if (cantidadAlumnos > cuposDisponibles) {
				toast.error(
					`La comisión "${comision.nombre || "sin nombre"}" excede los cupos disponibles (${cuposDisponibles}) del horario seleccionado.`,
				);
				return;
			}

			// Validar que la fecha de finalizacion no sea menor a la de inicio
			if (!comision.fechaInicio || !comision.fechaFin) {
				toast.error(
					`Comisión "${comision.nombre}" debe tener fecha de inicio y fin.`,
				);
				return;
			}

			if (comision.fechaInicio > comision.fechaFin) {
				toast.error(
					`La fecha de inicio no puede ser posterior a la de fin en "${comision.nombre}".`,
				);
				return;
			}
		}

		await handleSubmit();
		await fetchData();
	};

	return (
		<div className="font-sans bg-gray-50 p-6 max-w-6xl mx-auto rounded-lg shadow-md" id="evaluacion-planificacion">
			<h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
				Planificación de Prácticas
			</h2>
			<form onSubmit={handleConfirmar} key={comisiones.length}>
				{comisiones.map((comision, index) => {
					return (
						<div className="mb-4" key={index}>
							<ComisionForm
								comision={comision}
								index={index}
								handleDiasSemanaChange={handleDiasSemanaChange}
								handleChangeComision={handleChangeComision}
								servicios={servicios}
								solicitudes={solicitudes}
							/>
							{index === 0 ? (
								""
							) : (
								<button
									type="button"
									onClick={() => handleRemoveComision(index)}
									className="mt-4 bg-red-500 text-white py-2 px-4 rounded-md"
								>
									Eliminar Comisión
								</button>
							)}
						</div>
					);
				})}

				<button
					type="button"
					onClick={handleAddComision}
					className="bg-green-500 text-white py-2 px-4 rounded-md"
				>
					Agregar Comisión
				</button>
				<button
					type="submit"
					className="mt-6 bg-blue-500 text-white py-3 px-6 rounded-md w-full"
				>
					Guardar Comisiones
				</button>
			</form>
		</div>
	);
};

export default EvaluacionPlanificacion;
