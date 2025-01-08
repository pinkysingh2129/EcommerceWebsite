import CommonForm from '@/components/common/form';
import { registerFormControls } from '@/config';
import { useToast } from '@/components/ui/use-toast';
import { registerUser } from '@/store/auth-slice';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const initialState = {
    username: '',
    email: '',
    password: ''
};

function AuthRegister() {
    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {toast} = useToast();
    const { isLoading, error, successMessage } = useSelector((state) => state.auth);

    function onSubmit(event) {
        event.preventDefault();

        // Log the form data to verify what you're sending to the backend
        console.log('Form Data:', formData);

        dispatch(registerUser(formData))
            .then((data) => {
                // Log the response data to check the structure and content of the response
                console.log('Response Data:', data);

                const message = data?.payload?.message || 'Something went wrong';

                // Check if registration was successful
                if (data?.payload?.success) {
                    toast({
                        title: 'Registration Successful',
                        description: message,
                        variant: 'success', // Success variant
                    });
                    navigate('/auth/login');
                } else {
                    toast({
                        title: 'Registration Failed',
                        description: message,
                        variant: 'destructive', // Error variant
                    });
                }
            })
            .catch((error) => {
                console.error('Error occurred during registration:', error);
                toast({
                    title: 'An error occurred',
                    description: 'Please try again later.',
                    variant: 'destructive', // Error variant for network issues
                });
            });
    }

    return (
        <div className="ml-4 w-full max-w-md space-y-6">
            <div className="text-center">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">
                    Create New Account
                </h1>
                <p className="text-center mt-2">
                    Already have an account?
                    <Link className="text-center font-medium ml-2 text-primary hover:underline" to='/auth/login'>
                        Login
                    </Link>
                </p>
            </div>

            {error && (
                <div className="text-red-600">
                    <p>{error}</p>
                </div>
            )}

            <CommonForm
                formControls={registerFormControls}
                buttonText={isLoading ? 'Signing Up...' : 'Sign Up'}
                formData={formData}
                setFormData={setFormData}
                onSubmit={onSubmit}
                disabled={isLoading}
            />
        </div>
    );
}

 export default AuthRegister