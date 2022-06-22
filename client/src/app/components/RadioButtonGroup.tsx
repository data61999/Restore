import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';

interface Props {
  options: any[];
  selectedValue: string;
  onChange: (event: any) => void;
}

const RadioButtonGroup = ({ options, selectedValue, onChange }: Props) => {
  return (
    <FormControl>
      <FormLabel id='demo-radio-buttons-group-label'></FormLabel>
      <RadioGroup value={selectedValue} onChange={onChange}>
        {options.map(({ value, label }) => (
          <FormControlLabel
            value={value}
            control={<Radio />}
            label={label}
            key={value}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default RadioButtonGroup;
