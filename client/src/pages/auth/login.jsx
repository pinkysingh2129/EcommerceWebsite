import CommonForm from '@/components/common/form';
import { LoginFormControls } from '@/config';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const initialState = {
    email: '',    // ✅ Corrected to match form controls
    password: ''  // ✅ Correct
};

function AuthLogin() {
    const [formData, setFormData] = useState(initialState);

    function onSubmit(event) {
        event.preventDefault(); // ✅ Prevent default form submission
        console.log('Form Data:', formData); // Replace with actual API call
    }

    return (
        <div className="ml-4 w-full max-w-md space-y-6">
            <div className="text-center">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">
                    Sign in for your account
                </h1>
                <p className="text-center mt-2">
                    Dont have an account?
                    <Link className="text-center font-medium ml-2 text-primary hover:underline" to='/auth/register'>
                        Signup
                    </Link>
                </p>
            </div>
            <CommonForm
                formControls={LoginFormControls}
                buttonText={'Login'}
                formData={formData}
                setFormData={setFormData}
                onSubmit={onSubmit}  
            />
        </div>
    );
}

export default AuthLogin;
