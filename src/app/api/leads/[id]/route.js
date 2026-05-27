import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Lead from '@/models/Lead';

export async function GET(request, { params }) {
    try {
        await connectDB();
        const { id } = await params;
        const lead = await Lead.findById(id);
        if (!lead) return NextResponse.json({ success: false, error: 'Lead not found' }, { status: 404 });
        return NextResponse.json({ success: true, data: lead });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function PUT(request, { params }) {
    try {
        await connectDB();
        const { id } = await params;
        const body = await request.json();
        const lead = await Lead.findByIdAndUpdate(
            id,
            { status: body.status, adminNote: body.adminNote },
            { returnDocument: 'after', runValidators: true }
        );
        if (!lead) return NextResponse.json({ success: false, error: 'Lead not found' }, { status: 404 });
        return NextResponse.json({ success: true, data: lead });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}

export async function DELETE(request, { params }) {
    try {
        await connectDB();
        const { id } = await params;
        const lead = await Lead.findByIdAndDelete(id);
        if (!lead) return NextResponse.json({ success: false, error: 'Lead not found' }, { status: 404 });
        return NextResponse.json({ success: true, message: 'Lead deleted' });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
