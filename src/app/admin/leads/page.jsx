'use client';

import '@/app/features.css';
import '@/app/admin.css';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { RiInboxLine } from 'react-icons/ri';

function ScoreBadge({ score }) {
    const cls = score >= 70 ? 'score-high' : score >= 40 ? 'score-mid' : 'score-low';
    return <span className={`score-badge ${cls}`}>{score}</span>;
}

export default function AdminLeadsPage() {
    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [deleting, setDeleting] = useState(null);
    const [filter, setFilter] = useState('all');

    const filteredLeads = leads.filter(l => filter === 'all' || l.status?.toLowerCase() === filter.toLowerCase());

    const fetchLeads = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/leads');
            const data = await res.json();
            if (data.success) setLeads(data.data);
            else setError(data.error);
        } catch {
            setError('Failed to load leads.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchLeads(); }, []);

    const handleDelete = async (id) => {
        if (!confirm('Delete this lead permanently?')) return;
        setDeleting(id);
        try {
            const res = await fetch(`/api/leads/${id}`, { method: 'DELETE' });
            const data = await res.json();
            if (data.success) setLeads((prev) => prev.filter((l) => l._id !== id));
            else alert(data.error);
        } catch {
            alert('Delete failed.');
        } finally {
            setDeleting(null);
        }
    };

    return (
        <div>
            <div className="admin-header">
                <h1 className="admin-title">Collaboration <span>Leads</span></h1>
                <div>
                    <select className="form-select" value={filter} onChange={(e) => setFilter(e.target.value)} style={{ minWidth: '150px' }}>
                        <option value="all">All Leads</option>
                        <option value="new">New</option>
                        <option value="approved">Approved</option>
                        <option value="declined">Declined</option>
                        <option value="closed">Closed</option>
                    </select>
                </div>
            </div>

            <div className="admin-card">
                {loading ? (
                    <div className="loading-wrap"><div className="spinner" /></div>
                ) : error ? (
                    <div className="alert alert-error">{error}</div>
                ) : leads.length === 0 ? (
                    <div className="empty-state">
                        <RiInboxLine className="empty-icon" />
                        <h3>No leads yet</h3>
                        <p>Share the <Link href="/collaborate" target="_blank" className="collab-link">collaboration form</Link> with brands.</p>
                    </div>
                ) : (
                    <div className="admin-table-wrap">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Score</th>
                                    <th>Brand</th>
                                    <th>Ref ID</th>
                                    <th>Contact</th>
                                    <th>Budget</th>
                                    <th>Status</th>
                                    <th>Submitted</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredLeads.map((lead) => (
                                    <tr key={lead._id}>
                                        <td><ScoreBadge score={lead.score} /></td>
                                        <td className="brand-text">{lead.brand}</td>
                                        <td className="ref-id-text">{lead.referenceId}</td>
                                        <td className="text-sm">{lead.contactName || '—'}</td>
                                        <td className="text-sm">{lead.budget || '—'}</td>
                                        <td>
                                            <span className={`badge badge-${lead.status}`}>{lead.status}</span>
                                        </td>
                                        <td className="text-muted">
                                            {new Date(lead.submittedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                        </td>
                                        <td>
                                            <div className="action-btns">
                                                <Link href={`/admin/leads/${lead._id}`} className="btn-sm btn-outline">Review</Link>
                                                <button
                                                    className="btn-sm btn-danger"
                                                    onClick={() => handleDelete(lead._id)}
                                                    disabled={deleting === lead._id}
                                                >
                                                    {deleting === lead._id ? '...' : 'Delete'}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
