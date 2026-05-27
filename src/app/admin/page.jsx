'use client';

import '@/app/features.css';
import '@/app/admin.css';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    RiShakeHandsLine,
    RiStarLine,
    RiListCheck2,
    RiUserStarLine,
    RiGlobalLine,
    RiInboxLine,
} from 'react-icons/ri';
import { LuArrowRight } from 'react-icons/lu';

function StatCard({ icon: Icon, iconClass, value, label, sub, subClass }) {
    return (
        <div className="stat-card">
            <div className={`stat-icon ${iconClass}`}>
                <Icon />
            </div>
            <div className="stat-value">{value ?? <span className="stat-value-fallback">—</span>}</div>
            <div className="stat-label">{label}</div>
            {sub && <div className={`stat-sub ${subClass || 'neutral'}`}>{sub}</div>}
        </div>
    );
}

export default function AdminOverviewPage() {
    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                const res = await fetch('/api/leads');
                const data = await res.json();
                setLeads(data.data || []);
            } catch {
                setLeads([]);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    const totalLeads = leads.length;
    const newLeads = leads.filter((l) => l.status === 'new').length;
    const approved = leads.filter((l) => l.status === 'approved').length;
    const declined = leads.filter((l) => l.status === 'declined').length;
    const avgScore = leads.length
        ? Math.round(leads.reduce((a, l) => a + l.score, 0) / leads.length)
        : 0;

    const scoreColor = (s) => (s >= 70 ? '#f820a3' : s >= 40 ? '#ffa945' : '#f44336');

    const recentLeads = leads.slice(0, 6);

    return (
        <div>


            {/* Stats */}
            <div className="stats-grid">
                <StatCard icon={RiShakeHandsLine} iconClass="stat-icon-orange" value={loading ? null : totalLeads} label="Total Leads" sub={`${newLeads} new, unreviewed`} subClass={newLeads > 0 ? 'up' : 'neutral'} />
                <StatCard icon={RiListCheck2} iconClass="stat-icon-pink" value={loading ? null : newLeads} label="Awaiting Review" sub="Pending your decision" />
                <StatCard icon={RiUserStarLine} iconClass="stat-icon-green" value={loading ? null : approved} label="Approved" sub={`${declined} declined`} />
                <StatCard icon={RiStarLine} iconClass="stat-icon-red" value={loading ? null : avgScore} label="Avg Lead Score" sub="Out of 100 points" />
            </div>

            {/* Recent leads */}
            <div className="admin-card">
                <div className="panel-title">
                    Recent Leads
                    <Link href="/admin/leads" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        View all <LuArrowRight size={14} />
                    </Link>
                </div>

                {loading ? (
                    <div className="loading-wrap loading-wrap-pad"><div className="spinner" /></div>
                ) : recentLeads.length === 0 ? (
                    <div className="empty-state empty-state-pad">
                        <RiInboxLine className="empty-icon" />
                        <h3>No leads yet</h3>
                        <p>Share the <Link href="/collaborate" target="_blank" className="collab-link">collaboration form</Link> with brands.</p>
                    </div>
                ) : (
                    <div className="lead-mini-list">
                        {recentLeads.map((lead) => (
                            <Link href={`/admin/leads/${lead._id}`} key={lead._id} className="lead-link">
                                <div className="lead-mini-item">
                                    <div className="lead-mini-score" style={{ background: scoreColor(lead.score) }}>
                                        {lead.score}
                                    </div>
                                    <div className="lead-mini-info">
                                        <div className="lead-mini-brand">{lead.brand}</div>
                                        <div className="lead-mini-ref">{lead.referenceId}</div>
                                    </div>
                                    <div className="lead-actions">
                                        <span className={`badge badge-${lead.status}`}>{lead.status}</span>
                                        {lead.budget && <span className="budget-badge">{lead.budget}</span>}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>


        </div>
    );
}
