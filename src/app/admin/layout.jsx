'use client';

import '@/app/features.css';
import '@/app/admin.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from '@/components/shared/Logo';
import { 
    LuLayoutDashboard, 
    LuClipboardList, 
    LuHouse 
} from 'react-icons/lu';

export default function AdminLayout({ children }) {
    const pathname = usePathname();

    const isActive = (path) => pathname === path || pathname.startsWith(`${path}/`);

    return (
        <div className="admin-layout full-width">
            {/* Main content */}
            <div className="admin-main full-width">
                <div className="admin-topbar">
                    <div className="topbar-title topbar-title-text" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <Logo />
                        Welcome Back !
                    </div>

                    <div className="topbar-nav topbar-nav-links">
                        <Link href="/admin" title="Overview" className={`topbar-link nav-icon-link ${pathname === '/admin' ? 'active' : ''}`}>
                            <LuLayoutDashboard />
                        </Link>
                        <Link href="/admin/leads" title="Leads" className={`topbar-link nav-icon-link ${pathname.startsWith('/admin/leads') ? 'active' : ''}`}>
                            <LuClipboardList />
                        </Link>
                        <Link href="/" title="View Site" target="_blank" className="topbar-link nav-icon-link faded">
                            <LuHouse />
                        </Link>
                    </div>
                </div>

                <div className="admin-content">
                    {children}
                </div>
            </div>
        </div>
    );
}