import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import DataTable from "../../components/Tables/DataTable";
import { RootState } from "../../redux/store";

const Mst_Company = () => {
  const { t } = useTranslation();

  // Get the data from Redux store
  const data = useSelector((state: RootState) => state.company.companies);

  const defaultFields = {
    id: "",
    name: "",
    email: "",
    phone: "",
    company: "",
  };

  return (
    <>
      <Breadcrumb pageName="COMPANY" />
      <DataTable
        data={data}
        hiddenColumns={["id"]}
        t={t}
        isAccordion={false}
        defaultFields={defaultFields}
      />
    </>
  );
};

export default Mst_Company;
