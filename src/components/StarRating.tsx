// src/components/StarRating.tsx
import React from 'react';
import { IconButton, HStack } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';

interface StarRatingProps {
  rating: number;
  onRate: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, onRate }) => {
	return (
	  <HStack spacing={0}>
		{[1, 2, 3, 4, 5].map((star) => {
        const isActive = star <= rating;
        return (
          <IconButton
            key={star}
            icon={<StarIcon />}
            aria-label={`${star} Stars`}
            onClick={() => onRate(star)}
            size="md"
			bgColor={"transparent"}
			variant="unstyled"
			boxShadow={"none"}
            sx={{
              color: isActive ? 'yellow.400' : 'gray.400',
              _hover: { color: isActive ? 'yellow.300' : 'yellow.400' },
              _active: { color: 'yellow.400' },
            }}
          />
        );
      })}
	  </HStack>
	);
  };
  

export default StarRating;
