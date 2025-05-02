import { useNavigate } from 'react-router-dom';
import { User, LogOut } from 'lucide-react';
import { ButtonCustom } from '@/components/ui/button-custom';
import { useToast } from '@/hooks/use-toast';
import { UserRole } from '@/types';
import React, { useEffect, useState } from 'react';

interface SidebarUserProfileProps {
    collapsed: boolean;
    userRole: UserRole;
    // unsername: User;
    onLogout: () => void;
}

// Role labels in French
const roleLabels: Record<UserRole, string> = {
    client: 'Client',
    admin: 'Administrateur',
    technician: 'Technicien',
    receptionist: 'Réceptionniste',
};

export const SidebarUserProfile: React.FC<SidebarUserProfileProps> = ({
    collapsed,
    userRole,
    onLogout,
}) => {
    const [username, setUsername] = useState<string>(''); // ✅ إضافة الحالة
    const navigate = useNavigate();

    useEffect(() => {
        // ✅ استرجاع الاسم من localStorage
        const storedName = localStorage.getItem('username');
        if (storedName) {
            setUsername(storedName);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('email');
        localStorage.removeItem('username');
        localStorage.removeItem('role');
        navigate('/'); // ✅ إعادة التوجيه لصفحة تسجيل الدخول
    };
    return (
        <div className="flex items-center justify-between">
            {!collapsed && (
                <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-sidebar-primary flex items-center justify-center">
                        <User className="h-4 w-4 text-sidebar-primary-foreground" />
                    </div>
                    <div className="text-sm">
                        <div className="font-medium text-sidebar-foreground">
                            {username || 'Utilisateur'}
                        </div>
                        <div className="text-xs text-sidebar-foreground/70 capitalize">
                            {roleLabels[userRole] || userRole}
                        </div>
                    </div>
                </div>
            )}

            <div className="flex items-center gap-1">
                {!collapsed && (
                    <ButtonCustom
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
                        aria-label="Déconnexion"
                        // onClick={onLogout}
                        onClick={handleLogout}
                    >
                        <LogOut className="h-4 w-4" />
                    </ButtonCustom>
                )}
            </div>
        </div>
    );
};
