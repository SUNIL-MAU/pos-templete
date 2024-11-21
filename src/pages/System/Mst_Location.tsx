
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb'
import DataTable from '../../components/Tables/DataTable'
import { useTranslation } from 'react-i18next';


const Mst_Location = () => {
    const { t } = useTranslation();
    const data = [
        {id:1,LocationName:"",Address:"", City:"", State:[], Pincode:'', phone:"",email:'', LocationCategory:'', EpicorLocation:'',Operation:'',GstNum:'', WareHouse:'',PosType:[{ES:'ES',FS:'FS', CC:'CC' }],ESType:[{Regular:'Regular', PrEembossed:'Regular'}],CashAndCarryOption:'',SameDayIssuance:'', JobStartTime:'', JobEndTime:'', LunchStartTime:'',LunchEndTime:'',TimeSlotApplicable:'',WeeklyOffDay:[], TransitLeadTime:'', OrderProcessingTime:'',MinStock:'',MaxStock:'',OperationStartDate:''}
    ]

  // Define default fields for the modal
  const defaultFields = {
    id: "",
    name: "",
    email: "",
    phone: "",
    company: "",
  };
    
  return (
    <div>
      <Breadcrumb pageName="Location" />
      <DataTable data={data} hiddenColumns={['id','City','Pincode','LocationCategory']} t={t}  defaultFields={defaultFields} isAccordion={true} />
    </div>
  )
}

export default Mst_Location
