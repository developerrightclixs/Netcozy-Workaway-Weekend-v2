import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

const SUPABASE_URL = import.meta.env.VITE_PUBLIC_SUPABASE_URL;

interface User {
  id: string;
  email: string;
  full_name: string;
  phone_number: string;
  cell_number: string;
  sex: string;
  street_address: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
  service_level: string | null;
  approval_status: string;
  id_document_url: string | null;
  created_at: string;
  approved_at: string | null;
  rejected_at: string | null;
  admin_notes: string | null;
}

interface Stats {
  pending: number;
  approved: number;
  rejected: number;
}

export default function AdminPage() {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [stats, setStats] = useState<Stats>({ pending: 0, approved: 0, rejected: 0 });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'pending' | 'approved' | 'rejected'>('pending');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [serviceLevel, setServiceLevel] = useState('basic');
  const [adminNotes, setAdminNotes] = useState('');
  const [actionLoading, setActionLoading] = useState(false);
  const [showIdModal, setShowIdModal] = useState(false);
  const [selectedIdUrl, setSelectedIdUrl] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    console.log('Active tab changed to:', activeTab);
    setUsers([]);
    setLoading(true);
    fetchStats();
    fetchUsers();
  }, [activeTab]);

  const fetchStats = async () => {
    try {
      console.log('Fetching stats for all tabs...');
      const statuses = ['pending', 'approved', 'rejected'];
      const counts: Stats = { pending: 0, approved: 0, rejected: 0 };

      for (const status of statuses) {
        const { data, error } = await supabase.functions.invoke('get-pending-users', {
          body: { status },
        });

        if (!error && data?.users) {
          counts[status as keyof Stats] = data.users.length;
          console.log(`${status} count:`, data.users.length);
        }
      }

      console.log('Final stats:', counts);
      setStats(counts);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      console.log('=== FETCHING USERS ===');
      console.log('Current active tab:', activeTab);
      console.log('Requesting users with status:', activeTab);
      
      const { data, error } = await supabase.functions.invoke('get-pending-users', {
        body: { status: activeTab },
      });

      console.log('Edge function response:', { data, error });

      if (error) {
        console.error('Error from edge function:', error);
        throw error;
      }
      
      const fetchedUsers = data.users || [];
      console.log(`Received ${fetchedUsers.length} users for ${activeTab} tab`);
      console.log('Users data:', fetchedUsers);
      
      // Trust the Edge Function filtering - don't filter again on frontend
      setUsers(fetchedUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleApproval = async (userId: string, action: 'approve' | 'reject') => {
    if (!serviceLevel && action === 'approve') {
      alert('Please select a service level before approving');
      return;
    }

    setActionLoading(true);
    try {
      console.log(`${action === 'approve' ? 'Approving' : 'Rejecting'} user:`, userId);
      
      const { data, error } = await supabase.functions.invoke('approve-user', {
        body: {
          userId,
          action,
          serviceLevel: action === 'approve' ? serviceLevel : undefined,
          adminNotes: adminNotes || undefined
        }
      });

      if (error) throw error;

      console.log('Action completed successfully');
      setSuccessMessage(`User ${action === 'approve' ? 'approved' : 'rejected'} successfully!`);
      setTimeout(() => setSuccessMessage(''), 3000);
      
      setSelectedUser(null);
      setAdminNotes('');
      setServiceLevel('basic');
      
      // Refresh data immediately
      console.log('Refreshing data after action...');
      await fetchStats();
      await fetchUsers();
    } catch (error: any) {
      console.error('Error during approval/rejection:', error);
      alert('Error: ' + error.message);
    } finally {
      setActionLoading(false);
    }
  };

  const handleViewId = (idUrl: string) => {
    setSelectedIdUrl(idUrl);
    setShowIdModal(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-700';
      case 'rejected':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-yellow-100 text-yellow-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src="https://storage.readdy-site.link/project_files/029ac680-786b-4603-9848-08fb20ae4f30/d786ac2c-4121-45c7-b4ed-371b6f8287d1_image-12.png?v=6f4af2e64a06407323df94a323e44b9e" alt="Netcozy" className="h-10 w-auto" />
            <span className="text-xl font-bold text-[#0A2540]">Netcozy Admin</span>
          </Link>
          <div className="flex items-center gap-4">
            <div className="px-4 py-2 bg-green-100 text-green-700 rounded-lg font-semibold text-sm">
              <i className="ri-shield-check-line mr-2"></i>Admin Dashboard
            </div>
            <Link to="/" className="px-4 py-2 text-gray-600 hover:text-gray-900 font-medium whitespace-nowrap cursor-pointer">
              <i className="ri-home-line mr-2"></i>Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Success Message */}
      {successMessage && (
        <div className="fixed top-20 right-6 bg-green-500 text-white px-6 py-4 rounded-xl shadow-lg z-50 animate-fade-in">
          <div className="flex items-center gap-3">
            <i className="ri-check-line text-2xl"></i>
            <span className="font-semibold">{successMessage}</span>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#0A2540] mb-2">User Applications</h1>
          <p className="text-gray-600">Review and manage user registration requests</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Pending</p>
                <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <i className="ri-time-line text-2xl text-yellow-600"></i>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Approved</p>
                <p className="text-3xl font-bold text-green-600">{stats.approved}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <i className="ri-check-line text-2xl text-green-600"></i>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Rejected</p>
                <p className="text-3xl font-bold text-red-600">{stats.rejected}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <i className="ri-close-line text-2xl text-red-600"></i>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('pending')}
              className={`flex-1 px-6 py-4 font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'pending'
                  ? 'text-[#0D9488] border-b-2 border-[#0D9488]'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <i className="ri-time-line mr-2"></i>Pending Applications ({stats.pending})
            </button>
            <button
              onClick={() => setActiveTab('approved')}
              className={`flex-1 px-6 py-4 font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'approved'
                  ? 'text-[#0D9488] border-b-2 border-[#0D9488]'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <i className="ri-check-line mr-2"></i>Approved Users ({stats.approved})
            </button>
            <button
              onClick={() => setActiveTab('rejected')}
              className={`flex-1 px-6 py-4 font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'rejected'
                  ? 'text-[#0D9488] border-b-2 border-[#0D9488]'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <i className="ri-close-line mr-2"></i>Rejected Applications ({stats.rejected})
            </button>
          </div>
        </div>

        {/* Users List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#0D9488] border-t-transparent"></div>
            <p className="mt-4 text-gray-600">Loading applications...</p>
          </div>
        ) : users.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <i className="ri-inbox-line text-6xl text-gray-300 mb-4"></i>
            <p className="text-gray-500 text-lg">No {activeTab} applications found</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {users.map((user) => (
              <div key={user.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-[#0D9488] rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {user.full_name.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <h3 className="text-lg font-bold text-[#0A2540]">{user.full_name}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(user.approval_status)}`}>
                            {user.approval_status.charAt(0).toUpperCase() + user.approval_status.slice(1)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{user.email}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Phone</p>
                        <p className="text-sm font-medium text-gray-900">{user.phone_number}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Cell Number</p>
                        <p className="text-sm font-medium text-gray-900">{user.cell_number}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Location</p>
                        <p className="text-sm font-medium text-gray-900">{user.city}, {user.state}, {user.country}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Address</p>
                        <p className="text-sm font-medium text-gray-900">{user.street_address}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Gender</p>
                        <p className="text-sm font-medium text-gray-900">{user.sex}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Applied On</p>
                        <p className="text-sm font-medium text-gray-900">
                          {new Date(user.created_at).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </p>
                      </div>
                    </div>

                    {user.service_level && activeTab === 'approved' && (
                      <div className="bg-green-50 rounded-lg p-3 mb-3">
                        <p className="text-xs text-gray-500 mb-1">Service Level</p>
                        <p className="text-sm font-bold text-green-700">
                          {user.service_level.charAt(0).toUpperCase() + user.service_level.slice(1)} Plan
                        </p>
                      </div>
                    )}

                    {user.admin_notes && (
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-xs text-gray-500 mb-1">Admin Notes</p>
                        <p className="text-sm text-gray-700">{user.admin_notes}</p>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-2 ml-6">
                    {user.id_document_url && (
                      <button
                        onClick={() => handleViewId(user.id_document_url)}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors whitespace-nowrap cursor-pointer"
                      >
                        <i className="ri-file-text-line mr-2"></i>View ID
                      </button>
                    )}
                    {activeTab === 'pending' && (
                      <button
                        onClick={() => {
                          setSelectedUser(user);
                          setServiceLevel('basic');
                          setAdminNotes('');
                        }}
                        className="px-4 py-2 bg-[#0D9488] text-white rounded-lg font-medium hover:bg-[#0A7A6F] transition-colors whitespace-nowrap cursor-pointer"
                      >
                        <i className="ri-check-line mr-2"></i>Review
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Review Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-[#0A2540]">Review Application</h2>
                <button
                  onClick={() => setSelectedUser(null)}
                  className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                >
                  <i className="ri-close-line text-2xl"></i>
                </button>
              </div>

              <div className="space-y-6">
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="font-bold text-[#0A2540] mb-4">User Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Full Name</p>
                      <p className="font-medium text-gray-900">{selectedUser.full_name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Email</p>
                      <p className="font-medium text-gray-900">{selectedUser.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Phone</p>
                      <p className="font-medium text-gray-900">{selectedUser.phone_number}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Cell</p>
                      <p className="font-medium text-gray-900">{selectedUser.cell_number}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Gender</p>
                      <p className="font-medium text-gray-900">{selectedUser.sex}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Location</p>
                      <p className="font-medium text-gray-900">{selectedUser.city}, {selectedUser.country}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Service Level <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={serviceLevel}
                    onChange={(e) => setServiceLevel(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-[#0D9488] transition-colors cursor-pointer"
                  >
                    <option value="basic">Basic ($180-$500) - Event tickets & travel services</option>
                    <option value="mid_level">Mid Level ($500-$1,200) - Event tickets, airfare, cruises, rental cars, hotels & resorts</option>
                    <option value="all_access">All Access ($1,200-$2,500) - All travel services + VIP giveaways</option>
                    <option value="all_access_vip">All Access VIP ($10,000+) - All benefits + five-star resorts & travel</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Admin Notes (Optional)</label>
                  <textarea
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    rows={4}
                    maxLength={500}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-[#0D9488] transition-colors resize-none"
                    placeholder="Add any notes about this application..."
                  />
                  <p className="text-xs text-gray-500 mt-1">{adminNotes.length}/500 characters</p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleApproval(selectedUser.id, 'approve')}
                    disabled={actionLoading}
                    className="flex-1 py-4 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer"
                  >
                    {actionLoading ? (
                      <>
                        <i className="ri-loader-4-line animate-spin mr-2"></i>Processing...
                      </>
                    ) : (
                      <>
                        <i className="ri-check-line mr-2"></i>Approve Application
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => handleApproval(selectedUser.id, 'reject')}
                    disabled={actionLoading}
                    className="flex-1 py-4 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer"
                  >
                    {actionLoading ? (
                      <>
                        <i className="ri-loader-4-line animate-spin mr-2"></i>Processing...
                      </>
                    ) : (
                      <>
                        <i className="ri-close-line mr-2"></i>Reject Application
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ID Document Modal */}
      {showIdModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">ID Document</h3>
              <button
                onClick={() => setShowIdModal(false)}
                className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <i className="ri-close-line text-2xl text-gray-600"></i>
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
              {selectedIdUrl.endsWith('.pdf') ? (
                <iframe
                  src={selectedIdUrl}
                  className="w-full h-[600px] border border-gray-200 rounded-lg"
                  title="ID Document"
                />
              ) : (
                <img
                  src={selectedIdUrl}
                  alt="ID Document"
                  className="w-full h-auto rounded-lg"
                />
              )}
              <div className="mt-4 flex gap-3">
                <a
                  href={selectedIdUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 px-4 py-3 bg-teal-500 text-white rounded-lg font-medium hover:bg-teal-600 transition-colors text-center whitespace-nowrap cursor-pointer"
                >
                  <i className="ri-external-link-line mr-2"></i>
                  Open in New Tab
                </a>
                <a
                  href={selectedIdUrl}
                  download
                  className="flex-1 px-4 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors text-center whitespace-nowrap cursor-pointer"
                >
                  <i className="ri-download-line mr-2"></i>
                  Download
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function getStatusBadge(status: string) {
  switch (status) {
    case 'approved':
      return 'bg-green-100 text-green-700';
    case 'rejected':
      return 'bg-red-100 text-red-700';
    default:
      return 'bg-yellow-100 text-yellow-700';
  }
}

function handleViewId(idUrl: string) {
  // This function is defined in the component
}
