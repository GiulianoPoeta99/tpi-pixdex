import { generosContenidoAudiovisual, IGeneroContenidoAudiovisual } from "../data/generosContenidoAudiovisual";

export class GenerosContenidoAudiovisualRepository {
    static getAll(): IGeneroContenidoAudiovisual[] {
        return generosContenidoAudiovisual;
    }
} 