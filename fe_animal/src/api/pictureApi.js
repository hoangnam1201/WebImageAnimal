import instance from "./instanceAxios";

export const pictureApi = {
  adminCreate: async (formdata) => {
    return await instance.post("/pictures", formdata);
  },
  delete: async (id) => {
    return await instance.delete("/pictures/" + id);
  },
  get: async (tagIds = [], page, take) => {
    return await instance.post("/pictures/get", { tagIds, page, take });
  },
  updateInfo: async (id, data) => {
    return await instance.put("/pictures/" + id, data);
  },
};
