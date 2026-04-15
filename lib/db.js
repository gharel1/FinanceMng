import { supabase } from './supabase';

// ── EXPENSES ──────────────────────────────────────────────
export async function getExpenses() {
  const { data, error } = await supabase
    .from('expenses')
    .select('*')
    .order('id', { ascending: false });
  if (error) throw error;
  return data;
}

export async function addExpense(expense) {
  const { id: _id, ...fields } = expense;
  const { data, error } = await supabase
    .from('expenses')
    .insert([fields])
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteExpense(id) {
  const { error } = await supabase.from('expenses').delete().eq('id', id);
  if (error) throw error;
}

// ── CATEGORIES ────────────────────────────────────────────
export async function getCategories() {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('id', { ascending: true });
  if (error) throw error;
  return data;
}

export async function addCategory(category) {
  const { data, error } = await supabase
    .from('categories')
    .insert([category])
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteCategory(id) {
  const { error } = await supabase.from('categories').delete().eq('id', id);
  if (error) throw error;
}

// ── RECEIPTS (PDFs) ───────────────────────────────────────
export async function getReceipts() {
  const { data, error } = await supabase
    .from('receipts')
    .select('*')
    .order('id', { ascending: false });
  if (error) throw error;
  return data;
}

export async function addReceipts(receipts) {
  const { data, error } = await supabase
    .from('receipts')
    .insert(receipts)
    .select();
  if (error) throw error;
  return data;
}
