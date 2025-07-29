import { defineNuxtModule } from 'nuxt/kit'

export default defineNuxtModule({
  meta: {
    name: 'mcp',
  },
  async setup(options, nuxt) {
    nuxt.hook('mcp:setup', ({ mcp }) => {
      // Setup your MCP tools here
      // For example
      mcp.tool('get-nuxt-root', 'Get the Nuxt root path', {}, async () => {
        return {
          content: [{
            type: 'text',
            text: nuxt.options.rootDir,
          }],
        }
      })
    })
  },
})
