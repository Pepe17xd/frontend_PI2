# Clasificador Inteligente de Plátanos con IA

Aplicación web móvil para capturar la imagen de un plátano y obtener su clasificación mediante visión artificial y Machine Learning.

## Características

- Diseño profesional, responsive y optimizado para smartphone.
- Acceso a cámara trasera, captura y análisis en un solo flujo.
- Estados claros de espera, procesamiento, resultado y error.
- Visualización adaptable a las respuestas JSON del modelo.
- Endpoint configurable con variables de entorno.

## Tecnologías

- React y Vite
- Web MediaDevices API
- Fetch API y `multipart/form-data`

## Arquitectura

```text
src/
├── components/       # Interfaz reutilizable
├── services/api.js   # Comunicación con el modelo
├── styles/           # Estilos globales
├── App.jsx           # Estado y orquestación
└── main.jsx          # Punto de entrada
```

## Instalación

```bash
npm install
cp .env.example .env
npm run dev
```

En Windows PowerShell: `Copy-Item .env.example .env`.

## Configuración

En `.env`:

```env
VITE_API_URL=http://3.216.17.142:8000
```

La aplicación realiza `POST` a `/predict` y preserva el campo multipart `file` de la integración original.

## Flujo

```text
Cámara → React → API → Modelo ML → Resultado
```

## Producción

```bash
npm run build
```

El resultado se genera en `dist/`, listo para Vercel o Netlify. Configure `VITE_API_URL` también en las variables de entorno del hosting.

## Capturas

_Agregue aquí capturas de la cámara, el procesamiento y el resultado final._

## Licencia

[MIT](LICENSE)
