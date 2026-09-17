const BACKEND_URL = process.env.BACKEND_URL || "http://3.216.17.142:8000/predict";

export const config = {
  api: {
    bodyParser: false,
  },
};

function readRequestBody(request) {
  return new Promise((resolve, reject) => {
    const chunks = [];

    request.on("data", (chunk) => chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)));
    request.on("end", () => resolve(Buffer.concat(chunks)));
    request.on("error", reject);
  });
}

export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ error: "Método no permitido" });
  }

  const contentType = request.headers["content-type"] || "";
  if (!contentType.toLowerCase().startsWith("multipart/form-data")) {
    return response.status(400).json({ error: "No se recibió ninguna imagen" });
  }

  try {
    // Se conserva el cuerpo multipart original: boundary, metadatos y bytes del archivo.
    const body = await readRequestBody(request);
    if (!body.length || !body.includes(Buffer.from('name="image"'))) {
      return response.status(400).json({ error: "No se recibió ninguna imagen" });
    }

    console.info("[predict proxy] Solicitud recibida", {
      contentType,
      bytes: body.length,
      hasImageField: true,
    });

    const backendResponse = await fetch(BACKEND_URL, {
      method: "POST",
      headers: {
        "content-type": contentType,
        accept: "application/json",
      },
      body,
      signal: AbortSignal.timeout(25_000),
    });

    const result = await backendResponse.json();
    console.info("[predict proxy] Respuesta del backend", { status: backendResponse.status });
    return response.status(backendResponse.status).json(result);
  } catch (error) {
    console.error("Error al comunicarse con la API de clasificación:", error);
    return response.status(502).json({ error: "No se pudo conectar con el modelo" });
  }
}
