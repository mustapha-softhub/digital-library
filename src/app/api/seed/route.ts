import { NextRequest, NextResponse } from 'next/server';
import { addSampleBooks } from '@/lib/sample-data';

export async function GET(request: NextRequest) {
  try {
    await addSampleBooks();
    return NextResponse.json({ success: true, message: 'Sample data added successfully' });
  } catch (error: any) {
    console.error('Error adding sample data:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
