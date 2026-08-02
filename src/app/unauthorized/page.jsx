"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button, Card, CardHeader } from "@heroui/react";
import { LockFill, ArrowLeft, ShieldExclamation } from "@gravity-ui/icons";

// Assuming you have a standard better-auth client configured setup:
import { authClient } from "@/lib/auth-client"; 

export default function UnauthorizedPage() {
  const router = useRouter();

  const handleSignIn = async () => {
    // Replace with your preferred better-auth provider (e.g., "google", "credential", etc.)
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/dashboard/seeker", 
    });
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background p-4 pattern-grid-lg">
      <Card className="max-w-md w-full p-4 border border-divider shadow-md" radius="lg">
        <CardHeader className="flex flex-col items-center justify-center gap-2 pb-2">
          {/* Visual Alert Badge */}
          <div className="p-4 bg-danger-50 text-danger rounded-full dark:bg-danger-950/30 flex items-center justify-center mb-2">
            <LockFill width={36} height={36} strokeWidth={2} />
          </div>
          <h1 className="text-2xl font-bold text-foreground text-center tracking-tight">
            Access Denied
          </h1>
          <p className="text-sm text-default-500 text-center max-w-[85%]">
            You do not have permission to view this page. You might need to sign in or use a different account.
          </p>
        </CardHeader>

        <Card.Content className="flex flex-col gap-3 pt-4">
          {/* Main Call to Action: Sign In */}
          <Button 
            color="primary" 
            variant="solid"
            size="lg"
            className="font-medium shadow-sm"
            onPress={handleSignIn}
          >
            Sign In with Account
          </Button>

          {/* Secondary Actions */}
          <div className="grid grid-cols-2 gap-2 mt-2">
            <Button 
              variant="bordered" 
              color="default"
              size="md"
              startContent={<ArrowLeft width={16} height={16} />}
              onPress={() => router.back()}
            >
              Go Back
            </Button>
            
            <Button 
              variant="light" 
              color="default"
              size="md"
              onPress={() => router.push("/")}
            >
              Home Base
            </Button>
          </div>
        </Card.Content>
      </Card>
      
      {/* Decorative Security Tagline */}
      <div className="absolute bottom-6 flex items-center gap-2 text-xs text-default-400">
        <ShieldExclamation width={14} height={14} />
        <span>Secured by Better-Auth & MongoDB</span>
      </div>
    </div>
  );
}