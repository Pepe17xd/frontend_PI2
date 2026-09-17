const debug = import.meta.env.DEV || import.meta.env.VITE_DEBUG_PREDICT === "true";

export async function predictBanana(blob) {
  const form = new FormData();
  // El FastAPI desplegado actualmente declara UploadFile con el nombre "image".
  form.append("image", blob, "platano.jpg");

  if (debug) {
    const image = form.get("image");
    console.info("[predict] Enviando multipart", {
      field: "image",
      name: image?.name,
      size: image?.size,
      type: image?.type,
      fields: [...form.keys()],
    });
  }

  const response = await fetch("/api/predict", { method: "POST", body: form });
  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    console.error("[predict] Respuesta no exitosa", { status: response.status, payload });
    throw Error(payload?.error || "API_REQUEST_FAILED");
  }
  if (!payload) throw Error("INVALID_RESPONSE");
  return payload;
}
