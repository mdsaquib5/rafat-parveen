import mongoose from 'mongoose';

// Auto-generate a unique 4-char alphanumeric ref ID
function genRefId() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let id = '';
    for (let i = 0; i < 4; i++) id += chars[Math.floor(Math.random() * chars.length)];
    return `LEAD-${id}`;
}

// Score calculation logic
function calcScore({ budget, timeline, goals, niches }) {
    let score = 0;

    // Budget (0-40pts)
    const budgetMap = {
        'Under $500': 5,
        '$500 - $1,000': 10,
        '$1,000 - $5,000': 20,
        '$5,000 - $10,000': 30,
        '$10,000 - $50,000': 38,
        '$50,000+': 40,
    };
    score += budgetMap[budget] || 0;

    // Timeline urgency (0-25pts)
    const timelineMap = {
        'ASAP (within 1 week)': 25,
        '2-4 weeks': 20,
        '1-3 months': 12,
        '3-6 months': 6,
        'Flexible': 3,
    };
    score += timelineMap[timeline] || 0;

    // Goals description length (0-20pts)
    const goalsLen = (goals || '').trim().length;
    if (goalsLen >= 200) score += 20;
    else if (goalsLen >= 100) score += 14;
    else if (goalsLen >= 50) score += 8;
    else if (goalsLen >= 20) score += 3;

    // Niche matching (0-15pts)
    const relevantNiches = ['Travel', 'Lifestyle', 'Aviation', 'Fashion', 'Luxury'];
    const matchCount = (niches || []).filter((n) => relevantNiches.includes(n)).length;
    score += Math.min(matchCount * 5, 15);

    return Math.min(score, 100);
}

const LeadSchema = new mongoose.Schema(
    {
        brand: { type: String, required: true },
        website: { type: String },
        contactName: { type: String },
        contactRole: { type: String },
        contactPhone: { type: String },
        collabTypes: [{ type: String }],
        niches: [{ type: String }],
        budget: { type: String },
        timeline: { type: String },
        goals: { type: String },
        score: { type: Number, default: 0 },
        status: {
            type: String,
            enum: ['new', 'approved', 'declined', 'closed'],
            default: 'new',
        },
        adminNote: { type: String },
        referenceId: { type: String, unique: true },
        submittedAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

LeadSchema.pre('save', async function () {
    // Auto-generate referenceId
    if (!this.referenceId) {
        let refId;
        let exists = true;
        while (exists) {
            refId = genRefId();
            exists = await mongoose.models.Lead.findOne({ referenceId: refId });
        }
        this.referenceId = refId;
    }

    // Auto-calculate score
    this.score = calcScore({
        budget: this.budget,
        timeline: this.timeline,
        goals: this.goals,
        niches: this.niches,
    });
});

const Lead = mongoose.models.Lead || mongoose.model('Lead', LeadSchema);
export default Lead;
