'use server'
import { getJobsById } from "@/lib/api/jobs";
import { getUserSession } from "@/lib/core/session";
import { redirect } from "next/navigation";
import JobApply from "./JobApply";
import { getApplicationsByApplicant } from "@/lib/api/applicants";
import Link from "next/link";

// HeroUI v3 Primitives
import { Card, Button, Chip, ProgressBar } from "@heroui/react";
// Gravity UI Icons 
import { ArrowLeft, CircleExclamationFill, CircleCheck, Star, Rocket } from "@gravity-ui/icons";

const ApplyPage = async ({ params }) => {
    const user = await getUserSession();
    const { id } = await params;
    const applicant_id = user?.id;

    if (!user) {
        redirect(`/auth/signin?redirect=/jobs/${id}/apply`);
    }

    if (user.role !== "seeker") {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
                <div className="p-4 bg-danger-50 text-danger rounded-full mb-4">
                    <CircleExclamationFill width={40} height={40} />
                </div>
                <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">Access Denied</h1>
                <p className="text-slate-500 max-w-sm mb-6">Only registered job seekers can submit applications for open roles.</p>
                <Link href="/jobs" passHref legacyBehavior>
                    <Button color="primary" variant="flat">
                        Browse Jobs
                    </Button>
                </Link>
            </div>
        );
    }

    const applications = await getApplicationsByApplicant(applicant_id);
    const job = await getJobsById(id);

    const plan = { name: 'Free Tier', maxApplicationsPerMonth: 3 };
    const currentCount = applications?.length || 0;
    const limitReached = currentCount >= plan.maxApplicationsPerMonth;
    const usagePercentage = (currentCount / plan.maxApplicationsPerMonth) * 100;

    return (
        <main className="max-w-5xl mx-auto px-4 py-8 md:py-12">
            {/* Back Navigation */}
            <div className="mb-6">
                <Link href={`/jobs/${id}`}>
                    <Button 
                        variant="light" 
                        className="text-slate-500 hover:text-slate-800"
                        startContent={<ArrowLeft width={16} height={16} />}
                    >
                        Back to job description
                    </Button>
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                
                {/* Left Side: Job Info & Application Form */}
                <div className="lg:col-span-2 space-y-6">
                    <Card variant="default" className="w-full border border-slate-100 dark:border-slate-800">
                        <Card.Header className="flex flex-col items-start gap-2 p-6 pb-4">
                            <div className="flex gap-2 items-center">
                                <Chip size="sm" color="primary" variant="flat" className="capitalize">{job.type || 'Full-time'}</Chip>
                                <Chip size="sm" color="default" variant="flat">{job.location || 'Remote'}</Chip>
                            </div>
                            <Card.Title className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-1">
                                Apply for {job.title}
                            </Card.Title>
                            <Card.Description className="text-slate-500 text-sm font-medium">
                                at {job.company || 'Confidential Company'}
                            </Card.Description>
                        </Card.Header>
                        
                        <Card.Content className="p-6">
                            {limitReached ? (
                                <div className="p-6 border border-warning-200 bg-warning-50/50 dark:bg-warning-950/20 rounded-xl text-center space-y-4">
                                    <div className="mx-auto w-12 h-12 bg-warning-100 text-warning rounded-full flex items-center justify-center">
                                        <CircleExclamationFill width={24} height={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-warning-800 dark:text-warning-400">Application Limit Reached</h3>
                                        <p className="text-sm text-warning-600 dark:text-warning-500 mt-1 max-w-md mx-auto">
                                            You have used all {plan.maxApplicationsPerMonth} of your monthly standard applications allowed on the <span className="font-semibold">{plan.name}</span>.
                                        </p>
                                    </div>
                                    <Link href={"/plans"} className="font-semibold inline-flex items-center gap-1 text-warning hover:underline">
                                        Upgrade Plan <Rocket width={16} height={16} />
                                    </Link>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg text-sm text-slate-600 dark:text-slate-400 flex items-start gap-3">
                                        <CircleCheck className="text-success mt-0.5 shrink-0" width={18} height={18} />
                                        <span>Your profile data and CV will be automatically shared with the hiring manager reviewing this position.</span>
                                    </div>
                                    <JobApply job={job} applicant={user} />
                                </div>
                            )}
                        </Card.Content>
                    </Card>
                </div>

                {/* Right Side: Account Plan Limits Tracker */}
                <div className="space-y-6">
                    <Card variant="secondary" className="w-full border border-slate-100 dark:border-slate-800 bg-gradient-to-b from-white to-slate-50/50 dark:from-slate-950 dark:to-slate-900">
                        <Card.Content className="p-6 space-y-6">
                            <div>
                                <div className="flex justify-between items-center mb-1">
                                    <h4 className="font-bold text-slate-800 dark:text-slate-200">Application Tracker</h4>
                                    <Chip size="sm" color={limitReached ? "warning" : "success"} variant="dot" className="font-semibold uppercase text-xs">
                                        {plan.name}
                                    </Chip>
                                </div>
                                <p className="text-xs text-slate-400">Resets on your next monthly billing cycle.</p>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500 font-medium">Monthly Quota Usage</span>
                                    <span className="font-bold text-slate-800 dark:text-slate-200">
                                        {currentCount} / {plan.maxApplicationsPerMonth}
                                    </span>
                                </div>
                                <ProgressBar 
                                    aria-label="Application limit progress"
                                    value={usagePercentage} 
                                    color={limitReached ? "danger" : usagePercentage >= 66 ? "warning" : "primary"}
                                    className="h-2"
                                />
                            </div>

                            {!limitReached && (
                                <div className="text-xs text-slate-500 leading-relaxed bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-100 dark:border-slate-800">
                                    💡 You still have <strong>{plan.maxApplicationsPerMonth - currentCount}</strong> regular applications left for this period. Apply wisely!
                                </div>
                            )}

                            {limitReached && (
                                <Card variant="tertiary" className="border border-primary-100">
                                    <Card.Content className="p-4 flex flex-col items-center text-center gap-3">
                                        <Star className="text-primary" width={24} height={24} />
                                        <div>
                                            <h5 className="font-bold text-sm text-primary-900 dark:text-primary-400">Unlock Unlimited Submissions</h5>
                                            <p className="text-xs text-primary-700 dark:text-primary-500 mt-0.5">Premium plans unlock direct hiring chat and real-time review updates.</p>
                                        </div>
                                        <Link href="/plans" >
                                            <Button size="sm" color="primary" className="w-full font-medium">
                                                View Premium Plans
                                            </Button>
                                        </Link>
                                    </Card.Content>
                                </Card>
                            )}
                        </Card.Content>
                    </Card>
                </div>

            </div>
        </main>
    );
};

export default ApplyPage;