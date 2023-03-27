import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { Link, useNavigate } from "react-router-dom";
import "../modal.css";
import Card from "@mui/material/Card";
import axios from "axios";
import React, { useState, useEffect } from "react";
import "devextreme/dist/css/dx.light.css";
import { Form, GroupItem } from "devextreme-react/form";
import { formatDate } from "devextreme/localization";
import DateBox from "devextreme-react/date-box";
import SelectBox from "devextreme-react/select-box";
import TextBox from "devextreme-react/text-box";
import Validator, {
  RequiredRule,
  NumericRule,
} from "devextreme-react/validator";
import ValidationGroup from "devextreme-react/validation-group";
import { DropDownBox } from "devextreme-react/drop-down-box";
import { CircularProgress } from "@mui/material";
import DataGrid, {
  Column,
  MasterDetail,
  Selection,
  Paging,
  FilterRow,
  Scrolling,
  HeaderFilter,
  LoadPanel,
  Editing,
  Sorting,
} from "devextreme-react/data-grid";
import notify from "devextreme/ui/notify";
import "devextreme-react/text-area";
import TextArea from "devextreme-react/text-area";
const orderStatus = ["Planned", "Released"];
const gridColumnsWhs = ["whsCode", "whsName"];
const gridColumnsSeries = ["series", "seriesName"];

