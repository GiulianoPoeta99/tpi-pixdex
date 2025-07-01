/**
 * Capitaliza la primera letra de un texto y pone el resto en minúsculas.
 * @param {string} texto - Texto a capitalizar.
 * @returns {string} Texto capitalizado.
 *
 * @example
 * capitalize("acción") // "Acción"
 */
export function capitalize(texto: string): string {
  return texto.length === 0
    ? ''
    : texto[0].toUpperCase() + texto.slice(1).toLowerCase();
}

/**
 * Normaliza un string eliminando acentos, signos de puntuación y espacios extra.
 * @param {string} str - Cadena a normalizar.
 * @returns {string} Cadena normalizada.
 *
 * @example
 * normalizeString("Café!  ") // "Cafe"
 */
export function normalizeString(str: string): string {
  if (!str) return '';

  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}
