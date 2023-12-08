import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Divider } from "primereact/divider";

import { useSelector } from "react-redux";
import {
  UserImgComponent,
  DetailItem,
} from "../../../../MyComponents/UserDisplay/SupplierCard";

import DelComp from "./DelComp";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function ShowCompany(props) {
  const { open, handleClose, title = "Showing Company", value } = props;
  const history = useHistory();
  const manager = useSelector((state) => state.CompanyReducer.manager);

  //-------------------------------- Dialog States --------------------------------------------
  const [suppDialogue, setSuppDialog] = useState(false);
  const openSuppDialogue = () => {
    setSuppDialog(true);
  };
  const handleClose2 = () => {
    setSuppDialog(false);
    handleClose();
  };

  const GoToJobsPageByCompany = (row) => {
    history.push(`/dashboard/jobs/${row._id}`);
  };
  //-------------------------------- Dialog States -------------------------------

  useEffect(() => {
    console.log(manager);
  }, [manager]);

  return (
    <Dialog
      visible={open}
      style={{ width: "900px" }}
      header={title}
      modal
      className="p-fluid"
      onHide={handleClose}
    >
      {suppDialogue && (
        <DelComp
          open={suppDialogue}
          handleClose={handleClose2}
          value={value}
          title={`Delete the Manager`}
          callBack={handleClose}
        />
      )}

      <div className=" flex align-items-center justify-content-evenly ">
        <div style={{ width: "50%" }} className="pl-2 pr-2">
          <UserImgComponent
            firstName={(value?.name || "N")[0]}
            lastName={(value?.name || "N")[1]}
            // avatar={value.logo_photo}
          />
          <h4 className=" text-800  text-center mt-0 ">{value.name}</h4>

          <h4 className=" text-800   mt-3 mb-0 ">About Company</h4>
          <Divider className="mt-1" />
          <p className="">{value.about}</p>
        </div>
        <div style={{ width: "50%" }} className="pl-2 pr-2">
          <h4 className=" text-800   mt-3 mb-0 ">Details</h4>
          <Divider className="mt-1" />

          <DetailItem
            label="Company Name : "
            value={value.name || "Not Available"}
          />
          <DetailItem
            label="Phone Number : "
            value={value.telephoneNumber || "Not Available"}
          />
          <DetailItem label="Email : " value={value.email || "Not Available"} />
          <DetailItem
            label="Country/City : "
            value={`${value.country} - ${value.city}`}
          />
          <DetailItem label="Creation Year : " value={value.year} />
          <DetailItem label="Number of employees : " value={value.number} />
          <DetailItem label="Certification : " value={value.certification} />
          <DetailItem label="Url : " value={value.url} />
          <DetailItem label="LinkedIn : " value={value.urlLinkedIn} />
          <DetailItem label="Int Presence : " value={value.intPresence} />
          <DetailItem label="Head office : " value={value.headOffice} />
        </div>
      </div>

      <Divider className="mt-4" />

      <div className=" flex align-items-center justify-content-evenly mt-4 ">
        <Button
          icon="pi pi-list"
          label="Show Company Jobs"
          className="p-button-success mx-2"
          onClick={GoToJobsPageByCompany}
        />
        <Button
          icon="pi pi-trash"
          label="Delete Company"
          className="p-button-danger mx-2"
          onClick={openSuppDialogue}
        />
      </div>
    </Dialog>
  );
}

export default ShowCompany;
