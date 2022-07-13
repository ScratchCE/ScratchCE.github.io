# Scratch CE Anarchy Player

A rebuild of the SCE anarchy player from the ground up, made with Svelte.

Note: This is still unfinished, so some things from the current version (like #random and the ?no-* parameters) are still missing.

## Developing

Requirements:
- node.js and npm or some other package manager
- git (optional, for cloning the repo)
- Preferably understanding of JavaScript and node.js, among ~~us~~ other things

To clone and run a development server on your machine (that autoupdates when you modify files):

```
git clone https://github.com/ScratchCE/ScratchCE.github.io.git
cd ScratchCE.github.io
npm install
npm run dev
```

For one-time building:

```
npm run build
```

(Note: A GitHub Action will usually do this for you when you push to the repo.)

------

Relevant bit of information from the original readme:

> ## Recommended IDE Setup
> [VS Code](https://code.visualstudio.com/) + [Svelte](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode).
