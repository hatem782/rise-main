import React, { useState, useEffect, useMemo } from "react";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";

import { useSelector, useDispatch } from "react-redux";

import { GetAllCompanies } from "../../../redux/company/company.actions";
import { GetAllTalents } from "../../../redux/talents/talent.actions";
import { GetAllSousAdmins } from "../../../redux/sousadmins/sousadmins.actions";

import AvatarComponent from "../../../MyComponents/DataDisplay/Avatar";
import { InputText } from "primereact/inputtext";
import { MultiSelect } from "primereact/multiselect";
import TextEditor from "../../../MyComponents/Inputs/TextEditorQuill/TextEditorQuill";
import { Dropdown } from "primereact/dropdown";
import Badge from "../../../MyComponents/DataDisplay/Badge";
import { toast } from "react-hot-toast";

const MailingPage = () => {
  const [Item, setItem] = useState({
    object: "",
    content: "",
    userType: "user",
  });
  const [multiselectValue, setMultiselectValue] = useState(null);
  const dispatch = useDispatch();
  const companies = useSelector((state) => state.CompanyReducer.companies);
  const talents = useSelector((state) => state.TalentReducer.talents);

  useEffect(() => {
    dispatch(GetAllCompanies());
    dispatch(GetAllTalents());
    dispatch(GetAllSousAdmins());
  }, []);

  const GetAllUsersType = useMemo(() => {
    return () => {
      if (Item.userType === "company") {
        return companies;
      }
      if (Item.userType === "user") {
        return talents;
      }

      if (Item.userType === "all") {
        return [...companies, ...talents];
      }
    };
  }, [Item.userType, companies, talents]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setItem({ ...Item, [name]: value });
  };

  const handle_submit = () => {
    const { object, content } = Item;
    if (!multiselectValue) {
      toast.error("Select at least one user");
      return false;
    }
    if (object === "") {
      toast.error("Subject can't be empty");
      return false;
    }
    if (content === "") {
      toast.error("Content can't be empty");
      return false;
    }

    let usersId = [];
    multiselectValue.forEach((user) => {
      usersId.push(user.id);
    });
    console.log({ object, content, usersId });
    // ########################################## SEND MAIL ACTION ##########################################
    // ########################################## SEND MAIL ACTION ##########################################
    // ########################################## SEND MAIL ACTION ##########################################
    // dispatch(SendManyMails({ object, content, usersId }, handle_reset));
    // ########################################## SEND MAIL ACTION ##########################################
    // ########################################## SEND MAIL ACTION ##########################################
    // ########################################## SEND MAIL ACTION ##########################################
  };

  const handle_reset = () => {
    setItem({ object: "", content: "", userType: "user" });
    setMultiselectValue(null);
  };

  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <h5 className="m-0 mr-2">Send Mails</h5>
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
            onClick={() => {}}
          />
        </div>
      </React.Fragment>
    );
  };

  const UserTupe = ({ is_comp }) => {
    if (is_comp) {
      return <Badge type="green">COMP</Badge>;
    }
    return <Badge type="blue">TAL</Badge>;
  };

  const itemTemplate = (option) => {
    if (option) {
      return (
        <div className=" flex ">
          <AvatarComponent
            src={null}
            circle={true}
            name={option?.firstName || option.name || "N"}
            lastname={option?.lastName || ""}
          />
          <div className=" flex flex-column justify-content-center ml-2  ">
            <span className=" font-semibold ">
              {`${option?.firstName || option.name || "N"} ${
                option?.lastName || ""
              }`}{" "}
              <UserTupe is_comp={option.name !== undefined} />
            </span>
            <span className=" text-600 ">{option.email}</span>
          </div>
        </div>
      );
    }
    return "Select Users";
  };

  const SelectedItemTemplate = (option) => {
    if (option) {
      const { email, role } = option;
      if (role === "sousadmin") {
        return (
          <span className="mr-1">
            <Badge type="red">{email.substring(0, 5)}...</Badge>
          </span>
        );
      }
      if (role === "responsable") {
        return (
          <span className="mr-1">
            <Badge type="green">{email.substring(0, 5)}...</Badge>
          </span>
        );
      }
      return (
        <span className="mr-1">
          <Badge type="blue">{email.substring(0, 5)}...</Badge>
        </span>
      );
    }
    return "Select Users";
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
        </div>

        <div className="card">
          <div className="grid w-100">
            <div className="field col-6 xl:col-6 lg:col-6 md:col-12 ">
              <Dropdown
                value={Item.userType}
                name="userType"
                className="w-100"
                style={{ width: "100%" }}
                onChange={handleChange}
                options={[
                  { value: "all", name: "All Users" },
                  { value: "user", name: "Talents" },
                  { value: "company", name: "Company" },
                ]}
                optionLabel="name"
                optionValue="value"
                placeholder="Select Users Type"
              />
            </div>

            <div className="field col-6 xl:col-6 lg:col-6 md:col-12 w-100">
              <MultiSelect
                placeholder="Select Users"
                optionLabel="email"
                className="w-100"
                maxSelectedLabels={5}
                style={{ width: "100%" }}
                value={multiselectValue}
                options={GetAllUsersType()}
                onChange={(e) => setMultiselectValue(e.value)}
                itemTemplate={itemTemplate}
                selectedItemTemplate={SelectedItemTemplate}
                filter
              />
            </div>

            <div className="field col-12 md:col-12 ">
              <InputText
                className="w-100"
                style={{ width: "100%" }}
                placeholder="object of the email"
                name="object"
                value={Item.object}
                onChange={handleChange}
                required
              />
            </div>

            <div className="field col-12 md:col-12">
              <TextEditor
                name="content"
                value={Item.content}
                onChange={handleChange}
                placeholder="Content of the email"
                style={{ minHeight: "400px", height: "400px" }}
              />
            </div>
            <div className="field col-12 md:col-12 flex  justify-content-end">
              <Button
                label="Reset"
                icon="pi pi-times"
                className="p-button-outlined mx-2"
                onClick={() => {}}
                // disabled={payload}
              />
              <Button
                label="Send Mail"
                icon="pi pi-check"
                className=""
                onClick={handle_submit}
                // disabled={payload}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MailingPage;