const ProductionOrderList = () => {
  const [seriesid, setSeriesid] = useState("");
  const [seriesAPIList, setSeriesAPIList] = useState([]);
  const [whsid, setWhsid] = useState(""); //from warehouse
  const [whsAPIList, setwhsAPIList] = useState([]); //from warehouse
  const [whsid1, setWhsid1] = useState(""); //to warehouse
  const [headerList, setHeaderList] = useState([]);
  const [fromDateOne, setFromDateOne] = useState("");
  const [toDateTwo, setToDateTwo] = useState("");
  const [status, setStatus] = useState("");
  const [docNum, setDocNum] = useState("");
  const [docDate1, setDocDate1] = useState("");
  const [dueDate1, setDueDate1] = useState("");
  const [comments1, setComments1] = useState("");
  const [cardCode, setCardCode] = useState("");
  const [docEntry, setDocEntry] = useState("");
  const [objectType, setObjectType] = useState("");
  const [poLinesArray1, setPoLinesArray1] = useState([]);

  // Hide grid box item after selection
  // Warehouse
  const [gridBoxValue, setGridBoxValue] = useState([1]);
  const [isGridBoxOpened, setIsGridBoxOpened] = useState(false);
  // Series
  const [gridBoxValue1, setGridBoxValue1] = useState([1]);
  const [isGridBoxOpened1, setIsGridBoxOpened1] = useState(false);
  // Warehouse Master Detail
  const [gridBoxValue2, setGridBoxValue2] = useState([1]);
  const [isGridBoxOpened2, setIsGridBoxOpened2] = useState(false);
  const [loading, setLoading] = useState(true);
  const PageLoader = () => {
    if (loading) {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 500,
          }}
        >
          <CircularProgress size={80} loadingPosition="center" />
        </div>
      );
    }
  };
  //Master Detail Warehouse API Grid Opened
  const dataGridOnSelectionChanged2 = (e) => {
    console.log("This is the row value =>>>" + e.selectedRowKeys);
    setGridBoxValue2(e.selectedRowKeys);
    setWhsid1(e.selectedRowsData[0].whsCode);
    console.log(whsid1);
    setIsGridBoxOpened2(false);
  };
  const syncDataGridSelection2 = (e) => {
    setGridBoxValue2(e.value);
  };
  function gridBoxDisplayExpr2(item) {
    return item && `${item.whsCode} -- ${item.whsName}`;
  }
  const onGridBoxOpened2 = (e) => {
    if (e.name === "opened") {
      setIsGridBoxOpened2(e.value);
    }
  };
  useEffect(() => {
    axios
      .get("/api/getPRDSeries")
      .then(function (response) {
        const seriesDataAPI = response.data.body;
        const NewSeriesDataAPIList = seriesDataAPI;
        setSeriesAPIList(NewSeriesDataAPIList);
        //console.log("Series API Result", NewSeriesDataAPIList);
      })
      .catch(function (error) {
        console.log("Series API Error", error);
        notify(
          {
            message:
              "Server Error in Series API. Please try again after Sometime....",
            width: 500,
            shading: true,
            position: "center",
            direction: "up-stack",
          },
          "error",
          4000
        );
      });
  }, []);
  useEffect(() => {
    axios
      .get("/api/getWarehouse")
      .then(function (response) {
        const whsDataAPI = response.data.body;
        const NewwhsDataAPIList = whsDataAPI;
        setwhsAPIList(NewwhsDataAPIList);
        setLoading(false);
        //console.log("Whs API Result", NewwhsDataAPIList);
      })
      .catch(function (error) {
        console.log("Inside Catch Block WHS", error);
        notify(
          {
            message:
              "Server Error in Warehouse API. Please try again after Sometime....",
            width: 550,
            shading: true,
            position: "center",
            direction: "up-stack",
          },
          "error",
          1000
        );
      });
  }, []);
  const handleProductionOrderFilter = async (e) => {
    e.preventDefault();
    setLoading(true);
    const fromDateOne5 = formatDate(fromDateOne, "yyyy-MM-dd");
    const toDateTwo6 = formatDate(toDateTwo, "yyyy-MM-dd");
    if (
      fromDateOne === "" &&
      toDateTwo === "" &&
      status === "" &&
      docNum === "" &&
      seriesid === "" &&
      whsid === ""
    ) {
      setLoading(false);
      notify(
        {
          message: "Please fill atleast one Field....",
          width: 300,
        },
        "error",
        500
      );
    } else {
      const postData = {
        fromDateOne5,
        toDateTwo6,
        status,
        whsid,
        seriesid,
        docNum,
      };
      try {
        let response = await axios.post(
          "/api/ProductionOrderFilters",
          postData
        );
        notify(
          {
            message: "Please wait....Loading your Production Order",
            width: 400,
            shading: true,
            position: "center",
          },
          "success",
          1000
        );
        const newData = response.data.body;
        let newList = newData;
        console.log("PRD Apply Filter API", newList[0]);
        const newList2 = newList.map((element) => {
          const postDate = element.postDate.split(" ")[0]; // split string at space and get first element
          return { ...element, postDate }; // return new object with updated postDate field
        });
        setHeaderList(newList2); // Dynamic API
        setLoading(false);
      } catch (error) {
        setLoading(false);
        notify(
          {
            message: "PRD Server Error....Try again after Sometime....",
            width: 500,
            shading: true,
            position: "center",
          },
          "error",
          1000
        );
        console.log("Error in Production Order", error);
      }
    }
  };
  const addITR = async (e) => {
    setLoading(true);
    e.preventDefault();
    const docDate5 = formatDate(docDate1, "yyyy-MM-dd");
    const dueDate6 = formatDate(dueDate1, "yyyy-MM-dd");
    if (
      docDate1 === "" ||
      dueDate1 === "" ||
      whsid1 === "" ||
      comments1 === ""
    ) {
      setLoading(false);
      notify(
        {
          message: "Please Fill all the Fields",
          width: 300,
          shading: true,
          position: "center",
        },
        "error",
        1000
      );
    } else {
      let postData1 = {
        cardCode,
        docEntry,
        objectType,
        docDate5,
        dueDate6,
        comments1,
        whsid1,
        poLines: poLinesArray1,
      };
      try {
        let response = await axios.post("/api/AddPRDITR", postData1);
        const AddITRStatus = response.data.statusCode;
        const AddITRStatus1 = response.data.body.message;
        console.log("response from Backend PRD1", response);
        console.log("response.data from Backend PRD2", response.data);
        console.log(
          "response.data.statusCode from Backend PRD3",
          response.data.statusCode
        );
        // setLoading(false);
        if (AddITRStatus === "200") {
          setLoading(false);
          notify(
            {
              message: "Your ITR is Added Successfully",
              width: 300,
              shading: true,
              position: "center",
            },
            "success",
            1500
          );
        } else {
          setLoading(false);
          notify(
            {
              message: AddITRStatus1,
              width: 500,
              shading: true,
              position: "center",
            },
            "error",
            2000
          );
        }
      } catch (error) {
        setLoading(false);
        console.log("Error in Add ITR", error);
        notify(
          {
            message: "Server Error. Please Add your ITR After Sometime",
            width: 400,
            shading: true,
            position: "center",
          },
          "error",
          1000
        );
      }
    }
  };
  const state = {
    checkBoxesMode: "always",
  };
  const validateForm = React.useCallback((e) => {
    e.component.validate();
  }, []);
  const min1 = new Date(fromDateOne);
  // Master Data Detail Function
  function masterDataDetail(props) {
    const poLines = props.data.poLines;
    setPoLinesArray1(poLines);
    setCardCode(props.data.cardCode);
    setDocEntry(props.data.docEntry);
    setObjectType(props.data.objectType);
    const min = new Date(docDate1);
    const selectionFilter = ["uomCode", "=", "Manual"];
    const { checkBoxesMode } = state;
    return (
      <Card>
        <SoftBox ml={5} mr={2} mb={0} mt={1}>
          <SoftTypography
            mb={2}
            mt={4}
            style={{
              color: "#0B2F8A",
              fontWeight: "700",
              fontSize: "21px",
              lineHeight: "10px",
              letterSpacing: 1,
            }}
          >
            Prd Order #{`${props.data.docNum}`}
          </SoftTypography>
          <ValidationGroup>
            <Form colCount={2} formData={props.data}>
              <GroupItem caption="">
                <TextBox
                  label="From Warehouse"
                  labelMode="static"
                  readOnly={true}
                  defaultValue={props.data.warehouse}
                ></TextBox>

                <DropDownBox
                  label="To Warehouse"
                  labelMode="floating"
                  dataSource={whsAPIList}
                  opened={isGridBoxOpened2}
                  wordWrapEnabled={true}
                  selectByClick={true}
                  valueExpr="whsCode"
                  displayExpr={gridBoxDisplayExpr2}
                  value={whsid1}
                  onValueChanged={syncDataGridSelection2}
                  onOptionChanged={onGridBoxOpened2}
                >
                  <DataGrid
                    dataSource={whsAPIList}
                    columns={gridColumnsWhs}
                    hoverStateEnabled={true}
                    height="100%"
                    selectedRowKeys={whsid1}
                    onSelectionChanged={dataGridOnSelectionChanged2}
                  >
                    {" "}
                    <Selection mode="single" />
                    <Scrolling mode="virtual" />
                    <Paging enabled={true} pageSize={10} />
                    <FilterRow visible={true} />
                  </DataGrid>
                </DropDownBox>
                <DateBox
                  label="Doc Date"
                  labelMode="floating"
                  displayFormat="yyyy-MM-dd"
                  showClearButton={true}
                  defaultValue={docDate1}
                  valueChangeEvent="change"
                  onValueChanged={(e) => {
                    setDocDate1(e.value);
                    setDueDate1(e.value);
                    //console.log(e.value);
                  }}
                >
                  <Validator>
                    <RequiredRule message="DocDate is Required" />
                  </Validator>
                </DateBox>
                <DateBox
                  label="Due Date"
                  labelMode="floating"
                  displayFormat="yyyy-MM-dd"
                  showClearButton={true}
                  value={dueDate1}
                  valueChangeEvent="change"
                  min={min}
                  onValueChanged={(e) => {
                    setDueDate1(e.value);
                    //console.log(e.value);
                  }}
                >
                  <Validator>
                    <RequiredRule message="DueDate is Required" />
                  </Validator>
                </DateBox>
              </GroupItem>
              <GroupItem>
                <TextBox
                  label="Item Code"
                  labelMode="static"
                  readOnly={true}
                  defaultValue={props.data.itemCode}
                ></TextBox>
                <TextBox
                  label="Item Name"
                  labelMode="static"
                  readOnly={true}
                  defaultValue={props.data.itemName}
                ></TextBox>
                <TextBox
                  label="Post Date"
                  labelMode="static"
                  readOnly={true}
                  defaultValue={props.data.postDate}
                ></TextBox>
                <TextBox
                  label="Planned Qty"
                  labelMode="static"
                  readOnly={true}
                  defaultValue={props.data.plannedQty}
                ></TextBox>
              </GroupItem>
              <GroupItem colSpan={2}>
                <TextArea
                  label="Comments"
                  labelMode="floating"
                  defaultValue={comments1}
                  valueChangeEvent="change"
                  onValueChanged={(e) => {
                    setComments1(e.value);
                    //console.log(e.value);
                  }}
                  height={70}
                  editorType="dxTextArea"
                ></TextArea>
              </GroupItem>
            </Form>
          </ValidationGroup>
          <br />
        </SoftBox>
        <Card>
          <SoftBox ml={5} mr={5} mb={5} mt={0}>
            <DataGrid
              dataSource={props.data.poLines}
              keyExpr="id"
              showBorders={true}
              onSelectionChanged={(e) => {
                console.log("e", e);
              }}
              allowColumnResizing={true}
              columnAutoWidth={true}
              defaultSelectionFilter={selectionFilter}
            >
              <Selection
                mode="multiple"
                deferred={true}
                showCheckBoxesMode={checkBoxesMode}
              />
              <FilterRow visible={true} />
              <HeaderFilter visible={true} allowSearch={true} />
              <Scrolling rowRenderingMode="virtual" />

              <Paging enabled={false} />
              <Sorting mode="multiple" />
              <Editing
                mode="cell"
                useIcons={true}
                allowUpdating={true}
                allowDeleting={true}
              />

              <Column
                dataField="itemCode"
                caption="Item Code"
                allowEditing={false}
                alignment="center"
              />
              <Column
                dataField="itemName"
                caption="Item Name"
                allowEditing={false}
                alignment="center"
              />
              <Column
                dataField="warehouse"
                caption="Warehouse"
                allowEditing={false}
                alignment="center"
              />
              <Column
                dataField="plannedQty"
                caption="Planned Qty"
                alignment="center"
                allowEditing={true}
              />
              <Column
                dataField="uomCode"
                caption="UOM Code"
                allowEditing={false}
                alignment="center"
              />
              <Column
                dataField="ocrCode"
                caption="OCR Code"
                allowEditing={false}
                alignment="center"
              />
              <Column
                dataField="project"
                caption="Project Code"
                allowEditing={false}
                alignment="center"
              />
            </DataGrid>
            <SoftBox style={{ display: "flex" }} mt={4}>
              <SoftBox>
                <SoftButton
                  onClick={addITR}
                  variant="contained"
                  color="info"
                  style={{
                    backgroundColor: "#0B2F8A",
                    boxShadow: " 0px 8px 24px -2px rgba(11, 47, 138, 0.6)",
                    marginLeft: "20px",
                  }}
                >
                  Add ITR
                </SoftButton>
                <SoftButton
                  component={Link}
                  to="/user-dashboard"
                  variant="contained"
                  color="info"
                  style={{
                    backgroundColor: "#0B2F8A",
                    boxShadow: " 0px 8px 24px -2px rgba(11, 47, 138, 0.6)",
                    marginLeft: "30px",
                  }}
                >
                  Cancel
                </SoftButton>
              </SoftBox>
            </SoftBox>
          </SoftBox>
        </Card>
      </Card>
    );
  }
  // Handling Grid box open close and its values:::
  //Series API Grid Opened
  const dataGridOnSelectionChanged1 = (e) => {
    setGridBoxValue1(e.selectedRowKeys);
    setSeriesid(e.selectedRowsData[0].series);
    setIsGridBoxOpened1(false);
  };
  const syncDataGridSelection1 = (e) => {
    setGridBoxValue1(e.value);
  };
  function gridBoxDisplayExpr1(item) {
    return item && `${item.series} -- ${item.seriesName}`;
  }
  const onGridBoxOpened1 = (e) => {
    if (e.name === "opened") {
      setIsGridBoxOpened1(e.value);
    }
  };
  //Warehouse API Grid Opened
  const dataGridOnSelectionChanged = (e) => {
    setGridBoxValue(e.selectedRowKeys);
    setWhsid(e.selectedRowsData[0].whsCode);
    setIsGridBoxOpened(false);
  };
  const syncDataGridSelection = (e) => {
    setGridBoxValue(e.value);
  };
  function gridBoxDisplayExpr(item) {
    return item && `${item.whsCode} -- ${item.whsName}`;
  }
  const onGridBoxOpened = (e) => {
    if (e.name === "opened") {
      setIsGridBoxOpened(e.value);
    }
  };
  const StartButton = () => {
    return (
      <SoftTypography
        mb={1}
        mt={1}
        style={{
          color: "#0B2F8A",
          fontWeight: "700",
          fontSize: "24px",
          lineHeight: "10px",
          letterSpacing: 1,
        }}
      >
        Production Order List
      </SoftTypography>
    );
  };

  return loading ? (
    <PageLoader />
  ) : headerList[0] === undefined ? (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3} mb={15} textAlign="center">
        <StartButton />
        <SoftBox ml={2} mr={2} mb={6} mt={6}>
          <Card>
            <SoftBox textAlign="center" mt={3} mb={4} ml={4} mr={4}>
              <ValidationGroup>
                <Form
                  colCount={2}
                  labelMode="floating"
                  labelLocation="left"
                  onContentReady={validateForm}
                >
                  <GroupItem caption="Enter the Details">
                    <DateBox
                      label="From Document Date"
                      labelMode="floating"
                      type="date"
                      displayFormat="yyyy-MM-dd"
                      showClearButton={true}
                      defaultValue={fromDateOne}
                      valueChangeEvent="change"
                      onValueChanged={(e) => {
                        // console.log(e.value);
                        setFromDateOne(e.value);
                      }}
                    ></DateBox>
                    <br />
                    <DateBox
                      label="To Document Date"
                      labelMode="floating"
                      displayFormat="yyyy-MM-dd"
                      showClearButton={true}
                      defaultValue={toDateTwo}
                      valueChangeEvent="change"
                      min={min1}
                      onValueChanged={(e) => {
                        setToDateTwo(e.value);
                        // console.log(e.value);
                      }}
                    ></DateBox>
                    <br />
                    <TextBox
                      label="Document Number"
                      labelMode="floating"
                      defaultValue={docNum}
                      onValueChanged={(e) => {
                        setDocNum(e.value);
                        // console.log(e.value);
                      }}
                    >
                      <Validator>
                        <NumericRule message="Enter only Numbers" />
                      </Validator>
                    </TextBox>
                  </GroupItem>
                  <GroupItem caption="Select the Details">
                    <SelectBox
                      dataSource={orderStatus}
                      label="Order Status"
                      labelMode="floating"
                      defaultValue={status}
                      onValueChanged={(e) => {
                        setStatus(e.value);
                        //console.log(e.value);
                      }}
                    />
                    <br />
                    <DropDownBox
                      label="Series"
                      labelMode="floating"
                      opened={isGridBoxOpened1}
                      value={seriesid}
                      dataSource={seriesAPIList}
                      wordWrapEnabled={true}
                      selectByClick={true}
                      valueExpr="series"
                      displayExpr={gridBoxDisplayExpr1}
                      onValueChanged={syncDataGridSelection1}
                      onOptionChanged={onGridBoxOpened1}
                    >
                      <DataGrid
                        dataSource={seriesAPIList}
                        columns={gridColumnsSeries}
                        wordWrapEnabled={true}
                        hoverStateEnabled={true}
                        height="100%"
                        selectedRowKeys={seriesid}
                        onSelectionChanged={dataGridOnSelectionChanged1}
                      >
                        <Selection mode="single" />
                        <Scrolling mode="virtual" />
                        <Paging enabled={true} pageSize={10} />
                        <FilterRow visible={true} />
                      </DataGrid>
                    </DropDownBox>

                    <br />
                    <DropDownBox
                      label="Warehouse"
                      labelMode="floating"
                      value={whsid}
                      opened={isGridBoxOpened}
                      dataSource={whsAPIList}
                      wordWrapEnabled={true}
                      selectByClick={true}
                      valueExpr="whsCode"
                      displayExpr={gridBoxDisplayExpr}
                      onValueChanged={syncDataGridSelection}
                      onOptionChanged={onGridBoxOpened}
                    >
                      <DataGrid
                        dataSource={whsAPIList}
                        columns={gridColumnsWhs}
                        wordWrapEnabled={true}
                        hoverStateEnabled={true}
                        height="100%"
                        selectedRowKeys={whsid}
                        onSelectionChanged={dataGridOnSelectionChanged}
                      >
                        {" "}
                        <Selection mode="single" />
                        <Scrolling mode="virtual" />
                        <Paging enabled={true} pageSize={10} />
                        <FilterRow visible={true} />
                      </DataGrid>
                    </DropDownBox>
                    <br />
                  </GroupItem>
                </Form>
              </ValidationGroup>
            </SoftBox>
          </Card>
          <SoftBox container spacing={1} mt={5}>
            <SoftButton
              onClick={handleProductionOrderFilter}
              variant="contained"
              color="info"
              style={{
                backgroundColor: "#0B2F8A",
                boxShadow: " 0px 8px 24px -2px rgba(11, 47, 138, 0.6)",
              }}
            >
              Apply Filter
            </SoftButton>
          </SoftBox>
        </SoftBox>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  ) : (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3} mb={15} textAlign="center">
        <StartButton />
        <SoftBox ml={2} mr={2} mb={6} mt={6}>
          <Card>
            <SoftBox textAlign="center" mt={3} mb={4} ml={4} mr={4}>
              <ValidationGroup>
                <Form
                  colCount={2}
                  labelMode="floating"
                  labelLocation="left"
                  onContentReady={validateForm}
                >
                  <GroupItem caption="Enter the Details">
                    <DateBox
                      label="From Document Date"
                      labelMode="floating"
                      type="date"
                      displayFormat="yyyy-MM-dd"
                      showClearButton={true}
                      defaultValue={fromDateOne}
                      valueChangeEvent="change"
                      onValueChanged={(e) => {
                        //  console.log(e.value);
                        setFromDateOne(e.value);
                      }}
                    ></DateBox>
                    <br />
                    <DateBox
                      label="To Document Date"
                      labelMode="floating"
                      displayFormat="yyyy-MM-dd"
                      showClearButton={true}
                      defaultValue={toDateTwo}
                      valueChangeEvent="change"
                      min={min1}
                      onValueChanged={(e) => {
                        setToDateTwo(e.value);
                        // console.log(e.value);
                      }}
                    ></DateBox>
                    <br />
                    <TextBox
                      label="Document Number"
                      labelMode="floating"
                      defaultValue={docNum}
                      onValueChanged={(e) => {
                        setDocNum(e.value);
                        // console.log(e.value);
                      }}
                    >
                      <Validator>
                        <NumericRule message="Enter only Numbers" />
                      </Validator>
                    </TextBox>
                  </GroupItem>
                  <GroupItem caption="Select the Details">
                    <SelectBox
                      dataSource={orderStatus}
                      label="Order Status"
                      labelMode="floating"
                      defaultValue={status}
                      onValueChanged={(e) => {
                        setStatus(e.value);
                        // console.log(e.value);
                      }}
                    />
                    <br />
                    <DropDownBox
                      label="Series"
                      labelMode="floating"
                      opened={isGridBoxOpened1}
                      value={seriesid}
                      dataSource={seriesAPIList}
                      wordWrapEnabled={true}
                      selectByClick={true}
                      valueExpr="series"
                      displayExpr={gridBoxDisplayExpr1}
                      onValueChanged={syncDataGridSelection1}
                      onOptionChanged={onGridBoxOpened1}
                    >
                      <DataGrid
                        dataSource={seriesAPIList}
                        columns={gridColumnsSeries}
                        wordWrapEnabled={true}
                        hoverStateEnabled={true}
                        height="100%"
                        selectedRowKeys={seriesid}
                        onSelectionChanged={dataGridOnSelectionChanged1}
                      >
                        <Selection mode="single" />
                        <Scrolling mode="virtual" />
                        <Paging enabled={true} pageSize={10} />
                        <FilterRow visible={true} />
                      </DataGrid>
                    </DropDownBox>

                    <br />
                    <DropDownBox
                      label="Warehouse"
                      labelMode="floating"
                      value={whsid}
                      opened={isGridBoxOpened}
                      dataSource={whsAPIList}
                      wordWrapEnabled={true}
                      selectByClick={true}
                      valueExpr="whsCode"
                      displayExpr={gridBoxDisplayExpr}
                      onValueChanged={syncDataGridSelection}
                      onOptionChanged={onGridBoxOpened}
                    >
                      <DataGrid
                        dataSource={whsAPIList}
                        columns={gridColumnsWhs}
                        wordWrapEnabled={true}
                        hoverStateEnabled={true}
                        height="100%"
                        selectedRowKeys={whsid}
                        onSelectionChanged={dataGridOnSelectionChanged}
                      >
                        {" "}
                        <Selection mode="single" />
                        <Scrolling mode="virtual" />
                        <Paging enabled={true} pageSize={10} />
                        <FilterRow visible={true} />
                      </DataGrid>
                    </DropDownBox>
                    <br />
                  </GroupItem>
                </Form>
              </ValidationGroup>
            </SoftBox>
          </Card>
          <SoftBox container spacing={1} mt={5}>
            <SoftButton
              onClick={handleProductionOrderFilter}
              variant="contained"
              color="info"
              style={{
                backgroundColor: "#0B2F8A",
                boxShadow: " 0px 8px 24px -2px rgba(11, 47, 138, 0.6)",
              }}
            >
              Apply Filter
            </SoftButton>
          </SoftBox>
        </SoftBox>

        <SoftTypography
          mb={5}
          mt={7}
          ml={3}
          mr={3}
          style={{
            color: "#0B2F8A",
            fontWeight: "700",
            fontSize: "24px",
            lineHeight: "10px",
            letterSpacing: 1,
          }}
        >
          Your Production Orders
        </SoftTypography>

        <SoftBox ml={1} mr={1} mb={6} mt={6}>
          <Card>
            <SoftBox ml={4} mr={4} mb={4} mt={4}>
              <DataGrid
                dataSource={headerList}
                keyExpr="id"
                showBorders={true}
                allowColumnResizing={true}
                onSelectionChanged={(e) => {
                  console.log("e", e);
                  console.log("selectedRows", e.selectedRowsData);
                }}
                columnAutoWidth={true}
              >
                <FilterRow visible={true} />
                <HeaderFilter visible={true} allowSearch={true} />
                <Scrolling columnRenderingMode="virtual"></Scrolling>
                <Paging defaultPageSize={10} />
                <Sorting mode="multiple" />
                <LoadPanel enabled={state.loadPanelEnabled} />
                <Column
                  dataField="docNum"
                  caption="Doc Num"
                  alignment="center"
                />
                <Column
                  dataField="postDate"
                  caption="Post Date"
                  dataType="date"
                  displayFormat="dd-MM-yyyy"
                  alignment="center"
                />
                <Column
                  dataField="itemCode"
                  caption="Item Code"
                  alignment="center"
                />
                <Column
                  dataField="itemName"
                  caption="Item Name"
                  alignment="center"
                />
                <Column
                  dataField="warehouse"
                  caption="Warehouse"
                  alignment="center"
                />
                <Column
                  dataField="plannedQty"
                  caption="Planned Qty"
                  dataType="number"
                  alignment="center"
                />
                <MasterDetail
                  enabled={true}
                  autoExpandAll={false}
                  caption="id"
                  render={masterDataDetail}
                />
              </DataGrid>
            </SoftBox>
          </Card>
        </SoftBox>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
};

export default ProductionOrderList;
