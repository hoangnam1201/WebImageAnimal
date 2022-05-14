import { Autocomplete, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userApi } from "../../../api/userApi";
import { tagSelector } from "../../../store/selectors";
import { getTag } from "../../../store/slices/tagSlice";

const FilterBox = ({ onChange, ...rest }) => {
  const tagData = useSelector(tagSelector);
  const [userData, setUserData] = useState({ list: [], loading: false });
  const dispatch = useDispatch();
  const [data, setData] = useState({ tagIds: [], authorName: "" });

  useEffect(() => {
    loadUsers("");
  }, []);

  const loadUsers = async (value) => {
    setUserData({ ...userData, loading: true });
    const res = await userApi.find(value, 10);
    setUserData({ loading: false, list: res.data });
  };

  return (
    <div {...rest}>
      <div className="flex items-end gap-4 w-full">
        <div className="w-full">
          <p className=" text-gray-500 text-sm">Tags:</p>
          <Autocomplete
            multiple
            onChange={(e, value) => {
              const tags = value.map((t) => t.id);
              setData({ ...data, tagIds: tags });
              onChange({ ...data, tagIds: tags });
            }}
            onOpen={() => {
              dispatch(getTag());
            }}
            loading={tagData.loading === "loading"}
            options={tagData.list}
            getOptionLabel={(o) => o.name}
            isOptionEqualToValue={(option, value) => option.name === value.name}
            renderInput={(params) => (
              <TextField {...params} variant="standard" className="shadow" />
            )}
          />
        </div>
        <div className="w-full">
          <p className="text-gray-500 text-sm">Poster:</p>
          <Autocomplete
            onChange={(e, value) => {
              if (value === null) {
                setData({ ...data, authorId: undefined });
                onChange({ ...data, authorId: undefined });
                return;
              }
              setData({ ...data, authorId: value.id });
              onChange({ ...data, authorId: value.id });
            }}
            loading={userData.loading}
            options={userData.list}
            getOptionLabel={(o) => o.username}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                className="shadow"
                onChange={(e) => {
                  loadUsers(e.target.value);
                }}
              />
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterBox;
