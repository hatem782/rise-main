import React, { useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Divider } from "primereact/divider";

import {
  UserImgComponent,
  DetailItem,
  DetailBoolItem,
} from "../../../../MyComponents/UserDisplay/SupplierCard";

import DelJob from "./DelJob";
import { init_talent } from "../../../../redux/talents/talent.reducer";
import { DateParser } from "../../../../functions/DateFunctions";

function ShowTalent(props) {
  const { open, handleClose, title = "Showing Talent", value } = props;
  const {
    job_title,
    work_type,
    job_location,
    job_type,
    job_deadline_apply,
    with_cover,
    description_job,
    status,
    candidates = [],
    company_id,
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
        <DelJob
          open={suppDialogue}
          handleClose={handleClose2}
          value={value}
          title={`Delete Job ${job_title}`}
          callBack={handleClose}
        />
      )}

      <UserImgComponent
        firstName={job_title[0] || "N"}
        lastName={job_title[1] || "N"}
        avatar={null}
      />
      <h4 className=" text-800  text-center mt-0 ">
        {job_title ? `${job_title}` : "Not Available"}
      </h4>

      <h4 className=" text-800   mt-6 mb-0 ">Details</h4>
      <Divider className="mt-1 mb-1" />

      <DetailItem label="Job Title : " value={job_title || "Not Available"} />
      <DetailItem
        label="Job Location : "
        value={job_location || "Not Available"}
      />
      <DetailItem
        label="Company : "
        value={company_id?.name || "Not Available"}
      />
      <DetailItem
        label="Job Type : "
        value={`${work_type} / ${job_type}` || "Not Available"}
      />

      <DetailItem
        label="Deadline : "
        value={DateParser(job_deadline_apply) || "Not Available"}
      />

      <DetailBoolItem
        label="Number of condidates : "
        value={true}
        TrueTxt={candidates?.length || 0}
        FalseTxt="Without Cover"
      />

      <DetailBoolItem
        label="Cover Letter : "
        value={!with_cover}
        TrueTxt="With Cover"
        FalseTxt="Without Cover"
      />
      <DetailItem label="Status : " value={status || "Not Available"} />

      <h4 className=" text-800   mt-4 mb-0 ">Job Description</h4>
      <Divider className="mt-1 mb-1" />

      <p dangerouslySetInnerHTML={{ __html: description_job }}></p>

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
