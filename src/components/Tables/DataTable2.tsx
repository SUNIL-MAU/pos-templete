import React, { useState, useMemo, useEffect } from 'react';
import { DataRow } from '../../types/table';
import { useSelector, useDispatch } from 'react-redux';
import { addCompany, editCompany, deleteCompany } from '../../redux/reducer/companySlice';
import Modal from '../Modals/Modal';
import { TFunction } from 'i18next';
import ViewButton from '../../common/Action_Button/ViewButton';
import EditButton from '../../common/Action_Button/EditButton';
import DeleteButton from '../../common/Action_Button/DeleteButton';
import { RootState } from '../../redux/store';

// Import the new components
import SearchBar from '../../common/SearchBar';
import Pagination from '../../common/Pagination';
import EntriesSelector from '../../common/EntriesSelector';
import CardWrapper from '../CardWrapper';

// Debounce helper function
const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

interface DataTableProps {
  data: DataRow[];
  hiddenColumns?: string[];
  t: TFunction;
  isAccordion?: boolean;
}

const DataTable2: React.FC<DataTableProps> = ({ data, hiddenColumns = [], t,isAccordion =false }) => {
  const dispatch = useDispatch();
  const companies = useSelector((state: RootState) => state.company.companies);



  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [currentMode, setCurrentMode] = useState<'add' | 'edit' | 'view'>('add');
  const [currentData, setCurrentData] = useState<DataRow | null>(null);

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const handlePageChange = (selectedItem: { selected: number }) =>
    setCurrentPage(selectedItem.selected);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setSearchQuery(event.target.value);

  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(0);
  };

  const filteredData = useMemo(() => {
    if (!debouncedSearchQuery) return data;
    return data.filter((row) =>
      Object.values(row).some((value) =>
        String(value).toLowerCase().includes(debouncedSearchQuery.toLowerCase())
      )
    );
  }, [data, debouncedSearchQuery]);

  const currentDataPage = useMemo(() => {
    const offset = currentPage * itemsPerPage;
    return filteredData.slice(offset, offset + itemsPerPage);
  }, [filteredData, currentPage, itemsPerPage]);

  const pageCount = Math.ceil(filteredData.length / itemsPerPage);

  const handleAddClick = () => {
    setCurrentMode('add');
    setCurrentData(null);
    setModalOpen(true);
  };

  const handleEditClick = (row: DataRow) => {
    setCurrentMode('edit');
    setCurrentData(row);
    setModalOpen(true);
  };

  const handleViewClick = (row: DataRow) => {
    setCurrentMode('view');
    setCurrentData(row);
    setModalOpen(true);
  };

  const handleDeleteClick = (row: DataRow) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      dispatch(deleteCompany(row.id));
    }
  };

  const handleSave = (newData: DataRow) => {
    if (currentMode === 'add') {
      dispatch(addCompany(newData));
    } else if (currentMode === 'edit' && currentData) {
      dispatch(editCompany({ id: currentData.id, updatedCompany: newData }));
    }
    setModalOpen(false);
  };

  return (
    <CardWrapper>
      <div className="mb-4 flex justify-between items-center">
        <SearchBar searchQuery={searchQuery} onSearchChange={handleSearchChange} />
        <button
          onClick={handleAddClick}
          className="p-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md text-sm"
        >
          Add New
        </button>
      </div>

      <div className="relative overflow-x-auto sm:rounded-lg shadow-lg dark:border-gray-700 dark:bg-gray-800">
        <table className="min-w-full table-fixed border-collapse">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr className="text-sm font-semibold text-gray-700 dark:text-gray-300 border-b-2 border-gray-200 dark:border-gray-600">
              {Object.keys(data[0] || {}).map((col) =>
                !hiddenColumns.includes(col) ? (
                  <th
                    key={col}
                    className="p-2 text-center border-r w-[150px] border-gray-300 text-sm dark:border-gray-600 last:border-none sticky top-0 bg-gray-100 dark:bg-gray-700 z-10"
                  >
                    {t(`${col}`)}
                  </th>
                ) : null
              )}
              <th className="p-2 text-center w-[150px] border-r border-gray-300 dark:border-gray-600 last:border-none sticky top-0 bg-gray-100 dark:bg-gray-700 z-10">
                {t('Actions')}
              </th>
            </tr>
          </thead>

          <tbody className="overflow-y-auto max-h-[300px]">
            {currentDataPage.map((row, index) => (
              <tr
                key={index}
                className="border-b hover:bg-gray-100 dark:hover:bg-gray-700 dark:border-gray-600"
              >
                {Object.keys(row).map(
                  (col) =>
                    !hiddenColumns.includes(col) && (
                      <td
                        key={col}
                        title={`${row[col]} `}
                        className="p-1 text-center border-r border-gray-300 dark:border-gray-600 text-sm last:border-none overflow-hidden text-ellipsis w-[150px]"
                      >
                        {String(row[col])}
                      </td>
                    )
                )}
                <td className="p-1 text-center w-[150px] border-r border-gray-300 dark:border-gray-600 last:border-none">
                  <ViewButton row={row} onViewClick={handleViewClick} />
                  <EditButton row={row} onEditClick={handleEditClick} />
                  <DeleteButton row={row} onDeleteClick={handleDeleteClick} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-between">
        <EntriesSelector
          itemsPerPage={itemsPerPage}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
        <Pagination pageCount={pageCount} onPageChange={handlePageChange} />
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        initialData={currentData}
        mode={currentMode}
        t={t}
        isAccordion={isAccordion}
      />
    </CardWrapper>
  );
};

export default DataTable2;
