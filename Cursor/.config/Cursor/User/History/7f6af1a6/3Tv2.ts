import { Step } from "driver.js";

export const evaluacionDocumentacionSteps: Step[] = [
	{
		element: "#evaluacion-documentacion",
		popover: {
			title: "Evaluación de Documentación",
			description:
				"Completá el formulario para evaluar la documentación de la solicitud de práctica.",
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
