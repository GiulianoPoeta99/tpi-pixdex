import { ITipoContenidoAudiovisual, tiposContenidoAudiovisual } from "../data/tiposContenidoAudiovisual";

export class TiposContenidoAudiovisual {
    static getOneByID(id: number): ITipoContenidoAudiovisual {
        const result = tiposContenidoAudiovisual.find(t => t.id === id);
        if (!result) {
            throw new Error(`No ITipoContenidoAudiovisual found with id: ${id}`);
        }
        return result;
    }
}