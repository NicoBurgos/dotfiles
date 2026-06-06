import { Step } from "driver.js";

export const recepcionSolicitudesSteps: Step[] = [
	{
		element: "#recepcion-solicitudes",
		popover: {
			title: "Recepción de Solicitudes",
			description:
				"Completá el formulario para cargar una nueva solicitud de práctica.",
			side: "right",
			align: "start",
		},
	},
	{
		element: "#sede",
		popover: {
			title: "Sede",
			description:
				"Seleccioná la sede de la solicitud de práctica.",
		},
	},
	{
		element: "#carrera",
		popover: {
			title: "Carrera",
			description: "Seleccioná la carrera de la solicitud de práctica.",
		},
	},
	{
		element: "#cohorte",
		popover: {
			title: "Cohorte",
			description:
				"Seleccioná la cohorte de la solicitud de práctica. Se muestran las cohortes habilitadas y las no habilitadas (En color amarillo).",
		},
	},
	{
		element: "#añoFormacion",
		popover: {
			title: "Año de Formación",
			description:
				"Seleccioná el año de formación de la carrera de la solicitud de práctica.",
		},
	},
	{
		element: "#materia",
		popover: {
			title: "Espacio Curricular",
			description:
				"Seleccioná el espacio curricular de la solicitud de práctica.",
		},
	},	
	{
		element: "#fechaLlegada",
		popover: {
			title: "Fecha de Llegada",
			description:
				"Seleccioná la fecha de llegada de la solicitud de práctica.",
		},
	},
];
