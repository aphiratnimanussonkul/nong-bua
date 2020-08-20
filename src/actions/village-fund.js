import firebase from "../firebase/index";
import { createActionSet } from "../helpers/index";

const { firestore } = firebase;

export const FETCH_VIILAGE_FUND_DIRECTORY = createActionSet(
  "FETCH_VIILAGE_FUND_DIRECTORY"
);
export const FETCH_VIILAGE_PROJECT = createActionSet("FETCH_VIILAGE_PROJECT");
export const FETCH_VIILAGE_NEWS_INFORMATION = createActionSet(
  "FETCH_VIILAGE_NEWS_INFORMATION"
);

export const getVillageFundDirectory = () => async (dispatch) => {
  dispatch({ type: FETCH_VIILAGE_FUND_DIRECTORY.PENDDING });

  try {
    await firestore
      .collection("village-fund-directory")
      .orderBy("priority", "asc")
      .get()
      .then((result) => {
        dispatch({
          type: FETCH_VIILAGE_FUND_DIRECTORY.SUCCESS,
          payload: result.docs.map((data) => {
            return {
              id: data.id,
              ...data.data(),
            };
          }),
        });
      });
  } catch (error) {
    dispatch({
      type: FETCH_VIILAGE_FUND_DIRECTORY.FAILED,
      error,
    });
  }
};

export const getVillageProject = () => async (dispatch) => {
  dispatch({ type: FETCH_VIILAGE_PROJECT.PENDDING });

  try {
    await firestore
      .collection("village-project")
      .get()
      .then((result) => {
        dispatch({
          type: FETCH_VIILAGE_PROJECT.SUCCESS,
          payload: result.docs.map((data) => {
            return {
              id: data.id,
              ...data.data(),
            };
          }),
        });
      });
  } catch (error) {
    dispatch({
      type: FETCH_VIILAGE_PROJECT.FAILED,
      error,
    });
  }
};

export const getVillageNewsInformation = () => async (dispatch) => {
  dispatch({ type: FETCH_VIILAGE_NEWS_INFORMATION.PENDDING });

  try {
    await firestore
      .collection("news-information")
      .where("tags", "array-contains", "กองทุนหมู่บ้าน")
      .get()
      .then((result) => {
        dispatch({
          type: FETCH_VIILAGE_NEWS_INFORMATION.SUCCESS,
          payload: result.docs
            .map((data) => {
              return {
                id: data.id,
                ...data.data(),
              };
            })
            .sort(
              (prev, cur) => cur.createdAt.seconds - prev.createdAt.seconds
            ),
        });
      });
  } catch (error) {
    dispatch({ type: FETCH_VIILAGE_NEWS_INFORMATION.FAILED, error });
  }
};

export const createVillageFundDirectory = async (personalDetail) => {
  return await firestore
    .collection("village-fund-directory")
    .add(personalDetail);
};

export const deleteDirectoryById = async (directoryId) => {
  return await firestore
    .collection("village-fund-directory")
    .doc(directoryId)
    .delete();
};

export const updateDirectoryById = async (directory) => {
  const { id, ...others } = directory;
  return await firestore
    .collection("village-fund-directory")
    .doc(id)
    .set(others);
};

export const createVillageFundProject = async (projectName) => {
  return await firestore
    .collection("village-project")
    .add({ name: projectName });
};

export const deleteVillageProjectById = async (projectId) => {
  return await firestore.collection("village-project").doc(projectId).delete();
};

export const updateVillgeFundProject = async (project) => {
  return await firestore
    .collection("village-project")
    .doc(project.id)
    .set({ name: project.name });
};
