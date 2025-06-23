export function capitalize(texto: string): string {
  return texto.length === 0
    ? ""
    : texto[0].toUpperCase() + texto.slice(1).toLowerCase();
}

export function normalizeString(str: string): string {
  if (!str) return "";

  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remover acentos
    .replace(/[^\w\s]/g, "") // Remover caracteres especiales excepto espacios y letras/números
    .replace(/\s+/g, " ") // Normalizar espacios múltiples a uno solo
    .trim(); // Remover espacios al inicio y final
}
