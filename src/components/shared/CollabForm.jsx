'use client';

import { useState } from 'react';
import { LuArrowRight, LuArrowLeft } from 'react-icons/lu';
import { GiAirplaneDeparture } from 'react-icons/gi';
import '@/app/features.css';

const COLLAB_TYPES = [
    'Sponsored Post', 'Product Review', 'Brand Ambassador', 'Giveaway',
    'Event Coverage', 'YouTube Integration', 'Instagram Reel', 'Long-term Partnership',
];

const NICHES = [
    'Travel', 'Lifestyle', 'Aviation', 'Fashion', 'Luxury', 'Beauty',
    'Wellness', 'Food & Dining', 'Tech & Gadgets', 'Fitness',
];

const BUDGETS = [
    'Under $500', '$500 - $1,000', '$1,000 - $5,000',
    '$5,000 - $10,000', '$10,000 - $50,000', '$50,000+',
];

const TIMELINES = [
    'ASAP (within 1 week)', '2-4 weeks', '1-3 months', '3-6 months', 'Flexible',
];

const STEPS = ['Brand', 'Interests', 'Campaign', 'Review', 'Done'];

const INIT = {
    brand: '', website: 'https://', contactName: '', contactRole: '', contactPhone: '',
    collabTypes: [], niches: [],
    budget: '', timeline: '', goals: '',
    website_bot: '', // honeypot
};

