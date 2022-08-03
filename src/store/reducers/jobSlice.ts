// import { clusterApiUrl } from "@solana/web3.js";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface iJobState {
  jobs: [];
  job: Record<string, never>;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  isDataArrived: boolean;
  message: any | string;
  total: number;
}

const initialState: iJobState = {
  jobs: [],
  job: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  isDataArrived: false,
  message: "",
  total: 0,
};

export const setDataArrivedFlag = createAsyncThunk(
  "isDataArrived",
  (flag: boolean) => {
    return flag;
  }
);

export const applyJob = createAsyncThunk(
  "jobs/apply",
  async (jobId: string | undefined, thunkAPI: any) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(
        "/api/jobs/apply",
        { id: jobId },
        config
      );
      return response.data;
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Post new job
export const postJob = createAsyncThunk(
  "jobs/post",
  async (jobData: Record<string, unknown>, thunkAPI: any) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post("/api/jobs/", jobData, config);
      return response.data;
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get all jobs
export const getJobs = createAsyncThunk(
  "jobs/getAll",
  async (pagestate: any | undefined, thunkAPI: any) => {
    try {
      const currentpage =
        pagestate.currentpage === undefined ? -1 : pagestate.currentpage;
      const jobcount =
        pagestate.jobcount === undefined ? -1 : pagestate.jobcount;

      const response = await axios.get(`/api/jobs/${currentpage}/${jobcount}`);
      return response.data;
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get one job
export const getJob = createAsyncThunk(
  "job/get",
  async (jobId: string | undefined, thunkAPI: any) => {
    try {
      const response = await axios.get(`/api/jobs/${jobId}`);
      return response.data;
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteJob = createAsyncThunk(
  "job/delete",
  async (jobId: string | undefined, thunkAPI: any) => {
    try {
      const response = await axios.delete(`/api/jobs/${jobId}`);
      return response.data;
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(setDataArrivedFlag.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(postJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(postJob.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(postJob.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getJobs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getJobs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.jobs = action.payload.jobs;
        state.total = action.payload.total;
      })
      .addCase(getJobs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getJob.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isDataArrived = true;
        state.job = action.payload;
      })
      .addCase(getJob.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteJob.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.msg;
      })
      .addCase(deleteJob.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = jobSlice.actions;
export default jobSlice.reducer;
