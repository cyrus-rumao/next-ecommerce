import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface NavigationControlsProps {
	onPrevious: () => void;
	onNext: () => void;
	canGoPrevious: boolean;
	canGoNext: boolean;
}

export const NavigationControls: React.FC<NavigationControlsProps> = ({
	onPrevious,
	onNext,
	canGoPrevious,
	canGoNext,
}) => (
	<div className="absolute bottom-8 right-8 flex gap-4">
		<button
			className="w-12 h-12 bg-black/80 backdrop-blur-sm border border-yellow-400/50 hover:bg-yellow-400/20 text-yellow-400 hover:text-yellow-300 transition-all duration-300 hover:shadow-[0_0_20px_rgba(234,179,8,0.4)] rounded-full flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-black/80"
			onClick={onPrevious}
			disabled={!canGoPrevious}>
			<ChevronLeft className="w-5 h-5" />
		</button>

		<button
			className="w-12 h-12 bg-black/80 backdrop-blur-sm border border-yellow-400/50 hover:bg-yellow-400/20 text-yellow-400 hover:text-yellow-300 transition-all duration-300 hover:shadow-[0_0_20px_rgba(234,179,8,0.4)] rounded-full flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-black/80"
			onClick={onNext}
			disabled={!canGoNext}>
			<ChevronRight className="w-5 h-5" />
		</button>
	</div>
);
