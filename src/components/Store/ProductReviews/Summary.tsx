import React from 'react';
// import ReactStars from '../../Package/react-stars';
import ReactStars from 'react-stars';
import NotFound from '../../Common/NotFound';
import { ReviewIcon } from '../../Common/Icon';
import { ReviewsSummary, Rating } from "../../../containers/Review/reducer";
interface SummaryProps {
    reviewsSummary: ReviewsSummary;
}

const Summary: React.FC<SummaryProps> = (props) => {
    const {
        reviewsSummary: { ratingSummary, totalRatings, totalReviews, totalSummary },
    } = props;

    const getRatingPercentage = (value: number): number => {
        return parseFloat(percentage(value, totalSummary).toFixed(2));
    };

    const averageRating =
        totalRatings > 0 && Math.round(totalRatings / totalReviews);

    return (
        <div className='bg-white p-4 box-shadow-primary review-summary'>
            <h2 className='mb-0'>Rating</h2>
            {averageRating && (
                <div className='d-flex flex-wrap align-items-center mt-2'>
                    <ReactStars
                        className='mr-2'
                        size={17}
                        edit={false}
                        color1={'#adb5bd'}
                        color2={'#ffb302'}
                        // a11y={true}
                        half={true}
                        // emptyIcon={<i className='fa fa-star' />}
                        // halfIcon={<i className='fa fa-star-half-alt' />}
                        // filledIcon={<i className='fa fa-star' />}
                        value={averageRating}
                    />
                    {totalReviews > 0 && <span>based on {totalReviews} reviews.</span>}
                </div>
            )}

            <hr style={{ border: '3px solid #f1f1f1' }} />
            {totalReviews > 0 ? (
                ratingSummary.map((r: Rating, index: number) => {
                    const key = Object.keys(r)[0];
                    const value = r[parseInt(key)];

                    return (
                        <div key={index} className='d-flex align-items-center mb-2'>
                            <div className='left'>
                                <span>{parseInt(key)} star</span>
                            </div>
                            <div className='middle'>
                                <div className='bar-container'>
                                    <div
                                        className={`bar-${parseInt(key)}`}
                                        style={{
                                            width: `${getRatingPercentage(value)}%`,
                                        }}
                                    ></div>
                                </div>
                            </div>
                            <div className='ml-2 right'>
                                <span className='fw-medium'>
                                    {getRatingPercentage(value)}%
                                </span>
                            </div>
                        </div>
                    );
                })
            ) : (
                <NotFound>
                    <ReviewIcon width='40' height='40' className='my-2' />
                    <p className='mb-2'>Be the first to add a review.</p>
                </NotFound>
            )}
        </div>
    );
};

export default Summary;

function percentage(partialValue: number, totalValue: number): number {
    return (100 * partialValue) / totalValue;
}