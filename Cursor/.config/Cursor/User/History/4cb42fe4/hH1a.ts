import { Step } from "driver.js";

export const recepcionSolicitudesSteps: Step[] = [
	{
		element: "#buscador",
		popover: {
			title: "Buscador",
			description:
				"Buscá las solicitudes de práctica por ID, sede, carrera, materia, estado, fecha de llegada, fecha de carga, fecha de revisión y fecha de planificación (Solamente las que se muestran en la tabla, para bùsqueda global debes seleccioar la opcion Todos en el filtro de filas por página).",
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
