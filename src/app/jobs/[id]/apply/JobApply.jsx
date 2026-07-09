'use client'
import React, { useState } from 'react';
import { Form, Button, TextField, Label, Input, Description, FieldError, TextArea } from '@heroui/react';
// import { submitApplication } from '@/lib/actions/applications';
// import { serverMutation } from '@/lib/core/server';

const JobApply = ({ job, applicant }) => {
    console.log('applicatnt info', applicant?.id)
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Convert form data to a plain object
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    // Add the structural IDs for your MongoDB backend / Better Auth session
    const submissionData = {
      ...data,
      jobId: job?._id,
      applicantId: applicant?.id,
    };

    console.log("Submitting Application:", submissionData);
    // Handle your MongoDB submission API call here
    // const res = await serverMutation('/api/applications', submissionData)

    //direct api try 
    const res = await fetch(`http://localhost:5000/api/applications`,{
        method: 'POST',
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(submissionData)
     })
     const result = await res.json()

     
     console.log(result, 'response from the backend')

    // if(res.insertedId){
    //     alert('Application submitted sucessfully!')
    // }

  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-zinc-900 rounded-xl shadow-md border border-zinc-200 dark:border-zinc-800">
      {/* Header section displaying current job info */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Apply for {job?.title || "Position"}
        </h1>
        {job?.company && (
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">{job.company}</p>
        )}
      </div>

      <hr className="border-zinc-200 dark:border-zinc-800 mb-6" />

      {/* HeroUI Form component */}
      <Form onSubmit={handleSubmit} validationErrors={errors} className="space-y-5">
        
        {/* Full Name (Pre-filled from Applicant Auth data) */}
        <TextField name="fullName" defaultValue={applicant?.name || ""} isRequired className="w-full">
          <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Full Name</Label>
          <Input className="mt-1" placeholder="John Doe" />
          <FieldError className="text-xs text-danger mt-1" />
        </TextField>

        {/* Email Address (Pre-filled from Applicant Auth data) */}
        <TextField name="email" type="email" defaultValue={applicant?.email || ""} isRequired className="w-full">
          <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Email Address</Label>
          <Input className="mt-1" placeholder="you@example.com" />
          <FieldError className="text-xs text-danger mt-1" />
        </TextField>

        {/* Resume Link */}
        <TextField name="resumeUrl" type="url" isRequired className="w-full">
          <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Resume Link</Label>
          <Input className="mt-1" placeholder="https://drive.google.com/... or LinkedIn profile" />
          <Description className="text-xs text-zinc-400 mt-1">Provide a public link to your resume hosted on Drive, Dropbox, or your portfolio.</Description>
          <FieldError className="text-xs text-danger mt-1" />
        </TextField>

        {/* Cover Letter / Notes using HeroUI TextArea */}
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="coverLetter" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Cover Letter / Introduction
          </label>
          <TextArea
            id="coverLetter"
            name="coverLetter"
            aria-label="Cover Letter"
            className="h-36 w-full mt-1"
            placeholder="Tell us why you are a great fit for this role..."
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 pt-4 justify-end">
          <Button type="reset" variant="flat" color="default">
            Reset Form
          </Button>
          <Button type="submit" color="success" className="font-semibold text-white">
            Submit Application
          </Button>
        </div>

      </Form>
    </div>
  );
};

export default JobApply;