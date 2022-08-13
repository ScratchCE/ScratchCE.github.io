import {serverUrl} from "./constants.js";
import {writable} from "svelte/store";

let expireTime = null;

export function auth() {
	return new Promise(async (res, rej) => {
		expireTime = null;
		try {
			const authReq = await fetch(
				serverUrl + "/session",
				{
					headers: {
						"X-Token": localStorage.getItem("accounttoken") || undefined
					}
				}
			);
			const olve = await authReq.json();
			if (olve.session) {
				expireTime = olve.session.expires;
			} else {
				localStorage.removeItem("accounttoken");
			}
			res(olve);
		} catch (ect) {
			rej(ect);
		}
	});
}
export function logOut() {
	expireTime = null;
	localStorage.removeItem("accounttoken");
	authPromise.set(auth());
}
export const authPromise = writable(auth());


window.setInterval(checkExpire, 10000);
function checkExpire() {
	if (!expireTime) return;
	if (expireTime < Date.now()) logOut();
}
checkExpire();