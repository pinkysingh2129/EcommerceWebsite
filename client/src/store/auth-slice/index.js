import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    isAuthenticated: false,
    isLoading: false,
    user: null,
    error: null,  // For handling error messages
    successMessage: null,  // For handling success messages
};

// Updated registerUser Action
export const registerUser = createAsyncThunk(
    '/auth/register',
    async (formData, { rejectWithValue }) => {
        try {
            console.log('Sending Form Data:', formData);  // Log the data before making the API call

            const response = await axios.post('http://localhost:5000/api/auth/register', formData, {
                withCredentials: true,
            });

            console.log('Backend Response:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error in registerUser:', error);

            // Check for specific error responses from the backend
            if (error.response && error.response.status === 409) {
                return rejectWithValue({
                    message: error.response.data.message || 'A user with this email already exists.',
                });
            }

            // For all other errors
            return rejectWithValue({
                message: 'An unexpected error occurred. Please try again later.',
            });
        }
    }
);


export const loginUser = createAsyncThunk(
    '/auth/login',
    async (formData, { rejectWithValue }) => {
        try {
            console.log('Sending Form Data:', formData);  // Log the data before making the API call

            const response = await axios.post('http://localhost:5000/api/auth/login', formData, {
                withCredentials: true,
            });

            console.log('Backend Response:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error in registerUser:', error);

            // Check for specific error responses from the backend
            if (error.response && error.response.status === 409) {
                return rejectWithValue({
                    message: error.response.data.message || 'A user with this email already exists.'
                });
            }

            // For all other errors
            return rejectWithValue({
                message: 'An unexpected error occurred. Please try again later.',
            });
        }
    }
);

export const checkAuth = createAsyncThunk(
    '/auth/checkauth',
    async () => {
                const response = await axios.get('http://localhost:5000/api/auth/checkauth', {
                withCredentials: true,
                headers : {
                    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
                
                },
            });

        return response.data;        
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            console.log("Setting user in Redux state:", action.payload);  // Log user being set
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        clearError: (state) => {
            console.log("Clearing error in Redux state");
            state.error = null;
        },
        clearSuccess: (state) => {
            console.log("Clearing success message in Redux state");
            state.successMessage = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                console.log("Registering user - pending state");  // Log pending action
                state.isLoading = true;
                state.error = null;  // Clear previous errors
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                console.log("Register user - fulfilled state:", action.payload);  // Log success state
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
                state.successMessage = action.payload.message;  // Display success message
            })
            .addCase(registerUser.rejected, (state, action) => {
                console.log("Register user - rejected state:", action.payload);  // Log error state
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
                state.error = action.payload?.message || 'An unexpected error occurred.';
            })
            .addCase(loginUser.pending, (state) => {
                console.log("Registering user - pending state");  // Log pending action
                state.isLoading = true;
                state.error = null;  // Clear previous errors
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                console.log(action);
                console.log("Register user - fulfilled state:", action.payload);  // Log success state
                state.isLoading = false;
                state.user = action.payload.success ? action.payload.user : null ;
                state.isAuthenticated = action.payload.success ;
                state.successMessage = action.payload.message;  // Display success message
            })
            .addCase(loginUser.rejected, (state, action) => {
    
                console.log("Login user - rejected state:", action.payload);  // Log error state
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
                state.error = action.payload?.message || 'An unexpected error occurred.';
            })
            .addCase(checkAuth.pending, (state) => {
                console.log("Registering user - pending state");  // Log pending action
                state.isLoading = true;
                state.error = null;  // Clear previous errors
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                console.log(action);
                console.log("Register user - fulfilled state:", action.payload);  // Log success state
                state.isLoading = false;
                state.user = action.payload.success ? action.payload.user : null ;
                state.isAuthenticated = action.payload.success ;
                state.successMessage = action.payload.message;  // Display success message
            })
            .addCase(checkAuth.rejected, (state, action) => {
                console.log("Login user - rejected state:", action.payload);  // Log error state
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
                state.error = action.payload?.message || 'An unexpected error occurred.';
            });
    }
});

export const { setUser, clearError, clearSuccess } = authSlice.actions;
export default authSlice.reducer  ;
