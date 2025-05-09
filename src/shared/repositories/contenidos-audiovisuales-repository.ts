import { ContenidoAudiovisual, contenidosAudiovisuales } from "../data/contenidosAudiovisuales";
import { IGeneroContenidoAudiovisual, generosContenidoAudiovisual } from "../data/generosContenidoAudiovisual";

export class ContenidoAudiovisualRepository {
    static getOneByID(id: number): ContenidoAudiovisual {
        const contenido = contenidosAudiovisuales.find(item => item.id === id);
        if (!contenido) {
            throw new Error(`ContenidoAudiovisual with id ${id} not found`);
        }
        return contenido;
    }
    static getAllByTipoID(tipoID: number): ContenidoAudiovisual[] {
        return contenidosAudiovisuales.filter(item => item.tipoId === tipoID);
    }

    static getAllGendersForContenidoAudiovisual(item: ContenidoAudiovisual): IGeneroContenidoAudiovisual[] {

        return item.generos
            .map(id => generosContenidoAudiovisual.find(g => g.id === id))
            .filter((genero): genero is IGeneroContenidoAudiovisual => genero !== undefined);
    }
}