import { driver } from "driver.js";
import "driver.js/dist/driver.css";

import { inicioSteps } from "./steps/inicio";
import { dashboardSteps } from "./steps/dashboard";
import { solicitudesSteps } from "./steps/solicitudes";

// Instancia única del driver
const appTour = driver({
	showProgress: true,
	animate: true,
	nextBtnText: "Siguiente",
	prevBtnText: "Atrás",
	doneBtnText: "Finalizar",
});

// Registro de steps por ruta
const stepsByPath: Record<string, typeof inicioSteps> = {
	"/inicio": inicioSteps,
	"/dashboard": dashboardSteps,
	"/solicitudes-practica": solicitudesSteps,
};

// Función para obtener el tour según el path
export const getTourByPath = (pathname: string) => {
	const cleanPath = pathname.split("?")[0].split("#")[0];
	const steps = stepsByPath[cleanPath];

	if (!steps) return null;

	appTour.setSteps(steps);
	return appTour;
};
