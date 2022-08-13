<script>
	import ProjectPlayer from "../lib/ProjectPlayer.svelte";
	import {serverUrl} from "../lib/constants.js";
	import {authPromise} from "../lib/auth.js";

	import {navigate} from "svelte-navigator";
	import {onMount} from "svelte";

	export let wc;

	let projectTitle,
		reduxStore,
		projectStatus = "loading",
		playerMode,
		projectId,
		mode,
		playerFunctions;
	
	let apiData = null;

	doWildcard(wc);
	function doWildcard(wc) {
		const split = wc.split("/");
		projectId = split[0] || 0;
		mode = split[1] || "";
		if (playerFunctions) {
			playerFunctions.setProject(projectId);
			playerFunctions.setPlayerMode(mode);
		}
	}

	const urlParams = new URL(location.href).searchParams;
	const hide = {
		seeInside: urlParams.has("no-see-inside") || urlParams.has("no-controls"),
		name: urlParams.has("no-name") || urlParams.has("no-controls"),
		id: urlParams.has("no-id") || urlParams.has("no-nav"),
		random: urlParams.has("no-random") || urlParams.has("no-nav"),
	}
	
	const defaultProject =
`{"targets":[{"isStage":true,"name":"Stage","variables":{},"lists":{},"broadcasts":{},"blocks":{},"comments":{},"currentCostume":0,"costumes":[{"assetId":"14e46ec3e2ba471c2adfe8f119052307","name":"","bitmapResolution":1,"md5ext":"14e46ec3e2ba471c2adfe8f119052307.svg","dataFormat":"svg","rotationCenterX":0,"rotationCenterY":0}],"sounds":[],"volume":100,"layerOrder":0,"tempo":60,"videoTransparency":50,"videoState":"on","textToSpeechLanguage":null},{"isStage":false,"name":"Communicat","variables":{},"lists":{},"broadcasts":{},"blocks":{},"comments":{},"currentCostume":0,"costumes":[{"assetId":"b551df3ba49e6475928309214f51bd94","name":"Communicat-a","bitmapResolution":1,"md5ext":"b551df3ba49e6475928309214f51bd94.svg","dataFormat":"svg","rotationCenterX":48.20865451049096,"rotationCenterY":49.61842375318162},{"assetId":"b62c61a6c0384f71872990115d93eea8","name":"Communicat-b","bitmapResolution":1,"md5ext":"b62c61a6c0384f71872990115d93eea8.svg","dataFormat":"svg","rotationCenterX":46.1326061009419,"rotationCenterY":52.471372930065456},{"assetId":"814a2e4591c4eab9e832b88d16d3988d","name":"Communicat-c","bitmapResolution":1,"md5ext":"814a2e4591c4eab9e832b88d16d3988d.svg","dataFormat":"svg","rotationCenterX":55.23697676581517,"rotationCenterY":29.391930273437737},{"assetId":"78ed5bb0fefd8984546468e1a1ebb1b6","name":"Communicat-d","bitmapResolution":1,"md5ext":"78ed5bb0fefd8984546468e1a1ebb1b6.svg","dataFormat":"svg","rotationCenterX":48.44891835577772,"rotationCenterY":41.586213103483544}],"sounds":[{"assetId":"83c36d806dc92327b9e7049a565c6bff","name":"Meow","dataFormat":"wav","rate":48000,"sampleCount":40682,"md5ext":"83c36d806dc92327b9e7049a565c6bff.wav"}],"volume":100,"layerOrder":1,"visible":true,"x":0,"y":0,"size":100,"direction":90,"stretch":100,"draggable":false,"rotationStyle":"all around"}],"monitors":[],"extensions":[],"meta":{"semver":"3.0.0","vm":"0.2.0","agent":""}}`;
	
	function doSpecialIds(id = projectId) {
		if (id === "create") {
			createProject();
		} else if (id === "random") {
			randomProject();
		} else {
			getProject(id).then(data => apiData = data);
		}
	}
	onMount(doSpecialIds);

	async function createProject() {
		try {
			projectStatus = "creating";
			const resp = await fetch(`${serverUrl}/projects/`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"X-Token": localStorage.getItem("accounttoken") || undefined
				},
				body: defaultProject
			});
			const body = await resp.text();
			if (!resp.ok) {
				projectStatus = "unavailable";
				throw body;
			}
			
			let parsed = JSON.parse(body);
			gotoProject(Number(parsed["content-name"]));
			// Eventually
			// setProjTitle(atob(parsed["content-title"]));
			return parsed;
		} catch(e) {
			projectStatus = "unavailable";
			return null;
		}
	}
	async function randomProject() {
		try {
			const req = await fetch(serverUrl + "/projects/count");
			if (!req.ok) {
				projectStatus = "unavailable";
				return;
			}
			const text = await (req.text());
			if (!Number(text)) {
				projectStatus = "unavailable";
				return;
			}
			const number = Number(text);
			const random = Math.floor(Math.random() * number) + 1;
			
			gotoProject(random);
		} catch(e) {
			projectStatus = "unavailable";
		}
	}

	async function gotoProject(id) {
		apiData = await getProject(id);
		navigate("/projects/" + id + "/" + mode);
		doSpecialIds(id);
	}

	function gotoMode(_mode, set = true) {
		mode = (
			_mode === "editor" ||
			_mode === "fullscreen-editor"
		) ? "editor" : (
			_mode === "fullscreen" ? "fullscreen" : ""
		);
		if (set) playerFunctions.setPlayerMode(mode);
		navigate("/projects/" + projectId + "/" + mode);
	}

	function reduxEvent(e) {
		const action = e.detail.action;
		switch (action.type) {
			case "scratch-gui/mode/SET_FULL_SCREEN":
			case "scratch-gui/mode/SET_PLAYER":
				gotoMode(playerMode, false);
			break;
		}
	}
	function targetAdded() {
		if (["editor", "fullscreen"].includes(mode)) {
			playerMode = mode;
		}
	}

	async function getProject(id) {
		if (!id) return null;

		projectStatus = "loading";
		try {
			const res = await fetch(`${serverUrl}/api/projects/${id}/`, {
				headers: {
					"X-Token": localStorage.getItem("accounttoken") || undefined
				}
			});
			if (res.ok) {
				try {
					const json = await res.json();
					projectStatus = "ok";
					projectTitle = json.title;
					playerFunctions.setProjTitle(projectTitle);
					return json;
				} catch(e) {
					projectStatus = "error";
					console.error(e);
					return null;
				}
			} else {
				if (res.status === 403) {
					projectStatus = "unshared";
				} else {
					projectStatus = "noproject";
				}
				return null;
			}
		} catch(e) {
			try {
				const existRes = await fetch(`${serverUrl}`);
				if (existRes.ok) {
					projectStatus = "projectunavailable";
					return null;
				};
			} catch(e) {
				console.log(e);
				projectStatus = "unavailable";
				return null;
			}
		}
		// just in case
		projectStatus = "error";
		return false;
	}
