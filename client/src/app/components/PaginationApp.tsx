import { Box, Typography, Pagination } from '@mui/material';
import { MetaData } from '../models/Pagination';

interface Props {
  metaData: MetaData;
  onPageChange: (page: number) => void;
}

const PaginationApp = ({ metaData, onPageChange }: Props) => {
  const { totalCount, totalPages, currentPage, pageSize } = metaData;
  return (
    <Box display='flex' justifyContent='space-between' alignItems='center'>
      <Typography>
        Displaying {(currentPage - 1) * pageSize + 1}-
        {currentPage * pageSize > totalCount
          ? totalCount
          : currentPage * pageSize}{' '}
        of {totalCount} items
      </Typography>
      <Pagination
        count={totalPages}
        page={currentPage}
        color='secondary'
        size='large'
        onChange={(e, page) => onPageChange(page)}
      />
    </Box>
  );
};

export default PaginationApp;
