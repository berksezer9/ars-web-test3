import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from "@vitejs/plugin-vue";

export default defineConfig({
    plugins: [vue()],
    build: {
        lib: {
            // Could also be a dictionary or array of multiple entry points
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'ars-web-test3',
            // the proper extensions will be added
            fileName: 'index',
            formats: ['es']
        },
        rollupOptions: {
            // make sure to externalize deps that shouldn't be bundled
            // into your library
            external: ['vue', 'pinia', '@kyvg/vue3-notification'],
            output: {
                // Provide global variables to use in the UMD build
                // for externalized deps
                globals: {
                    vue: 'Vue',
                    //@ToDo maybe you should register other dependencies ('pinia', '@kyvg/vue3-notification'), too.
                },
            },
        },
    },
})