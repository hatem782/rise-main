import React from "react";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";

import default_img from "../../../assets/images/default.jpg";

function Universities() {
  return (
    <>
      <div className="card">
        <h5>Recent Joined Universities</h5>
        <DataTable value={univs} rows={3} paginator responsiveLayout="scroll">
          <Column
            header="Logo"
            body={(data) => (
              <img
                className="shadow-2"
                src={data.img}
                alt={data.label}
                width="50"
              />
            )}
          />
          <Column
            field="label"
            header="Label"
            sortable
            style={{ width: "35%" }}
          />
          <Column
            field="location"
            header="Location"
            sortable
            style={{ width: "35%" }}
          />
          <Column
            header="View"
            style={{ width: "15%" }}
            body={() => (
              <>
                <Button
                  icon="pi pi-search"
                  type="button"
                  className="p-button-text"
                />
              </>
            )}
          />
        </DataTable>
      </div>
    </>
  );
}

const univs = [
  {
    img: default_img,
    label: "University",
    location: "France",
  },
  {
    img: default_img,
    label: "University",
    location: "France",
  },
  {
    img: default_img,
    label: "University",
    location: "France",
  },
  {
    img: default_img,
    label: "University",
    location: "France",
  },
  {
    img: default_img,
    label: "University",
    location: "France",
  },
  {
    img: default_img,
    label: "University",
    location: "France",
  },
];

export default Universities;
