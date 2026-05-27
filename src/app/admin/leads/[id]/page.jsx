'use client';

import '@/app/features.css';
import '@/app/admin.css';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { LuArrowLeft, LuCheck, LuX } from 'react-icons/lu';

function ScoreBadge({ score }) {
    const cls = score >= 70 ? 'score-high' : score >= 40 ? 'score-mid' : 'score-low';
    return (
        <span className={`score-badge ${cls} score-badge-large`}>
            {score}
        </span>
    );
}

export default function LeadDetailPage() {
    const { id } = useParams();
    const [lead, setLead] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [adminForm, setAdminForm] = useState({ status: '', adminNote: '' });

    useEffect(() => {
        const fetchLead = async () => {
            try {
                const res = await fetch(`/api/leads/${id}`);
                const data = await res.json();
                if (data.success) {
                    setLead(data.data);
                    setAdminForm({ status: data.data.status, adminNote: data.data.adminNote || '' });
                } else {
                    setError(data.error);
                }
            } catch {
                setError('Failed to load lead.');
            } finally {
                setLoading(false);
            }
        };
        fetchLead();
    }, [id]);

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError('');
        setSuccess('');
        try {
            const res = await fetch(`/api/leads/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(adminForm),
            });
            const data = await res.json();
            if (data.success) {
                setLead(data.data);
                setSuccess('Lead updated successfully!');
            } else {
                setError(data.error);
            }
        } catch {
            setError('Update failed.');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="loading-wrap"><div className="spinner" /></div>;
    if (!lead) return (
        <div>
            <div className="alert alert-error">{error || 'Lead not found'}</div>
            <Link href="/admin/leads" className="btn-sm btn-outline back-btn" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}><LuArrowLeft size={16} /> Back</Link>
        </div>
    );

    const date = new Date(lead.submittedAt).toLocaleDateString('en-US', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    });

    return (
        <div>
            <div className="admin-header">
                <div className="lead-header-row">
                    <ScoreBadge score={lead.score} />
                    <div>
                        <h1 className="admin-title lead-title">{lead.brand}</h1>
                        <span className="ref-id-text">{lead.referenceId}</span>
                        <span className={`badge badge-${lead.status} badge-margin`}>{lead.status}</span>
                    </div>
                </div>
                <Link href="/admin/leads" className="btn-sm btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}><LuArrowLeft size={16} /> All Leads</Link>
            </div>

            <div className="lead-detail-grid">
                {/* Lead Info */}
                <div className="admin-card">
                    <div className="lead-info-section">
                        <div className="lead-info-title">Contact Information</div>
                        <div className="lead-info-grid">
                            <div className="lead-info-item">
                                <label>Brand</label>
                                <p>{lead.brand}</p>
                            </div>
                            <div className="lead-info-item">
                                <label>Website</label>
                                <p>{lead.website
                                    ? <a href={lead.website} target="_blank" rel="noopener noreferrer" className="collab-link">{lead.website}</a>
                                    : '—'}
                                </p>
                            </div>
                            <div className="lead-info-item">
                                <label>Contact Name</label>
                                <p>{lead.contactName || '—'}</p>
                            </div>
                            <div className="lead-info-item">
                                <label>Role</label>
                                <p>{lead.contactRole || '—'}</p>
                            </div>
                            <div className="lead-info-item">
                                <label>Phone</label>
                                <p>{lead.contactPhone || '—'}</p>
                            </div>
                            <div className="lead-info-item">
                                <label>Submitted</label>
                                <p>{date}</p>
                            </div>
                        </div>
                    </div>

                    <div className="lead-info-section">
                        <div className="lead-info-title">Campaign Details</div>
                        <div className="lead-info-grid">
                            <div className="lead-info-item">
                                <label>Budget</label>
                                <p>{lead.budget || '—'}</p>
                            </div>
                            <div className="lead-info-item">
                                <label>Timeline</label>
                                <p>{lead.timeline || '—'}</p>
                            </div>
                            <div className="lead-info-item full-width-item">
                                <label>Collab Types</label>
                                <p>{lead.collabTypes?.length ? lead.collabTypes.join(', ') : '—'}</p>
                            </div>
                            <div className="lead-info-item full-width-item">
                                <label>Niches</label>
                                <p>{lead.niches?.length ? lead.niches.join(', ') : '—'}</p>
                            </div>
                        </div>
                    </div>

                    {lead.goals && (
                        <div className="lead-info-section">
                            <div className="lead-info-title">Campaign Goals</div>
                            <div className="goals-box">{lead.goals}</div>
                        </div>
                    )}
                </div>

                {/* Admin Actions */}
                <div>
                    <div className="admin-card">
                        <h3 className="section-title">
                            Admin Actions
                        </h3>

                        {error && <div className="alert alert-error alert-margin">{error}</div>}
                        {success && <div className="alert alert-success alert-margin">{success}</div>}

                        <form onSubmit={handleSave} className="admin-form">
                            <div className="form-group">
                                <label className="form-label" htmlFor="lead-status">Status</label>
                                <select
                                    id="lead-status"
                                    className="form-select"
                                    value={adminForm.status}
                                    onChange={(e) => setAdminForm((p) => ({ ...p, status: e.target.value }))}
                                >
                                    <option value="new">New</option>
                                    <option value="approved">Approved</option>
                                    <option value="declined">Declined</option>
                                    <option value="closed">Closed</option>
                                </select>
                            </div>

                            <div className="action-btns">
                                <button
                                    type="button"
                                    className="btn-sm btn-approve"
                                    style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                                    onClick={() => setAdminForm((p) => ({ ...p, status: 'approved' }))}
                                >
                                    <LuCheck size={16} /> Approve
                                </button>
                                <button
                                    type="button"
                                    className="btn-sm btn-danger btn-decline"
                                    style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                                    onClick={() => setAdminForm((p) => ({ ...p, status: 'declined' }))}
                                >
                                    <LuX size={16} /> Decline
                                </button>
                            </div>

                            <div className="form-group">
                                <label className="form-label" htmlFor="admin-note">Internal Notes</label>
                                <textarea
                                    id="admin-note"
                                    className="form-textarea min-height-box"
                                    value={adminForm.adminNote}
                                    onChange={(e) => setAdminForm((p) => ({ ...p, adminNote: e.target.value }))}
                                    placeholder="Add private notes about this lead..."
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn primary-btn btn-sm btn-delete"
                                disabled={saving}
                            >
                                {saving ? 'Saving...' : 'Save Changes'}
                            </button>
                        </form>
                    </div>

                    <div className="admin-card" style={{ marginTop: 16 }}>
                        <h3 className="section-subtitle">
                            Score: {lead.score}/100
                        </h3>
                        <div className="progress-bar-container">
                            <div className="progress-bar-fill" style={{ width: `${lead.score}%` }} />
                        </div>
                        <p className="progress-text">
                            Based on budget size, timeline urgency, goals depth, and niche relevance.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
