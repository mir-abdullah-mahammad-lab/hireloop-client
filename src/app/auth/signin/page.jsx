import { Suspense } from "react";
import SignInForm from "@/components/signInForm";


  

// 2. Wrap the component with Suspense in the main exported page component
export default function SignInPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 dark:bg-zinc-950">
            <Suspense fallback={<div>Loading...</div>}>
                <SignInForm />
            </Suspense>
        </div>
    );
}