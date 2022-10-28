import { useState, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';

import { GameBanner } from './components/GameBanner';
import { CreateAdBanner } from './components/CreateAdBanner';

import './styles/main.css';

import logo from './assets/logo-nlw-esports.svg';

import axios from 'axios';

import { CreateAdModal } from './components/CreatAdModal';

interface GamesProps {
    id: string;
    title: string;
    bannerUrl: string;
    _count: {
        ads: number;
    }
}

function App() {
    const [games, setGames] = useState<GamesProps[]>([]);

    useEffect(() => {
        axios('http://localhost:3333/games')
        .then(response => {
            setGames(response.data);
        })
    }, []);

    return (
        <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
            <img src={logo} alt="NLW eSports" />
            <h1 className="text-6xl text-white font-black mt-20"> Seu
                <span className="px-2 bg-nlw-gradient bg-clip-text text-transparent">duo</span> 
                está aqui.
            </h1>
            <div className="grid grid-cols-6 gap-6 mt-16">
                {games.map(game => {
                    return (
                        <GameBanner
                            key={game.id}
                            bannerUrl={game.bannerUrl} 
                            title={game.title} 
                            adCounts={game._count.ads} 
                        />
                    );
                })}
            </div>
            <Dialog.Root>
                <CreateAdBanner />
                <CreateAdModal />
            </Dialog.Root>
        </div>
    );
}

export default App