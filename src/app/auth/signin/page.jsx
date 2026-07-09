'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@heroui/react';
import { ArrowLeft, Eye, EyeSlash } from '@gravity-ui/icons';
import { authClient } from '@/lib/auth-client';
import { TextField, Label, InputGroup } from "@heroui/react";

const SignInPage = () => {
    const router = useRouter();

    // Form Field States
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const searchParams = useSearchParams();
    const redirectTo = searchParams.get("redirect") || "/"
    console.log(redirectTo, 'Go to the path to')

    // UI and Feedback States
    const [isVisible, setIsVisible] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    const handleSignIn = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        // Basic Client-side Validation
        if (!email || !password) {
            setError('All fields are required.');
            setLoading(false);
            return;
        }

        try {
            const response = await authClient.signIn.email({
                email,
                password,
                // callbackURL: '/', 
            });

            if (response?.error) {
                // Capture specific error messages from Better Auth configuration
                setError(response.error.message || 'Invalid email or password.');
            } else {
                setSuccess('Signed in successfully! Redirecting...');
                setEmail('');
                setPassword('');
                router.push(redirectTo)
            }
        } catch (err) {
            setError('An unexpected network error occurred.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 dark:bg-zinc-950">
            <div className="w-full max-w-md space-y-6 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">

                {/* Back Navigation & Headers */}
                <div className="flex flex-col space-y-2">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors w-fit"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </Link>
                    <h2 className="mt-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-zinc-50">
                        Sign in to your account
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-zinc-400">
                        Welcome back! Please enter your details below.
                    </p>
                </div>

                {/* Dynamic Status Notifications */}
                {error && (
                    <div className="rounded-xl bg-danger-50 p-3 text-sm font-medium text-danger dark:bg-danger-950/30 border border-danger-200 dark:border-danger-900/50">
                        {error}
                    </div>
                )}
                {success && (
                    <div className="rounded-xl bg-success-50 p-3 text-sm font-medium text-success dark:bg-success-950/30 border border-success-200 dark:border-success-900/50">
                        {success}
                    </div>
                )}

                <form onSubmit={handleSignIn} className="space-y-4">

                    {/* Email Field */}
                    <TextField isRequired className="w-full">
                        <Label>Email</Label>
                        <InputGroup>
                            <InputGroup.Input
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={loading}
                            />
                        </InputGroup>
                    </TextField>

                    {/* Password Field */}
                    <TextField isRequired className="w-full">
                        <Label>Password</Label>
                        <InputGroup>
                            <InputGroup.Input
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={loading}
                                type={isVisible ? 'text' : 'password'}
                            />
                            <InputGroup.Suffix>
                                <button
                                    className="focus:outline-none text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                                    type="button"
                                    onClick={toggleVisibility}
                                >
                                    {isVisible ? (
                                        <EyeSlash className="w-5 h-5 pointer-events-none" />
                                    ) : (
                                        <Eye className="w-5 h-5 pointer-events-none" />
                                    )}
                                </button>
                            </InputGroup.Suffix>
                        </InputGroup>
                    </TextField>

                    <Button
                        type="submit"
                        color="primary"
                        className="w-full mt-2 font-medium"
                        isLoading={loading}
                    >
                        Sign In
                    </Button>
                </form>

                <p className="text-center text-sm text-gray-500 dark:text-zinc-400">
                    Dont have an account?{' '}
                    <Link
                        href={`/auth/signup?redirect=${redirectTo}`}
                        className="font-medium text-primary hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default SignInPage;