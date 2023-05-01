import React, { useState } from "react";
import type { FormikValues } from "formik";
import { ButtonBase, Menu, MenuItem } from "@mui/material";
import { useRouter } from "next/router";

interface FormNavigationProps {
  hasPrevious?: boolean;
  onBackClick: (values: FormikValues) => void;
  isLastStep: boolean;
}

const CreateAccount: React.FC = () => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLink = async (link: string) => {
    await router.push(link).finally(() => handleClose());
  };
  return (
    <div className="-ml-2">
      <ButtonBase
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        className={`focus:ring-offset- h-9 rounded px-2 font-medium text-[#1A73E8] outline-none hover:bg-[#F6FAFE] hover:text-[#174EA6] focus:bg-[#DDEAFC] focus:text-[#174EA6] focus:ring-2 focus:ring-[#174EA6] focus:ring-offset-2 ${
          open ? "bg-[#DDEAFC]" : ""
        } `}
      >
        Create account
      </ButtonBase>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          onClick={() =>
            void handleLink(
              "https://accounts.google.com/signup/v2/webcreateaccount?biz=false&cc=ET&dsh=S34495102%3A1682940170716355&flowEntry=SignUp&flowName=GlifWebSignIn&ifkv=Af_xneHGfxPo6MOzPd9yiMMcI61_S22Uu3mE8xH90zM0FeP9m5qB-fD30gcHiXCY81ZnVrGEIf0PlQ"
            )
          }
        >
          For my personal use
        </MenuItem>
        <MenuItem
          onClick={() =>
            void handleLink(
              "https://accounts.google.com/signup/v2/kidaccountinfo"
            )
          }
        >
          For my child
        </MenuItem>
        <MenuItem
          onClick={() =>
            void handleLink(
              "https://accounts.google.com/signup/v2/webcreateaccount?biz=true&cc=ET&dsh=S34495102%3A1682940170716355&flowEntry=SignUp&flowName=GlifWebSignIn&ifkv=Af_xneHGfxPo6MOzPd9yiMMcI61_S22Uu3mE8xH90zM0FeP9m5qB-fD30gcHiXCY81ZnVrGEIf0PlQ"
            )
          }
        >
          For work or my business
        </MenuItem>
      </Menu>
    </div>
  );
};

const FormNavigation: React.FC<FormNavigationProps> = (props) => {
  return (
    <div className="mt-10 flex items-center justify-between text-sm">
      {props.hasPrevious ? (
        <button
          type="button"
          className={`h-9 rounded px-2 font-medium text-[#1A73E8] outline-none hover:bg-[#F6FAFE] hover:text-[#174EA6] focus:bg-[#DDEAFC] focus:text-[#174EA6] focus:ring-2 focus:ring-[#174EA6] focus:ring-offset-2`}
          onClick={props.onBackClick}
        >
          Back
        </button>
      ) : (
        <CreateAccount />
      )}
      <ButtonBase
        type="submit"
        className="h-9 rounded bg-[#1A73E8] px-6 font-medium text-white outline-none hover:bg-[#1B66C9] focus:bg-[#174EA6] focus:ring-2 focus:ring-[#174EA6] focus:ring-offset-2"
      >
        Next
      </ButtonBase>
    </div>
  );
};

export default FormNavigation;
