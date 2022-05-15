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
  get: async (tagIds = [], authorId, page, take, accepted = true) => {
    return await instance.post("/pictures/get", {
      authorId,
      tagIds,
      page,
      take,
      accepted,
    });
  },
  getMyPictures: async (tagIds = [], page, take, accepted = true) => {
    return await instance.post("/pictures/get-my-pictures", {
      tagIds,
      page,
      take,
      accepted,
    });
  },
  updateInfo: async (id, data) => {
    return await instance.put("/pictures/" + id, data);
  },
};
