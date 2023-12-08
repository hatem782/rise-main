import React, { useState, useEffect } from "react";
import { Panel } from "primereact/panel";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";

function SupplierFilter({ init_filter, setFilter }) {
  const [localFilter, setLocalFilter] = useState({ ...init_filter });

  useEffect(() => {
    setFilter({ ...init_filter });
  }, []);

  const handleFilter = (event) => {
    const { name, value } = event.target;
    setLocalFilter({ ...localFilter, [name]: value });
  };

  const resetFilter = () => {
    setLocalFilter({ ...init_filter });
    setFilter({ ...init_filter });
  };

  const Research = () => {
    setFilter({ ...localFilter });
  };

  return (
    <Panel header="Filter Companies" toggleable={true} collapsed={true}>
      <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
        <div className="flex align-items-center flex-wrap ">
          <span className="block m-1 p-input-icon-left">
            <i className="pi pi-search" />
            <InputText
              placeholder="Univ Label"
              type="search"
              name="nom"
              onChange={handleFilter}
              value={localFilter.nom}
            />
          </span>

          <span className="block m-1 p-input-icon-left">
            <Dropdown
              value={localFilter.pays}
              options={[
                { value: "", name: "All Pays" },
                { value: "tunis", name: "Tunis" },
                { value: "France", name: "France" },
              ]}
              onChange={handleFilter}
              className=" w-full "
              name="pays"
              optionLabel="name"
              optionValue="value"
              placeholder="University Pays..."
            />
          </span>

          <span className="block m-1 p-input-icon-left">
            <Dropdown
              value={localFilter.approved}
              options={[
                { value: "", name: "Approved & Not Approved" },
                { value: true, name: "Approved" },
                { value: false, name: "Not Approved" },
              ]}
              onChange={handleFilter}
              className=" w-full "
              name="approved"
              optionLabel="name"
              optionValue="value"
              placeholder="Approved Filter..."
            />
          </span>
        </div>
        <div>
          <Button
            label="Reset"
            className="p-button-outlined p-button-warning mr-2"
            onClick={resetFilter}
          />
          <Button
            label="Search"
            className="p-button-warning mr-2"
            onClick={Research}
          />
        </div>
      </div>
    </Panel>
  );
}

export default SupplierFilter;
