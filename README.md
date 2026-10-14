# Comic Inventory UI

Interfaz web construida con [Next.js](https://nextjs.org). Requiere una versión de Node.js compatible con Next.js 16.

## Desarrollo

Instala las dependencias y arranca el servidor local:

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) para usar la aplicación.

## Análisis estático de seguridad

El proyecto integra [`eslint-plugin-security`](https://github.com/eslint-community/eslint-plugin-security) con las reglas recomendadas. Detecta patrones potencialmente inseguros, como el uso de `eval`, expresiones regulares no seguras, carga dinámica de módulos y acceso a rutas de archivos no literales.

Ejecuta el análisis de seguridad del código de la aplicación:

```bash
npm run lint:security
```

El lint habitual también incluye estas reglas y revisa todo el proyecto:

```bash
npm run lint
```

Los hallazgos del plugin se muestran como advertencias para facilitar su revisión. Ninguno de estos comandos modifica el código ni actualiza dependencias.

## Alertas de vulnerabilidades de dependencias

Las vulnerabilidades conocidas de dependencias se notifican con **Dependabot Alerts** de GitHub. Para activarlas en el repositorio remoto:

1. Abre el repositorio en GitHub y ve a **Settings**.
2. Abre **Code security and analysis**.
3. Habilita **Dependabot alerts**.
4. Mantén deshabilitado **Dependabot security updates**.

No se incluye un archivo `.github/dependabot.yml`, ya que ese mecanismo programa actualizaciones y puede abrir pull requests de actualización. Con la configuración anterior GitHub muestra las vulnerabilidades en la pestaña **Security** sin aplicar correcciones ni crear actualizaciones automáticas.

## Pruebas unitarias

Para ejecutar la suite de pruebas del proyecto en modo interactivo:

```bash
npm run test
```

Para lanzarlas una sola vez y obtener el resultado final de la ejecución:

```bash
npm run test:run
```

Para ejecutar la suite con reporte de cobertura de código:

```bash
npm run test:coverage
```

Este comando ejecuta Vitest en modo no interactivo y genera un informe de cobertura en la carpeta `coverage` con salida en consola, HTML y LCOV. También permite comprobar qué ficheros tienen cobertura parcial o ausente.

## Verificación de producción

Para compilar la aplicación:

```bash
npm run build
```

## Integración continua (CI)

El workflow [.github/workflows/ci.yml](.github/workflows/ci.yml) se ejecuta en cada push a `main` y en cada pull request dirigido a `main`. Cada paso es un job independiente:

| Job | Comando | Bloqueante |
| --- | --- | --- |
| Lint | `npm run lint` | No |
| Análisis de seguridad | `npm run lint:security` | No |
| Análisis de dependencias | `npm audit --audit-level=high` | No |
| Pruebas unitarias | `npm run test:run` | Sí |
| Coverage (mínimo 80%) | `npm run test:coverage` | Sí |
| Build | `npm run build` | Sí (requiere pruebas y coverage) |

Los jobs no bloqueantes usan `continue-on-error`: si fallan, el pipeline continúa y el resultado queda visible en GitHub Actions. El umbral de cobertura del 80% (líneas, funciones, ramas y sentencias) está definido en `vitest.config.ts`. El reporte de cobertura se publica como artefacto `coverage`.

## Despliegue continuo (CD)

El workflow [.github/workflows/cd.yml](.github/workflows/cd.yml) despliega la aplicación en Azure App Service (`comic-inventory-ui`, grupo de recursos `ComicInventory-rg`). Se ejecuta cuando el workflow CI termina con éxito en `main`, o manualmente con `workflow_dispatch`.

1. **Build:** compila con `output: "standalone"` y `NEXT_PUBLIC_API_URL` apuntando al backend desplegado, y genera el paquete.
2. **Deploy:** publica el paquete en el entorno `production` con `azure/webapps-deploy`.

Configuración necesaria:

- Secret `AZURE_WEBAPP_PUBLISH_PROFILE` en GitHub (Settings → Secrets and variables → Actions), con el contenido del perfil de publicación descargado desde Azure Portal.
- Startup Command del App Service: `node server.js`.
- CORS del backend habilitado para `https://comic-inventory-ui.azurewebsites.net`.
