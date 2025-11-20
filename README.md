# React Boiler Plate

Proyecto base para aplicaciones web desarrolladas con React, TypeScript y Vite.

## Descripción

Este es un proyecto boilerplate que proporciona una configuración mínima para comenzar a desarrollar aplicaciones React con TypeScript utilizando Vite como herramienta de construcción. Incluye Hot Module Replacement (HMR) y reglas de ESLint configuradas.

## Requisitos previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (versión 18 o superior)
- **npm** (viene incluido con Node.js)

Puedes verificar las versiones instaladas ejecutando:

```bash
node --version
npm --version
```

## Instalación

1. Clona o descarga este repositorio
2. Instala las dependencias del proyecto:

```bash
npm install
```

## Comandos disponibles

### Desarrollo

Inicia el servidor de desarrollo con Hot Module Replacement:

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173/`

### Construcción

Compila el proyecto para producción:

```bash
npm run build
```

Los archivos optimizados se generarán en la carpeta `dist/`.

### Vista previa

Previsualiza la versión de producción localmente:

```bash
npm run preview
```

### Linting

Ejecuta el linter para verificar el código:

```bash
npm run lint
```

## Estructura del proyecto

```
react-boiler-plate/
├── public/          # Archivos estáticos públicos
├── src/            # Código fuente de la aplicación
│   ├── assets/     # Recursos como imágenes, iconos, etc.
│   ├── App.tsx     # Componente principal de la aplicación
│   ├── App.css     # Estilos del componente App
│   ├── main.tsx    # Punto de entrada de la aplicación
│   └── index.css   # Estilos globales
├── index.html      # Plantilla HTML principal
├── package.json    # Dependencias y scripts del proyecto
├── tsconfig.json   # Configuración de TypeScript
├── vite.config.ts  # Configuración de Vite
└── README.md       # Este archivo
```

## Tecnologías utilizadas

- **React** (^19.2.0) - Biblioteca para construir interfaces de usuario
- **TypeScript** (~5.9.3) - Superset de JavaScript con tipado estático
- **Vite** (^7.2.2) - Herramienta de construcción y servidor de desarrollo
- **ESLint** - Linter para mantener la calidad del código

## Características

- ⚡ Desarrollo rápido con Vite
- 🔥 Hot Module Replacement (HMR)
- 📦 TypeScript configurado
- 🎯 ESLint configurado con reglas para React
- 🚀 Optimizado para producción

## Desarrollo

Este proyecto utiliza Vite como bundler, lo que proporciona:

- Inicio instantáneo del servidor de desarrollo
- Hot Module Replacement (HMR) ultrarrápido
- Optimizaciones automáticas para producción
- Soporte nativo para TypeScript

## Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.
