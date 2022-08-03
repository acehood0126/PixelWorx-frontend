import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// import { userInfo } from "os";

// Get user from localStorage
const localUser = JSON.parse(localStorage.getItem("user")!);

const getUserType = () => localStorage.getItem("Role") === "true";

// Logout use
const logoutLocalUser = () => localStorage.removeItem("user");

interface IAuthState {
  user: any;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: any | string;
  other?: any;
}

const getInitStatus = () => {
  let user = localUser ? localUser : null;

  if (user) {
    if (user.timeStamp) {
      user.isDeveloper = getUserType();
      const now = new Date();
      const that = new Date(user.timeStamp);
      //@ts-ignore
      const diffTime = now - that;
      if (diffTime > 1000 * 60 * 60 * 5) {
        user = null;
        localStorage.removeItem("user");
      }
    } else {
      user = null;
      localStorage.removeItem("user");
    }
  }

  return user;
};

const initialState: IAuthState = {
  user: getInitStatus(),
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Register new user
export const register = createAsyncThunk(
  "auth/register",
  async (user: Record<string, unknown>, thunkAPI) => {
    try {
      const response = await axios.post("/api/users", user);
      if (response.data) {
        localStorage.setItem(
          "user",
          JSON.stringify({ ...response.data, timeStamp: new Date() })
        );
      }
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

// Login user
export const login = createAsyncThunk(
  "auth/login",
  async (user: Record<string, unknown>, thunkAPI) => {
    try {
      const response = await axios.post("/api/users/login", user);
      if (response.data) {
        if (!localStorage.getItem("Role")) {
          localStorage.setItem("Role", "false");
        }
        response.data.isDeveloper = getUserType();
        localStorage.setItem(
          "user",
          JSON.stringify({ ...response.data, timeStamp: new Date() })
        );
      }
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

// Logout user
export const logout = createAsyncThunk("auth/logout", async () => {
  await logoutLocalUser();
});

// Edit user
export const edit = createAsyncThunk(
  "auth/edit",
  async (user: Record<string, unknown>, thunkAPI: any) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post("/api/users/edit", user, config);
      if (response.data) {
        response.data.isDeveloper = getUserType();
        localStorage.setItem(
          "user",
          JSON.stringify({
            ...response.data,
            token: thunkAPI.getState().auth.user.token,
            timeStamp: new Date(),
          })
        );
      }
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

export const view = createAsyncThunk(
  "auth/view",
  async (userid: string, thunkAPI) => {
    try {
      const response = await axios.get(`/api/users/view/${userid}`);
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

// Reducer
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state: any) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
    setRole: (state: any, action: any) => {
      localStorage.setItem("Role", action.payload);

      state.user = {
        ...state.user,
        isDeveloper: action.payload === "true",
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(edit.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(edit.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = {
          ...state.user,
          ...action.payload,
        };
      })
      .addCase(edit.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(view.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(view.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.other = action.payload;
      })
      .addCase(view.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset, setRole } = authSlice.actions;
export default authSlice.reducer;
