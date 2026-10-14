import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import axios from "axios";
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.post("http://localhost:4000/api/auth/login", form);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            alert("Login Successful!");

            setTimeout(() => {
                const role = res.data.user?.role;
                if (role === 'Employee') navigate('/employee');
                else if (role === 'HR') navigate('/hr');
                else if (role === 'Manager') navigate('/manager');
                else navigate('/');
            }, 1200);
        } catch (error) {
            alert(error.response?.data?.message || "Login failed");
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 flex flex-col">
            <header className="flex justify-between items-center px-8 py-5 border-b border-slate-800 bg-slate-800/40 backdrop-blur-md">
                <h1 className="text-2xl font-bold tracking-tight text-blue-400">
                    HRM Portal
                </h1>
                <Button
                    onClick={() => navigate("/login")}
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                >
                    Login / Register
                </Button>
            </header>

            <div className="flex justify-center items-center grow">
                <Card className="w-full max-w-md bg-slate-800/70 border border-slate-700 shadow-2xl backdrop-blur-md">
                    <CardHeader>
                        <CardTitle className="text-2xl font-semibold text-white text-center">
                            HRM Portal Login
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <Label className="text-slate-300">Email</Label>
                                <Input
                                    name="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    value={form.email}
                                    onChange={handleChange}
                                    className="bg-slate-700/40 text-white border-slate-600"
                                    required
                                />
                            </div>
                            <div>
                                <Label className="text-slate-300">Password</Label>
                                <Input
                                    name="password"
                                    type="password"
                                    placeholder="Enter your password"
                                    value={form.password}
                                    onChange={handleChange}
                                    className="bg-slate-700/40 text-white border-slate-600"
                                    required
                                />
                            </div>
                            <Button
                                type="submit"
                                className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white"
                                disabled={loading}
                            >
                                {loading ? "Logging in..." : "Login"}
                            </Button>
                            <p className="text-slate-400 text-center mt-3">
                                Don’t have an account?{" "}
                                <span
                                    onClick={() => navigate("/register")}
                                    className="text-blue-400 hover:underline cursor-pointer"
                                >
                                    Register
                                </span>
                            </p>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default Login

// import React, { useState } from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
// import { Input } from '../ui/input';
// import { Label } from '../ui/label';
// import axios from "axios";
// import { Button } from '../ui/button';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//     const navigate = useNavigate();

//     const [form, setForm] = useState({
//         email: "",
//         password: ""
//     });

//     const [loading, setLoading] = useState(false);

//     const handleChange = (e) => {
//         setForm({
//             ...form,
//             [e.target.name]: e.target.value
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);

//         try {
//             const res = await axios.post(
//                 "http://localhost:4000/api/auth/login",
//                 form
//             );

//             localStorage.setItem("token", res.data.token);
//             localStorage.setItem("user", JSON.stringify(res.data.user));

//             alert("Login Successful!");

//             setTimeout(() => {
//                 const role = res.data.user?.role;

//                 if (role === "Employee") navigate("/employee");
//                 else if (role === "HR") navigate("/hr");
//                 else if (role === "Manager") navigate("/manager");
//                 else navigate("/");
//             }, 1200);

//         } catch (error) {
//             alert(error.response?.data?.message || "Login failed");
//             console.log(error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div>
//             <header>
//                 <h1>HRM Portal</h1>

//                 <Button onClick={() => navigate("/login")}>
//                     Login / Register
//                 </Button>
//             </header>

//             <div>
//                 <Card>
//                     <CardHeader>
//                         <CardTitle>
//                             HRM Portal Login
//                         </CardTitle>
//                     </CardHeader>

//                     <CardContent>
//                         <form onSubmit={handleSubmit}>
//                             <div>
//                                 <Label>Email</Label>
//                                 <Input
//                                     name="email"
//                                     type="email"
//                                     placeholder="Enter your email"
//                                     value={form.email}
//                                     onChange={handleChange}
//                                     required
//                                 />
//                             </div>

//                             <div>
//                                 <Label>Password</Label>
//                                 <Input
//                                     name="password"
//                                     type="password"
//                                     placeholder="Enter your password"
//                                     value={form.password}
//                                     onChange={handleChange}
//                                     required
//                                 />
//                             </div>

//                             <Button
//                                 type="submit"
//                                 disabled={loading}
//                             >
//                                 {loading ? "Logging in..." : "Login"}
//                             </Button>

//                             <p>
//                                 Don’t have an account?{" "}
//                                 <span onClick={() => navigate("/register")}>
//                                     Register
//                                 </span>
//                             </p>
//                         </form>
//                     </CardContent>
//                 </Card>
//             </div>
//         </div>
//     );
// };

// export default Login;