import { NextResponse } from "next/server";
import axios from 'axios';

export const dynamic = "force-dynamic";

// A faulty API route to test Sentry's error monitoring
export async function POST(req, res) {
  console.log(req.headers['baggage']);
  const response = await axios.post('http://localhost:3000/users/create', req.body);
  const data = await response.json();
  
  NextResponse.json({data})
}
