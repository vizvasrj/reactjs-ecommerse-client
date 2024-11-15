import React from 'react';
// import ReactStars from '../../Package/react-stars';
import ReactStars from 'react-stars';
import { formatDate } from '../../../utils/date';
import { getRandomColors } from '../../../utils';

interface Review {
    title: string;
    rating: number;
    created: string;
    review: string;
    user: {
        firstName: string;
    };
}

interface ListProps {
    reviews: Review[];
}

const List: React.FC<ListProps> = ({ reviews }) => {
    const getAvatar = (review: Review) => {
        const color = getRandomColors();
        if (review.user.firstName) {
            return (
                <div
                    className='d-flex flex-column justify-content-center align-items-center fw-normal text-white avatar'
                    style={{ backgroundColor: color ? color : 'red' }}
                >
                    {review.user.firstName.charAt(0)}
                </div>
            );
        }
    };

    return (
        <div className='review-list'>
            {reviews.map((review, index) => (
                <div className='d-flex align-items-center mb-3 review-box' key={index}>
                    <div className='mx-3'>{getAvatar(review)}</div>
                    <div className='p-3 p-lg-4 w-100'>
                        <div className='d-flex align-items-center justify-content-between'>
                            <h4 className='mb-0 mr-2 one-line-ellipsis'>{review.title}</h4>
                            <ReactStars
                                className='mr-2'
                                size={16}
                                edit={false}
                                color1={'#adb5bd'}
                                color2={'#ffb302'}
                                // a11y={true}
                                half={true}
                                // emptyIcon={<i className='fa fa-star' />}
                                // halfIcon={<i className='fa fa-star-half-alt' />}
                                // filledIcon={<i className='fa fa-star' />}
                                value={review.rating}
                            />
                        </div>
                        <p className='mb-2 fs-12'>{formatDate(`${review?.created}`)}</p>
                        <p className='mb-0 three-line-ellipsis word-break-all'>{`${review?.review}`}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default React.memo(List);