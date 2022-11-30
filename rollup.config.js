import commonjs from "@rollup/plugin-commonjs"
import copy from "rollup-plugin-copy"
import minifyHTML from "rollup-plugin-minify-html-literals"
import resolve from "@rollup/plugin-node-resolve"
import terser from "@rollup/plugin-terser"

export default [
    {
        input: 'js/export.js',
        output: {
            file: 'dist/ueblueprint.js',
            format: 'es'
        },
        plugins: [
            resolve({ browser: true }),
            commonjs(),
            copy({
                targets: [{
                    src: ["assets/fonts/*"],
                    dest: "dist/font"
                }]
            })
        ]
    },
    {
        input: 'js/export.js',
        output: {
            file: 'dist/ueblueprint.min.js',
            format: 'es'
        },
        plugins: [
            resolve({ browser: true }),
            commonjs(),
            minifyHTML({
                minifyCSS: true,
            }),
            terser(),
            copy({
                targets: [{
                    src: ["assets/fonts/*"],
                    dest: "dist/font"
                }]
            })
        ]
    }
]
