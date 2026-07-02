"use client";

import React from 'react';
import { Table } from "@heroui/react"; // Ensure your table package is imported correctly
import { Pencil, Eye, TrashBin } from '@gravity-ui/icons'; // Gravity UI Action Icons

  
  // Handlers for action buttons
  const handleView = (id) => console.log("Viewing job details:", id);
  const handleEdit = (id) => console.log("Editing job:", id);
  const handleDelete = (id) => console.log("Deleting job:", id);

const JobsTable = ({jobs}) => {
   return (
    <div className="w-full p-4 bg-white rounded-xl border border-gray-200 dark:bg-zinc-900 dark:border-zinc-800">
      <Table>
        <Table.ScrollContainer>
          <Table.Content aria-label="Recruiter Jobs Management Table">
            
            {/* Header Columns */}
            <Table.Header>
              <Table.Column isRowHeader>Title</Table.Column>
              <Table.Column>Max Salary</Table.Column>
              <Table.Column>Location</Table.Column>
              <Table.Column>Action</Table.Column>
            </Table.Header>
            
            {/* Table Body Mapping */}
            <Table.Body>
              {jobs && jobs.length > 0 ? (
                jobs.map((job) => (
                  <Table.Row key={job._id}>
                    {/* Title */}
                    <Table.Cell className="font-medium text-gray-900 dark:text-white">
                      {job.title}
                    </Table.Cell>
                    
                    {/* Max Salary */}
                    <Table.Cell>
                      {job.currency || 'USD'} {Number(job.maxSalary).toLocaleString()}
                    </Table.Cell>
                    
                    {/* Location */}
                    <Table.Cell>
                      <span className="capitalize">{job.location}</span>
                      {job.isRemote && <span className="ml-2 text-xs bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded dark:bg-zinc-800 dark:text-zinc-300">Remote</span>}
                    </Table.Cell>
                    
                    {/* Actions */}
                    <Table.Cell>
                      <div className="flex items-center gap-3">
                        {/* View Button */}
                        <button 
                          onClick={() => handleView(job._id)} 
                          className="text-gray-500 hover:text-blue-600 transition-colors"
                          title="View Job"
                        >
                          <Eye size={16} />
                        </button>
                        
                        {/* Edit Button */}
                        <button 
                          onClick={() => handleEdit(job._id)} 
                          className="text-gray-500 hover:text-yellow-600 transition-colors"
                          title="Edit Job"
                        >
                          <Pencil size={16} />
                        </button>
                        
                        {/* Delete Button */}
                        <button 
                          onClick={() => handleDelete(job._id)} 
                          className="text-gray-500 hover:text-red-600 transition-colors"
                          title="Delete Job"
                        >
                          <TrashBin size={16} />
                        </button>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                ))
              ) : (
                <Table.Row>
                  <Table.Cell colSpan={4} className="text-center text-gray-400 py-4">
                    No jobs found.
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>

          </Table.Content>
        </Table.ScrollContainer>
      </Table>
    </div>
  );
}
    


export default JobsTable;