import { TableState } from '@tanstack/react-table';

interface PaginationControlsProps {
  getPageCount: () => void;
  previousPage: () => void;
  getCanPreviousPage: () => boolean;
  nextPage: () => void;
  getCanNextPage: () => boolean;
  getState: () => TableState;
}

function PaginationControls({
  previousPage,
  getCanPreviousPage,
  getPageCount,
  nextPage,
  getCanNextPage,
  getState,
}: PaginationControlsProps) {
  const currentPage = getState().pagination.pageIndex + 1;

  return (
    <div style={{ display: 'flex', flexDirection: 'row', marginTop: '1rem' }}>
      <button
        type="button"
        onClick={previousPage}
        disabled={!getCanPreviousPage()}
      >
        Previous
      </button>
      <p style={{ margin: '0.5rem 1rem' }}>
        Page <strong>{`${currentPage} of ${getPageCount()}`}</strong>
      </p>
      <button type="button" onClick={nextPage} disabled={!getCanNextPage()}>
        Next
      </button>
    </div>
  );
}

export default PaginationControls;
