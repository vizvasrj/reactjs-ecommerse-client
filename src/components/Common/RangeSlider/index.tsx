import React, { useState } from 'react';
import Slider, { SliderTooltip } from 'rc-slider';
// const Slider = require('rc-slider');
// import Slider from 'rc-npm slider';
const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);
import 'rc-slider/assets/index.css';

// const { createSliderWithTooltip } = Slider;
// const Range = createSliderWithTooltip(Slider.Range);
const { Handle } = Slider;

interface RangeSliderProps {
    type?: 'slider' | 'range';
    marks?: Record<number, string>;
    step?: number;
    defaultValue: number | number[];
    max?: number;
    allowCross?: boolean;
    onChange: (value: number | number[]) => void;
}

const handle = (props: any) => {
    const { value, dragging, index, ...restProps } = props;
    return (
        <SliderTooltip
            prefixCls='rc-slider-tooltip'
            overlay={`₹${value}`}
            visible={dragging}
            placement='top'
            key={index}
        >
            <Handle value={value} {...restProps} />
        </SliderTooltip>
    );
};

const RangeSlider: React.FC<RangeSliderProps> = ({
    type = 'range',
    marks,
    step,
    defaultValue,
    max,
    allowCross = true,
    onChange,
}) => {
    const [sliderValue, setSliderValue] = useState<number>(50);
    const [rangeValue, setRangeValue] = useState<number[]>(Array.isArray(defaultValue) ? defaultValue : [0, defaultValue as number]);

    const onSliderChange = (v: number) => {
        setSliderValue(v);
    };

    const onRangeChange = (v: number[]) => {
        setRangeValue(v);
    };

    const onAfterSliderChange = (value: number) => {
        onChange(value);
    };

    const onAfterRangeChange = (value: number[]) => {
        onChange(value);
    };
    let min = 1;
    if (max && step) {
        min = max % step === 0 ? 1 : step - (max % step);
        if ((max - min) % step !== 0) {
            min = max - (Math.floor((max - min) / step) * step);
        }
    }

    console.log(defaultValue, "defaultValue", sliderValue, "sliderValue", rangeValue, "rangeValue", "MIN", min);
    return (
        <>
            {type === 'slider' ? (
                <Slider
                    className='slider'
                    dots
                    reverse
                    step={step}
                    defaultValue={defaultValue as number}
                    marks={marks}
                    value={sliderValue}
                    onChange={onSliderChange}
                    onAfterChange={onAfterSliderChange}
                />
            ) : (
                <Range
                    className='slider'
                    pushable={10}
                    allowCross={allowCross}
                    min={min}
                    max={max}
                    step={step}
                    defaultValue={defaultValue as number[]}
                    marks={marks}
                    handle={handle}
                    tipFormatter={(value) => `₹${value}`}
                    value={rangeValue}
                    onChange={onRangeChange}
                    onAfterChange={onAfterRangeChange}
                />
            )}
        </>
    );
};

export default RangeSlider;