export default function CollabForm() {
    const [step, setStep] = useState(0);
    const [form, setForm] = useState(INIT);
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [refId, setRefId] = useState('');
    const [serverError, setServerError] = useState('');

    const set = (field, value) => {
        setForm((p) => ({ ...p, [field]: value }));
        setErrors((p) => ({ ...p, [field]: '' }));
    };

    const toggleArr = (field, val) => {
        setForm((p) => {
            const arr = p[field];
            return { ...p, [field]: arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val] };
        });
        setErrors((p) => ({ ...p, [field]: '' }));
    };

    // --- Validation per step ---
    const validateStep = () => {
        const e = {};
        if (step === 0) {
            if (!form.brand.trim()) e.brand = 'Brand name is required.';
            if (form.website && !form.website.startsWith('https://'))
                e.website = 'Website must start with https://';
        }
        if (step === 1) {
            if (form.collabTypes.length === 0) e.collabTypes = 'Select at least one collaboration type.';
            if (form.niches.length === 0) e.niches = 'Select at least one niche.';
        }
        if (step === 2) {
            if (!form.budget) e.budget = 'Please select a budget range.';
            if (!form.timeline) e.timeline = 'Please select a timeline.';
            if (!form.goals.trim() || form.goals.trim().length < 20)
                e.goals = 'Goals must be at least 20 characters.';
        }
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const next = () => {
        if (validateStep()) setStep((s) => s + 1);
    };
    const prev = () => setStep((s) => s - 1);

    const handleSubmit = async () => {
        setSubmitting(true);
        setServerError('');
        try {
            const res = await fetch('/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            const data = await res.json();
            if (data.success) {
                setRefId(data.data.referenceId);
                setStep(4); // success step
            } else {
                setServerError(data.error || 'Submission failed. Please try again.');
            }
        } catch {
            setServerError('Network error. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div>
            {step < 4 && (
                <div className="step-progress">
                    {STEPS.slice(0, 4).map((label, i) => (
                        <div key={label} className="step-item">
                            <div className={`step-dot ${i === step ? 'active' : i < step ? 'done' : ''}`}>
                                {i < step ? '✓' : i + 1}
                            </div>
                            {i < 3 && <div className={`step-line ${i < step ? 'done' : ''}`} />}
                        </div>
                    ))}
                </div>
            )}

            <div className="form-card">
                {step === 0 && (
                    <>
                        <h2 className="form-step-title">Tell us about your brand</h2>

                        <div className="hp-field" aria-hidden="true">
                            <input
                                tabIndex="-1"
                                name="website_bot"
                                autoComplete="off"
                                value={form.website_bot}
                                onChange={(e) => set('website_bot', e.target.value)}
                            />
                        </div>

                        <div className="admin-form">
                            <div className="form-group">
                                <label className="form-label" htmlFor="cf-brand">Brand / Company Name *</label>
                                <input id="cf-brand" className="form-input" value={form.brand} onChange={(e) => set('brand', e.target.value)} placeholder="e.g. Emirates Airlines" />
                                {errors.brand && <span className="form-error">{errors.brand}</span>}
                            </div>
                            <div className="form-group">
                                <label className="form-label" htmlFor="cf-website">Website</label>
                                <input
                                    id="cf-website"
                                    className="form-input"
                                    value={form.website}
                                    onChange={(e) => set('website', e.target.value)}
                                    placeholder="https://yourbrand.com"
                                />
                                {errors.website && <span className="form-error">{errors.website}</span>}
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="cf-contact">Contact Name</label>
                                    <input id="cf-contact" className="form-input" value={form.contactName} onChange={(e) => set('contactName', e.target.value)} placeholder="Your full name" />
                                </div>
                                <div className="form-group">
                                    <label className="form-label" htmlFor="cf-role">Your Role</label>
                                    <input id="cf-role" className="form-input" value={form.contactRole} onChange={(e) => set('contactRole', e.target.value)} placeholder="e.g. Marketing Manager" />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="form-label" htmlFor="cf-phone">Phone Number</label>
                                <input id="cf-phone" className="form-input" type="tel" value={form.contactPhone} onChange={(e) => set('contactPhone', e.target.value)} placeholder="+1 234 567 8900" />
                            </div>
                        </div>

                        <div className="form-nav">
                            <div />
                            <button className="btn primary-btn btn-sm" onClick={next}>Next <LuArrowRight size={16} /></button>
                        </div>
                    </>
                )}

                {step === 1 && (
                    <>
                        <h2 className="form-step-title">What are you looking for?</h2>
                        <p className="form-step-sub">Select the collaboration types and niches that apply.</p>

                        <div className="admin-form">
                            <div className="form-group">
                                <label className="form-label">Collaboration Types *</label>
                                <div className="chips-wrap">
                                    {COLLAB_TYPES.map((type) => (
                                        <button
                                            key={type}
                                            type="button"
                                            className={`chip ${form.collabTypes.includes(type) ? 'selected' : ''}`}
                                            onClick={() => toggleArr('collabTypes', type)}
                                        >
                                            {type}
                                        </button>
                                    ))}
                                </div>
                                {errors.collabTypes && <span className="form-error">{errors.collabTypes}</span>}
                            </div>

                            <div className="form-group">
                                <label className="form-label">Brand Niches *</label>
                                <div className="chips-wrap">
                                    {NICHES.map((niche) => (
                                        <button
                                            key={niche}
                                            type="button"
                                            className={`chip ${form.niches.includes(niche) ? 'selected' : ''}`}
                                            onClick={() => toggleArr('niches', niche)}
                                        >
                                            {niche}
                                        </button>
                                    ))}
                                </div>
                                {errors.niches && <span className="form-error">{errors.niches}</span>}
                            </div>
                        </div>

                        <div className="form-nav">
                            <button className="btn-prev" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }} onClick={prev}><LuArrowLeft size={16} /> Back</button>
                            <button className="btn primary-btn btn-sm" onClick={next}>Next <LuArrowRight size={16} /></button>
                        </div>
                    </>
                )}

                {step === 2 && (
                    <>
                        <h2 className="form-step-title">Campaign details</h2>
                        <p className="form-step-sub">Help us understand the scope and goals of this collaboration.</p>

                        <div className="admin-form">
                            <div className="form-row">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="cf-budget">Estimated Budget *</label>
                                    <select id="cf-budget" className="form-select" value={form.budget} onChange={(e) => set('budget', e.target.value)}>
                                        <option value="">Select budget range</option>
                                        {BUDGETS.map((b) => <option key={b} value={b}>{b}</option>)}
                                    </select>
                                    {errors.budget && <span className="form-error">{errors.budget}</span>}
                                </div>
                                <div className="form-group">
                                    <label className="form-label" htmlFor="cf-timeline">Timeline *</label>
                                    <select id="cf-timeline" className="form-select" value={form.timeline} onChange={(e) => set('timeline', e.target.value)}>
                                        <option value="">Select timeline</option>
                                        {TIMELINES.map((t) => <option key={t} value={t}>{t}</option>)}
                                    </select>
                                    {errors.timeline && <span className="form-error">{errors.timeline}</span>}
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="form-label" htmlFor="cf-goals">Campaign Goals * <span className="form-hint">(min 20 characters)</span></label>
                                <textarea
                                    id="cf-goals"
                                    className="form-textarea"
                                    value={form.goals}
                                    onChange={(e) => set('goals', e.target.value)}
                                    placeholder="Describe what you want to achieve with this collaboration — brand awareness, product launch, engagement, reach into the travel community, etc."
                                />
                                <span className="form-hint" style={{ textAlign: 'right' }}>{form.goals.length} chars</span>
                                {errors.goals && <span className="form-error">{errors.goals}</span>}
                            </div>
                        </div>

                        <div className="form-nav">
                            <button className="btn-prev" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }} onClick={prev}><LuArrowLeft size={16} /> Back</button>
                            <button className="btn primary-btn btn-sm" onClick={next}>Review <LuArrowRight size={16} /></button>
                        </div>
                    </>
                )}

                {step === 3 && (
                    <>
                        <h2 className="form-step-title">Review your pitch</h2>
                        <p className="form-step-sub">Confirm the details below before submitting.</p>

                        <div className="review-grid">
                            <p className="review-section-title">Brand & Contact</p>
                            <div className="review-item">
                                <span className="review-label">Brand</span>
                                <span className="review-value">{form.brand}</span>
                            </div>
                            {form.website && (
                                <div className="review-item">
                                    <span className="review-label">Website</span>
                                    <span className="review-value">{form.website}</span>
                                </div>
                            )}
                            {form.contactName && (
                                <div className="review-item">
                                    <span className="review-label">Contact</span>
                                    <span className="review-value">{form.contactName}{form.contactRole && ` — ${form.contactRole}`}</span>
                                </div>
                            )}
                            {form.contactPhone && (
                                <div className="review-item">
                                    <span className="review-label">Phone</span>
                                    <span className="review-value">{form.contactPhone}</span>
                                </div>
                            )}

                            <p className="review-section-title">Collaboration</p>
                            <div className="review-item">
                                <span className="review-label">Collab Types</span>
                                <span className="review-value">{form.collabTypes.join(', ')}</span>
                            </div>
                            <div className="review-item">
                                <span className="review-label">Niches</span>
                                <span className="review-value">{form.niches.join(', ')}</span>
                            </div>

                            <p className="review-section-title">Campaign</p>
                            <div className="review-item">
                                <span className="review-label">Budget</span>
                                <span className="review-value">{form.budget}</span>
                            </div>
                            <div className="review-item">
                                <span className="review-label">Timeline</span>
                                <span className="review-value">{form.timeline}</span>
                            </div>
                            <div className="review-item">
                                <span className="review-label">Goals</span>
                                <span className="review-value">{form.goals}</span>
                            </div>
                        </div>

                        {serverError && <div className="alert alert-error" style={{ marginTop: 20 }}>{serverError}</div>}

                        <div className="form-nav">
                            <button className="btn-prev" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }} onClick={prev}><LuArrowLeft size={16} /> Edit</button>
                            <button
                                className="btn primary-btn btn-sm"
                                onClick={handleSubmit}
                                disabled={submitting}
                            >
                                {submitting ? 'Submitting...' : <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>Submit Pitch <GiAirplaneDeparture size={18} /></span>}
                            </button>
                        </div>
                    </>
                )}

                {step === 4 && (
                    <div className="success-step">
                        <div className="success-icon"><GiAirplaneDeparture /></div>
                        <h2>Pitch received!</h2>
                        <p>
                            Thank you for reaching out, <strong>{form.brand}</strong>!<br />
                            Rafat will review your pitch and get back to you shortly.
                        </p>
                        <div className="ref-id-box">
                            {refId}
                        </div>
                        <p style={{ fontSize: 14, color: '#aaa' }}>
                            Save this reference ID — you may need it for follow-ups.
                        </p>
                        <a href="/" className="btn primary-btn btn-sm" style={{ display: 'inline-flex', marginTop: 20 }}>
                            Back to Home
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
}
