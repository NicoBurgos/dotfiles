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
		element: "#confirmar-documentacion",
		popover: {
			title: "Confirmar Documentación",
			description:
				"Confirmá la evaluación de la documentación de la solicitud de práctica.",
		},
	},
	{
		element: "#tabla-solicitudes-pendientes-revision",
		popover: {
			title: "Tabla de Solicitudes Pendientes de Revisión",
			description:
				"Visualiza las solicitudes pendientes de revisión en la tabla. Al hacer click en una fila, se muestra la solicitud de práctica en el formulario de evaluación de documentación.",
		},
	},	
    {
		element: "#buscador",
		popover: {
			title: "Buscador",
			description:
				"Buscá las solicitudes de práctica por ID, sede, carrera, materia, estado, fecha de llegada, fecha de carga, fecha de revisión y fecha de planificación (Solamente se muestran las solicitudes pendientes de revisión).",
		},
	},	
	
];
