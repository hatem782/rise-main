import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";

import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { GetAllTalents } from "../../../redux/talents/talent.actions";

import Badge from "../../../MyComponents/DataDisplay/Badge";
import Pagination from "../../../MyComponents/Pagination/Pagination";

import DelTalent from "./popups/DelTalent";
import ShowTalent from "./popups/ShowTalent";

import AvatarComponent from "../../../MyComponents/DataDisplay/Avatar";
import FilterComp from "./Filter";

import { init_talent } from "../../../redux/talents/talent.reducer";

const init_filter = {
  // email:"",
  pays: "",
  suspended: "",
  verified: "",
};

const GestTalents = () => {
  const talents = useSelector((state) => state.TalentReducer.talents);
  const dispatch = useDispatch();
  const histo = useHistory();

  const [Item, setItem] = useState({ ...init_talent });

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
    dispatch(GetAllTalents(Filter));
  };

  useEffect(() => {
    reloadData();
  }, [Filter]);
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
    setItem({ ...init_talent });
    setShoSDialog(false);
    setSuppDialog(false);
  };

  //-------------------------------- Header of Page -------------------------------

  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <h5 className="m-0 mr-2">Manage Talents</h5>
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
          circle={true}
          name={row?.firstName || "N"}
          lastname={row?.sureName || "N"}
        />
        <div className=" flex flex-column justify-content-center ml-2  ">
          <span className=" font-semibold ">{`${row?.firstName || "N"} ${
            row?.sureName || "N"
          }`}</span>
          <span className=" text-600 ">{row.email}</span>
        </div>
      </div>
    );
  };

  const PhoneColumnValue = (row) => {
    return `${row?.phone}`;
  };

  const Pays = (row) => {
    return row?.city + " / " + row?.country;
  };

  const Profession = (row) => {
    return <Badge type={"green"}>{row?.profession}</Badge>;
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
          tooltip="View Talent"
          tooltipOptions={{ position: "bottom" }}
          className="p-button-rounded p-button-text p-button-help mr-0"
          onClick={() => openShoSDialogue(row)}
        />
        <Button
          icon="pi pi-trash"
          tooltip="Delete Talent"
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
            <DelTalent
              open={suppDialogue}
              handleClose={handleClose}
              value={Item}
              title={`Delete the Talent ${Item.firstName} ${Item.sureName}`}
            />
          )}

          {Item && shoSDialogue && (
            <ShowTalent
              open={shoSDialogue}
              handleClose={handleClose}
              value={Item}
              title={`Talent ${Item.firstName} ${Item.sureName}`}
            />
          )}

          <DataTable
            ref={dt}
            value={[...talents]}
            dataKey="_id"
            className="datatable-responsive"
            emptyMessage="No Talent found."
            header={
              <FilterComp init_filter={init_filter} setFilter={setFilter} />
            }
            responsiveLayout="scroll"
          >
            <Column header="Talent" body={ShowMain} />
            <Column
              field="phoneNumber"
              header="Phone Number"
              body={PhoneColumnValue}
            />
            <Column field="pays" header="Pays" body={Pays} />
            <Column field="suspended" header="Profession" body={Profession} />
            <Column body={actionBodyTemplate} />
          </DataTable>
          <Pagination max={max} onPageChange={setPage} />
        </div>
      </div>
    </div>
  );
};

export default GestTalents;
