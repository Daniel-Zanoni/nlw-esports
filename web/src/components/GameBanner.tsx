interface GameBannerProps {
    bannerUrl: string;
    title: string;
    adCounts: number;
}

export function GameBanner({ bannerUrl, title, adCounts } : GameBannerProps) {
    return (
        <a href="#" className="relative rounded-md overflow-hidden">
            <img src={bannerUrl} alt="" />
            <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0">
                <strong className="font-bold text-white block">{title}</strong>
                <span className="text-sm text-zinc-300 block">{adCounts} anúncio(s)</span>
            </div>
        </a>
    );
}