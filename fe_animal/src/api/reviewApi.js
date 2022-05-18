import instance from "./instanceAxios";

export const reviewApi = {
  getGroupByDate: (mode) => {
    return instance.get("reviews/get-group-by-date", { params: { mode } });
  },
  getGroupByMood: () => {
    return instance.get("reviews/get-group-by-mood");
  },
  create: (moodImprovement) => {
    return instance.post("reviews", { moodImprovement });
  },
};
