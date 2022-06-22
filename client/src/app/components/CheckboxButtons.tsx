import { FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import { useState } from 'react';

interface Props {
  items: string[];
  checked?: string[];
  onChange: (items: string[]) => void;
}

const CheckboxButtons = ({ items, checked, onChange }: Props) => {
  const [checkedItems, setCheckedItems] = useState(checked || []);

  const handleChecked = (value: string) => {
    const currentIndex = checkedItems.findIndex((i) => i === value);
    let newChecked: string[] = [];
    if (currentIndex >= 0) newChecked = checkedItems.filter((i) => i !== value);
    else newChecked = [...checkedItems, value];
    setCheckedItems(newChecked);

    onChange(newChecked);
  };

  return (
    <FormGroup>
      {items.map((item) => (
        <FormControlLabel
          control={
            <Checkbox
              checked={checkedItems.includes(item)}
              onClick={() => handleChecked(item)}
            />
          }
          label={item}
          key={item}
        />
      ))}
    </FormGroup>
  );
};

export default CheckboxButtons;
