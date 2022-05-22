import instance from "./instanceAxios";

export const pictureApi = {
  adminCreate: async (formdata) => {
    return await instance.post("/pictures/create", formdata);
  },
  delete: async (id) => {
    return await instance.delete("/pictures/" + id);
  },
  accept: async (id) => {
    return await instance.put("/pictures/accept/" + id);
  },
  get: (tagIds = [], authorId, page, take, accepted = true) => {
    return instance.post("/pictures/get", {
      authorId,
      tagIds,
      page,
      take,
      accepted,
    });
  },
  getMyPictures: (tagIds = [], page, take, accepted = true) => {
    return instance.post("/pictures/get-my-pictures", {
      tagIds,
      page,
      take,
      accepted,
    });
  },
  updateInfo: (id, data) => {
    return instance.put("/pictures/" + id, data);
  },
  dowload: (filename) => {
    return instance.get("/file/dowload/" + filename);
  },
  getPictureById: (id) => {
    return instance.get("/pictures/by-id/" + id);
  },
  find: async (searchStr, take = 5) => {
    return instance.get("/pictures/find/", { params: { searchStr, take } });
  },
};
