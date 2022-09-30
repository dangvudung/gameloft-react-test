import React, { Fragment, useEffect, useState } from "react";
import "./home.css";
import TextField from "@mui/material/TextField";
import userService from "../../api/userService";
import { UserInfo } from "./Components";
import Loading from "./Components/loading";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";

function Home(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [listUser, setListUser] = useState([]);
  const [searchText, setSearchText] = useState("");

  let {
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors },
    watch,
    setValue,
    setError,
    register,
  } = useForm({
    defaultValues: {
      listUserUpdate: [],
    },
  });

  const listUserUpdate = watch("listUserUpdate");

  const getDataUser = async (searchKey) => {
    userService
      .findUserInfo(searchKey)
      .then((response) => {
        setIsLoading(false);
        if (response.status == 200 && response.data?.users?.length) {
          setListUser(response.data.users);
        } else {
          setListUser([]);
          setValue("listUserUpdate", [], { shouldDirty: true });
        }
      })
      .catch((error) => {
        setListUser([]);
        setValue("listUserUpdate", [], { shouldDirty: true });
        setIsLoading(false);
      });
  };

  const handleSearch = async () => {
    setIsLoading(true);
    await getDataUser(searchText);
  };

  const onSearchKeyWordChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleKeyEnter = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const applyChange = async (formData) => {
    let errorInput = false;

    const usersUpdate = JSON.parse(JSON.stringify(formData.listUserUpdate)).map(
      (user) => {
        if (
          user._id == "" ||
          user.username == "" ||
          user.email == "" ||
          user.birthdate == ""
        ) {
          errorInput = true;
        }
        const resultUser = {
          _id: user._id,
          username: user.username,
          email: user.email,
          birthdate: user.birthdate,
        };
        return resultUser;
      }
    );

    if (errorInput) {
      toast.warning("Điền đầy đủ thông tin");
      return;
    }

    userService
      .updateMutilUser(usersUpdate)
      .then((response) => {
        if (response.status == 200) {
          toast.success("thành công");
          setIsLoading(true);
          getDataUser("");
          setValue("listUserUpdate", [], { shouldDirty: true });
        } else {
          toast.error(` error status : ${response.status}`);
        }
      })
      .catch((error) => {
        toast.error("Lỗi");
      });
  };

  useEffect(() => {
    getDataUser("");
  }, []);

  return (
    <div className="homeWrapper">
      <div>
        <TextField
          label="Tìm tên nhân viên"
          variant="outlined"
          fullWidth={true}
          defaultValue={""}
          value={searchText}
          onChange={onSearchKeyWordChange}
          onKeyDown={handleKeyEnter}
        />
      </div>
      <div>
        {isLoading ? (
          <Loading />
        ) : listUser?.length == 0 ? (
          <div></div>
        ) : (
          listUser.map((user, index) => {
            return (
              <div {...register("listUserUpdate")} key={`user-${index}`}>
                <UserInfo
                  user={user}
                  listUserUpdate={listUserUpdate}
                  setValue={setValue}
                  setError={setError}
                  errors={errors}
                  clearErrors={clearErrors}
                />
              </div>
            );
          })
        )}
      </div>
      <div className="buttonUpdateWapper">
        <Button
          className="buttonUpdateAll"
          variant="outlined"
          // onClick={handleEnableEdit}
          disabled={listUserUpdate.length > 0 ? false : true}
          onClick={handleSubmit(applyChange)}
        >
          {/* {!enable ? "Enable" : "Disable"} */}
          Update
        </Button>
      </div>
    </div>
  );
}

export default Home;
