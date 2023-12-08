import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";

import { useSelector, useDispatch } from "react-redux";
import { GetAllCompanies } from "../../../redux/company/company.actions";

import Badge from "../../../MyComponents/DataDisplay/Badge";
import Pagination from "../../../MyComponents/Pagination/Pagination";

import DelComp from "./popups/DelComp";
import ShowCompany from "./popups/ShowCompany";

import AvatarComponent from "../../../MyComponents/DataDisplay/Avatar";
import FilterComp from "./Filter";
import { useHistory } from "react-router-dom";
import { InitialState } from "../../../redux/company/company.reducer";

const init_filter = {
  pays: "",
  approved: "",
  name: "",
};

const GestCompanies = () => {
  let emptyItem = { ...InitialState };

  const comps = useSelector((state) => state.CompanyReducer.companies);
  const dispatch = useDispatch();
  const history = useHistory();
  const [Item, setItem] = useState(emptyItem);

  //-------------------------------- Pagin & Filter --------------------------------------------
  const [page, setPage] = useState({ p: 0, l: 10 });
  const max = 10;

  const [Filter, setFilter] = useState({ ...init_filter });
  //-------------------------------- Dialog States --------------------------------------------
  const [suppDialogue, setSuppDialog] = useState(false);
  const [shoMDialogue, setShoMDialog] = useState(false);

  const dt = useRef(null);

  //-------------------------------- Get Data --------------------------------------------
  const reloadData = () => {
    dispatch(GetAllCompanies());
  };

  useEffect(() => {
    reloadData();
  }, [Filter]);
  //-------------------------------- Handle Opens -------------------------------

  const openSuppDialogue = (row) => {
    setSuppDialog(true);
    setItem({ ...row });
  };

  const openShoMDialogue = (row) => {
    setShoMDialog(true);
    setItem({ ...row });
  };

  //-------------------------------- Handle Close -------------------------------
  const handleClose = () => {
    setItem({ ...emptyItem });
    setSuppDialog(false);
    setShoMDialog(false);
  };

  const GoToJobsPageByCompany = (row) => {
    history.push(`/dashboard/job/${row._id}`);
  };

  //-------------------------------- Header of Page -------------------------------

  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <h5 className="m-0 mr-2">Manage Companies</h5>
      </React.Fragment>
    );
  };

  const rightToolbarTemplate = () => {
    return (
      <React.Fragment>
        <div className="my-2">
          <Button
            label="Reload Data"
            icon="pi pi-refresh"
            className="p-button-primary mr-2"
            onClick={reloadData}
          />
        </div>
      </React.Fragment>
    );
  };

  //------------------------------------------- COLUMNS VALUES ----------------------------------------------

  const ShowMain = (row) => {
    console.log(row.logo_photo);
    return (
      <div className=" flex ">
        <AvatarComponent
          src={`${row.logo_photo}`}
          name={row.name[0]}
          lastname={row.name[1]}
        />
        <div className=" flex flex-column justify-content-center ml-2  ">
          <span className=" font-semibold ">{`${row.name}`}</span>
          <span className=" text-600 ">{row.email}</span>
        </div>
      </div>
    );
  };

  const PhoneColumnValue = (row) => {
    return `${row?.telephoneNumber}`;
  };

  const Pays = (row) => {
    return `${row?.country}-${row?.city}`;
  };

  const JobsNumbers = (row) => {
    return <Badge type="green">{row.jobs.length || 0} Jobs</Badge>;
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
          tooltip="Show Details Company"
          tooltipOptions={{ position: "bottom" }}
          className="p-button-rounded p-button-text p-button-info mr-0"
          onClick={() => openShoMDialogue(row)}
        />

        <Button
          icon="pi pi-list"
          tooltip="Show Jobs"
          tooltipOptions={{ position: "bottom" }}
          className="p-button-rounded p-button-text p-button-success mr-0"
          onClick={() => GoToJobsPageByCompany(row)}
        />

        <Button
          icon="pi pi-trash"
          tooltip="Delete Company"
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
            <DelComp
              open={suppDialogue}
              handleClose={handleClose}
              value={Item}
              title={`Delete the company ${Item.name}`}
            />
          )}

          {Item && shoMDialogue && (
            <ShowCompany
              open={shoMDialogue}
              handleClose={handleClose}
              value={Item}
              title={Item.name}
            />
          )}

          <DataTable
            ref={dt}
            value={[...comps]}
            dataKey="_id"
            className="datatable-responsive"
            emptyMessage="No company found."
            header={
              <FilterComp init_filter={init_filter} setFilter={setFilter} />
            }
            responsiveLayout="scroll"
          >
            <Column header="Company" body={ShowMain} />
            <Column
              field="phoneNumber"
              header="Phone Number"
              body={PhoneColumnValue}
            />
            <Column field="pays" header="Pays" body={Pays} />
            <Column field="suspended" header="Jobs Number" body={JobsNumbers} />
            <Column body={actionBodyTemplate} />
          </DataTable>
          <Pagination max={max} onPageChange={setPage} />
        </div>
      </div>
    </div>
  );
};

export default GestCompanies;
