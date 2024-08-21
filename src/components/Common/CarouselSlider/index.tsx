import React from 'react';
import Carousel, { ResponsiveType } from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { CarouselSliderProps } from './model';

const CarouselSlider: React.FC<CarouselSliderProps> = ({
    swipeable = false,
    draggable = false,
    showDots = false,
    infinite = true,
    autoPlay = false,
    keyBoardControl = true,
    autoPlaySpeed = 2000,
    ssr = false,
    responsive,
    children
}) => {
    const defaultResponsive: ResponsiveType = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3,
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
        },
    };
    return (
        <Carousel
            swipeable={swipeable}
            draggable={draggable}
            showDots={showDots}
            infinite={infinite}
            autoPlay={autoPlay}
            keyBoardControl={keyBoardControl}
            autoPlaySpeed={autoPlaySpeed}
            ssr={ssr}
            responsive={responsive || defaultResponsive}
            customTransition='all 1s'
            transitionDuration={500}
            containerClass='carousel-container'
            dotListClass='carousel-dot-list-style'
            itemClass='carousel-slider-item'
        >
            {children}
        </Carousel>
    );
};


export default CarouselSlider;