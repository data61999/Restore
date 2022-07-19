<<<<<<< Updated upstream
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useController, UseControllerProps } from 'react-hook-form';
=======
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from '@mui/material';
import { UseControllerProps, useController } from 'react-hook-form';
>>>>>>> Stashed changes

interface Props extends UseControllerProps {
  label: string;
  items: string[];
}

const AppSelectList = (props: Props) => {
  const { fieldState, field } = useController({ ...props, defaultValue: '' });
<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
  return (
    <FormControl fullWidth error={!!fieldState.error}>
      <InputLabel>{props.label}</InputLabel>
      <Select value={field.value} label={props.label} onChange={field.onChange}>
        {props.items.map((item, index) => (
          <MenuItem key={index} value={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
<<<<<<< Updated upstream
=======
      <FormHelperText>{fieldState.error?.message}</FormHelperText>
>>>>>>> Stashed changes
    </FormControl>
  );
};

export default AppSelectList;
