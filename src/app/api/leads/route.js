import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Lead from '@/models/Lead';

export async function GET(request) {
    try {
        await connectDB();
        const leads = await Lead.find({}).sort({ submittedAt: -1 });
        return NextResponse.json({ success: true, data: leads });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        await connectDB();
        const body = await request.json();

        // Honeypot check
        if (body.website_bot) {
            return NextResponse.json({ success: false, error: 'Spam detected.' }, { status: 400 });
        }

        const { website_bot, ...leadData } = body;
        const lead = await Lead.create(leadData);
        return NextResponse.json({ success: true, data: lead }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}
