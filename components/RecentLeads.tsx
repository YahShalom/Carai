import React, { useEffect, useState } from 'react';
import supabase, { supabase as supabaseClient } from '../lib/supabaseClient';
import { insertLead } from '../lib/supabaseClient';

type Lead = {
  id: number;
  created_at: string;
  email: string;
  name?: string;
  phone?: string;
  service_type?: string;
  message?: string;
  metadata?: any;
};

const RecentLeads: React.FC = () => {
  const [leads, setLeads] = useState<Lead[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeads = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabaseClient
          .from('leads')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(50);

        if (error) {
          setError(error.message || 'Failed to fetch leads');
        } else {
          setLeads((data as any) || []);
        }
      } catch (err: any) {
        setError(err?.message || String(err));
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-4">Recent Leads (Read-only)</h1>
        <p className="text-sm text-navy-600 dark:text-silver-400 mb-6">This page reads from your Supabase `leads` table using the client-side anon key. Keep this route unlinked in production or protect it behind auth.</p>

        {loading && <div className="py-10">Loading leads…</div>}
        {error && <div className="text-red-600">Error: {error}</div>}

        {!loading && leads && (
          <div className="overflow-x-auto bg-white dark:bg-navy-800 rounded-2xl border border-gold-400/10 shadow-sm">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-navy-700">
              <thead className="bg-silver-50 dark:bg-navy-900">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase">When</th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase">Name</th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase">Email</th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase">Phone</th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase">Service</th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase">Message</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-navy-800 divide-y divide-gray-100 dark:divide-navy-700">
                {leads.map((l) => (
                  <tr key={l.id} className="hover:bg-silver-50 dark:hover:bg-navy-900">
                    <td className="px-4 py-3 text-sm text-navy-600 dark:text-silver-400">{new Date(l.created_at).toLocaleString()}</td>
                    <td className="px-4 py-3 text-sm text-navy-800 dark:text-white">{l.name || '—'}</td>
                    <td className="px-4 py-3 text-sm text-navy-600 dark:text-silver-300">{l.email}</td>
                    <td className="px-4 py-3 text-sm text-navy-600 dark:text-silver-300">{l.phone || '—'}</td>
                    <td className="px-4 py-3 text-sm text-navy-600 dark:text-silver-300">{l.service_type || '—'}</td>
                    <td className="px-4 py-3 text-sm text-navy-600 dark:text-silver-300 max-w-xl truncate">{l.message || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentLeads;
