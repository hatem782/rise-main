import React, { useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Divider } from "primereact/divider";

import {
  UserImgComponent,
  DetailBoolItem,
  DetailItem,
} from "../../../../MyComponents/UserDisplay/SupplierCard";

import DelTalent from "./DelTalent";
import { init_talent } from "../../../../redux/talents/talent.reducer";
import { Image } from "primereact/image";

function ShowTalent(props) {
  const { open, handleClose, title = "Showing Talent", value } = props;
  const {
    firstName,
    sureName,
    profession,
    city,
    country,
    postal_code,
    phone,
    email,
    career_description,
    additional_data,
  } = value || init_talent;

  //-------------------------------- Dialog States --------------------------------------------
  const [suppDialogue, setSuppDialog] = useState(false);
  const openSuppDialogue = () => {
    setSuppDialog(true);
  };

  const handleClose2 = () => {
    setSuppDialog(false);
    handleClose();
  };
  //-------------------------------- Dialog States -------------------------------

  return (
    <Dialog
      visible={open}
      style={{ width: "600px" }}
      header={title}
      modal
      className="p-fluid"
      onHide={handleClose}
    >
      {suppDialogue && (
        <DelTalent
          open={suppDialogue}
          handleClose={handleClose2}
          value={value}
          title={`Delete Talent ${firstName} ${sureName}`}
          callBack={handleClose}
        />
      )}

      <UserImgComponent
        firstName={firstName || "N"}
        lastName={sureName || "N"}
        avatar={null}
      />
      <h4 className=" text-800  text-center mt-0 ">
        {firstName && sureName ? `${firstName} ${sureName}` : "Not Available"}
      </h4>
      {/* <SupplierProdMonthNumbers color={color} nbProds={253} nbMonths={5} /> */}
      <h4 className=" text-800   mt-6 mb-0 ">Details</h4>
      <Divider className="mt-1 mb-1" />

      <DetailItem label="First Name : " value={firstName || "Not Available"} />
      <DetailItem label="Last Name : " value={sureName || "Not Available"} />
      <DetailItem label="Phone Number : " value={phone || "Not Available"} />
      <DetailItem label="Email : " value={email || "Not Available"} />
      <DetailItem label="City : " value={city || "Not Available"} />
      <DetailItem label="Country : " value={country || "Not Available"} />
      <DetailItem label="Profetion : " value={profession || "Not Available"} />
      <DetailItem
        label="Postal Code : "
        value={postal_code || "Not Available"}
      />

      <h4 className=" text-800   mt-4 mb-0 ">Career Description</h4>
      <Divider className="mt-1 mb-1" />

      <p dangerouslySetInnerHTML={{ __html: career_description }}></p>

      <h4 className=" text-800   mt-4 mb-0 ">Additional Data</h4>
      <Divider className="mt-1 mb-1" />

      <p dangerouslySetInnerHTML={{ __html: additional_data }}></p>

      <h4 className=" text-800   mt-4 mb-0 ">Actions</h4>
      <Divider className="mt-1 mb-1" />

      <div className=" flex align-items-center justify-content-evenly mt-4 ">
        <Button // Delete Account
          icon="pi pi-trash"
          label="Delete Account"
          className="p-button-danger mx-2"
          onClick={openSuppDialogue}
        />
      </div>
    </Dialog>
  );
}

export default ShowTalent;
