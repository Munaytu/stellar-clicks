import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // Placeholder for fetching rankings data from Supabase/Redis
  const rankingsData = [
    { id: 1, username: 'User1', clicks: 10000 },
    { id: 2, username: 'User2', clicks: 9000 },
    { id: 3, username: 'User3', clicks: 8000 },
  ];

  return NextResponse.json(rankingsData);
}
