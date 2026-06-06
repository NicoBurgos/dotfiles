import { Step } from "driver.js";

export const evaluacionPlanificacionSteps: Step[] = [
	{
		element: "#evaluacion-planificacion",
		popover: {
			title: "Evaluación de Planificación",
			description:
				"Completá el formulario para evaluar la factibilidad de la planificación de la solicitud de práctica.",
			side: "right",
			align: "start",
		},
	},
	{
		element: "#solicitud-select",
		popover: {
			title: "Solicitud de Práctica",
			description:
				"Seleccioná la solicitud de práctica a evaluar.",
		},
	},
	{
		element: "#calculadora-carga-horaria",
		popover: {
			title: "Calculadora de Carga Horaria",
			description: "Calculá la carga horaria de la solicitud de práctica.",
		},
	},
	{
		element: "#cantidad-alumnos",
		popover: {
			title: "Cantidad de Alumnos",
			description:
				"Ingresá la cantidad de alumnos que se van a inscribir en la comisión.",
		},
	},
	{
		element: "#servicio-select",
		popover: {
			title: "Servicio",
			description:
				"Seleccioná el servicio de la solicitud de práctica.",
		},
	},
	{
		element: "#horario-select",
		popover: {
                title: "Horario",
			description:
				"Seleccioná el horario de la solicitud de práctica.",
		},
	},	
    {
		element: "#dias-comision-checkbox",
		popover: {
			title: "Días de la Comisión",
			description:
				"Seleccioná los días de la semana en los que la comisión va a ir al servicio.",
		},
	},	
	{
		element: "#fecha-inicio-fin",
		popover: {
			title: "Fecha de Inicio y Fin",
			description:
				"Seleccioná la fecha de inicio y fin de la comisión.",
		},
	},
	{
		element: "#hora-inicio-fin",
		popover: {
			title: "Hora de Inicio y Fin",
			description:
				"Seleccioná la hora de inicio y fin de la comisión.",
		},
	},
	{
		element: "#docente-responsable-contacto",
		popover: {
			title: "Docente Responsable y Contacto",
			description:
				"Ingresa el docente responsable y el contacto del mismo.",
		},
	},
	{
		element: "#cupos-disponibles",
		popover: {
			title: "Cupos Disponibles",
			description:
				"Visualiza la factibilidad de que se realice la práctica de la comisión en el servicio seleccionado",
		},
	},
	
];
