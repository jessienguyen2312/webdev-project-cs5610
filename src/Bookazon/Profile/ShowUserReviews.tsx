import React from 'react';
import { Box } from '@mui/material';

function UserReviews({ reviews }: { reviews: any[]}) {
  return (
    <Box sx={{ mx: '25rem', mt: '1rem', border: 1, borderColor: 'grey.500', p: 2 }}>
      <ul>
        {reviews.map(review => (
          <li key={review.key}>
            <p>{review.dateReviewed} - Rating: {review.rating}</p>
            <p>{review.content}</p>
          </li>
        ))}
      </ul>
    </Box>
  );
}

export default UserReviews;
