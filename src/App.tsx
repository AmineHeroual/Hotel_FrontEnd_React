import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Routes, Route, Navigate } from 'react-router-dom';

import { lazy, Suspense, useEffect, useState } from 'react';

// Import pages
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import RoomsPage from './pages/rooms';
import ServicesPage from './pages/services';
import AboutPage from './pages/about';
import ContactPage from './pages/contact';
//
import ProtectedRoute from '@/components/ProtectedRoute';
import PrivateRoute from './components/PrivateRoute';
//
// Auth pages
const Login = lazy(() => import('./pages/auth/login'));
const Register = lazy(() => import('./pages/auth/register'));

// Receptionist Dashboard pages
const ReceptionistDashboard = lazy(
    () => import('./pages/dashboard/receptionist/index')
);
const ReceptionistReservations = lazy(
    () => import('./pages/dashboard/receptionist/reservations')
);
const ReceptionistMaintenance = lazy(
    () => import('./pages/dashboard/receptionist/maintenance')
);
const ReceptionistRooms = lazy(
    () => import('./pages/dashboard/receptionist/rooms')
);
const ReceptionistPayments = lazy(
    () => import('./pages/dashboard/receptionist/payments')
);

// Admin Dashboard pages
const AdminDashboard = lazy(() => import('./pages/dashboard/admin/index'));
const AdminUsers = lazy(() => import('./pages/dashboard/admin/users'));
const AdminRooms = lazy(() => import('./pages/dashboard/admin/rooms'));
const AdminReservations = lazy(
    () => import('./pages/dashboard/admin/reservations')
);
const AdminPayments = lazy(() => import('./pages/dashboard/admin/payments'));
const AdminMaintenance = lazy(
    () => import('./pages/dashboard/admin/maintenance')
);
const AdminSettings = lazy(() => import('./pages/dashboard/admin/settings'));

// Technician Dashboard pages
const TechnicianDashboard = lazy(
    () => import('./pages/dashboard/technician/index')
);
const TechnicianTasks = lazy(
    () => import('./pages/dashboard/technician/tasks')
);
const TechnicianReports = lazy(
    () => import('./pages/dashboard/technician/reports')
);
const IssueReports = lazy(
    () => import('./pages/dashboard/technician/issue-reports')
);

const queryClient = new QueryClient();

// Loading component for Suspense
const PageLoading = () => (
    <div className="min-h-screen flex items-center justify-center bg-luxury-dark">
        <div className="w-10 h-10 border-4 border-luxury-gold border-t-transparent rounded-full animate-spin"></div>
    </div>
);

const App = () => {
    const [authToken, setAuthToken] = useState<string | null>(null);
    // Initialize theme from localStorage on app start
    useEffect(() => {
        // Check for theme preference
        const token = localStorage.getItem('token');
        const themePreference = localStorage.getItem('theme');
        const useSystemPreference =
            localStorage.getItem('theme-source') === 'system';

        if (token) {
            setAuthToken(token);
        }

        if (useSystemPreference) {
            // Check system preference
            const prefersDark = window.matchMedia(
                '(prefers-color-scheme: dark)'
            ).matches;
            if (prefersDark) {
                document.documentElement.classList.add('dark');
            }
        } else if (themePreference === 'dark') {
            document.documentElement.classList.add('dark');
        }

        // Apply color theme if any
        const colorTheme = localStorage.getItem('color-theme');
        if (
            colorTheme &&
            ['gold', 'emerald', 'sapphire', 'ruby', 'amethyst'].includes(
                colorTheme
            )
        ) {
            document.documentElement.classList.add(`theme-${colorTheme}`);
        }
    }, []);

    return (
        <QueryClientProvider client={queryClient}>
            <TooltipProvider>
                <Toaster />
                <Sonner />
                <Suspense fallback={<PageLoading />}>
                    <Routes>
                        {/* Public routes */}
                        <Route path="/" element={<Index />} />
                        <Route path="/rooms" element={<RoomsPage />} />
                        <Route path="/services" element={<ServicesPage />} />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/contact" element={<ContactPage />} />
                        {/* Auth routes */}
                        {/* <Route path="/auth/login" element={<Login />} /> */}
                        <Route
                            path="/auth/login"
                            element={
                                !authToken ? (
                                    <Login />
                                ) : (
                                    <Navigate to="/dashboard/receptionist" />
                                )
                            }
                        />{' '}
                        {/* [MODIFIED] */}
                        <Route path="/auth/register" element={<Register />} />
                        {/* Receptionist dashboard routes */}
                        <Route
                            path="/*"
                            element={
                                <ProtectedRoute>
                                    <Routes>
                                        <Route
                                            path="/dashboard/receptionist"
                                            element={
                                                <ProtectedRoute>
                                                    <ReceptionistDashboard />
                                                </ProtectedRoute>
                                            }
                                        />
                                        <Route
                                            path="/dashboard/receptionist/reservations"
                                            element={
                                                <ReceptionistReservations />
                                            }
                                        />
                                        <Route
                                            path="/dashboard/receptionist/maintenance"
                                            element={
                                                <ReceptionistMaintenance />
                                            }
                                        />
                                        <Route
                                            path="/dashboard/receptionist/rooms"
                                            element={<ReceptionistRooms />}
                                        />
                                        <Route
                                            path="/dashboard/receptionist/payments"
                                            element={<ReceptionistPayments />}
                                        />
                                        {/* Admin dashboard routes */}
                                        <Route
                                            path="/dashboard/admin"
                                            element={
                                                <PrivateRoute>
                                                    <AdminDashboard />
                                                </PrivateRoute>
                                            }
                                        />
                                        <Route
                                            path="/dashboard/admin/users"
                                            element={<AdminUsers />}
                                        />
                                        <Route
                                            path="/dashboard/admin/rooms"
                                            element={<AdminRooms />}
                                        />
                                        <Route
                                            path="/dashboard/admin/reservations"
                                            element={<AdminReservations />}
                                        />
                                        <Route
                                            path="/dashboard/admin/payments"
                                            element={<AdminPayments />}
                                        />
                                        <Route
                                            path="/dashboard/admin/maintenance"
                                            element={<AdminMaintenance />}
                                        />
                                        <Route
                                            path="/dashboard/admin/settings"
                                            element={<AdminSettings />}
                                        />
                                        {/* Technician dashboard routes */}
                                        <Route
                                            path="/dashboard/technician"
                                            element={<TechnicianDashboard />}
                                        />
                                        <Route
                                            path="/dashboard/technician/tasks"
                                            element={<TechnicianTasks />}
                                        />
                                        <Route
                                            path="/dashboard/technician/reports"
                                            element={<TechnicianReports />}
                                        />
                                        <Route
                                            path="/dashboard/technician/issue-reports"
                                            element={<IssueReports />}
                                        />
                                        {/* Handle 404 */}
                                        <Route
                                            path="*"
                                            element={<NotFound />}
                                        />
                                    </Routes>
                                </ProtectedRoute>
                            }
                        ></Route>
                    </Routes>
                </Suspense>
            </TooltipProvider>
        </QueryClientProvider>
    );
};

export default App;
