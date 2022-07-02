import UpLoadPage from './components/UpLoadPage';
import CounterTable from './components/CounterTable';
import { useModel } from '@umijs/max';

export default () => {
  const { name } = useModel('global');
  const { counterData, setCounterData } = useModel('counter');
  // const [tableData, setTableData] = useState({originData: []})

  const onSetTableData = (data: any) => {
    // setTableData(data)
    setCounterData(data)
  }
  console.log("counterData!!!", counterData)

  return (
    <>
      {
        counterData?.originData?.length > 0 ? (
          <CounterTable />
        ) : (
          <UpLoadPage onUploadSuccess={onSetTableData} />
        )
      }
    </>
    // <PageContainer 
    //   header={{
    //     title: '',
    //   }}
    //   ghost
    //   >
    //   <div className={styles.container}>
        
    //     {/* <Guide name={trim(name)} /> */}
    //   </div>
    // </PageContainer>
  );
};
