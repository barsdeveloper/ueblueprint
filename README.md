# UEBlueprint

A stand alone implementation of the UE's Blueprint visual language editor

https://github.com/barsdeveloper/ueblueprint ⭐

https://www.npmjs.com/package/ueblueprint

## Features:

- Intercommunicates with UE (can copy nodes both ways).
- Can be used as a WEB library to visualize and interact with Blueprint graphs.
- Graph shown is pixel-similar to how it appears in UE.
- Graph behaves the same way as it does in UE (with the default settings).
- All the information shown in he graph is just the one embedded in the serialized text.

## Demo:

### [Try it!](https://barsdeveloper.github.io/ueblueprint/)

[![img1](https://github.com/barsdeveloper/ueblueprint/assets/84736467/022704e7-2c9f-4595-9513-cd7770961e0d)](https://barsdeveloper.github.io/ueblueprint/)

## Getting started:

### Run locally
1) Open a terminal in the main folder.
2) Run the following commands.
```sh
npm install
npm run build
npx http-server
```
3) Open the link you see in the last message printed.

### Use in a web page

You can check `index.html` for a working example, the main steps are the following:
1. Make the `dist` directory available in your website by copying it or installing through npm `npm i ueblueprint`.
2. Include `dist/css/ueb-style.min.css` stylesheet in your page.
3. Define eventual CSS variables.
```HTML
<style>
    ueb-blueprint {
        --ueb-height: 500px;
    }
</style>
```
4. Import the class Blueprint in JavaScript (this library uses modules).
```HTML
<script type="module">
    import { Blueprint } from "./dist/ueblueprint.min.js"
</script>
```
5. Define your blueprint by writing the code inside a `template`, inside a `ueb-blueprint` element.
Configuration:
    - Height: `<ueb-blueprint style="--ueb-height: 500px">`
    - Light mode: `<ueb-blueprint class="ueb-light-mode">`
    - Initial zoom: `<ueb-blueprint data-zoom="-4">`
    - Graph type: `<ueb-blueprint data-type="MATERIAL FUNCTION">`
```HTML
<ueb-blueprint>
    <template>
        ...                   
    </template>
</ueb-blueprint>
```
