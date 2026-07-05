"use client";

import React, { useState } from "react";
import { Form, Button, Input, TextArea, Label, ListBox, Select, toast } from "@heroui/react";
import { Xmark, ArrowUpFromLine } from "@gravity-ui/icons";
import { redirect } from "next/navigation";
import { createCompany } from "@/lib/actions/companies";

const RegisterCompanyForm = ({recruiter, recruiterCompany}) => {
  console.log(recruiterCompany, recruiter.id,'recruiter id from db')
  const [logo, setLogo] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        if (logo) {
          const formDataWithImageUrl = new FormData()
          formDataWithImageUrl.append('image',logo)

         

          
            const my_key = process.env.NEXT_PUBLIC_IMAGE_API
            const url = await fetch(`https://api.imgbb.com/1/upload?key=${my_key}`,{
              method:'POST',
              body: formDataWithImageUrl 
              })
            const im = await url.json()
            console.log(im)

          
          // console.log(im.data.url, 'url-of-the-image')
           formData.append('image', im.data.url)
           formData.append(' recruiterId',  recruiter.id)
        const data = Object.fromEntries(formData.entries());
        // console.log("Registering Company Data:", data);

        };
        
        const data = Object.fromEntries(formData.entries());
        console.log("Registering Company Data:", data);

        const payload = await createCompany(data)
        // console.log(payload, 'payLoaddd')
        if(payload.insertedId){
          toast.success("Company sucessfully created !!!")
          redirect("/dashboard/recruiter")
           
        }
    };
    const onClose = ()=>{
            redirect('/dashboard/recruiter')
    }
    return (
        <div className="w-full max-w-2xl mx-auto bg-[#121214] text-white p-6 rounded-xl border border-[#27272a] shadow-2xl relative">
      {/* Close Button Icon */}
      <button 
        onClick={onClose}
        className="absolute top-5 right-5 text-zinc-400 hover:text-white transition-colors z-10"
        type="button"
        aria-label="Close"
      >
        <Xmark size={20} />
      </button>

      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold tracking-tight">Register New Company</h2>
        <p className="text-sm text-zinc-400 mt-1">Enter your business details to start hiring on HireLoop.</p>
      </div>

      {/* HeroUI Form Context */}
      <Form onSubmit={handleSubmit} className="flex flex-col gap-5">

        {/* Hidden field to pass recruiter id into FormData */}
        <input type="hidden" name="recruiterId" value={recruiter?.id || ""} />
        
        {/* Row 1: Company Name & Industry */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full items-end">
          <Input
            label="Company Name"
            name="companyName"
            // labelPlacement="outside"
            placeholder="e.g. Acme-Corp"
            required
            className="text-white placeholder:text-zinc-500 text-sm required"
          />

          {/* Sub-component Select Pattern for Industry */}
          <Select name="category" placeholder="Select category" className="w-full">
            <Label className="text-zinc-300 font-medium text-sm mb-1.5 block">Industry / Category</Label>
            <Select.Trigger className="bg-[#1c1c1f] border border-[#27272a] hover:border-zinc-500 focus-within:border-zinc-400! h-11 w-full rounded-xl px-3 flex items-center justify-between text-zinc-300 text-sm">
              <Select.Value className="text-white text-sm" />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover className="bg-[#1c1c1f] border border-[#27272a] text-white rounded-xl">
              <ListBox>
                <ListBox.Item id="Technology" textValue="Technology" className="hover:bg-zinc-800 p-2 rounded-lg cursor-pointer">
                  Technology
                  <ListBox.ItemIndicator />
                </ListBox.Item>
                <ListBox.Item id="Healthcare" textValue="Healthcare" className="hover:bg-zinc-800 p-2 rounded-lg cursor-pointer">
                  Healthcare
                  <ListBox.ItemIndicator />
                </ListBox.Item>
                <ListBox.Item id="Finance" textValue="Finance" className="hover:bg-zinc-800 p-2 rounded-lg cursor-pointer">
                  Finance
                  <ListBox.ItemIndicator />
                </ListBox.Item>
                <ListBox.Item id="Education" textValue="Education" className="hover:bg-zinc-800 p-2 rounded-lg cursor-pointer">
                  Education
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              </ListBox>
            </Select.Popover>
          </Select>
        </div>

        {/* Row 2: Website URL & Location */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          <Input
            label="Website URL"
            name="website"
            required
            placeholder="www.company.com"
            className= "text-white placeholder:text-zinc-600 text-sm"
          />

          <Input
            label="Location"
            name="location"
            placeholder="City, Country"
            required
            className="text-white placeholder:text-zinc-600 text-sm"        
            />

        </div>

        {/* Row 3: Employee Count Range & Company Logo */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full items-end">
          
          <Select name="employeeCount" placeholder="Select employee range" className="w-full">
            <Label className="text-zinc-300 font-medium text-sm mb-1.5 block">Employee Count Range</Label>
            <Select.Trigger className="bg-[#1c1c1f] border border-[#27272a] hover:border-zinc-500 focus-within:border-zinc-400! h-11 w-full rounded-xl px-3 flex items-center justify-between text-zinc-300 text-sm">
              <Select.Value className="text-white text-sm" />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover className="bg-[#1c1c1f] border border-[#27272a] text-white rounded-xl">
              <ListBox>
                <ListBox.Item id="1-10" textValue="1-10 employees" className="hover:bg-zinc-800 p-2 rounded-lg cursor-pointer">
                  1-10 employees
                  <ListBox.ItemIndicator />
                </ListBox.Item>
                <ListBox.Item id="11-50" textValue="11-50 employees" className="hover:bg-zinc-800 p-2 rounded-lg cursor-pointer">
                  11-50 employees
                  <ListBox.ItemIndicator />
                </ListBox.Item>
                <ListBox.Item id="51-200" textValue="51-200 employees" className="hover:bg-zinc-800 p-2 rounded-lg cursor-pointer">
                  51-200 employees
                  <ListBox.ItemIndicator />
                </ListBox.Item>
                <ListBox.Item id="201+" textValue="201+ employees" className="hover:bg-zinc-800 p-2 rounded-lg cursor-pointer">
                  201+ employees
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              </ListBox>
            </Select.Popover>
          </Select>

          {/* Logo Field File Wrapper */}
          <div className="flex flex-col">
            <span className="text-zinc-300 font-medium text-sm mb-1.5">Company Logo</span>
            <label className="flex items-center gap-3 h-11 px-3 rounded-xl bg-[#1c1c1f] border border-dashed border-[#3f3f46] hover:border-zinc-400 cursor-pointer transition-colors">
              <input 
                type="file" 
                accept="image/png, image/jpeg" 
                className="hidden" 
                onChange={(e) => setLogo(e.target.files?.[0] || null)}
              />
              <div className="bg-[#27272a] p-1.5 rounded-lg flex items-center justify-center text-zinc-300">
                <ArrowUpFromLine size={16} />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-xs font-medium text-zinc-200 truncate max-w-45">
                  {logo ? logo.name : "Upload image"}
                </span>
                {!logo && <span className="text-[10px] text-zinc-500">PNG, JPG up to 5MB</span>}
              </div>
            </label>
          </div>
        </div>

        {/* Description Textarea */}
        <div className="w-full">
          <TextArea fullWidth
            label="Brief Description"
            name="description"
            required
            placeholder="Tell us about your company's mission and culture..."
            className="text-white placeholder:text-zinc-600 text-sm resize-none"
          />
        </div>

        {/* Action Buttons Footer */}
        <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-[#27272a] w-full">
          <Button 
            type="button"
            onClick={onClose}
            className="bg-transparent text-white border border-[#27272a] hover:bg-[#1c1c1f] font-medium rounded-xl h-10 px-5"
          >
            Cancel
          </Button>
          <Button 
            type="submit"
            className="bg-white text-black hover:bg-zinc-200 font-semibold rounded-xl h-10 px-5"
          >
            Register Company
          </Button>
        </div>

      </Form>
    </div>
    );
};

export default RegisterCompanyForm;