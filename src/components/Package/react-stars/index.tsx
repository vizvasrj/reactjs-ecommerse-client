import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useConfig from './hooks/useConfig'; // Assuming this import is correct
import Star from './stars'; // Assuming this import is correct

export interface ReactStarsProps {
    classNames?: string;
    edit?: boolean;
    isHalf?: boolean;
    value?: number;
    count?: number;
    char?: string;
    size?: number;
    color?: string;
    activeColor?: string;
    emptyIcon?: React.ReactNode;
    halfIcon?: React.ReactNode;
    filledIcon?: React.ReactNode;
    a11y?: boolean;
    onChange?: (newValue: number) => void;
}

const parentStyles: React.CSSProperties = {
    overflow: "hidden",
    position: "relative",
};

function getHalfStarStyles(color: string, uniqueness: string): string {
    return `
    .react-stars-${uniqueness}:before {
      position: absolute;
      overflow: hidden;
      display: block;
      z-index: 1;
      top: 0; left: 0;
      width: 50%;
      content: attr(data-forhalf);
      color: ${color};
  }`;
}

function getHalfStarStyleForIcons(color: string): string {
    return `
          span.react-stars-half > * {
          color: ${color};
      }`;
};

function ReactStars({ 
    classNames = '', 
    edit = true, 
    isHalf = false, 
    value = 0, 
    count = 5, 
    char = '★', 
    size = 15, 
    color = 'gray', 
    activeColor = '#ffd700', 
    emptyIcon, 
    halfIcon, 
    filledIcon, 
    a11y = true, 
    onChange = () => {} 
}: ReactStarsProps): JSX.Element {
    const [uniqueness, setUniqueness] = useState<string>('');
    const [currentValue, setCurrentValue] = useState<number>(value);
    const [stars, setStars] = useState<Array<{ active: boolean }>>([]);
    const [isUsingIcons, setIsUsingIcons] = useState<boolean>(false);
    const [config, setConfig] = useConfig({ classNames, edit, isHalf, value, count, char, size, color, activeColor, emptyIcon, halfIcon, filledIcon, a11y, onChange });
    const [halfStarAt, setHalfStarAt] = useState<number>(Math.floor(value));
    const [halfStarHidden, setHalfStarHidden] = useState<boolean>(isHalf && value % 1 < 0.5);

    function iconsUsed(config: ReactStarsProps): boolean {
        return Boolean(
            (!config.isHalf && config.emptyIcon && config.filledIcon) ||
            (config.isHalf && config.emptyIcon && config.halfIcon && config.filledIcon)
        );
    }

    function createUniqueness(): void {
        setUniqueness((Math.random() + "").replace(".", ""));
    }

    useEffect(() => {
        validateInitialValue(value, count);
        setStars(getStars(value));
        setConfig({ classNames, edit, isHalf, value, count, char, size, color, activeColor, emptyIcon, halfIcon, filledIcon, a11y, onChange  });
        createUniqueness();
        setIsUsingIcons(iconsUsed({ classNames, edit, isHalf, value, count, char, size, color, activeColor, emptyIcon, halfIcon, filledIcon, a11y, onChange }));
        setHalfStarAt(Math.floor(value));
        setHalfStarHidden(isHalf && value % 1 < 0.5);
    }, []);

    function validateInitialValue(initialValue: number, starsCount: number): void {
        if (initialValue < 0 || initialValue > starsCount) {
            setCurrentValue(0);
        } else {
            setCurrentValue(initialValue);
        }
    }

    function isDecimal(value: number): boolean {
        return value % 1 !== 0;
    }

    function getRate(): number {
        return config.isHalf ? Math.floor(currentValue) : Math.round(currentValue);
    }

    function getStars(activeCount?: number): Array<{ active: boolean }> {
        if (typeof activeCount === 'undefined') {
            activeCount = getRate();
        }

        let stars: Array<{ active: boolean }> = [];
        if (config && config.count) {
            for (let i = 0; i < config.count; i++) {
                stars.push({
                    active: i <= activeCount - 1
                });
            }
        }
        return stars;
    }

    function mouseOver(event: React.MouseEvent<HTMLSpanElement>): void {
        if (!config.edit) return;

        let index = Number(event.currentTarget.getAttribute('data-index'));
        if (config.isHalf) {
            const isAtHalf = moreThanHalf(event);
            setHalfStarHidden(isAtHalf);
            index = isAtHalf ? index + 1 : index;
            setHalfStarAt(index);
        } else {
            index += 1;
        }
        updateStars(index);
    }

    function updateStars(index: number): void {
        const currentActive = stars.filter((x) => x.active).length;
        if (index !== currentActive) {
            setStars(getStars(index));
        }
    }

    function moreThanHalf(event: React.MouseEvent<HTMLSpanElement>): boolean {
        const { target } = event;
        const boundingClientRect = (target as HTMLElement).getBoundingClientRect();
        let mouseAt = event.clientX - boundingClientRect.left;
        mouseAt = Math.round(Math.abs(mouseAt));

        return mouseAt > boundingClientRect.width / 2;
    }

    function mouseLeave(): void {
        if (!config.edit) return;

        updateHalfStarValues(currentValue);
        setStars(getStars());
    }

    function updateHalfStarValues(value: number): void {
        if (config.isHalf) {
            setHalfStarHidden(isDecimal(value));
            setHalfStarAt(Math.floor(value));
        }
    }

    function onClick(event: React.MouseEvent<HTMLSpanElement>): void {
        if (!config.edit) return;

        let index = Number(event.currentTarget.getAttribute('data-index'));
        let newValue: number;
        if (config.isHalf) {
            const isAtHalf = moreThanHalf(event);
            setHalfStarHidden(isAtHalf);
            if (isAtHalf) index += 1;
            newValue = isAtHalf ? index : index + 0.5;
            setHalfStarAt(index);
        } else {
            newValue = index + 1;
        }
        console.log('onClick newValue:', newValue);
        currentValueUpdated(newValue);
    }

    function renderHalfStarStyleElement(): JSX.Element {
        const activeColor = config.activeColor || '#ffd700';

        return (
            <style
                dangerouslySetInnerHTML={{
                    __html: isUsingIcons
                        ? getHalfStarStyleForIcons(activeColor)
                        : getHalfStarStyles(activeColor, uniqueness),
                }}
            />
        );
    }

    function currentValueUpdated(newValue: number): void {
        if (newValue !== currentValue) {
            setStars(getStars(newValue));
            setCurrentValue(newValue);
            onChange && onChange(newValue);
        }
    }

    function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>): void {
        if (!config?.a11y && !config?.edit) return;

        const { key } = event;
        let newValue = currentValue;

        const keyNumber = Number(key); // e.g. "1" => 1, "ArrowUp" => NaN
        if (keyNumber) {
            if (Number.isInteger(keyNumber) && keyNumber > 0 && config?.count && keyNumber <= config.count) {
                newValue = keyNumber;
            }
        } else {
            if ((key === "ArrowUp" || key === "ArrowRight") && config?.count && newValue < config.count) {
                event.preventDefault();
                newValue += config?.isHalf ? 0.5 : 1;
            } else if ((key === "ArrowDown" || key === "ArrowLeft") && newValue > 0.5) {
                event.preventDefault();
                newValue -= config?.isHalf ? 0.5 : 1;
            }
        }

        updateHalfStarValues(newValue);
        currentValueUpdated(newValue);
    }

    function renderStars(): Array<JSX.Element> {
        return stars.map((star, i) => (
            <Star
                key={i}
                index={i}
                active={star.active}
                config={config}
                onMouseOver={mouseOver}
                onMouseLeave={mouseLeave}
                onClick={onClick}
                halfStarHidden={halfStarHidden}
                halfStarAt={halfStarAt}
                isUsingIcons={isUsingIcons}
                uniqueness={uniqueness}
            />
        ));
    }
  
    return (
        <div className={`react-stars-wrapper-${uniqueness}`} style={{ display: "flex" }}>
            <div
                tabIndex={config.a11y && config.edit ? 0 : undefined}
                aria-label="add rating by typing an integer from 0 to 5 or pressing arrow keys"
                onKeyDown={handleKeyDown}
                className={classNames + ' react-stars'} // Assuming you still want to add 'react-stars'
                style={parentStyles}
            >
                {config.isHalf && renderHalfStarStyleElement()}
                {renderStars()}
                <p style={{ position: "absolute", left: "-200rem" }} role="status">
                    {currentValue}
                </p>
            </div>
            <button onClick={() => console.log('Current value:', currentValue, halfStarAt)}>Get current value</button>
        </div>
    );
}

// No more defaultProps needed
ReactStars.propTypes = {
    classNames: PropTypes.string,
    edit: PropTypes.bool,
    isHalf: PropTypes.bool,
    value: PropTypes.number,
    count: PropTypes.number,
    char: PropTypes.string,
    size: PropTypes.number,
    color: PropTypes.string,
    activeColor: PropTypes.string,
    emptyIcon: PropTypes.element,
    halfIcon: PropTypes.element,
    filledIcon: PropTypes.element,
    a11y: PropTypes.bool,
    onChange: PropTypes.func, // Add prop type for onChange
};


export default ReactStars;