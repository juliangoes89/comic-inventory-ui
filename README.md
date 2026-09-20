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
