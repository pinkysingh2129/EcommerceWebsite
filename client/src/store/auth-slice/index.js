import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
isAuthenticated: false,
isLoading: true,
user: null,
error: null,
successMessage: null,
};

// Helper Function: Handle Errors
const handleError = (error) => {
if (error.response) {
    return { message: error.response.data.message || "An error occurred." };
}
return { message: "An unexpected error occurred. Please try again later." };
};

// Register User Action
export const registerUser = createAsyncThunk(
    "auth/register",
    async (formData, { rejectWithValue }) => {
    try {
        console.log("Sending Registration Data:", formData);
        const response = await axios.post(
            'http://localhost:5000/api/auth/register', 
            formData,
            { withCredentials: true }
        );
        console.log("Registration Successful:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error in registerUser:", error);
        return rejectWithValue(handleError(error));
    }
}
);

// Login User Action
export const loginUser = createAsyncThunk(
    "auth/login",
    async (formData, { rejectWithValue }) => {
    try {
        console.log("Sending Login Data:", formData);
        const response = await axios.post(
            'http://localhost:5000/api/auth/login',
            formData, 
            { withCredentials: true }
        );
        console.log("Login Successful:", response.data);
        return response.data;
    } catch (error) {
    console.error("Error in loginUser:", error);
    return rejectWithValue(handleError(error));
    }
}
);

// Check Authentication Status Action
export const checkAuth = createAsyncThunk("auth/checkauth", async (_, { rejectWithValue }) => {
    try {
    const response = await axios.get("http://localhost:5000/api/auth/checkauth", {
        withCredentials: true,
        headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        },
    });
    console.log("Auth Check Successful:", response.data);
    return response.data;
    } catch (error) {
    console.error("Error in checkAuth:", error);
    return rejectWithValue(handleError(error));
    }
});

const authSlice = createSlice({
name: "auth",
initialState,
reducers: {
    setUser: (state, action) => {
    state.user = action.payload;
    state.isAuthenticated = true;
    },
    clearError: (state) => {
    state.error = null;
    },
    clearSuccess: (state) => {
    state.successMessage = null;
    },
},
extraReducers: (builder) => {
    builder
      // Register User
    .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
    })
    .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.successMessage = action.payload.message || "Registration successful!";
        state.error = null;
    })
    .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.message || "Failed to register.";
    })

      // Login User
    .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
    })
    .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.success ?  action.payload.user :null;
        state.isAuthenticated = action.payload.success || false;
        state.successMessage = action.payload.message || "Login successful!";
        console.log("User role after login:", state.user?.role);
    })
    .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.payload.message || "Failed to log in.";
    })

      // Check Auth
    .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
        state.error = null;
    })
    .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success || false;
    })
    .addCase(checkAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.payload.message || "Failed to check authentication.";
    });
},
});

export const { setUser, clearError, clearSuccess } = authSlice.actions;

export default authSlice.reducer;
