/// <reference types="vite/client" />

// Without this the editor flags every `import './style.css'` and the
// fontsource imports as untyped modules. Vite handles them fine at build
// time, this just tells TypeScript the same thing.
