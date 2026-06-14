import { createSlice } from "@reduxjs/toolkit";

import { Status } from "../queriesSlice/types";
import { fetchRatingList, fetchRatingUserDetails } from "./asyncActions";
import {
  fetchRatingListBuilder,
  fetchRatingUserDetailsBuilder,
} from "./builders";
import { RatingSliceState } from "./types";

const initialState: RatingSliceState = {
  employees: [],
  status: Status.WAITING,
  detail: {},
  totalCount: 0,
  errorMessage: null,
};

export const ratingSlice = createSlice({
  name: "rating",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    fetchRatingListBuilder(builder, fetchRatingList);
    fetchRatingUserDetailsBuilder(builder, fetchRatingUserDetails);
  },
});

export default ratingSlice.reducer;
