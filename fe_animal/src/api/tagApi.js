import instance from "./instanceAxios";

export const tagAPI = {
  getAll: async () => {
    return await instance.get("/tags/get-all");
  },
  create: async (formData) => {
    return await instance.post("/tags", formData);
  },
  delete: async (tagId) => {
    return await instance.delete("/tags/" + tagId);
  },
  changeName: async (tagId, name) => {
    return await instance.put("/tags/" + tagId, { name: name });
  },
  changeFile: async (tagId, formData) => {
    return await instance.put("/tags/update-file/" + tagId, formData);
  },
  find: async (searchStr, take) => {
    return await instance.get("/tags/find", { params: { searchStr, take } });
  },
};
