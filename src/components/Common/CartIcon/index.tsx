import React from 'react';

import { BagIcon } from '../Icon';
import Button from '../Button';

interface CartIconProps {
    className?: string;
    onClick?: () => void;
    cartItems: any[]; // Replace 'any' with the type of your cart items
}

const CartIcon: React.FC<CartIconProps> = ({ className, onClick, cartItems }) => {
    const Icon = (
        <span className='cart-icon'>
            <BagIcon />
            {cartItems.length > 0 && (
                <span className='cart-badge'>
                    {cartItems.length >= 99 ? '99+' : cartItems.length}
                </span>
            )}
        </span>
    );

    const items = cartItems.length;

    return (
        <Button
            borderless
            variant='empty'
            className={className}
            aria-label={
                items > 0 ? `your cart have ${items} items` : 'your cart is empty'
            }
            icon={Icon}
            onClick={onClick}
        />
    );
};

export default CartIcon;