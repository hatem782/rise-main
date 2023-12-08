import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";

import { useDispatch, useSelector } from "react-redux";
import { DeleteCompany } from "../../../../redux/company/company.actions";
import { toast } from "react-hot-toast";
import usePopupSize from "../../../../hooks/usePopupSize";

function DelComp(props) {
  const { open, handleClose, title = "Delete Item", value } = props;
  const payload = useSelector((state) => state.CompanyReducer.payload);

  const [nom, setNom] = useState("");
  const dispatch = useDispatch();
  const size = usePopupSize();

  const handleSubmit = () => {
    if (value.name !== nom) {
      toast.error("Verify Company Name");
      return false;
    }
    dispatch(DeleteCompany(value, handleClose));
  };

  const DialogFooter = (
    <>
      <Button
        label="Cancel"
        icon="pi pi-times"
        className="p-button-outlined"
        onClick={handleClose}
        disabled={payload}
      />
      <Button
        label="Delete"
        icon="pi pi-check"
        className="p-button-danger"
        onClick={handleSubmit}
        disabled={payload}
      />
    </>
  );

  return (
    <Dialog
      visible={open}
      style={{ width: size }}
      header={title}
      modal
      className="p-fluid"
      footer={DialogFooter}
      onHide={handleClose}
    >
      <div className="flex align-items-center justify-content-start">
        <i
          className="pi pi-exclamation-triangle mr-3"
          style={{ fontSize: "2rem" }}
        />
        <span>
          Are you sure you want to delete <b>"{value.name}" </b>? rewrite the
          company name to confirm the delete
        </span>
        <br />
      </div>

      <div className="grid w-100 mt-2">
        <div className="field col-12 md:col-12">
          <label>Company Name*</label>
          <InputText
            value={nom}
            onChange={(e) => {
              setNom(e.target.value);
            }}
            required
            autoFocus
          />
        </div>
      </div>
    </Dialog>
  );
}

export default DelComp;
