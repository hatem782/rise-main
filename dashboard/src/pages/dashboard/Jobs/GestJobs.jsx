import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";

import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
  GetAllJobs,
  GetJobsByCompanyUd,
} from "../../../redux/jobs/jobs.actions";

import Badge from "../../../MyComponents/DataDisplay/Badge";
import Pagination from "../../../MyComponents/Pagination/Pagination";

import DelJob from "./popups/DelJob";
import ShowJob from "./popups/ShowJob";

import AvatarComponent from "../../../MyComponents/DataDisplay/Avatar";
import FilterComp from "./Filter";

import { init_job } from "../../../redux/jobs/jobs.reducer";

const init_filter = {
  // email:"",
  pays: "",
  suspended: "",
  verified: "",
};

const GestJobs = () => {
  const jobs = useSelector((state) => state.JobReducer.jobs);
  const dispatch = useDispatch();
  const params = useParams();
  console.log(params);

  const [Item, setItem] = useState({ ...init_job });

  //-------------------------------- Pagin & Filter --------------------------------------------
  const [page, setPage] = useState({ p: 0, l: 10 });
  const max = 10;

  const [Filter, setFilter] = useState({ ...init_filter });
  //-------------------------------- Dialog States --------------------------------------------
  const [suppDialogue, setSuppDialog] = useState(false);
  const [shoSDialogue, setShoSDialog] = useState(false);
  const dt = useRef(null);

  //-------------------------------- Get Data --------------------------------------------
  const reloadData = () => {
    if (params?.comp_id?.length > 0) {
      dispatch(GetJobsByCompanyUd(Filter, params?.comp_id));
    } else {
      dispatch(GetAllJobs(Filter));
    }
  };

  useEffect(() => {
    reloadData();
  }, [Filter, params]);
  //-------------------------------- Handle Opens -------------------------------

  const openSuppDialogue = (row) => {
    setSuppDialog(true);
    setItem({ ...row });
  };

  const openShoSDialogue = (row) => {
    setShoSDialog(true);
    setItem({ ...row });
  };

  //-------------------------------- Handle Close -------------------------------
  const handleClose = () => {
    setItem({ ...init_job });
    setShoSDialog(false);
    setSuppDialog(false);
  };

  //-------------------------------- Header of Page -------------------------------

  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <h5 className="m-0 mr-2">Manage Jobs</h5>
      </React.Fragment>
    );
  };

  const rightToolbarTemplate = () => {
    return (
      <React.Fragment>
        <div className="my-2">
          <Button
            icon="pi pi-refresh"
            className="p-button-primary mr-2"
            onClick={reloadData}
            label="Reaload Data"
          />
        </div>
      </React.Fragment>
    );
  };

  //------------------------------------------- COLUMNS VALUES ----------------------------------------------

  const ShowMain = (row) => {
    return (
      <div className=" flex ">
        <AvatarComponent
          src={null}
          circle={false}
          name={row?.job_title[0] || "N"}
          lastname={row?.job_title[1] || "N"}
        />
        <div className=" flex flex-column justify-content-center ml-2  ">
          <span className=" font-semibold ">{`${row?.job_title || "N"}`}</span>
          <span className=" text-600 ">{row?.company_id?.name}</span>
        </div>
      </div>
    );
  };

  const WorkType = (row) => {
    return `${row.job_type} / ${row?.work_type}`;
  };

  const JobLocation = (row) => {
    return row?.job_location;
  };

  const Status = (row) => {
    return <Badge type={"green"}>{row?.status}</Badge>;
  };

  const Candidates = (row) => {
    return (
      <Badge type={"red"}>{row?.candidates?.length || 0} Condidates</Badge>
    );
  };

  const actionBodyTemplate = (row) => {
    return (
      <div
        className="actions"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <Button
          icon="pi pi-eye"
          tooltip="View Job"
          tooltipOptions={{ position: "bottom" }}
          className="p-button-rounded p-button-text p-button-help mr-0"
          onClick={() => openShoSDialogue(row)}
        />
        <Button
          icon="pi pi-trash"
          tooltip="Delete Job"
          tooltipOptions={{ position: "bottom" }}
          className="p-button-rounded p-button-text p-button-danger mr-0"
          onClick={() => openSuppDialogue(row)}
        />
      </div>
    );
  };

  return (
    <div className="grid crud-demo">
      <div className="col-12">
        <div className="card">
          <Toolbar
            className="mb-4"
            left={leftToolbarTemplate}
            right={rightToolbarTemplate}
          />

          {Item && suppDialogue && (
            <DelJob
              open={suppDialogue}
              handleClose={handleClose}
              value={Item}
              title={`Delete the Job ${Item.job_title}`}
            />
          )}

          {Item && shoSDialogue && (
            <ShowJob
              open={shoSDialogue}
              handleClose={handleClose}
              value={Item}
              title={`Job ${Item.job_title}`}
            />
          )}

          <DataTable
            ref={dt}
            value={[...jobs]}
            dataKey="_id"
            className="datatable-responsive"
            emptyMessage="No Job found."
            header={
              <FilterComp init_filter={init_filter} setFilter={setFilter} />
            }
            responsiveLayout="scroll"
          >
            <Column header="Job" body={ShowMain} />
            <Column field="phoneNumber" header="Job Type" body={WorkType} />
            <Column field="pays" header="Location" body={JobLocation} />
            <Column field="suspended" header="Status" body={Status} />
            <Column
              field="suspended"
              header="Nb Condidates"
              body={Candidates}
            />
            <Column body={actionBodyTemplate} />
          </DataTable>
          <Pagination max={max} onPageChange={setPage} />
        </div>
      </div>
    </div>
  );
};

export default GestJobs;
