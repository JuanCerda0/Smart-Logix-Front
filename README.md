# SmartLogix Front

Frontend de SmartLogix construido con SvelteKit, Svelte 5, TypeScript y Vite. La aplicacion incluye paginas publicas, autenticacion basica desde formularios y un catalogo de productos que consume una API externa.

## Contenido actual

- Pagina de inicio con topbar, secciones informativas y carrusel vertical.
- Paginas publicas: inicio, productos, nosotros y contacto.
- Formularios de login y registro.
- Catalogo de productos con carga desde backend.
- Servicios HTTP para autenticacion y productos.
- Estilos globales y assets de marca en `src/lib/assets`.
- Dockerfile para ejecutar el frontend como aplicacion SvelteKit con `adapter-node`.

## Requisitos

- Node.js 22 recomendado.
- npm.
- Docker, opcional para ejecutar el proyecto containerizado.
- Backend disponible para las rutas `/api/auth` y `/api/products`.

## Configuracion

El frontend usa la variable publica `PUBLIC_API_URL` para saber donde esta el backend.

Ejemplo:

```sh
PUBLIC_API_URL=http://localhost:8080/api
```

Si no se define, el proyecto usa por defecto:

```sh
http://localhost:8080/api
```

El backend debe permitir CORS desde el origen donde corre el frontend, por ejemplo `http://localhost:5173` en desarrollo o `http://localhost:3000` en Docker.

## Ejecutar en desarrollo

Instala dependencias:

```sh
npm install
```

Levanta el servidor de desarrollo:

```sh
PUBLIC_API_URL=http://localhost:8080/api npm run dev
```

La app quedara disponible normalmente en:

```sh
http://localhost:5173
```

## Build local

Para compilar una version de produccion:

```sh
npm run build
```

Para revisar el build localmente:

```sh
npm run preview
```

## Ejecutar con Docker

Construye la imagen:

```sh
docker build -t smartlogix-front .
```

Ejecuta el contenedor:

```sh
docker run --rm -p 5173:5173 \
  -e PUBLIC_API_URL=http://localhost:8080/api \
  smartlogix-front
```

La app quedara disponible en:

```sh
http://localhost:3000
```

Si el backend tambien corre en Docker, `PUBLIC_API_URL` debe apuntar a una URL accesible desde el navegador. En desarrollo local, normalmente conviene publicar el backend al host y usar `http://localhost:8080/api`.

## Scripts disponibles

- `npm run dev`: inicia Vite en modo desarrollo.
- `npm run build`: genera el build de produccion.
- `npm run preview`: sirve el build generado para pruebas locales.
- `npm run check`: ejecuta validaciones de Svelte y TypeScript.
- `npm run lint`: ejecuta Prettier en modo check y ESLint.
- `npm run test`: ejecuta las pruebas con Vitest.
- `npm run format`: formatea el codigo.

## Estructura principal

```txt
src/
  routes/                         Paginas de SvelteKit
  lib/assets/                     CSS global e imagenes
  lib/components/auth/            Formularios de login y registro
  lib/components/common/          Componentes reutilizables
  lib/components/layout/TopBar/   Barra de navegacion
  lib/components/products/        Componentes de productos
  lib/components/services/        Clientes HTTP para backend
  lib/components/types/           DTOs TypeScript
static/                           Archivos estaticos publicos
Dockerfile                        Imagen de produccion
.dockerignore                     Exclusiones del contexto Docker
```

## Notas

- El frontend consume productos desde `${PUBLIC_API_URL}/products`.
- El login usa `${PUBLIC_API_URL}/auth/login`.
- El registro usa `${PUBLIC_API_URL}/auth/signup`.
- Los tokens se leen desde `localStorage` con la clave `token` para agregar el header `Authorization`.
