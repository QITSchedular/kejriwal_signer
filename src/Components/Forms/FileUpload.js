import React, { useRef, useState } from "react";
import "devextreme-react/text-area";
import Form, { Item, GroupItem, Label } from "devextreme-react/form";
import LabelTemplate from "./LabelTemplate.js";
import LabelNotesTemplate from "./LabelNotesTemplate.js";
import "./FileUpload.css";
import { Button, FileManager, FileUploader, TextBox } from "devextreme-react";

export default function SignerForm() {
  const [selectedFile, setSelectedFile] = useState(null);
  const numberOptions = { mode: "number" };
  const textOptions = { mode: "text" };

  const handleFileSelection = (e) => {
    setSelectedFile(e.value[0]);
  };
  const validateForm = () => {
    console.log("hello");
  };
  const fileUploaderRef = useRef(null);
  const [fileName, setFileName] = useState("");

//   const handleUpload = (e) => {
//     // code to handle button click and show folder picker dialog
//     console.log(e.target.files)
//   };

  return (
    <Form onContentReady={validateForm} id="form">
      <GroupItem caption="Choose File" colCount={2} id="upload_field">
      
        <FileUploader 
        labelText=""
        selectButtonText="Choose a file"
        accept=""
        uploadMode="useForm"
        showFileList={false}
        name={"myFile"}
        onValueChange={handleUpload}
        />
      </GroupItem>

      <GroupItem colCount={2} caption="Set Location">
        <Item editorOptions={numberOptions} dataField="Lower left">
          <Label render={LabelTemplate("spinleft")} />
        </Item>
        <Item editorOptions={numberOptions} dataField="Lower Right">
          <Label render={LabelTemplate("spinright")} />
        </Item>
        <Item editorOptions={numberOptions} dataField="Upper Left">
          <Label render={LabelTemplate("spinup")} />
        </Item>
        <Item editorOptions={numberOptions} dataField="Upper Right">
          <Label render={LabelTemplate("spinup")} />
        </Item>
      </GroupItem>

      <GroupItem colCount={3} caption="Sign Properties">
        <Item dataField="Location">
          <Label render={LabelTemplate("map")} />
        </Item>
        <Item dataField="Reason">
          <Label render={LabelTemplate("help")} />
        </Item>
        <Item dataField="Page No">
          <Label render={LabelTemplate("print")} />
        </Item>
      </GroupItem>

      <GroupItem colCount={2} caption="Choose File">
        <Item dataField="FirstName">
          <Label render={LabelTemplate("user")} />
        </Item>
        <Item dataField="Position" editorType="dxSelectBox">
          <Label render={LabelTemplate("info")} />
        </Item>
        <Item dataField="LastName">
          <Label render={LabelTemplate("user")} />
        </Item>
        <Item dataField="HireDate" editorType="dxDateBox">
          <Label render={LabelTemplate("event")} />
        </Item>
        <Item dataField="BirthDate" editorType="dxDateBox">
          <Label render={LabelTemplate("event")} />
        </Item>
        <Item dataField="Address">
          <Label render={LabelTemplate("home")} />
        </Item>
        <Item dataField="Notes" colSpan={2} editorType="dxTextArea">
          <Label render={LabelNotesTemplate} />
        </Item>
        <Item dataField="Phone">
          <Label render={LabelTemplate("tel")} />
        </Item>
        <Item dataField="Email">
          <Label render={LabelTemplate("email")} />
        </Item>
      </GroupItem>
    </Form>
  );
}
