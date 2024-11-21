import React from 'react';
import { DataRow } from '../../types/table';
import { TFunction } from 'i18next';

interface FormSectionProps {
  formData: DataRow | null;
  formMode: 'add' | 'edit' | 'view';
  onChange: (key: string, value: string) => void;
  onSubmit: () => void;
  onCancel: () => void;
  t: TFunction;
}

const FormSection: React.FC<FormSectionProps> = ({
  formData,
  formMode,
  onChange,
  onSubmit,
  onCancel,
  t,
}) => {
  if (!formData) return null;

  const handleInputChange = (key: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(key, event.target.value);
  };

  return (
    <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">
        {formMode === 'add'
          ? t('Add New Record')
          : formMode === 'edit'
          ? t('Edit Record')
          : t('View Record')}
      </h3>

      <form>
        {/* Field 1 */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-800">
            {t('Field 1')}
          </label>
          <input
            type="text"
            value={formData.field1 || ''}
            onChange={handleInputChange('field1')}
            disabled={formMode === 'view'}
            className="mt-1 w-full px-4 py-2 border rounded-md border-gray-700"
          />
        </div>

        {/* Field 2 */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-800">
            {t('Field 2')}
          </label>
          <input
            type="text"
            value={formData.field2 || ''}
            onChange={handleInputChange('field2')}
            disabled={formMode === 'view'}
            className="mt-1 w-full px-4 py-2 border rounded-md border-gray-700"
          />
        </div>

        {/* Field 3 */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-800">
            {t('Field 3')}
          </label>
          <input
            type="text"
            value={formData.field3 || ''}
            onChange={handleInputChange('field3')}
            disabled={formMode === 'view'}
            className="mt-1 w-full px-4 py-2 border rounded-md border-gray-700"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-between">
          {formMode !== 'view' && (
            <button
              type="button"
              onClick={onSubmit}
              className="px-4 py-2 border rounded-md bg-blue-500 text-white hover:bg-blue-600"
            >
              {t('Save')}
            </button>
          )}
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 ml-2 border rounded-md hover:bg-gray-100"
          >
            {t('Cancel')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormSection;
