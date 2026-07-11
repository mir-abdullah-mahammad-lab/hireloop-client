'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter,useSearchParams } from 'next/navigation';
import { Button, } from '@heroui/react';
import { ArrowLeft, Eye, EyeSlash } from '@gravity-ui/icons';
import { authClient } from '@/lib/auth-client';
import {TextField, Label, InputGroup, Radio, RadioGroup} from "@heroui/react";

const SignUpPage = () => {
    const router = useRouter();
    const searchParam =  useSearchParams()
   const  redirectTo = searchParam.get("redirect") || "/"
    // Form Field States
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('seeker')

    // UI and Feedback States
    const [isVisible, setIsVisible] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    const handleSignUp = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        // Basic Client-side Validation
        if (!name || !email || !password) {
            setError('All fields are required.');
            setLoading(false);
            return;
        }
        
        const plan = role === 'seeker' ? 'seeker_free' : 'recruiter_free'

        try {
            const response = await authClient.signUp.email({
                email,
                password,
                name,
                role,
                plan
                
            });

            if (response?.error) {
                // Capture specific error messages dispatched from your Better Auth configuration
                setError(response.error.message || 'Failed to sign up. Please try again.');
            } else {
                setSuccess('Account created successfully! Redirecting...');
                setName('');
                setEmail('');
                setPassword('');
                router.push(redirectTo);
              
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
                        href="/signin"
                        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors w-fit"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Sign In
                    </Link>
                    <h2 className="mt-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-zinc-50">
                        Create your account
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-zinc-400">
                        Join us by filling out the details below.
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


                <form onSubmit={handleSignUp} className="space-y-4">

                    {/* Name Field */}
                    <TextField isRequired className="w-full">
                        <Label>Name</Label>
                        <InputGroup>
                            <InputGroup.Input
                                type="text"
                                placeholder="Enter your name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                disabled={loading}
                            />
                        </InputGroup>
                    </TextField>

                    {/* Email Field */}
                    <TextField isRequired className= "w-full">
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

                    {/* RBAC - Selection     */}
                    
                        
                        
                        <RadioGroup orientation='horizontal' defaultValue="seeker" name='role' onChange={(v)=>{setRole(v)}}> 
                            <Label>Select Role</Label>
                            <Radio  value="seeker" >
                            <Radio.Content>
                                <Radio.Control>
                                    <Radio.Indicator className='bg-gray-50'/>
                                </Radio.Control>
                                Job Seeker
                            </Radio.Content>
                           
                        </Radio>
                        <Radio value="recruiter" >
                            <Radio.Content>
                                <Radio.Control>
                                    <Radio.Indicator className='bg-gray-50' />
                                </Radio.Control>
                                Recruiter
                            </Radio.Content>
                           
                        </Radio>
                        </RadioGroup>
                    
                    <Button
                        type="submit"
                        color="primary"
                        className="w-full mt-2 font-medium"
                        isLoading={loading}
                    >
                        Sign Up
                    </Button>
                </form>

                {/* Alternate Navigation Toggle at Bottom */}
                <p className="text-center text-sm text-gray-500 dark:text-zinc-400">
                    Already have an account?{' '}
                    <Link
                        href={`/auth/signin?redirect=${redirectTo}`}
                        className="font-medium text-primary hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default SignUpPage