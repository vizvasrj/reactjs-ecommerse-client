import React from 'react';

import Checkbox from '../../Common/Checkbox';
import { HeartIcon } from '../../Common/Icon';

interface AddToWishListProps {
    id: string;
    liked: boolean;
    enabled: boolean;
    updateWishlist: (id: string, value: boolean) => void;
    authenticated: boolean;
}

const AddToWishList: React.FC<AddToWishListProps> = ({
    id,
    liked,
    enabled,
    updateWishlist,
    authenticated,
}) => {
    return (
        <div className='add-to-wishlist'>
            <Checkbox
                id={`checkbox_${id}`}
                name={'wishlist'}
                disabled={!enabled}
                checked={liked}
                label={<HeartIcon />}
                onChange={(e, _, value) => {
                    updateWishlist(id, value);
                }}
            />
        </div>
    );
};

export default AddToWishList;