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
		element: "#filas-por-pagina",
		popover: {
			title: "Filtro de filas por página",
			description:
				"Permite seleccionar la cantidad de filas que se muestran en la tabla.",
		},
	},
	{
		element: "#paginacion",
		popover: {
			title: "Paginacion",
			description: "Permite navegar entre las páginas de la tabla.",
		},
	},
	{
		element: "#boton-agregar",
		popover: {
			title: "Agregar una nueva solicitud de práctica",
			description:
				"Redirige a la sección de recepción de solicitudes para agregar una nueva solicitud de práctica.",
		},
	},
	{
		element: "#tabla",
		popover: {
			title: "Tabla de Solicitudes de Práctica",
			description:
				"Visualiza las solicitudes de práctica en la tabla.",
		},
	},
	{
		element: "#total-registros",
		popover: {
			title: "Total de registros",
			description:
				"Muestra el total de registros de las solicitudes de práctica (depende del filtro de filas por página).",
		},
	},	
];
