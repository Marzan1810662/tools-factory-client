import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import Rating from 'react-rating';

const Review = ({ review }) => {
    return (
        <div className="card border md:w-96 bg-base-100 shadow-xl md:mx-auto">
            <div className="card-body">
                <h2 className="card-title">
                    <Rating
                        initialRating={review.rating}
                        emptySymbol={<FontAwesomeIcon icon={faStar} />}
                        fullSymbol={<FontAwesomeIcon style={{ color: '#AD4328' }} icon={faStar} />}
                        readonly
                    ></Rating>
                </h2>
                <p className='text-left break-words'>{review.review}</p>
                <div className="card-actions justify-end">
                    <div className="badge">-{review.name}</div>
                </div>
            </div>
        </div>
    );
};

export default Review;