<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Reglas de calidad y seguridad estática

Antes de dar por terminada cualquier tarea de código en este proyecto, ejecuta:

```bash
npm run lint
npm run lint:security
```

- `npm run lint` incluye ESLint con la configuración de Next.js y las reglas de [`eslint-plugin-security`](https://github.com/eslint-community/eslint-plugin-security).
- `npm run lint:security` ejecuta solo las reglas de seguridad sobre `src`.
- No desactives ni relajes reglas de `eslint-plugin-security` (por ejemplo con `eslint-disable`) para silenciar advertencias; corrige el patrón señalado o justifica la excepción en el mismo commit.
- No ejecutes `npm audit fix`, `npm update` ni actualices dependencias para "resolver" vulnerabilidades automáticamente. Las vulnerabilidades de dependencias se reportan mediante **Dependabot Alerts** de GitHub y su remediación la decide una persona; no crees `.github/dependabot.yml`.
- Mantén el modo estricto de TypeScript; no introduzcas `any` ni `@ts-ignore` para evitar errores del compilador.

Consulta [README.md](README.md) para el detalle de cada herramienta.

## Pruebas unitarias y cobertura

- Toda nueva lógica o corrección debe incluir o actualizar pruebas unitarias relevantes.
- Antes de dar por terminada una tarea, ejecuta `npm run test:coverage` y verifica que la cobertura global sea como mínimo del 80%.
- Si la cobertura queda por debajo del 80%, añade las pruebas necesarias; no reduzcas el umbral ni excluyas código para ocultar la falta de cobertura.
