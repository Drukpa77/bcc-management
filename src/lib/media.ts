const MAX_DATA_URL = 450_000;

export function normalizeImage(value?: string | null): string | null {
  if (!value) {
    return null;
  }
  if (!value.startsWith("data:image/")) {
    throw new Error("Upload a photo file, not a link.");
  }
  if (value.length > MAX_DATA_URL) {
    throw new Error("That image is still too large. Try a smaller photo.");
  }
  return value;
}

export async function readImageFile(file: File, size = 360): Promise<string> {
  if (!file.type.startsWith("image/")) {
    throw new Error("Choose a PNG, JPG, or WebP image.");
  }
  if (file.size > 8 * 1024 * 1024) {
    throw new Error("Keep the file under 8 MB.");
  }

  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, size / Math.max(bitmap.width, bitmap.height));
  const width = Math.max(1, Math.round(bitmap.width * scale));
  const height = Math.max(1, Math.round(bitmap.height * scale));
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");
  if (!context) {
    throw new Error("Could not prepare that image.");
  }
  context.drawImage(bitmap, 0, 0, width, height);
  return canvas.toDataURL("image/jpeg", 0.82);
}
