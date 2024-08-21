import { ResponsiveType } from "react-multi-carousel";

export interface CarouselSliderProps {
    swipeable?: boolean;
    draggable?: boolean;
    showDots?: boolean;
    infinite?: boolean;
    autoPlay?: boolean;
    keyBoardControl?: boolean;
    autoPlaySpeed?: number;
    ssr?: boolean;
    responsive?: ResponsiveType;
    children: React.ReactNode;
}

