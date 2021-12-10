import { nodeResolve } from '@rollup/plugin-node-resolve'
import minifyHTML from 'rollup-plugin-minify-html-template-literals'
import commonjs from '@rollup/plugin-commonjs'
import { terser } from 'rollup-plugin-terser'

export default {
    input: 'js/export.js',
    output: {
        file: 'dist/ueblueprint.js',
        format: 'es'
    },
    plugins: [
        nodeResolve({ browser: true }),
        //minifyHTML(),
        commonjs(),
        //terser()
    ]
}