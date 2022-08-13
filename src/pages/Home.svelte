<script>
	import Box from "../lib/Box.svelte";
	import Card from "../lib/Card.svelte";
	import {serverUrl} from "../lib/constants.js";
	
	import {onMount} from "svelte";
	import {Link} from "svelte-navigator";

	let latestProjects = null;

	onMount(async () => {
		try {
			const res = await fetch(`${serverUrl}/api/proxy/featured`);
			latestProjects = await res.json();
		} catch(e) {
			console.error("error fetching:", e);
			latestProjects = "error";
		}
	});
</script>

<h1>Home</h1>

<Link to="/projects/">Run a project!</Link>
<Box>
	<h2 slot="title">
		Latest Projects
	</h2>
	{#if latestProjects}
		{#if latestProjects === "error"}
			Error loading latest projects. Please reload the page and try again.
		{:else}
			<div class="card-collection">
				{#each latestProjects.community_newest_projects as project}
					<Card>
						<div class="no-wrap">
							<Link title={project.title} to="/projects/{project.id}">
								{project.title}
							</Link>
						</div>
						<div class="no-wrap">
							by {project.creator || "an unknown user"}
						</div>
					</Card>
				{/each}
			</div>
		{/if}
	{:else}
		Loading...
	{/if}
</Box>

<style>
	.card-collection {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(12em, 1fr));
		grid-gap: 1em;
	}

	.no-wrap {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>