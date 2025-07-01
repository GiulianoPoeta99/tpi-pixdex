import { Href } from 'expo-router';

/**
 * Rutas principales de la aplicación para navegación.
 * @constant
 * @type {Record<string, Href>}
 * @property {Href} HOME - Ruta de la pantalla principal.
 * @property {Href} DETAIL - Ruta base para la pantalla de detalle.
 * @property {Href} HANG_MAN - Ruta del juego del ahorcado.
 * @property {Href} PIXEL_REVEAL - Ruta del juego Pixel Reveal.
 */
export const ROUTES: Record<string, Href> = {
  HOME: '/',
  DETAIL: '/detail/',
  HANG_MAN: '/hang-man',
  PIXEL_REVEAL: '/pixel-reveal',
};
