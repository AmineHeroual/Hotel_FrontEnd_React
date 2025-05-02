import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ButtonCustom } from '@/components/ui/button-custom';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { UserPlus, Mail, Lock, User, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';

const Register = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'client', // Default role
        agreeTerms: false,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (value: string) => {
        setFormData((prev) => ({ ...prev, role: value }));
    };

    const handleCheckboxChange = (checked: boolean) => {
        setFormData((prev) => ({ ...prev, agreeTerms: checked }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Basic validation
        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords don't match");
            return;
        }

        if (!formData.agreeTerms) {
            toast.error('You must agree to the terms and conditions');
            return;
        }

        setIsLoading(true);

        try {
            const response = await axios.post(
                'http://127.0.0.1:8000/api/users/register/',
                {
                    username: formData.email.split('@')[0], // ✅ توليد username تلقائي
                    first_name: formData.first_name,
                    last_name: formData.last_name,
                    email: formData.email,
                    password: formData.password,
                    confirm_password: formData.confirmPassword,
                    role: formData.role,
                }
            );

            toast.success('Account created successfully!');

            // Redirect based on role
            if (formData.role === 'client') {
                navigate('/');
                toast.success('Account created successfully!');
                // toast.success(`Account created successfully, ${response.data.user.username}!`);
            } else if (formData.role === 'admin') {
                navigate('/dashboard/admin');
            } else if (formData.role === 'technician') {
                navigate('/dashboard/technician');
            }

            // toast.success('Account created successfully!');
        } catch (error) {
            toast.error('Registration failed. Please try again.');
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
                                <UserPlus className="h-6 w-6 text-primary" />
                            </div>
                            <h1 className="text-2xl font-bold">
                                Create an account
                            </h1>
                            <p className="text-muted-foreground mt-1">
                                Sign up to get started
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName">
                                        First name
                                    </Label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                                            <User className="h-4 w-4" />
                                        </div>
                                        <Input
                                            id="firstName"
                                            name="first_name"
                                            type="text"
                                            placeholder="John"
                                            className="pl-10"
                                            value={formData.first_name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName">Last name</Label>
                                    <Input
                                        id="lastName"
                                        name="last_name"
                                        type="text"
                                        placeholder="Doe"
                                        value={formData.last_name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                                        <Mail className="h-4 w-4" />
                                    </div>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="you@example.com"
                                        className="pl-10"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="role">Account type</Label>
                                <Select
                                    value={formData.role}
                                    onValueChange={handleSelectChange}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select account type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="client">
                                            Client
                                        </SelectItem>
                                        <SelectItem value="admin">
                                            Administrator
                                        </SelectItem>
                                        <SelectItem value="technician">
                                            Technician
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                                        <Lock className="h-4 w-4" />
                                    </div>
                                    <Input
                                        id="password"
                                        name="password"
                                        type="password"
                                        placeholder="••••••••"
                                        className="pl-10"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword">
                                    Confirm password
                                </Label>
                                <Input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    placeholder="••••••••"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="agreeTerms"
                                    checked={formData.agreeTerms}
                                    onCheckedChange={handleCheckboxChange}
                                />
                                <Label
                                    htmlFor="agreeTerms"
                                    className="text-sm font-normal cursor-pointer"
                                >
                                    I agree to the{' '}
                                    <Link
                                        to="/terms"
                                        className="text-primary hover:underline"
                                    >
                                        terms and conditions
                                    </Link>
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
                                        Creating account...
                                    </div>
                                ) : (
                                    'Create account'
                                )}
                            </ButtonCustom>
                        </form>

                        <div className="mt-6">
                            <p className="text-center text-sm text-muted-foreground">
                                Already have an account?{' '}
                                <Link
                                    to="/auth/login"
                                    className="text-primary hover:underline"
                                >
                                    Sign in
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
