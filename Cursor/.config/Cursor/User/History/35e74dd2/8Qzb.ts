import { Step } from "driver.js";

export const solicitudesSteps: Step[] = [
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
		element: "#estadisticas",
		popover: {
			title: "Estadísticas",
			description: "Visualizá indicadores clave del sistema en tiempo real.",
		},
	},
	{
		element: "#solicitudes",
		popover: {
			title: "Solicitudes",
			description:
				"Gestioná las solicitudes de prácticas: creación, documentación y planificación.",
		},
	},
	{
		element: "#comisiones",
		popover: {
			title: "Comisiones",
			description:
				"Accedé a la información de comisiones en espera, en curso o finalizadas.",
		},
	},
	{
		element: "#expedientes",
		popover: {
			title: "Expedientes",
			description:
				"Consultá los expedientes existentes o generá nuevos desde esta sección.",
		},
	},
	{
		element: "#resoluciones",
		popover: {
			title: "Resoluciones",
			description:
				"Visualizá las resoluciones cargadas o creá nuevas resoluciones.",
		},
	},
	{
		element: "#institucionesFormadoras",
		popover: {
			title: "Instituciones Formadoras",
			description:
				"Gestioná instituciones, sedes, carreras, cohortes, ofertas académicas y espacios curriculares.",
		},
	},
	{
		element: "#establecimientosSalud",
		popover: {
			title: "Establecimientos de Salud",
			description:
				"Administrá establecimientos, servicios y sus horarios disponibles.",
		},
	},
	{
		element: "#mapas",
		popover: {
			title: "Mapa",
			description:
				"Visualizá la ubicación de las instituciones y establecimientos en el mapa.",
		},
	},
	{
		element: "#admin",
		popover: {
			title: "Administrador",
			description:
				"Accedé a herramientas como gestión de usuarios, auditoría y mantenimiento.",
		},
	},
	{
		element: "#tour",
		popover: {
			title: "Tour interactivo",
			description:
				"Podés repetir el recorrido por el sistema en cualquier momento desde aquí.",
		},
	},
	{
		element: "#perfil",
		popover: {
			title: "Perfil",
			description: "Consultá y modificá tus datos personales.",
			side: "right",
		},
	},
	{
		element: "#cerrar-sesion",
		popover: {
			title: "Cerrar sesión",
			description: "Cerrá tu sesión de forma segura desde este botón.",
			side: "right",
		},
	},
	{
		element: "#calendario",
		popover: {
			title: "Calendario",
			description: "Consultá el calendario de prácticas actualizado.",
			side: "right",
		},
	},
];
