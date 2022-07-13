import App from "./App.svelte";

const mtPoint = document.getElementById("app");
function mt(component, options = {}) {
	mtPoint.innerHTML = "";
	let cmp = new component({
		target: mtPoint,
		...options
	});

	console.info(
		"mounted", component.name.substring(6, component.name.length - 1) + ";",
		"options:", options
	);
	return cmp;
}

export const app = mt(App);