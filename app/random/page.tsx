'use client';
import React, { useState, useEffect, useRef } from 'react';

const TimelineSection = ({
	title,
	subtitle,
	description,
	isVisible,
	delay,
}) => (
	<div
		className={`transition-all duration-700 transform ${
			isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
		}`}
		style={{ transitionDelay: `${delay}ms` }}>
		<div className="text-center mb-6">
			<h3 className="font-bold text-2xl text-white">{title}</h3>
			<p className="mt-2 text-amber-400 font-semibold text-base">{subtitle}</p>
		</div>
		<div className="max-w-xs mx-auto text-gray-300 text-sm leading-relaxed text-center">
			<p>{description}</p>
		</div>
	</div>
);

const AnimatedTimeline = () => {
	const [currentPage, setCurrentPage] = useState(0);
	const [hasMounted, setHasMounted] = useState(false);
	const [focusedCardIndex, setFocusedCardIndex] = useState(0);
	const [progressWidth, setProgressWidth] = useState('0px');
	const dotRefs = useRef([]);

	const SECTIONS_PER_PAGE = 3;

	const sections = [
		{
			title: '3 Months',
			subtitle: 'MAY - JUNE 2018',
			description: 'Identify and approach influencers...',
		},
		{
			title: '6 Months',
			subtitle: 'JUNE - OCTOBER 2018',
			description: 'Marketing continues to promote...',
		},
		{
			title: '1 Year',
			subtitle: 'NOVEMBER 2018',
			description: 'Global legal review of all business...',
		},
		{
			title: '1 Year 3 Months',
			subtitle: 'FEBRUARY 2019',
			description: 'Advanced product development...',
		},
		{
			title: '1 Year 6 Months',
			subtitle: 'MAY 2019',
			description: 'Strategic partnerships establishment...',
		},
		{
			title: '1 Year 9 Months',
			subtitle: 'AUGUST 2019',
			description: 'Technology infrastructure scaling...',
		},
		{
			title: '2 Years',
			subtitle: 'NOVEMBER 2019',
			description: 'Market leadership consolidation...',
		},
		{
			title: '2 Years 3 Months',
			subtitle: 'FEBRUARY 2020',
			description: 'International expansion acceleration...',
		},
		{
			title: '2 Years 6 Months',
			subtitle: 'MAY 2020',
			description: 'Digital transformation initiatives...',
		},
		{
			title: '2 Years 9 Months',
			subtitle: 'AUGUST 2020',
			description: 'Sustainability initiatives launch...',
		},
		{
			title: '3 Years',
			subtitle: 'NOVEMBER 2020',
			description: 'IPO preparation and financial restructuring...',
		},
		{
			title: '3 Years 3 Months',
			subtitle: 'FEBRUARY 2021',
			description: 'AI integration across all platforms...',
		},
		{
			title: '3 Years 6 Months',
			subtitle: 'MAY 2021',
			description: 'Acquisition strategy implementation...',
		},
		{
			title: '3 Years 9 Months',
			subtitle: 'AUGUST 2021',
			description: 'Next-gen product line launch...',
		},
		{
			title: '4 Years',
			subtitle: 'NOVEMBER 2021',
			description: 'Global market dominance achievement...',
		},
	];

	const totalPages = Math.ceil(sections.length / SECTIONS_PER_PAGE);

	const handleNext = () => {
		const currentStart = currentPage * SECTIONS_PER_PAGE;
		const currentEnd = currentStart + SECTIONS_PER_PAGE;

		if (focusedCardIndex < currentEnd - 1) {
			setFocusedCardIndex((prev) => prev + 1);
		} else if (currentPage < totalPages - 1) {
			setCurrentPage((prev) => prev + 1);
			setFocusedCardIndex((prev) => prev + 1);
		}
	};

	const handlePrev = () => {
		const currentStart = currentPage * SECTIONS_PER_PAGE;
		if (focusedCardIndex > currentStart) {
			setFocusedCardIndex((prev) => prev - 1);
		} else if (currentPage > 0) {
			setCurrentPage((prev) => prev - 1);
			setFocusedCardIndex((prev) => prev - 1);
		}
	};

	useEffect(() => {
		setHasMounted(true);
	}, []);

	useEffect(() => {
		const allDots = dotRefs.current;
		const firstDot = allDots[0];
		const activeDot = allDots[focusedCardIndex % SECTIONS_PER_PAGE];

		if (firstDot && activeDot) {
			const start = firstDot.offsetLeft + firstDot.offsetWidth / 2;
			const end = activeDot.offsetLeft + activeDot.offsetWidth / 2;
			const width = end - start;
			setProgressWidth(`${width}px`);
		}
	}, [focusedCardIndex, currentPage]);

	return (
		<div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-12">
			<div className="max-w-8xl mx-auto">
				{/* Header */}
				<div className="text-center mb-24">
					<h1 className="text-5xl font-bold text-white mb-6 tracking-wider">
						TOKEN SALE STAGE
					</h1>
				</div>

				{/* Main Timeline and Cards */}
				<div className="overflow-hidden relative">
					<div
						className="flex transition-transform duration-700 ease-in-out"
						style={{
							width: `${totalPages * 100}%`,
							transform: `translateX(-${currentPage * (100 / totalPages)}%)`,
						}}>
						{Array.from({ length: totalPages }).map((_, pageIdx) => {
							const pageSections = sections.slice(
								pageIdx * SECTIONS_PER_PAGE,
								pageIdx * SECTIONS_PER_PAGE + SECTIONS_PER_PAGE
							);

							return (
								<div
									key={pageIdx}
									className="flex flex-col items-center w-full px-6"
									style={{ width: `${100 / totalPages}%` }}>
									{/* Dot Timeline */}
									<div className="relative w-full h-10 mb-6 flex items-center justify-between px-8">
										<div className="absolute top-1/2 left-8 right-8 h-1 bg-gray-400/40 rounded-full -translate-y-1/2 z-0" />
										<div
											className="absolute top-1/2 left-8 h-1 bg-amber-400 rounded-full -translate-y-1/2 z-10 transition-all duration-300"
											style={{ width: progressWidth }}
										/>
										{pageSections.map((_, dotIdx) => {
											const globalIdx = pageIdx * SECTIONS_PER_PAGE + dotIdx;
											const isActive = globalIdx === focusedCardIndex;

											return (
												<div
													key={dotIdx}
													ref={(el) => (dotRefs.current[dotIdx] = el)}
													className="z-20 relative w-5 h-5 flex items-center justify-center">
													<div
														className={`w-3 h-3 rounded-full transition-all duration-300 border-2 ${
															isActive
																? 'bg-amber-400 scale-110'
																: 'bg-white border-gray-500'
														}`}
													/>
												</div>
											);
										})}
									</div>

									{/* Cards Row */}
									<div className="flex justify-around w-full">
										{pageSections.map((section, idx) => {
											const actualIndex = pageIdx * SECTIONS_PER_PAGE + idx;
											const isFocused = actualIndex === focusedCardIndex;

											return (
												<div
													key={section.title}
													className={`w-1/3 px-4 cursor-pointer transiton-all duration-300 ${
														isFocused ? 'scale-105' : ' scale-95 shadow-white		'
													}`}
													onClick={() => {
														setFocusedCardIndex(actualIndex);
														setCurrentPage(
															Math.floor(actualIndex / SECTIONS_PER_PAGE)
														);
													}}>
													<TimelineSection
														title={section.title}
														subtitle={section.subtitle}
														description={section.description}
														isVisible={hasMounted}
														delay={idx * 150}
													/>
												</div>
											);
										})}
									</div>
								</div>
							);
						})}
					</div>
				</div>

				{/* Navigation */}
				<div className="flex justify-center mt-16 space-x-6">
					<button
						onClick={handlePrev}
						disabled={focusedCardIndex === 0}
						className="w-12 h-12 rounded-full border-2 border-amber-500/50 flex items-center justify-center text-amber-400 hover:text-amber-300 hover:border-amber-400 hover:bg-amber-400/10 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed">
						←
					</button>
					<button
						onClick={handleNext}
						disabled={focusedCardIndex === sections.length - 1}
						className="w-12 h-12 rounded-full border-2 border-amber-500/50 flex items-center justify-center text-amber-400 hover:text-amber-300 hover:border-amber-400 hover:bg-amber-400/10 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed">
						→
					</button>
				</div>
			</div>
		</div>
	);
};

export default AnimatedTimeline;
