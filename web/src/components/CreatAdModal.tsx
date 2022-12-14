import { useEffect, useState, FormEvent } from 'react';
import axios from 'axios';

import { Check, GameController } from 'phosphor-react';
import { Input } from './Form/Input';

import * as Dialog from '@radix-ui/react-dialog';
import * as Checkbox from '@radix-ui/react-checkbox';
import * as ToggleGroup from '@radix-ui/react-toggle-group';

interface GamesProps {
    id: string;
    title: string;
}

export function CreateAdModal() {
    const [games, setGames] = useState<GamesProps[]>([]);
    const [weekDays, setWeekDays] = useState<string[]>(['1']);
    const [useVoiceChannel, setUseVoiceChannel] = useState(false);

    useEffect(() => {
        axios('http://localhost:3333/games')
        .then(response => {
            setGames(response.data)
        });
    }, []);

    async function handleCreateAd(event: FormEvent) {
        event.preventDefault();
        
        const formData = new FormData(event.target as HTMLFormElement);
        const data = Object.fromEntries(formData);

        if (!data.name) {
            return;
        }

        try {
            await axios.post(`http://localhost:3333/games/${data.game}/ads`, {
                name: data.name,
                yearsPlaying: Number(data.yearsPlaying),
                discord: data.discord,
                weekDays: weekDays.map(Number),
                hourStart: data.hourStart,
                hourEnd: data.hourEnd,
                useVoiceChannel: useVoiceChannel,
            })
            alert('Anúncio criado com successo')
        }   catch (err) {
                alert('Erro ao criar o anúncio');
                console.log(err);
        }
    }

    return(
        <Dialog.Portal>
            <Dialog.Overlay className="bg-black/60 inset-0 fixed" />
            <Dialog.Content className="fixed bg-[#1f1f24] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-black/25">
                <Dialog.Title className="text-2xl font-black">Publique um anúncio</Dialog.Title>
                <form onSubmit={handleCreateAd} className="mt-8 flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="game" className="font-semibold tracking-[-0.018px]">Qual o game?</label>
                        <select 
                            id="game"
                            name="game"
                            className="bg-zinc-900 py-3 px-4 rounded text-sm appearance-none"
                            defaultValue=""
                        >
                            <option disabled value="">Selecione o game que deseja jogar</option>
                            {games.map(game => {
                                return <option key={game.id} value={game.id}>{game.title}</option>
                            })}
                        </select>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="name" className="font-semibold tracking-[-0.018px]">Seu nome (ou nickname)</label>
                        <Input name="name" id="name" placeholder="Como te chamam dentro do game?" />
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="yearsPlaying" className="font-semibold tracking-[-0.018px]">Joga há quantos anos?</label>
                            <Input name="yearsPlaying" id="yearsPlaying" type="number" placeholder="Tudo bem ser ZERO" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="discord" className="font-semibold tracking-[-0.018px]">Qual seu Discord?</label>
                            <Input name="discord" id="discord" placeholder="Usuario#0000" />
                        </div>
                    </div>
                    <div className="flex gap-6">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="weekDays" className="font-semibold tracking-[-0.018px]">Quando costuma jogar?</label>
                            <ToggleGroup.Root 
                                type="multiple" 
                                className="grid grid-cols-4 gap-2"
                                value={weekDays}
                                onValueChange={setWeekDays}
                            >
                                <ToggleGroup.Item
                                    value="0"
                                    title="Domingo"
                                    className={`rounded ${weekDays.includes('0') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                >
                                    D
                                </ToggleGroup.Item>
                                <ToggleGroup.Item 
                                    value="1"
                                    title="Segunda"
                                    className={`rounded ${weekDays.includes('1') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                >
                                    S
                                    </ToggleGroup.Item>
                                <ToggleGroup.Item
                                    value="2" 
                                    title="Terça"
                                    className={`rounded ${weekDays.includes('2') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                >
                                    T
                                </ToggleGroup.Item>
                                <ToggleGroup.Item 
                                    value="3"
                                    title="Quarta"
                                    className={`rounded ${weekDays.includes('3') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                >
                                    Q
                                </ToggleGroup.Item>
                                <ToggleGroup.Item 
                                    value="4"
                                    title="Quinta"
                                    className={`rounded ${weekDays.includes('4') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                >
                                    Q
                                </ToggleGroup.Item>
                                <ToggleGroup.Item
                                    value="5"
                                    title="Sexta"
                                    className={`rounded ${weekDays.includes('5') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                >
                                    S
                                </ToggleGroup.Item>
                                <ToggleGroup.Item 
                                    value="6"
                                    title="Sábado"
                                    className={`rounded ${weekDays.includes('6') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                >
                                    S
                                </ToggleGroup.Item>
                            </ToggleGroup.Root>
                        </div>
                        <div className="flex flex-col gap-2 flex-1">
                            <label htmlFor="hourStart" className="font-semibold tracking-[-0.018px]">Qual horário do dia</label>
                            <div className="grid grid-cols-2 gap-2">
                                <Input name="hourStart" id="hourStart" type="time" placeholder="De" />
                                <Input name="hourEnd" id="hourEnd" type="time" placeholder="Até" />
                            </div>
                        </div>
                    </div>
                    <label className="mt-2 flex items-center gap-2 text-sm">
                        <Checkbox.Root
                            checked={useVoiceChannel}
                            onCheckedChange={checked => {
                                if(checked === true) {
                                    setUseVoiceChannel(true);
                                } else {
                                    setUseVoiceChannel(false);
                                }
                            }}
                            className="w-6 h-6 p-1 rounded bg-zinc-900"
                        >
                            <Checkbox.Indicator>
                                <Check className="w-4 h-4 text-emerald-400" />
                            </Checkbox.Indicator>
                        </Checkbox.Root>
                        <p className="tracking-[-0.09px]">Costumo me conectar ao chat de voz</p>
                    </label>
                    <footer className="mt-4 flex justify-end gap-4">
                        <Dialog.Close 
                            type="button" 
                            className="bg-zinc-500 px-5 h-10 rounded-md font-semibold hover:bg-zinc-600"
                        >
                            Cancelar
                        </Dialog.Close>
                        <button 
                            type="submit"
                            className="bg-violet-500 px-5 h-10 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600"
                        >
                            <GameController className="w-6 h-6" />
                            Encontrar duo
                        </button>
                    </footer>
                </form>
            </Dialog.Content>
        </Dialog.Portal>
    );
}