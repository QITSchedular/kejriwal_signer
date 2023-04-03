import "devextreme/dist/css/dx.greenmist.css";
import {
  DataGrid,
  Column,
  ColumnChooser,
  FilterRow,
  SearchPanel,
  HeaderFilter,
  Paging,
  Pager,
  Scrolling,
} from "devextreme-react/data-grid";
import { pdfData } from "./pdfData";

const PdfLists = () => {
  const allowedPageSizes = [5, 10, 15];
  const renderPhotoCell = (data) => {
    return <img src={data.value} style={{ width: "50px" }} />;
  };

  return (
    <div
      className="main_-container"
      style={{
        margin: "0 auto",
        padding: "20px",
        backgroundColor: "#EFEFEF",
        width: "1000px",
      }}
    >
      <div
        className="sub__container"
        style={{
          padding: "25px",
          backgroundColor: "white",
        }}
      >
        <DataGrid
          dataSource={pdfData}
          keyExpr="Id"
          allowColumnReordering={true}
          showRowLines={true}
          showBorders={true}
        >
          <HeaderFilter visible={true} />

          <FilterRow visible={true} />
          <SearchPanel visible={true} width={250} />
          <Column dataField={"CompanyName"} dataType={"string"} />
          <Column
            dataField="DocumentId"
            fixed={true}
            allowFiltering={true}
          ></Column>
          <Column dataField="Signed_Date" dataType="date"></Column>
          <Column dataField="Signed_At" dataType="date"></Column>
          <Paging defaultPageSize={10} />
        </DataGrid>
      </div>
    </div>
  );
};

export default PdfLists;
