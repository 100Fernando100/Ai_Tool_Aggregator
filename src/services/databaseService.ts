import { supabase } from '../lib/supabase';
import { ToolCombo } from './aggregationService';

export interface Query {
  id: string;
  query_text: string;
  category?: string;
  session_id: string;
  results: ToolCombo[];
  created_at: string;
}

export interface Feedback {
  query_id: string;
  rating: number;
  comment?: string;
}

export async function saveQuery(
  queryText: string,
  category: string | undefined,
  sessionId: string,
  results: ToolCombo[]
): Promise<Query | null> {
  const { data, error } = await supabase
    .from('queries')
    .insert({
      query_text: queryText,
      category,
      session_id: sessionId,
      results: JSON.stringify(results)
    })
    .select()
    .maybeSingle();

  if (error) {
    console.error('Error saving query:', error);
    return null;
  }

  return data;
}

export async function getQueryHistory(sessionId: string): Promise<Query[]> {
  const { data, error } = await supabase
    .from('queries')
    .select('*')
    .eq('session_id', sessionId)
    .order('created_at', { ascending: false })
    .limit(10);

  if (error) {
    console.error('Error fetching query history:', error);
    return [];
  }

  return data || [];
}

export async function getQueryById(queryId: string): Promise<Query | null> {
  const { data, error } = await supabase
    .from('queries')
    .select('*')
    .eq('id', queryId)
    .maybeSingle();

  if (error) {
    console.error('Error fetching query:', error);
    return null;
  }

  return data;
}

export async function saveFeedback(feedback: Feedback): Promise<boolean> {
  const { error } = await supabase
    .from('feedback')
    .insert(feedback);

  if (error) {
    console.error('Error saving feedback:', error);
    return false;
  }

  return true;
}

export function getOrCreateSessionId(): string {
  let sessionId = localStorage.getItem('ai-aggregator-session-id');

  if (!sessionId) {
    sessionId = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('ai-aggregator-session-id', sessionId);
  }

  return sessionId;
}
