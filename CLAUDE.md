# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A Nuxt 3-based account management system for Weila (likely a corporate account/service management platform). The application is built as a static SPA with client-side routing and API integration.

## Key Architecture Details

- **Framework**: Nuxt 3 with Vue 3 Composition API
- **UI Library**: Arco Design Vue
- **Styling**: UnoCSS with custom configuration
- **State Management**: Pinia
- **Form Validation**: Valibot with zod-arco-rules integration
- **Build Target**: Static SPA (ssr: false, nitro preset: 'static')

## Standards

- Using UnoCSS with unocss attributify preset, write style as short as possible
- ALWAYS use UnoCSS classes rather than manual CSS
- DO NOT hard code colors, use Tailwind's color system
- ONLY add meaningful comments that explain why something is done, not what it does
- Dev server is already running on http://localhost:3000 with HMR enabled. NEVER launch it yourself
- ALWAYS use named functions when declaring methods, use arrow functions only for callbacks
- ALWAYS prefer named exports over default exports

#### UnoCSS Examples

Bad:

```vue
<script setup lang="ts">
<div id="card" class="mx-auto my-2 overflow-scroll flex justify-around items-center" style="z-index: 1000" />
</script>

<style>
#card {

}
</style>
```

Good:

```vue
<script setup lang="ts">
<div mxa my2 of-scroll flex="~ justify-around items-center" z-1000 />
</script>
```

## Research & Documentation

NEVER hallucinate or guess URLs
ALWAYS try accessing the llms.txt file first to find relevant documentation. EXAMPLE: https://pinia-colada.esm.dev/llms.txt
If it exists, it will contain other links to the documentation for the LLMs used in this project
ALWAYS follow existing links in table of contents or documentation indices
Verify examples and patterns from documentation before using

## API Integration

- **Base API**: Uses `@weila/network` package for API calls
- **Authentication**: Token-based auth stored in localStorage with automatic redirect on auth errors
- **Proxy Configuration**:
  - `/v1/**` routes proxied to `https://demo.weila.hk/v1/**`
  - `/v2` routes proxied via vite dev server with SSL certificate ignoring for local development

## Key Directories and Files

- `app/` - Main application code
  - `composables/` - Vue composables (useWeilaApi, useForm, etc.)
  - `pages/` - File-based routing structure
  - `types/` - TypeScript type definitions
  - `utils/` - Utility functions
- `shared/` - Shared constants and state
- `styles/` - Global CSS styles

## Authentication Flow

- Global middleware checks for token in localStorage
- Redirects to `/login` if no token found (unless route is marked as public)
- Automatic logout on auth error via useWeilaApi composable

## Form System

- Uses custom `useForm` composable with Valibot schema validation
- Integrates with Arco Design form components via zod-arco-rules
- Supports reactive form reset and validation rules generation

## Environment Configuration

- Development API endpoint: `https://demo.weila.hk` (configurable in nuxt.config.ts)
- Static build with hash-based routing enabled
- Cross-origin requests allowed via proxy configuration
