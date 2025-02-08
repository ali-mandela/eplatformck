import  { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

const RegisterPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '', 
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.password ) {
            toast.error('Please fill in all fields.');
            return;
        }

        try {
            const response = await axios.post('/auth/signup', formData);
            toast.success('Registration Successful!');
            localStorage.setItem('token', response.data.token);
            navigate('/dashboard');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Registration Failed');
            console.error('Registration Error:', error);
        }
    };

    return (
       <Layout>
         <div className="min-h-full flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 sm:p-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-700">Create an Account</h2>
                <form onSubmit={handleSubmit} className="space-y-4 mt-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="John Doe"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="johndoe@example.com"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="••••••••"
                        />
                    </div> 
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-300 text-lg font-semibold"
                    >
                        Register
                    </button>
                </form>
                <p className="text-sm text-gray-600 text-center mt-4">
                    Already have an account?{' '}
                    <a href="/login" className="text-blue-500 hover:underline">Login</a>
                </p>
            </div>
        </div>
       </Layout>
    );
};

export default RegisterPage;
