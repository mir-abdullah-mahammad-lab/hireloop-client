'use client';

import { useState, useEffect } from 'react';
import { redirect, useRouter } from 'next/navigation';
import { TextField, Label, InputGroup, Button , toast} from '@heroui/react';
import { Pin, ArrowShapeTurnUpLeft } from '@gravity-ui/icons';
import { createJob } from '@/lib/actions/jobs';

const PostJobForm =({company, user}) =>{
  console.log(company,user?.id,'GOT INFO????')
  const router = useRouter();

   // Form State
  const [formData, setFormData] = useState({
    title: '',
    category: 'Technology',
    type: 'Full-time',
    minSalary: '',
    maxSalary: '',
    currency: 'USD',
    location: '',
    isRemote: false,
    deadline: '',
    responsibilities: '',
    requirements: '',
    benefits: '',
    recruiterId:user?.id,
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    console.log(formData, "formData after submit ")
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
  setSuccess('');

  setLoading(true);

  const res = await createJob(formData);

  if (res?.insertedId) {
    router.push('/dashboard/recruiter');
  }

  setSuccess('Job role published successfully! Making it live on the board...');

  setTimeout(() => {
    router.push('/dashboard/recruiter/jobs');
  }, 2000);
};
  

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-4 py-12 text-zinc-100">
      <div className="w-full max-w-4xl space-y-8 rounded-xl border border-zinc-800 bg-[#141416] p-8 shadow-2xl">
        
        {/* Header Section */}
        <div className="flex items-start justify-between border-b border-zinc-800 pb-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-zinc-50">Register New Job Listing</h1>
            <p className="mt-1 text-sm text-zinc-400">
              Enter your operational role details to start hiring on HireLoop.
            </p>
          </div>
          <button 
            onClick={() => router.back()}
            className="text-zinc-500 hover:text-zinc-300 transition-colors"
            type="button"
          >
            <ArrowShapeTurnUpLeft className="w-5 h-5" />
          </button>
        </div>

        {/* Company Active Plan Validation Banners */}
        {/* {!company.isApproved && (
          <div className="rounded-lg bg-amber-950/30 border border-amber-900/50 p-4 text-sm text-amber-400">
            Your company registration is currently pending admin verification. You will be able to post jobs once approved.
          </div>
        )} */}
        {/* {isLimitReached && (
          <div className="rounded-lg bg-danger-950/30 border border-danger-900/50 p-4 text-sm text-danger-400">
            You have hit the allocation maximum for your current <strong>{company.planName}</strong> Tier ({company.activeJobsCount}/{company.maxJobLimit} roles). Please upgrade your tier layout.
          </div>
        )} */}

        {/* System Feedback Messages
        {error && (
          <div className="rounded-lg bg-danger-500/10 border border-danger-500/20 p-4 text-sm text-danger-400">{error}</div>
        )}
        {success && (
          <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/20 p-4 text-sm text-emerald-400">{success}</div>
        )} */}

        {/* Posting Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* SECTION 1: JOB INFO */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold tracking-wider text-zinc-400 uppercase">1. Job Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TextField isRequired className="w-full">
                <Label className="text-zinc-300 text-xs font-medium mb-1">Job Title</Label>
                <InputGroup>
                  <InputGroup.Input
                    name="title"
                    placeholder="e.g. Senior Software Engineer"
                    value={formData.title}
                    onChange={handleChange}
                    disabled={loading}
                    className="bg-zinc-900/50 border-zinc-800 text-zinc-100 rounded-lg focus:border-zinc-700"
                  />
                </InputGroup>
              </TextField>

              <div className="flex flex-col">
                <label className="text-zinc-300 text-xs font-medium mb-1.5">Job Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  disabled={loading}
                  className="w-full h-10 px-3 rounded-lg border border-zinc-800 bg-zinc-900/50 text-zinc-200 focus:outline-none focus:border-zinc-700 text-sm"
                >
                  <option value="Technology">Technology</option>
                  <option value="Design">Design</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Management">Management</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className="text-zinc-300 text-xs font-medium mb-1.5">Job Type</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  disabled={loading }
                  className="w-full h-10 px-3 rounded-lg border border-zinc-800 bg-zinc-900/50 text-zinc-200 focus:outline-none focus:border-zinc-700 text-sm"
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>

              <TextField isRequired className="w-full">
                <Label className="text-zinc-300 text-xs font-medium mb-1">Application Deadline</Label>
                <InputGroup>
                  <InputGroup.Input
                    type="date"
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleChange}
                    disabled={loading }
                    className="bg-zinc-900/50 border-zinc-800 text-zinc-100 rounded-lg focus:border-zinc-700"
                  />
                </InputGroup>
              </TextField>
            </div>

            {/* Salary Block Framework */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-zinc-900/20 p-4 rounded-xl border border-zinc-900">
              <TextField isRequired className="w-full">
                <Label className="text-zinc-300 text-xs font-medium mb-1">Min Salary</Label>
                <InputGroup>
                  <InputGroup.Input
                    type="number"
                    name="minSalary"
                    placeholder="0"
                    value={formData.minSalary}
                    onChange={handleChange}
                    disabled={loading }
                    className="bg-zinc-900/50 border-zinc-800 text-zinc-100 rounded-lg"
                  />
                </InputGroup>
              </TextField>

              <TextField isRequired className="w-full">
                <Label className="text-zinc-300 text-xs font-medium mb-1">Max Salary</Label>
                <InputGroup>
                  <InputGroup.Input
                    type="number"
                    name="maxSalary"
                    placeholder="0"
                    value={formData.maxSalary}
                    onChange={handleChange}
                    disabled={loading }
                    className="bg-zinc-900/50 border-zinc-800 text-zinc-100 rounded-lg"
                  />
                </InputGroup>
              </TextField>

              <div className="flex flex-col">
                <label className="text-zinc-300 text-xs font-medium mb-1.5">Currency</label>
                <select
                  name="currency"
                  value={formData.currency}
                  onChange={handleChange}
                  disabled={loading }
                  className="w-full h-10 px-3 rounded-lg border border-zinc-800 bg-zinc-900/50 text-zinc-200 focus:outline-none focus:border-zinc-700 text-sm"
                >
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                </select>
              </div>
            </div>

            {/* Location block accompanied by a remote toggler */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 items-end">
              <TextField isRequired={!formData.isRemote} className="w-full">
                <Label className="text-zinc-300 text-xs font-medium mb-1">Location</Label>
                <InputGroup>
                  <InputGroup.Prefix>
                    <Pin className="w-4 h-4 text-zinc-500 ml-1" />
                  </InputGroup.Prefix>
                  <InputGroup.Input
                    name="location"
                    placeholder={formData.isRemote ? 'Remote Setting Active' : 'City, Country'}
                    value={formData.location}
                    onChange={handleChange}
                    disabled={loading ||formData.isRemote}
                    className="bg-zinc-900/50 border-zinc-800 text-zinc-100 rounded-lg focus:border-zinc-700"
                  />
                </InputGroup>
              </TextField>

              <div className="flex items-center h-10 px-1">
                <label className="flex items-center gap-3 cursor-pointer text-sm text-zinc-300 select-none">
                  <input
                    type="checkbox"
                    name="isRemote"
                    checked={formData.isRemote}
                    onChange={handleChange}
                    disabled={loading }
                    className="w-4 h-4 rounded border-zinc-800 bg-zinc-900 text-white focus:ring-0 accent-white"
                  />
                  This position is fully remote
                </label>
              </div>
            </div>
          </div>

          {/* SECTION 2: JOB DESCRIPTION TEXTAREAS */}
          <div className="space-y-4 pt-4 border-t border-zinc-800">
            <h3 className="text-sm font-semibold tracking-wider text-zinc-400 uppercase">2. Role Description</h3>

            <div className="flex flex-col">
              <label className="text-zinc-300 text-xs font-medium mb-1.5">Responsibilities</label>
              <textarea
                name="responsibilities"
                rows={4}
                required
                placeholder="Detail core day-to-day operations and project requirements..."
                value={formData.responsibilities}
                onChange={handleChange}
                disabled={loading}
                className="w-full p-3 rounded-lg border border-zinc-800 bg-zinc-900/50 text-zinc-100 text-sm placeholder-zinc-600 focus:outline-none focus:border-zinc-700 resize-y"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-zinc-300 text-xs font-medium mb-1.5">Requirements</label>
              <textarea
                name="requirements"
                rows={4}
                required
                placeholder="Detail required background skills, qualifications, or frameworks..."
                value={formData.requirements}
                onChange={handleChange}
                disabled={loading }
                className="w-full p-3 rounded-lg border border-zinc-800 bg-zinc-900/50 text-zinc-100 text-sm placeholder-zinc-600 focus:outline-none focus:border-zinc-700 resize-y"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-zinc-300 text-xs font-medium mb-1.5">Benefits <span className="text-zinc-500">(Optional)</span></label>
              <textarea
                name="benefits"
                rows={3}
                placeholder="Healthcare, equity plans, work setup allowances..."
                value={formData.benefits}
                onChange={handleChange}
                disabled={loading }
                className="w-full p-3 rounded-lg border border-zinc-800 bg-zinc-900/50 text-zinc-100 text-sm placeholder-zinc-600 focus:outline-none focus:border-zinc-700 resize-y"
              />
            </div>
          </div>

          {/* Footer Action Navigation Section */}
          <div className="flex items-center justify-between border-t border-zinc-800 pt-6">
            {/* <div className="text-xs text-zinc-500">
              Posting on behalf of <strong className="text-zinc-400">{company.companyName}</strong> ({company.activeJobsCount}/{company.maxJobLimit} plan items active)
            </div> */}
            
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => router.back()}
                className="rounded-lg border border-zinc-800 px-5 py-2.5 text-sm font-medium text-zinc-300 hover:bg-zinc-900 transition-colors"
              >
                Cancel
              </button>
              <Button
                type="submit"
               
                isLoading={loading}
                className="rounded-lg bg-white px-6 py-2.5 text-sm font-bold text-black hover:bg-zinc-200 transition-colors duration-150 disabled:bg-zinc-800 disabled:text-zinc-600"
              >
                Post Job
              </Button>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}
export default PostJobForm