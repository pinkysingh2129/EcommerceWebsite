import CommonForm from '@/components/common/form';
import { useToast } from '@/components/ui/use-toast';
import { LoginFormControls } from '@/config';
import { loginUser } from '@/store/auth-slice';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const initialState = {
    email: '',
    password: '',
};

function AuthLogin() {
    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch();
    const { toast } = useToast(); // Correct usage of useToast

    function onSubmit(event) {
        event.preventDefault();
        console.log('Form Data:', formData); // Log form data to verify correctness

        dispatch(loginUser(formData)).then((data) => {
            // Check if the login was successful
            if (data?.payload?.success) {
                toast({
                    title: 'Login Successful',
                    description: data.payload.message, // Display success message
                    variant: 'success',
                });
            } else {
                // Handle login failure
                toast({
                    title: 'Login Failed',
                    description: data?.payload?.message || 'An error occurred',
                    variant: 'destructive',
                });
            }
        });
    }

    return (
        <div className="ml-4 w-full max-w-md space-y-6">
            <div className="text-center">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">
                    Sign in to your account
                </h1>
                <p className="text-center mt-2">
                    Don’t have an account?
                    <Link
                        className="text-center font-medium ml-2 text-primary hover:underline"
                        to="/auth/register"
                    >
                        Sign Up
                    </Link>
                </p>
            </div>
            <CommonForm
                formControls={LoginFormControls}
                buttonText="Login"
                formData={formData}
                setFormData={setFormData}
                onSubmit={onSubmit}
            />
        </div>
    );
}

export default AuthLogin;
