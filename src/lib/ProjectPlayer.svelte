<script>
	import {createEventDispatcher, onMount} from "svelte";


	// Stuff that can be set
	export let id = 0;
	export let editor = false;
	export let params = {};
	export let serverUrl;

	// Meta stuff
	export let projectStatus = "notloaded";

	// Internal GUI stuff
	export let reduxTarget = null;
	export let reduxStore = null;

	// Scratch stuff
	export let playerMode = "player";
	export let projectTitle = "";

	/*
		A hack to prevent reactive loopbacks,
		which also fixes a bug where exiting fullscreen
		in the editor exits the editor
	*/
	let noReactEvents = false;

	if (!serverUrl) {
		throw new Error("The server URL must be defined!");
	}


	const dispatch = createEventDispatcher();

	let
		frame, guiWindow,
		servers, projectHost, assetHost
	;

	onMount(async () => {
		servers = serverUrl;
		projectHost = `${servers}/projects`;
		assetHost = `${servers}/assets`;

		await shouldLoadGui();
		guiWindow = frame.contentWindow;

		frame.addEventListener("load", async () => {
			const doReduxStuff = async function() {
				reduxTarget = guiWindow.ReduxTarget;
				reduxStore = guiWindow.ReduxStore;
				const store = reduxStore;
				const target = reduxTarget;
									
				setFrameSize(480, 360);
				
				const state = store.getState().scratchGui;
				if (state.customStageSize) {
					if (
						state.customStageSize.width &&
						state.customStageSize.height
					) {
						// Just in case
						setFrameSize(
							state.customStageSize.width,
							state.customStageSize.height
						)
					}
				}
				if (state.mode) {
					setPlayerMode(state.mode);
				}
				if (state.projectTitle) {
					projectTitle = state.projectTitle;
				}

				target.addEventListener("statechanged", (/** @type CustomEvent */ e) => {
					const action = e.detail.action;
					dispatch("reduxevent", e.detail);
					console.log(e.detail);
					
					switch (action.type) {
						case "tw/custom-stage-size/SET":
							console.log("gui frame:", frame);
							setFrameSize(action.width, action.height);

							dispatch("stagesize", {width: action.width, action: frame.height});
						break;
						case "scratch-gui/mode/SET_FULL_SCREEN":
						case "scratch-gui/mode/SET_PLAYER":
							setPlayerMode(e.detail.next.scratchGui.mode);
						break;
						case "projectTitle/SET_PROJECT_TITLE":
							noReactEvents = true;
							projectTitle = action.title;
						break;
					}
				});
			};

			guiWindow.addEventListener("reduxtargetadded", doReduxStuff);
			if (guiWindow.ReduxTarget) doReduxStuff();
		});
	});

	$: setPlayerModeString(playerMode);
	$: setProjTitle(projectTitle);
	$: setProject(id);
	async function setProject(_id) {
		if (noReactEvents) {
			noReactEvents = false;
			return;
		};
		if (!guiWindow) return;
		await shouldLoadGui(_id)
		guiWindow.location.hash = "#" + id;
	}
	function setProjTitle(title) {
		if (noReactEvents) {
			noReactEvents = false;
			return;
		};
		if (!reduxStore) return;
		reduxStore.dispatch({
			type: "projectTitle/SET_PROJECT_TITLE",
			title: title
		});
	}

	/**
		@param {string} mode
	*/
	function setPlayerModeString(mode) {
		if (noReactEvents) {
			noReactEvents = false;
			return;
		};
		if (!reduxStore) return;
		reduxStore.dispatch({
			type: "scratch-gui/mode/SET_PLAYER",
			isPlayerOnly: mode === "player" || mode === "fullscreen" || mode === "fullscreen-editor"
		});
		reduxStore.dispatch({
			type: "scratch-gui/mode/SET_FULL_SCREEN",
			isFullScreen: mode === "fullscreen" || mode === "fullscreen-editor"
		});
	}

	/**
		@param {object} mode
	*/
	function setPlayerMode(mode) {
		noReactEvents = true;
		playerMode = mode ?
			(
				mode.isPlayerOnly ?
					(mode.isFullScreen ? "fullscreen" : "player") :
					(mode.isFullScreen ? "fullscreen-editor" : "editor")
			)
		: "player";
	}

	/**
		@param {number} _id
	*/
	async function shouldLoadGui(_id = id) {
		projectStatus = "loading";
		if (_id === 0) {
			projectStatus = "notloaded";
			setGuiUrl(false);
			return false;
		} else if (!Number(_id)) {
			setGuiUrl(false);
			return false;
		} else {
			try {
				const existRes = await fetch(`${projectHost}/${_id}/exists`);
				if (existRes.ok) {
					projectStatus = "ok";
					setGuiUrl(true);
					if (guiWindow) guiWindow.location.hash = "#" + _id;
					return true;
				} else {
					projectStatus = "noproject";
					setGuiUrl(false);
					return false;
				}
			} catch(e) {
				try {
					const existRes = await fetch(`${servers}`);
					if (existRes.ok) {
						projectStatus = "projectunavailable";
						setGuiUrl(false);
						return false;
					};
				} catch(e) {
					console.log(e);
					projectStatus = "unavailable";
					setGuiUrl(false);
					return false;
				}
			}
		}
		projectStatus = "unavailable";
		setGuiUrl(false);
		return false;
	}
	
	/**
		@param {number} sw
		@param {number} sh
	*/
	function setFrameSize(sw, sh) {
		frame.setAttribute("width", Math.max(sw + 2, 482));
		frame.setAttribute("height", sh + 2 + 44);
		dispatch("framesize", {width: frame.width, height: frame.height});
	}

	/**
	 * @param {boolean} load
	 */
	function setGuiUrl(load) {
		if (load) {
			if (frame.src === "about:blank") {
				const searchParams = new URLSearchParams();

				searchParams.set("project_host", projectHost);
				searchParams.set("asset_host", assetHost);
				for (const param in params) {
					searchParams.set(param, params[param]);
				}

				let searchParamsString = searchParams.toString();
				searchParamsString = searchParamsString === "" ? "" : "?" + searchParamsString;

				frame.src =
					"/gui/" + 
					(editor ? "editor.html" : "index.html")
					+ searchParamsString + "#" + id;
			}
			if (guiWindow) guiWindow.location.hash = "#" + id;
		} else {
			frame.src = "about:blank";
		}
	}
</script>

<div>
	<div class:show={projectStatus==="ok"} id="scratch-gui">
		<iframe
			class:fill-screen={["fullscreen", "editor", "fullscreen-editor"].includes(playerMode)}
			bind:this={frame}
			title=""
			scrolling="no"
			width="482"
			height="406"
			src="about:blank"
		></iframe>
	</div>
</div>

<style>
	#scratch-gui {
		display: none;
	}
	#scratch-gui.show {
		display: block;
	}

	iframe {
		border: none;
	}
	iframe.fill-screen {
		position: fixed;
		top: 0;
		left: 0;

		width: 100vw;
		height: 100vh;
	}

</style>