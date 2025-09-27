"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';

interface Admin {
  _id: string;
  username: string;
  role: string;
  isApproved: boolean;
}

export default function ManageAdminsPage() {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchAdmins = async () => {
    try {
      const token = localStorage.getItem('admin_token');
      const response = await axios.get('http://localhost:5001/api/admins', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAdmins(response.data);
    } catch (err) {
      setError('Failed to fetch admins. You may not have permission.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleApprove = async (id: string) => {
    try {
      const token = localStorage.getItem('admin_token');
      await axios.put(`http://localhost:5001/api/admins/${id}/approve`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Refresh the list to show the change
      fetchAdmins();
    } catch (err) {
      alert('Failed to approve admin.');
    }
  };
  
  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this admin? This action is irreversible.')) return;
    try {
      const token = localStorage.getItem('admin_token');
      await axios.delete(`http://localhost:5001/api/admins/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchAdmins();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to delete admin.');
    }
  };

  if (loading) return <p className="p-8">Loading...</p>;
  if (error) return <p className="p-8 text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Manage Admins</h1>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 text-left text-xs font-semibold uppercase">Username</th>
              <th className="px-5 py-3 border-b-2 text-left text-xs font-semibold uppercase">Role</th>
              <th className="px-5 py-3 border-b-2 text-left text-xs font-semibold uppercase">Status</th>
              <th className="px-5 py-3 border-b-2 text-right text-xs font-semibold uppercase">Actions</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin) => (
              <tr key={admin._id}>
                <td className="px-5 py-5 border-b">{admin.username}</td>
                <td className="px-5 py-5 border-b">{admin.role}</td>
                <td className="px-5 py-5 border-b">
                  {admin.isApproved ? (
                    <span className="text-green-600 font-semibold">Approved</span>
                  ) : (
                    <span className="text-yellow-600 font-semibold">Pending</span>
                  )}
                </td>
                <td className="px-5 py-5 border-b text-right">
                  {!admin.isApproved && (
                    <button onClick={() => handleApprove(admin._id)} className="bg-green-500 text-white py-1 px-3 rounded mr-2">
                      Approve
                    </button>
                  )}
                  {admin.role !== 'super-admin' && (
                     <button onClick={() => handleDelete(admin._id)} className="bg-red-500 text-white py-1 px-3 rounded">
                       Delete
                     </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