</script>

<div class="project-page">
	<div class="anarchy-player">
		{#if projectStatus === "notloaded"}
			{#if hide.id}
				<p>No project loaded.</p>
			{:else}
				<p>Load a project ID!</p>
			{/if}
		{:else if projectStatus === "creating"}
			<p>Creating project...</p>
		{:else if projectStatus === "unshared"}
			<p>You need to be logged in as the project's creator to view unshared projects!</p>
		{:else if projectStatus === "invalidid"}
			<p>Invalid project ID!</p>
		{:else if projectStatus === "error"}
			<p>There was an error loading the project. Perhaps try again?</p>
		{:else if projectStatus === "unavailable"}
			<p>Couldn't reach servers. They are probably down or the browser is blocking the requests. Try visiting <a href={serverUrl}>{serverUrl}</a> in your browser and allowing the page to load.</p>
		{:else if projectStatus === "noproject"}
			<p>The project you tried to load doesn't exist.</p>
		{:else if projectStatus === "projectunavailable"}
			<p>Somehow, we couldn't reach the project API but the servers work. What?</p>
		{:else if projectStatus === "loading"}
			<p>Loading...</p>
		{:else if projectStatus === "ok"}
			<div class="controls-container">
				<div class="controls">
					{#if (!hide.name)}
						{#await $authPromise}
							...
						{:then auth}
							<img src="//uploads.scratch.mit.edu/get_image/user/{
								Number(apiData?.author?.scratchId || 0)
							}_48x48.png" alt="">
							<div class="title-name">
								{#if apiData && auth.user && apiData.author?.id === auth.user.id}
									<input
										class="title-input"
										type="text"
										bind:value={projectTitle}
										placeholder="Project title here"
									>
								{:else if apiData}
									<h2>{apiData.title}</h2>
									by {apiData.author?.profile.username || "an unknown user"}
								{/if}
							</div>
						{/await}
					{/if}
					{#if (!hide.seeInside)}
						<button
							on:click={() => {
								gotoMode("editor");
							}}
						>
							See inside
						</button>
					{/if}
				</div>
			</div>
		{/if}

		<div class="player">
			<ProjectPlayer 
				bind:id={projectId}
				bind:reduxStore
				bind:projectTitle
				bind:projectStatus
				bind:playerMode
				bind:functions={playerFunctions}
				on:reduxevent={reduxEvent}
				on:reduxtargetadded={targetAdded}
				{serverUrl}
			/>
		</div>

		{#if !(
			projectStatus === "loading" ||
			projectStatus === "creating"
		)}
			{#if (!hide.id)}
				<input
					class="id-input"
					type="number"
					placeholder="123"
					value={projectId || ""}
					on:keypress={e => {
						const allow = e.metaKey ||
							e.key.length !== 1 ||
							/[+e0-9-]/.test(e.key);
						if (!allow) e.preventDefault();
						return allow;
					}}
					on:change={e => {
						// @ts-ignore
						const id = Number(e.target.value);
						if (!id && id !== 0) return;

						gotoProject(id);
					}}
				>
			{/if}
			{#if (!hide.random)}
				<button on:click={randomProject}>Random</button>
			{/if}
		{/if}
	</div>
</div>

<style>
	.project-page {
		text-align: center;
	}

	.controls-container {
		display: flex;
		justify-content: center;
	}
	.controls {
		display: flex;
		align-items: center;

		min-width: 480px;
	}
	.controls * {
		margin: 3px;
	}

	input, button {
		font-family: inherit;
		color: inherit;
	}

	button {
		border-radius: .25rem;
		padding-top: .6875rem;
		padding-right: .9375rem;
		padding-bottom: .6875rem;
		padding-left: .875rem;
		font-size: .875rem;

		border: none;
		font-weight: bold;
		background-color: #2c6d31;
		color: white;
		cursor: pointer;
	}

	input {
		box-sizing: border-box;
		
		transition: all .5s ease;
		border: 2px dashed #2c6d3140;

		border-radius: 8px;
		background-color: transparent;
		padding: 0 1rem;

		font-size: 1.25rem;

		outline: none;
		margin: 3px;
		min-width: 0;
		padding-top: .20rem;
		padding-bottom: .20rem;
	}
	.title-input {
		font-size: 1.5rem;
	}
	.id-input {
		padding-top: 0.25rem;
		padding-bottom: 0.25rem;
	}
	input:focus {
		box-shadow: 0 0 0 4px #2c6d3140;
		border-color: #2c6d31;
		outline: none;
		border-style: solid;
	}

	input::placeholder {
		font-style: italic;
	}

	.title-name {
		text-align: left;
		flex-grow: 1;
	}
</style>
