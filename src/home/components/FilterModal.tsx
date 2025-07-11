import { IGeneroContenidoAudiovisual } from '@/database/generosContenidoAudiovisual';
import { ITipoContenidoAudiovisual } from '@/database/tiposContenidoAudiovisual';
import { Button, ButtonVariant } from '@/src/shared/components/Button';
import { Checkbox } from '@/src/shared/components/Checkbox';
import { TextPressStart2P } from '@/src/shared/components/TextPressStart2P';
import { Colors } from '@/src/shared/constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import {
  Modal,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

/**
 * Estructura de los filtros aplicados en el modal.
 * @interface
 * @property {number[]} types - IDs de los tipos de contenido seleccionados.
 * @property {number[]} genres - IDs de los géneros seleccionados.
 */
interface Filters {
  types: number[];
  genres: number[];
}

/**
 * Propiedades para el componente FilterModal.
 * @interface
 * @property {boolean} visible - Indica si el modal está visible.
 * @property {() => void} onClose - Función para cerrar el modal.
 * @property {(filters: Filters) => void} onApply - Función que se ejecuta al aplicar los filtros.
 * @property {ITipoContenidoAudiovisual[]} contentTypes - Tipos de contenido disponibles para filtrar.
 * @property {IGeneroContenidoAudiovisual[]} genres - Géneros disponibles para filtrar.
 * @property {Filters} activeFilters - Filtros actualmente activos.
 */
interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  onApply: (filters: Filters) => void;
  contentTypes: ITipoContenidoAudiovisual[];
  genres: IGeneroContenidoAudiovisual[];
  activeFilters: Filters;
}

/**
 * Modal para filtrar contenido por tipo y género.
 * Permite seleccionar múltiples tipos y géneros, y aplicar, cancelar o resetear los filtros.
 *
 * @component
 * @param {FilterModalProps} props - Propiedades del componente.
 * @param {boolean} props.visible - Indica si el modal está visible.
 * @param {() => void} props.onClose - Función para cerrar el modal.
 * @param {(filters: Filters) => void} props.onApply - Función que se ejecuta al aplicar los filtros.
 * @param {ITipoContenidoAudiovisual[]} props.contentTypes - Tipos de contenido disponibles.
 * @param {IGeneroContenidoAudiovisual[]} props.genres - Géneros disponibles.
 * @param {Filters} props.activeFilters - Filtros actualmente activos.
 * @returns {JSX.Element} Modal de filtros de contenido.
 *
 * @example
 * <FilterModal
 *   visible={true}
 *   onClose={() => {}}
 *   onApply={(filters) => {}}
 *   contentTypes={tipos}
 *   genres={generos}
 *   activeFilters={{ types: [1], genres: [2] }}
 * />
 */
export const FilterModal: React.FC<FilterModalProps> = ({
  visible,
  onClose,
  onApply,
  contentTypes,
  genres,
  activeFilters,
}) => {
  const [selectedTypes, setSelectedTypes] = React.useState<number[]>(
    activeFilters.types
  );
  const [selectedGenres, setSelectedGenres] = React.useState<number[]>(
    activeFilters.genres
  );

  React.useEffect(() => {
    if (visible) {
      setSelectedTypes(activeFilters.types);
      setSelectedGenres(activeFilters.genres);
    }
  }, [visible, activeFilters]);

  const handleApply = () => {
    onApply({ types: selectedTypes, genres: selectedGenres });
    onClose();
  };

  const handleReset = () => {
    setSelectedTypes([]);
    setSelectedGenres([]);
  };

  const toggleType = (id: number) => {
    setSelectedTypes(prev =>
      prev.includes(id) ? prev.filter(tId => tId !== id) : [...prev, id]
    );
  };

  const toggleGenre = (id: number) => {
    setSelectedGenres(prev =>
      prev.includes(id) ? prev.filter(gId => gId !== id) : [...prev, id]
    );
  };

  return (
    <Modal
      animationType='fade'
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.header}>
            <TextPressStart2P style={styles.modalTitle}>
              Filter Content
            </TextPressStart2P>
            <TouchableOpacity onPress={onClose}>
              <MaterialIcons name='close' size={24} color='white' />
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <TextPressStart2P style={styles.sectionTitle}>
              Content Types
            </TextPressStart2P>
            <View style={styles.checkboxContainer}>
              {contentTypes.map(type => (
                <Checkbox
                  key={type.id}
                  label={type.plural}
                  checked={selectedTypes.includes(type.id)}
                  onPress={() => toggleType(type.id)}
                />
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <TextPressStart2P style={styles.sectionTitle}>
              Genres
            </TextPressStart2P>
            <View style={styles.checkboxContainer}>
              {genres.map(genre => (
                <Checkbox
                  key={genre.id}
                  label={genre.nombre}
                  checked={selectedGenres.includes(genre.id)}
                  onPress={() => toggleGenre(genre.id)}
                />
              ))}
            </View>
          </View>

          <View style={styles.footer}>
            <Button
              onPress={handleReset}
              text='RESET'
              icon='refresh'
              variant={ButtonVariant.GRAY}
            />
            <Button
              onPress={onClose}
              text='CANCEL'
              icon='cancel'
              variant={ButtonVariant.RED}
            />
            <Button
              onPress={handleApply}
              text='APPLY'
              icon='check-circle'
              variant={ButtonVariant.GREEN}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

/**
 * Estilos para el componente FilterModal.
 * @private
 */
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalView: {
    backgroundColor: Colors.fondo,
    borderRadius: 0,
    padding: 20,
    width: Platform.OS === 'web' ? 450 : '90%',
    borderWidth: 2,
    borderColor: Colors.grisOscuro,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: Platform.OS === 'web' ? 24 : 18,
    color: '#FFF',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: Platform.OS === 'web' ? 18 : 16,
    color: Colors.verde,
    marginBottom: 15,
  },
  checkboxContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
    gap: 10,
  },
});
