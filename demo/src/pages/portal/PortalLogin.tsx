import React, { FormEvent, useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { AlertCircleIcon, ArrowLeftIcon, Loader2Icon } from 'lucide-react';
import { BrandLogo } from '../../components/BrandLogo';
import { FormField } from '../../components/ui/FormField';
import { useAuth } from '../../contexts/AuthContext';
import { images } from '../../data/images';
import { buttonNavy, inputClass } from '../../utils/styles';

export function PortalLogin() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as {from?: string;} | null)?.from ?? '/portal';
  const [email, setEmail] = useState('recruiter@meridianmanpower.com');
  const [password, setPassword] = useState('demo1234');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (user) return <Navigate to="/portal" replace />;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email.trim() || !password) {
      setError('Enter your email and password.');
      return;
    }
    setLoading(true);
    const ok = await login(email, password);
    setLoading(false);
    if (ok) navigate(from, { replace: true });else
    setError('Incorrect email or password. Please try again.');
  };

  return (
    <div className="grid min-h-screen w-full bg-white lg:grid-cols-2">
      <div className="flex flex-col px-6 py-8 sm:px-12 lg:px-20">
        <Link to="/" className="flex items-center gap-1.5 self-start text-sm font-medium text-ink-600 hover:text-brand-800">
          <ArrowLeftIcon className="h-4 w-4" aria-hidden /> Back to website
        </Link>

        <div className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center py-12">
          <BrandLogo subtitle="Client Portal" />
          <h1 className="mt-10 text-3xl font-bold tracking-tight text-ink-900">Sign in to your portal</h1>
          <p className="mt-2 text-[15px] text-ink-600">Publish jobs and access CVs submitted by candidates.</p>

          <form noValidate onSubmit={handleSubmit} className="mt-8 space-y-5">
            {error &&
            <p role="alert" className="flex items-start gap-2 rounded-lg bg-danger-50 px-3.5 py-3 text-sm text-danger-700">
                <AlertCircleIcon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                {error}
              </p>
            }
            <FormField label="Email" htmlFor="login-email">
              <input
                id="login-email"
                type="email"
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass} />
              
            </FormField>
            <FormField label="Password" htmlFor="login-password">
              <input
                id="login-password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={inputClass} />
              
            </FormField>
            <button type="submit" disabled={loading} className={`${buttonNavy} w-full`}>
              {loading ?
              <>
                  <Loader2Icon className="h-4 w-4 animate-spin" aria-hidden /> Signing in…
                </> :

              'Sign in'
              }
            </button>
          </form>

          <p className="mt-6 rounded-lg bg-surface px-3.5 py-3 text-[13px] text-ink-600">
            Demo access is pre-filled: <span className="font-medium text-ink-900">recruiter@meridianmanpower.com</span> /{' '}
            <span className="font-medium text-ink-900">demo1234</span>
          </p>
        </div>
      </div>

      <div className="relative hidden bg-brand-900 lg:block">
        <img src={images.portal} alt="" className="absolute inset-0 h-full w-full object-cover opacity-80" />
      </div>
    </div>);

}