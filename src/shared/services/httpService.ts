/**
 * Configuración por defecto para las peticiones HTTP.
 * @constant
 */
const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
};

/**
 * Interfaz para las opciones de petición HTTP.
 * @interface
 */
interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: any;
  signal?: AbortSignal;
}

/**
 * Interfaz para la respuesta HTTP personalizada.
 * @interface
 */
interface ApiResponse<T> {
  data: T;
  status: number;
  ok: boolean;
  error?: string;
}

/**
 * Clase para manejar las peticiones HTTP a la API.
 * Proporciona métodos para realizar peticiones GET, POST, PUT, DELETE y PATCH.
 *
 * @class
 */
export class HttpService {
  /**
   * Realiza una petición HTTP genérica.
   * @param {string} url - URL de la petición.
   * @param {RequestOptions} options - Opciones de la petición.
   * @returns {Promise<ApiResponse<T>>} Respuesta de la API.
   */
  private static async request<T>(
    url: string,
    options: RequestOptions = {}
  ): Promise<ApiResponse<T>> {
    const { method = 'GET', headers = {}, body, signal } = options;

    try {
      const response = await fetch(url, {
        method,
        headers: {
          ...DEFAULT_HEADERS,
          ...headers,
        },
        body: body ? JSON.stringify(body) : undefined,
        signal,
      });

      const data = await response.json();

      return {
        data,
        status: response.status,
        ok: response.ok,
        error: !response.ok
          ? `HTTP ${response.status}: ${response.statusText}`
          : undefined,
      };
    } catch (error) {
      return {
        data: null as T,
        status: 0,
        ok: false,
        error: error instanceof Error ? error.message : 'Error desconocido',
      };
    }
  }

  /**
   * Realiza una petición GET.
   * @param {string} url - URL de la petición.
   * @param {RequestOptions} options - Opciones adicionales.
   * @returns {Promise<ApiResponse<T>>} Respuesta de la API.
   */
  static async get<T>(
    url: string,
    options?: Omit<RequestOptions, 'method'>
  ): Promise<ApiResponse<T>> {
    return this.request<T>(url, { ...options, method: 'GET' });
  }

  /**
   * Realiza una petición POST.
   * @param {string} url - URL de la petición.
   * @param {any} body - Cuerpo de la petición.
   * @param {RequestOptions} options - Opciones adicionales.
   * @returns {Promise<ApiResponse<T>>} Respuesta de la API.
   */
  static async post<T>(
    url: string,
    body: any,
    options?: Omit<RequestOptions, 'method' | 'body'>
  ): Promise<ApiResponse<T>> {
    return this.request<T>(url, { ...options, method: 'POST', body });
  }

  /**
   * Realiza una petición PUT.
   * @param {string} url - URL de la petición.
   * @param {any} body - Cuerpo de la petición.
   * @param {RequestOptions} options - Opciones adicionales.
   * @returns {Promise<ApiResponse<T>>} Respuesta de la API.
   */
  static async put<T>(
    url: string,
    body: any,
    options?: Omit<RequestOptions, 'method' | 'body'>
  ): Promise<ApiResponse<T>> {
    return this.request<T>(url, { ...options, method: 'PUT', body });
  }

  /**
   * Realiza una petición DELETE.
   * @param {string} url - URL de la petición.
   * @param {RequestOptions} options - Opciones adicionales.
   * @returns {Promise<ApiResponse<T>>} Respuesta de la API.
   */
  static async delete<T>(
    url: string,
    options?: Omit<RequestOptions, 'method'>
  ): Promise<ApiResponse<T>> {
    return this.request<T>(url, { ...options, method: 'DELETE' });
  }

  /**
   * Realiza una petición PATCH.
   * @param {string} url - URL de la petición.
   * @param {any} body - Cuerpo de la petición.
   * @param {RequestOptions} options - Opciones adicionales.
   * @returns {Promise<ApiResponse<T>>} Respuesta de la API.
   */
  static async patch<T>(
    url: string,
    body: any,
    options?: Omit<RequestOptions, 'method' | 'body'>
  ): Promise<ApiResponse<T>> {
    return this.request<T>(url, { ...options, method: 'PATCH', body });
  }
}
