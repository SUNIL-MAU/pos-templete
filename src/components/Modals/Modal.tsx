import React, { useState, useEffect } from "react";
import { TFunction } from "i18next";
import Accordion from "../../common/Accordion/Accordion";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  initialData?: any; // Dynamically passed data (includes defaultFields in "add" mode)
  mode: "add" | "edit" | "view"; // Add, Edit, or View mode
  t: TFunction; // i18n translation function
  isAccordion?: boolean | undefined;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData = {}, // Use the passed initialData or default to an empty object
  mode,
  t,
  isAccordion,
}) => {
  const [formData, setFormData] = useState<any>(initialData || {});

  // Update the form data when initialData changes
  useEffect(() => {
    setFormData(initialData || {});
  }, [initialData]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    setFormData({ ...formData, [key]: e.target.value });
  };

  const handleSave = () => {
    onSave(formData); // Pass the current form data to the onSave handler
    onClose();
  };

  // console.log(formData)

  return isOpen ? (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex z-9999 justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-2xl w-230">
        <h3 className="text-xl mb-4 text-gray-800">
          {mode === "add"
            ? t("Add New Record")
            : mode === "edit"
            ? t("Edit Record")
            : t("View Record")}
        </h3>
        
        {/* Accordion Mode */}
        {isAccordion && mode === 'add' ? (
        <Accordion items={formData || {}} />
          ) : (
            // Form Mode
            <div className="grid grid-cols-12 space-x-1">

              {formData &&
                Object.keys(formData).map((key) => 
                  <div key={key} className=" col-span-6">
                    <label className="block text-sm font-medium text-gray-800">
                      {t(`${key}`)}
                    </label>
                    <input
                      type="text"
                      value={formData[key] || ""}
                      onChange={(e) => handleInputChange(e, key)}
                      disabled={mode === "view"} // Disable input fields in View mode
                      className="mt-1 w-full px-4 py-2 border rounded-md border-gray-700"
                    />
                  </div>
              )}
            </div>
          )}


        {/* Action Buttons */}
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-md hover:bg-gray-100"
          >
            {t("Cancel")}
          </button>
          {mode !== "view" && (
            <button
              onClick={handleSave}
              className="px-4 py-2 border rounded-md bg-blue-500 text-white hover:bg-blue-600"
            >
              {t("Save")}
            </button>
          )}
        </div>
      </div>
    </div>
  ) : null;
};

export default Modal;
