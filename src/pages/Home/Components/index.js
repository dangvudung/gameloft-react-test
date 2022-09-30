import React, { useState } from "react";
import "./components.css";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import Stack from "@mui/material/Stack";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Button from "@mui/material/Button";
// import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
// import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

export function UserInfo(props) {
  const { user, listUserUpdate, setValue, setError, errors, clearErrors } =
    props;
  // const [value, setValue] = useState(new Date(props.user.birthdate));

  let enable = listUserUpdate.find((value) => value._id === user._id);

  const handleEnableEdit = () => {
    let listUserUpdateClone = JSON.parse(JSON.stringify(listUserUpdate));
    if (!enable) {
      listUserUpdateClone.push(user);
      setValue("listUserUpdate", listUserUpdateClone, { shouldDirty: true });
    } else {
      let userCurrent = listUserUpdateClone.find(
        (value) => (value._id = user._id)
      );
      const indexOfUser = listUserUpdateClone.indexOf(userCurrent);
      listUserUpdateClone.splice(indexOfUser, 1);
      setValue("listUserUpdate", listUserUpdateClone, { shouldDirty: true });
    }
  };

  const handleChangeName = (event) => {
    let listUserUpdateClone = JSON.parse(JSON.stringify(listUserUpdate));
    let userCurrent = listUserUpdateClone.find(
      (value) => (value._id = user._id)
    );
    const indexOfUser = listUserUpdateClone.indexOf(userCurrent);
    listUserUpdateClone[indexOfUser].username = event.target.value;
    setValue("listUserUpdate", listUserUpdateClone, { shouldDirty: true });
  };

  const handleChangeEmail = (event) => {
    let listUserUpdateClone = JSON.parse(JSON.stringify(listUserUpdate));
    let userCurrent = listUserUpdateClone.find(
      (value) => (value._id = user._id)
    );
    const indexOfUser = listUserUpdateClone.indexOf(userCurrent);
    listUserUpdateClone[indexOfUser].email = event.target.value;
    setValue("listUserUpdate", listUserUpdateClone, { shouldDirty: true });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="userInfoWapper">
        <TextField className="displayNone" />
        <TextField
          className="inputName"
          variant="outlined"
          value={!enable ? user?.username : enable.username}
          onChange={handleChangeName}
          disabled={!enable ? true : false}
        />
        <TextField
          className="inputEmail"
          variant="outlined"
          value={!enable ? user?.email : enable.email}
          onChange={handleChangeEmail}
          disabled={!enable ? true : false}
        />
        <DatePicker
          disableFuture
          openTo="year"
          views={["year", "month", "day"]}
          value={user?.birthdate}
          renderInput={(params) => <TextField {...params} />}
          disabled={true}
        />
        <Button
          className="buttonUpdate"
          variant="outlined"
          onClick={handleEnableEdit}
        >
          {!enable ? "Enable" : "Disable"}
        </Button>
      </div>
    </LocalizationProvider>
  );
}
