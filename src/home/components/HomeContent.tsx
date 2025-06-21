import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { ITipoContenidoAudiovisual } from '@/database/tiposContenidoAudiovisual';
import { HomeHeader } from './HomeHeader';
import { GameButtonsContainer } from './GameButtonsContainer';
import { ContentListsContainer } from './ContentListsContainer';

interface HomeContentProps {
    onFilterPress: () => void;
    contentTypes: ITipoContenidoAudiovisual[];
    genreFilters: number[];
}

export const HomeContent: React.FC<HomeContentProps> = ({ 
    onFilterPress, 
    contentTypes, 
    genreFilters 
}) => {
    return (
        <ScrollView style={styles.scrollView}>
            <HomeHeader onFilterPress={onFilterPress} />
            <GameButtonsContainer />
            <ContentListsContainer 
                contentTypes={contentTypes} 
                genreFilters={genreFilters} 
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
    },
}); 