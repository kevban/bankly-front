import * as React from 'react';
import Chip from '@mui/material/Chip';

function CategoryChip({category}) {
  return (
      <Chip label={category} variant="outlined" />
      // <Chip icon={category.icon} label={category} variant="outlined" />
  );
}

export default CategoryChip