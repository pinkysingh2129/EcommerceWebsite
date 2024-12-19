import CommonForm from '@/components/common/form';
import { registerFormControls } from '@/config';
import { registerUser } from '@/store/auth-slice';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const initialState = {
    username: '', // ✅ Corrected name to match form controls
    email: '',    // ✅ Corrected to match form controls
    password: ''  // ✅ Correct
};

function AuthRegister() {
    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    function onSubmit(event) {
        event.preventDefault()
        dispatch(registerUser(formData)).then((data)=>{
            console.log(data);
        });
    }
    console.log(formData);
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
            <CommonForm
                formControls={registerFormControls}
                buttonText={'Sign Up'}
                formData={formData}
                setFormData={setFormData}
                onSubmit={onSubmit}  
            />
        </div>
    );
}

export default AuthRegister;
