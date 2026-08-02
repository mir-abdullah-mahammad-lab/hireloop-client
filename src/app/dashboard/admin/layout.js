import { requireRole } from '@/lib/core/session';
import React from 'react';

const AdminDashboardLayout = async ({childern}) => {
    await requireRole('admin')
    return childern
};

export default AdminDashboardLayout;