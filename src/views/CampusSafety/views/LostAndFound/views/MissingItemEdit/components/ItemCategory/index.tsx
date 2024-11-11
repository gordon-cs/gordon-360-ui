// Category.tsx
import React from 'react';
import { FormGroup, FormControlLabel, Radio, FormLabel } from '@mui/material';
import styles from './Category.module.scss';

const categories = [
  'Clothing/Shoes',
  'Electronics',
  'Jewelry/Watches',
  'Keys/Keychains',
  'Glasses',
  'Bottles/Mugs',
  'Books',
  'Bags/Purses',
  'Office Supplies',
  'IDs/Wallets',
  'Cash/Cards',
  'Other',
];

type CategoryProps = {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
};

const Category: React.FC<CategoryProps> = ({ selectedCategory, onCategoryChange }) => {
  return (
    <div className={styles.category_group}>
      <FormLabel>Item Category:</FormLabel>
      <FormGroup className={styles.radio_group}>
        {categories.map((label) => (
          <FormControlLabel
            key={label}
            control={<Radio />}
            label={label}
            value={label.toLowerCase().replace(/ /g, '/')}
            onChange={(e) => onCategoryChange((e.target as HTMLInputElement).value)}
            checked={selectedCategory === label.toLowerCase().replace(/ /g, '/')}
            className={styles.category_item}
          />
        ))}
      </FormGroup>
    </div>
  );
};

export default Category;
