import { UploadFile } from '@mui/icons-material';
<<<<<<< Updated upstream
import { FormControl, FormHelperText, Typography } from '@mui/material';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useController, UseControllerProps } from 'react-hook-form';
=======
import { FormControl, Typography, FormHelperText } from '@mui/material';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { UseControllerProps, useController } from 'react-hook-form';
>>>>>>> Stashed changes

interface Props extends UseControllerProps {}

const AppDropzone = (props: Props) => {
  const { fieldState, field } = useController({ ...props, defaultValue: null });

  const dzStyles = {
    display: 'flex',
<<<<<<< Updated upstream
    borer: 'dashed 3px #eee',
    borderColor: '#000',
=======
    border: 'dashed 3px #eee',
    borderColor: '#eee',
>>>>>>> Stashed changes
    borderRadius: '5px',
    paddingTop: '30px',
    alignItems: 'center',
    height: 200,
    width: 500,
  };

  const dzActive = {
    borderColor: 'green',
  };

  const onDrop = useCallback(
    (acceptedFiles) => {
      acceptedFiles[0] = Object.assign(acceptedFiles[0], {
        preview: URL.createObjectURL(acceptedFiles[0]),
      });
      field.onChange(acceptedFiles[0]);
    },
    [field]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <FormControl
<<<<<<< Updated upstream
        style={isDragActive ? { ...dzStyles, ...dzActive } : dzStyles}
        error={!!fieldState.error}
=======
        error={!!fieldState.error}
        style={isDragActive ? { ...dzStyles, ...dzActive } : dzStyles}
>>>>>>> Stashed changes
      >
        <input {...getInputProps()} />
        <UploadFile sx={{ fontSize: '100px' }} />
        <Typography variant='h4'>Drop image here</Typography>
        <FormHelperText>{fieldState.error?.message}</FormHelperText>
      </FormControl>
    </div>
  );
};

export default AppDropzone;
