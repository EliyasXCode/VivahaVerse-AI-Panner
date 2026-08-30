import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Shield, Building, MapPin, Inbox, Users, Mail, Phone, Calendar } from 'lucide-react';
import API from '../services/api';
import toast from 'react-hot-toast';

const AdminPage = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({ totalDestinations: 0, totalVenues: 0, totalInquiries: 0, totalUsers: 0 });
  const [inquiries, setInquiries] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const [activeTab, setActiveTab] = useState('inquiries'); // inquiries, users
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminData = async () => {
      setLoading(true);
      try {
        const res = await API.get('/admin/stats');
        if (res.data.success) {
          setStats(res.data.stats);
        }
        const inqRes = await API.get('/inquiries');
        if (inqRes.data.success) {
          setInquiries(inqRes.data.inquiries);
        }
        const usersRes = await API.get('/admin/users');
        if (usersRes.data.success) {
          setUsersList(usersRes.data.users);
        }
      } catch (err) {
        console.warn('Admin access restricted or error fetching stats');
      } finally {
        setLoading(false);
      }
    };
    fetchAdminData();
  }, []);

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen pt-32 text-center bg-background-cream space-y-4">
        <Shield className="w-12 h-12 text-wine mx-auto" />
        <h2 className="font-serif text-3xl font-bold text-wine">Admin Control Center</h2>
        <p className="text-xs text-charcoal-muted">Access Denied: Administrator privileges required.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-20 bg-background-cream text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="bg-wine text-white rounded-3xl p-8 border border-gold/30 shadow-2xl flex items-center justify-between">
          <div>
            <span className="text-gold text-xs uppercase tracking-widest font-semibold block">Platform Operations</span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold">Admin Management Dashboard</h1>
          </div>
          <Shield className="w-10 h-10 text-gold" />
        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="bg-white rounded-2xl p-6 border border-gold/30 shadow-luxury space-y-1">
            <MapPin className="w-6 h-6 text-gold mx-auto" />
            <div className="font-serif text-3xl font-bold text-wine">{stats.totalDestinations || 20}</div>
            <div className="text-[10px] uppercase font-bold text-charcoal-muted">Total Destinations</div>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gold/30 shadow-luxury space-y-1">
            <Building className="w-6 h-6 text-gold mx-auto" />
            <div className="font-serif text-3xl font-bold text-wine">{stats.totalVenues || 4}</div>
            <div className="text-[10px] uppercase font-bold text-charcoal-muted">Verified Venues</div>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gold/30 shadow-luxury space-y-1">
            <Inbox className="w-6 h-6 text-gold mx-auto" />
            <div className="font-serif text-3xl font-bold text-wine">{stats.totalInquiries || inquiries.length}</div>
            <div className="text-[10px] uppercase font-bold text-charcoal-muted">Wedding Inquiries</div>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gold/30 shadow-luxury space-y-1">
            <Users className="w-6 h-6 text-gold mx-auto" />
            <div className="font-serif text-3xl font-bold text-wine">{stats.totalUsers || usersList.length}</div>
            <div className="text-[10px] uppercase font-bold text-charcoal-muted">Registered Users</div>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex space-x-3 border-b border-gold/20 pb-2">
          <button
            onClick={() => setActiveTab('inquiries')}
            className={`px-5 py-2.5 rounded-full font-bold uppercase tracking-wider transition-all ${
              activeTab === 'inquiries' ? 'bg-wine text-gold shadow-md' : 'bg-white text-charcoal border border-gold/30'
            }`}
          >
            Wedding Inquiries ({inquiries.length})
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`px-5 py-2.5 rounded-full font-bold uppercase tracking-wider transition-all ${
              activeTab === 'users' ? 'bg-wine text-gold shadow-md' : 'bg-white text-charcoal border border-gold/30'
            }`}
          >
            Registered Users ({usersList.length})
          </button>
        </div>

        {/* TAB 1: INQUIRIES */}
        {activeTab === 'inquiries' && (
          <div className="bg-white rounded-3xl border border-gold/30 p-8 shadow-2xl space-y-4">
            <h3 className="font-serif text-2xl font-bold text-wine">Wedding Inquiry Pipeline</h3>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-wine text-gold border-b border-gold/30">
                    <th className="p-3 font-semibold">Couple</th>
                    <th className="p-3 font-semibold">Destination</th>
                    <th className="p-3 font-semibold">Guests & Budget</th>
                    <th className="p-3 font-semibold">Contact</th>
                    <th className="p-3 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gold/10 text-charcoal">
                  {inquiries.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="p-6 text-center text-charcoal-muted">No inquiries submitted yet.</td>
                    </tr>
                  ) : (
                    inquiries.map((inq) => (
                      <tr key={inq._id}>
                        <td className="p-3 font-bold text-wine">{inq.partner1Name} & {inq.partner2Name}</td>
                        <td className="p-3">{inq.preferredDestination}</td>
                        <td className="p-3">{inq.guestCount} Guests • {inq.budgetRange}</td>
                        <td className="p-3">{inq.phone} ({inq.email})</td>
                        <td className="p-3">
                          <span className="bg-gold/20 text-wine text-[10px] uppercase font-bold px-2 py-0.5 rounded-full">
                            {inq.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: REGISTERED USERS */}
        {activeTab === 'users' && (
          <div className="bg-white rounded-3xl border border-gold/30 p-8 shadow-2xl space-y-4">
            <h3 className="font-serif text-2xl font-bold text-wine">Registered MongoDB Users</h3>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-wine text-gold border-b border-gold/30">
                    <th className="p-3 font-semibold">Name</th>
                    <th className="p-3 font-semibold">Email</th>
                    <th className="p-3 font-semibold">Phone</th>
                    <th className="p-3 font-semibold">Role</th>
                    <th className="p-3 font-semibold">Checklist Items</th>
                    <th className="p-3 font-semibold">Joined Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gold/10 text-charcoal">
                  {usersList.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="p-6 text-center text-charcoal-muted">No registered users yet.</td>
                    </tr>
                  ) : (
                    usersList.map((u) => (
                      <tr key={u._id}>
                        <td className="p-3 font-bold text-wine">{u.name}</td>
                        <td className="p-3">{u.email}</td>
                        <td className="p-3">{u.phone || 'N/A'}</td>
                        <td className="p-3">
                          <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                            u.role === 'admin' ? 'bg-wine text-gold font-bold' : 'bg-gold/20 text-wine'
                          }`}>
                            {u.role}
                          </span>
                        </td>
                        <td className="p-3">{u.checklist?.length || 0} tasks</td>
                        <td className="p-3">{new Date(u.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminPage;
