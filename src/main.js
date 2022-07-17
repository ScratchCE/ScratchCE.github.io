import App from "./App.svelte";
import {navigate} from "svelte-navigator";

export const app = new App({
	target: document.getElementById("app")
});
navigate(location.pathname, { replace: true });