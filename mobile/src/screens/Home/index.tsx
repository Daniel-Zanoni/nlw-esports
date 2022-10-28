import { useState, useEffect } from 'react';
import { Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import { styles } from './styles';

import { Background } from '../../components/Background';
import { Heading } from '../../components/Heading';
import { GameCard, GameCardProps } from '../../components/GameCard';

import logoImg from '../../assets/logo-nlw-esports.png';

export function Home() {

    const navigation = useNavigation();

    const [games, setGames] = useState<GameCardProps[]>([]);

    useEffect(() => {
        fetch('http://192.168.15.2:3333/games')
        .then(response => response.json())
        .then(data => setGames(data))
    }, []);

    function handleOpenGame({id, title, bannerUrl}: GameCardProps) {
        // The second params in function navigate is what is the params?
        navigation.navigate("game", {id, title, bannerUrl});
    }

    return (
       <Background>
            <SafeAreaView style={styles.container}>
                <Image 
                    source={logoImg}
                    style={styles.logo}
                />
                <Heading 
                    title="Encontre seu duo!"
                    subtitle="Selecione o game que deseja jogar..."
                />
                <FlatList 
                    data={games}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => (
                        <GameCard 
                            data={item}
                            onPress={() => handleOpenGame(item)}
                        />
                    )}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    contentContainerStyle={styles.contentList}
                />
            </SafeAreaView>
       </Background>
    );
}