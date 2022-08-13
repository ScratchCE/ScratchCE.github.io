<script>
	import {Router, Link, Route, navigate} from "svelte-navigator";

	import Home from "./pages/Home.svelte";
	import ProjectPage from "./pages/ProjectPage.svelte";
	import LoggingIn from "./pages/LoggingIn.svelte";

	import logo from "./assets/logo.svg";
	import {authPromise, logOut} from "./lib/auth.js";

	// @ts-ignore
	window._navigate = navigate;
</script>

<Router>
	<div class="app">
		<header class="header">
			<div class="left">
				<div class="header-item">
					<Link to="/">
						<img 
							src={logo}
							alt="Scratch CE Beta"
							class="logo"
						/>
					</Link>
				</div>
				{#await $authPromise}
					{" "}
				{:then d}
					{#if d.user}
						<span class="header-item">
							<Link to="/projects/create/editor">Create</Link>
						</span>
					{/if}
				{/await}
			</div>
			<div class="right">
				{#await $authPromise}
					<span class="header-item">...</span>
				{:then d}
					{#if d.user}
						<button
							href=".#"
							on:click|preventDefault={logOut}
							class="header-item"
						>
							Sign out
						</button>
						<span class="header-item">
							{d.user.username}
							<img
								class="header-pfp"
								src="//uploads.scratch.mit.edu/get_image/user/{
									Number(d.user.scratchId)
								}_48x48.png"
								alt=""
							/>
						</span>
					{:else}
						<a
							class="header-item"
							href="https://auth.itinerary.eu.org/auth?redirect={
								window.btoa(`${location.origin}/auth`)
							}"
						>
							Log in
						</a>
					{/if}
				{:catch}
					<span class="header-item">Error logging in.</span>
				{/await}
			</div>
		</header>
		<main class="content">
			<Route path="/">
				<Home />
			</Route>
			<Route path="projects/*wc" let:params>
				<ProjectPage wc={params.wc}/>
			</Route>
			<Route path="auth">
				<LoggingIn />
			</Route>
			<Route>
				<p>
					We couldn't find the page you were looking for.
					<Link to="/">Here's a link to a page that does exist!</Link>
				</p>
			</Route>
		</main>
		<footer class="footer">
			<p class="footer-paragraph">
				Scratch Community Edition is a Scratch mod made by and for the community of Scratch. JBMC (<a href="https://scratch.mit.edu/users/JoshsAccount">@JoshsAccount</a> on Scratch) started the project, the main coder is <a href="https://github.com/CST1229">CST1229</a> and the main source of ideas is the <a href="https://discord.gg/ARY8zJJ8hQ">Discord server</a>.
			</p>
			<p class="footer-links">
				<a href="https://github.com/ScratchCE">
					Source code
				</a>
				|
				<a href="https://discord.gg/ARY8zJJ8hQ">
					Discord server
				</a>
				|
				<a href="https://scratch.mit.edu/studios/31575642">
					Scratch studio
				</a>
			</p>
			<div class="footer-notes">
				<p>
					Scratch Community Edition is not associated or affiliated with the Scratch website or any of the organizations that maintain it.
					<br />
					By the communities, for the communities. 
				</p>
			</div>
		</footer>
	</div>
</Router>

<style>
	.content, .footer {
		padding: 1em;
		box-sizing: border-box;
	}

	.content {
		min-height: calc(100vh - 13rem);
	}

	.header {
		background-color: #2c6d31;
		color: white;
		height: 3rem;
		padding: 0;
		margin-bottom: 1rem;

		position: sticky;
		top: 0;

		font-weight: bold;

		display: flex;
		align-items: center;
	}
	.header .left {
		display: flex;
		flex-grow: 1;
		flex-shrink: 1;
		align-items: center;
		justify-content: left;
		height: 100%;
	}
	.header .right {
		display: flex;
		align-items: center;
		justify-content: right;
		height: 100%;
	}
	.header img {
		height: 2.25rem;
	}

	.header-item {
		cursor: pointer;
		padding: 0 0.75rem;
		margin: 0 0.25rem;
		height: 100%;
		display: flex;
		align-items: center;
	}
	.header-item:hover {
		background-color: #0f551b;
	}



	:global(button).header-item, :global(a).header-item, .header-item :global(a) {
		appearance: none;
		background: none;
		border: none;
		color: inherit;
		font: inherit;
	}
	.header-pfp {
		margin-left: 0.5rem;
	}

	.footer {
		background-color: #2c6d31;
		color: white;
		margin-top: 1em;
		margin-bottom: -1rem;

		text-align: center;
	}
	.footer-paragraph {
		padding: 0 5em;
	}
	.footer a {
		color: white;
	}
	.footer a:hover {
		color: #f6ab3c;
	}
	.footer-links a {
		margin: 0 0.25em;
	}
	
	.footer-notes {
		font-size: 75%;

		margin: -1rem;
		margin-top: 0;
		padding: 0.25rem;

		background: black;
	}
</style>