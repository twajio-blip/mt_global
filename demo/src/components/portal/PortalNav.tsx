import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BriefcaseIcon, ExternalLinkIcon, FileTextIcon, LayoutDashboardIcon, LogOutIcon, PlusCircleIcon } from 'lucide-react';
import { BrandLogo } from '../BrandLogo';
import { useAuth } from '../../contexts/AuthContext';
import { initials } from '../../utils/format';

const items = [
{ to: '/portal', label: 'Dashboard', icon: LayoutDashboardIcon, match: (p: string) => p === '/portal' },
{
  to: '/portal/jobs',
  label: 'Jobs',
  icon: BriefcaseIcon,
  match: (p: string) => p.startsWith('/portal/jobs') && p !== '/portal/jobs/new'
},
{ to: '/portal/jobs/new', label: 'Add Job', icon: PlusCircleIcon, match: (p: string) => p === '/portal/jobs/new' },
{ to: '/portal/cvs', label: 'CVs', icon: FileTextIcon, match: (p: string) => p.startsWith('/portal/cvs') }];


export function PortalNav() {
  const { pathname } = useLocation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/portal/login', { replace: true });
  };

  return (
    <div className="flex h-full flex-col bg-brand-900 text-brand-100">
      <div className="px-5 pb-6 pt-6">
        <BrandLogo variant="light" subtitle="Client Portal" />
      </div>

      <nav aria-label="Portal" className="flex-1 px-3">
        <ul className="space-y-1">
          {items.map((item) => {
            const active = item.match(pathname);
            const Icon = item.icon;
            return (
              <li key={item.to}>
                <Link
                  to={item.to}
                  aria-current={active ? 'page' : undefined}
                  className={`flex h-11 items-center gap-3 rounded-lg px-3 text-[15px] font-medium transition-colors duration-150 ease-out ${
                  active ? 'bg-white/10 text-white' : 'text-brand-200 hover:bg-white/5 hover:text-white'}`
                  }>
                  
                  <Icon className="h-[18px] w-[18px]" aria-hidden />
                  {item.label}
                </Link>
              </li>);

          })}
          <li>
            <button
              type="button"
              onClick={handleLogout}
              className="flex h-11 w-full items-center gap-3 rounded-lg px-3 text-[15px] font-medium text-brand-200 transition-colors duration-150 ease-out hover:bg-white/5 hover:text-white">
              
              <LogOutIcon className="h-[18px] w-[18px]" aria-hidden />
              Logout
            </button>
          </li>
        </ul>
      </nav>

      <div className="border-t border-white/10 p-4">
        <Link
          to="/"
          target="_blank"
          className="mb-4 flex items-center gap-2 px-1 text-sm text-brand-200 hover:text-white">
          
          <ExternalLinkIcon className="h-4 w-4" aria-hidden />
          View public website
        </Link>
        {user &&
        <div className="flex items-center gap-3 px-1">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-sm font-semibold text-white">
              {initials(user.name)}
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white">{user.name}</p>
              <p className="truncate text-[12px] text-brand-200">{user.email}</p>
            </div>
          </div>
        }
      </div>
    </div>);

}