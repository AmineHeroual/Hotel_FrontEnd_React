import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ButtonCustom } from '@/components/ui/button-custom';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
    LogIn,
    Mail,
    Lock,
    ArrowLeft,
    ConciergeBell,
    Shield,
    Wrench,
} from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios'; // استيراد مكتبة axios

const Login = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Demo login - in a real app, you would call an API
            //await new Promise((resolve) => setTimeout(resolve, 1000));

            // إرسال بيانات التسجيل إلى API Django للحصول على التوكن
            const response = await fetch('http://127.0.0.1:8000/api/token/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    // username: username,
                    email: email,
                    password: password,
                }),
            });

            const data = await response.json();
            console.log('API response:', JSON.stringify(data));

            if (data.access && data.refresh) {
                toast.success('User Login successfully!');
                localStorage.setItem('access_token', data.access);
                localStorage.setItem('refresh_token', data.refresh);

                const userResponse = await fetch(
                    'http://127.0.0.1:8000/api/auth/users/me/',
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${data.access}`, // استخدم التوكن هنا
                        },
                    }
                );
                const userData = await userResponse.json();
                alert(JSON.stringify(userData));
                // تخزين التوكن في localStorage

                localStorage.setItem('email', email);
                localStorage.setItem('username', userData.username);
                localStorage.setItem('role', userData.role);

                // توجيه المستخدم إلى الصفحة الرئيسية أو صفحة الحساب
                window.location.href = '/dashboard/receptionist';
            } else {
                // alert('فشل تسجيل الدخول. تحقق من البيانات.');
                // window.location.href = '/';
                window.location.href = '/';
                // alert('Faild Login');
                toast.error(
                    'Login failed. Please try again, Or Check your Data!.'
                );

                // toast.success(`Account created successfully, ${username}!`, {
                //     position: 'top-right',
                //     // autoClose: 3000,
                //     hideProgressBar: false,
                //     closeOnClick: true,
                //     pauseOnHover: true,
                //     draggable: true,
                // });
            }

            // Mock login success based on email
            if (email === 'receptionist@example.com') {
                navigate('/dashboard/receptionist');
                toast.success('Welcome back, Receptionist!');
            } else if (email === 'admin@example.com') {
                navigate('/dashboard/admin');
                toast.success('Welcome back, Admin!');
            } else if (email === 'technician@example.com') {
                navigate('/dashboard/technician');
                toast.success('Welcome back, Technician!');
            } else {
                // Default fallback to receptionist dashboard
                navigate('/dashboard/receptionist');
                toast.success('Welcome back!');
            }
        } catch (error) {
            toast.error('Login failed. Please check your credentials.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-muted/30">
            <Link
                to="/"
                className="p-4 inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
            </Link>

            <div className="flex-1 flex items-center justify-center px-4 py-12">
                <div className="w-full max-w-md">
                    <div className="bg-background rounded-xl shadow-sm border border-border p-8 animate-fade-in">
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 mb-4">
                                <LogIn className="h-6 w-6 text-primary" />
                            </div>
                            <h1 className="text-2xl font-bold">Welcome back</h1>
                            <p className="text-muted-foreground mt-1">
                                Sign in to your account
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                                        <Mail className="h-4 w-4" />
                                    </div>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="you@example.com"
                                        className="pl-10"
                                        value={email}
                                        onChange={
                                            (e) => setEmail(e.target.value)
                                            // setUsername(e.target.value)
                                        }
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password">Password</Label>
                                    <Link
                                        to="/auth/forgot-password"
                                        className="text-xs text-primary hover:underline"
                                    >
                                        Forgot password?
                                    </Link>
                                </div>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                                        <Lock className="h-4 w-4" />
                                    </div>
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="••••••••"
                                        className="pl-10"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        required
                                    />
                                </div>
                            </div>

                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="remember"
                                    checked={rememberMe}
                                    onCheckedChange={(checked) =>
                                        setRememberMe(!!checked)
                                    }
                                />
                                <Label
                                    htmlFor="remember"
                                    className="text-sm font-normal cursor-pointer"
                                >
                                    Remember me for 30 days
                                </Label>
                            </div>

                            <ButtonCustom
                                type="submit"
                                className="w-full"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <div className="flex items-center justify-center">
                                        <div className="h-4 w-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2"></div>
                                        Signing in...
                                    </div>
                                ) : (
                                    'Sign in'
                                )}
                            </ButtonCustom>
                        </form>

                        <div className="mt-6">
                            <p className="text-center text-sm text-muted-foreground">
                                Don't have an account?{' '}
                                <Link
                                    to="/auth/register"
                                    className="text-primary hover:underline"
                                >
                                    Sign up
                                </Link>
                            </p>
                        </div>

                        <div className="mt-6 pt-6 border-t border-border">
                            <div className="text-xs text-center text-muted-foreground">
                                <p className="mb-2">Sign in as:</p>
                                <div className="grid grid-cols-3 gap-2">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setEmail('receptionist@example.com')
                                        }
                                        className="flex flex-col items-center gap-1 px-2 py-3 rounded text-xs bg-muted hover:bg-muted/80 transition-colors"
                                    >
                                        <ConciergeBell className="h-5 w-5 text-primary mb-1" />
                                        Receptionist
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setEmail('admin@example.com')
                                        }
                                        className="flex flex-col items-center gap-1 px-2 py-3 rounded text-xs bg-muted hover:bg-muted/80 transition-colors"
                                    >
                                        <Shield className="h-5 w-5 text-primary mb-1" />
                                        Admin
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setEmail('technician@example.com')
                                        }
                                        className="flex flex-col items-center gap-1 px-2 py-3 rounded text-xs bg-muted hover:bg-muted/80 transition-colors"
                                    >
                                        <Wrench className="h-5 w-5 text-primary mb-1" />
                                        Technician
                                    </button>
                                </div>
                                <p className="mt-2">(use any password)</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
