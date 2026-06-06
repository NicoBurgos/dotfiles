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
		element: "#checkboxes-rechazo",
		popover: {
			title: "Check de Requisitos",
			description: "Seleccioná los requisitos que cumple la solicitud de práctica.",
		},
	},
	{
		element: "#observaciones",
		popover: {
			title: "Observaciones",
			description:
				"Escribí las observaciones de la solicitud de práctica al momento de la evaluación (Opcional). Pueden detallar motivos de rechazo, aprobación, etc.",
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
