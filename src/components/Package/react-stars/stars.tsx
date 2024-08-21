import React from 'react';
import { ReactStarsProps } from '../react-stars';

const defaultStyles: React.CSSProperties = {
    position: "relative",
    overflow: "hidden",
    cursor: "pointer",
    display: "block",
    float: "left",
};

export interface StarProps {
    index: number;
    active: boolean;
    config: ReactStarsProps;
    onMouseOver: (event: React.MouseEvent<HTMLSpanElement>) => void;
    onMouseLeave: () => void;
    onClick: (event: React.MouseEvent<HTMLSpanElement>) => void;
    halfStarHidden: boolean;
    halfStarAt: number;
    isUsingIcons: boolean;
    uniqueness: string;
}
export default function Star(props: StarProps): JSX.Element {
    const {
        index,
        active,
        config,
        onMouseOver,
        onMouseLeave,
        onClick,
        halfStarHidden,
        halfStarAt,
        isUsingIcons,
        uniqueness
    } = props;

    const {
        color,
        activeColor,
        size,
        char,
        isHalf,
        edit,
        halfIcon,
        emptyIcon,
        filledIcon,
    } = config;

    let starClass = '';
    let half = false;

    if (isHalf && !halfStarHidden && halfStarAt === index) {
        if (!isUsingIcons) starClass = `react-stars-${uniqueness}`;
        else starClass = 'react-stars-half';
        half = true;
    }

    const style: React.CSSProperties = Object.assign({}, defaultStyles, {
        color: active ? activeColor : color,
        cursor: edit ? 'pointer' : 'default',
        fontSize: `${size}px`
    });

    function renderIcon(): React.ReactNode {
        if (!isUsingIcons) {
            return char;
        }
        else {
            if (active) {
                return filledIcon;
            }
            else if (!active && half) {
                return halfIcon;
            }
            else {
                return emptyIcon;
            }
        }
    }

    return <span
        className={starClass}
        style={style}
        key={index}
        data-index={index}
        data-forhalf={filledIcon ? index : char}
        onMouseOver={onMouseOver}
        onMouseMove={onMouseOver}
        onMouseLeave={onMouseLeave}
        onClick={onClick} >
        {renderIcon()}
    </span>
}