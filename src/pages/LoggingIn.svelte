<script>
	import {auth, authPromise} from "../lib/auth.js";
	import {serverUrl} from "../lib/constants.js";

	let loginStatus = "";

	const searchParams = new URLSearchParams(location.search.substring(1));

	const privateCode = searchParams.get("privateCode");
	if (privateCode) {
		logIn();
	} else {
		loginStatus = "No private code found. What brought you here?"
	}

	async function logIn() {
		loginStatus = "Logging in...";

		let req, json;
		try {
			req = await fetch(serverUrl + "/session", {
				method: "POST",
				headers: {"Content-Type": "application/json"},
				body: JSON.stringify({
					privateCode,
				}),
			});
			json = await req.json();
		} catch (e) {
			loginStatus = "Error logging in. The servers might be down.";
			return;
		}
		if (!(json.success && req.ok)) {
			loginStatus = "Error logging in. Try again.";
			return;
		}
		localStorage.setItem("accounttoken", json.token);

		loginStatus = "Login successful.";

		authPromise.set(auth());
	}
</script>

<h2>Login</h2>
<p>{loginStatus}</p>