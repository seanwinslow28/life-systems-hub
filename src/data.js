// ============================================================
// Life Systems Hub — Mock Data
// All data in one place. Structure ready for IndexedDB migration.
// ============================================================

// XP Level Progression Table
export const XP_LEVELS = [
  { level: 1, title: 'Recruit',     xpRequired: 0,      cumulativeXP: 0 },
  { level: 2, title: 'Apprentice',  xpRequired: 500,    cumulativeXP: 500 },
  { level: 3, title: 'Specialist',  xpRequired: 1200,   cumulativeXP: 1700 },
  { level: 4, title: 'Veteran',     xpRequired: 2500,   cumulativeXP: 4200 },
  { level: 5, title: 'Elite',       xpRequired: 4000,   cumulativeXP: 8200 },
  { level: 6, title: 'Champion',    xpRequired: 6000,   cumulativeXP: 14200 },
  { level: 7, title: 'Master',      xpRequired: 8500,   cumulativeXP: 22700 },
  { level: 8, title: 'Grandmaster', xpRequired: 12000,  cumulativeXP: 34700 },
  { level: 9, title: 'Legend',      xpRequired: 16000,  cumulativeXP: 50700 },
  { level: 10, title: 'Immortal',   xpRequired: 25000,  cumulativeXP: 75700 },
];

// XP Source Values
export const XP_SOURCES = {
  habitCompleted:  25,
  workoutLogged:   50,
  streakBonus:     10,   // per day of streak
  weeklyReview:    100,
  financialCheckin: 30,
};

// User Profile
export const USER_PROFILE = {
  name: 'Sean',
  level: 4,
  levelTitle: 'Veteran',
  currentXP: 5100,
  levelXPGoal: 8200,     // cumulative XP needed for Level 5 (Elite)
  levelXPStart: 4200,    // cumulative XP at start of Level 4
  streak: 12,
  streakMultiplier: 1.5,
  todayDate: 'March 3, 2026',
};

// XP earned today (from completed habits: Morning Workout +50, Vault Daily Note +25)
export const XP_TODAY = 75; // 50 + 25 = 75 XP from completed habits

// Today's Habits / Quests
export const HABITS_TODAY = [
  { id: 1, name: 'Morning Workout',       xpReward: 50,  completed: true },
  { id: 2, name: 'Read 20 minutes',        xpReward: 25,  completed: false },
  { id: 3, name: 'Vault Daily Note',       xpReward: 25,  completed: true },
  { id: 4, name: 'No unnecessary spending', xpReward: 25, completed: false },
  { id: 5, name: 'Evening Reflection',    xpReward: 25,  completed: false },
];

// Full Habits (for Habits page — weekly tracker)
export const HABITS_LIST = [
  { id: 1, name: 'Morning Workout', xpReward: 50, category: 'fitness' },
  { id: 2, name: 'Read 20 minutes', xpReward: 25, category: 'learning' },
  { id: 3, name: 'Vault Daily Note', xpReward: 25, category: 'knowledge' },
  { id: 4, name: 'No unnecessary spending', xpReward: 25, category: 'finance' },
  { id: 5, name: 'Evening Reflection', xpReward: 25, category: 'mindset' },
];

// Days of week (Mon = 0, Sun = 6 in this week context)
// Week of Feb 25 – Mar 3, 2026
// Completed = true, today but not done = false, future = null
export const HABIT_WEEK_GRID = {
  days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  dates: ['Feb 25', 'Feb 26', 'Feb 27', 'Feb 28', 'Mar 1', 'Mar 2', 'Mar 3'],
  todayIndex: 6, // Sunday (index 6) = Mar 3
  completions: {
    1: [true, true, true, true, true, true, true],   // Morning Workout — streak 7+
    2: [true, true, false, true, true, true, false],  // Read 20 min
    3: [true, true, true, true, true, true, true],   // Vault Daily Note — streak 7+
    4: [true, false, true, true, true, true, false], // No unnecessary spending
    5: [true, true, true, true, true, false, false], // Evening Reflection
  },
};

// Streak per habit (longest current streak)
export const HABIT_STREAKS = {
  1: 12, // Morning Workout
  2: 4,  // Read 20 minutes
  3: 12, // Vault Daily Note
  4: 6,  // No unnecessary spending
  5: 5,  // Evening Reflection
};

// Weekly Workout Log (PPL Split)
export const WORKOUT_WEEK = [
  {
    day: 'Mon',
    date: 'Feb 25',
    split: 'Push',
    status: 'completed',
    exercises: [
      { name: 'Bench Press',   weight: 185, reps: 8, sets: 3, unit: 'lbs' },
      { name: 'OHP',           weight: 115, reps: 6, sets: 3, unit: 'lbs' },
      { name: 'Tricep Dips',   weight: 0,   reps: 12, sets: 3, unit: 'bw' },
    ],
  },
  {
    day: 'Tue',
    date: 'Feb 26',
    split: 'Pull',
    status: 'completed',
    exercises: [
      { name: 'Deadlift',      weight: 275, reps: 5, sets: 3, unit: 'lbs' },
      { name: 'Barbell Rows',  weight: 135, reps: 8, sets: 3, unit: 'lbs' },
      { name: 'Barbell Curls', weight: 0,   reps: 10, sets: 3, unit: 'bw' },
    ],
  },
  {
    day: 'Wed',
    date: 'Mar 3',
    split: 'Legs',
    status: 'today',
    exercises: [],
  },
  {
    day: 'Thu',
    date: 'Mar 4',
    split: 'Push',
    status: 'scheduled',
    exercises: [],
  },
  {
    day: 'Fri',
    date: 'Mar 5',
    split: 'Pull',
    status: 'scheduled',
    exercises: [],
  },
  {
    day: 'Sat',
    date: 'Mar 6',
    split: 'Legs',
    status: 'scheduled',
    exercises: [],
  },
  {
    day: 'Sun',
    date: 'Mar 7',
    split: 'Rest',
    status: 'rest',
    exercises: [],
  },
];

// Financial Summary
export const FINANCIAL_SUMMARY = {
  monthlyBudget: 3800,
  spentThisMonth: 1247,
  budgetHealth: 'on-track',
  categories: [
    { name: 'Rent',          budget: 1800, spent: 0,    color: '#3B82F6' },
    { name: 'Groceries',     budget: 400,  spent: 312,  color: '#22C55E' },
    { name: 'Subscriptions', budget: 120,  spent: 89,   color: '#A78BFA' },
    { name: 'Dining',        budget: 150,  spent: 46,   color: '#F97316' },
    { name: 'Transport',     budget: 100,  spent: 18,   color: '#06B6D4' },
    { name: 'Other',         budget: 230,  spent: 0,    color: '#71717A' },
  ],
};

// Monthly spending chart data (last 6 months)
export const MONTHLY_CHART_DATA = [
  { month: 'Oct', spent: 3210, budget: 3800 },
  { month: 'Nov', spent: 3890, budget: 3800 },
  { month: 'Dec', spent: 4120, budget: 3800 },
  { month: 'Jan', spent: 3340, budget: 3800 },
  { month: 'Feb', spent: 3560, budget: 3800 },
  { month: 'Mar', spent: 1247, budget: 3800 }, // month in progress
];

// Transactions
export const TRANSACTIONS = [
  { id: 1, date: 'Mar 3', description: 'Paycheck deposit',   category: 'Income',        amount: 2847.00,  raw: 2847.00 },
  { id: 2, date: 'Mar 3', description: 'Trader Joe\'s',       category: 'Groceries',     amount: -45.18,   raw: -45.18 },
  { id: 3, date: 'Mar 3', description: 'Coffee shop',         category: 'Dining',        amount: -5.75,    raw: -5.75 },
  { id: 4, date: 'Mar 2', description: 'Amazon Fresh',        category: 'Groceries',     amount: -89.21,   raw: -89.21 },
  { id: 5, date: 'Mar 2', description: 'Netflix',             category: 'Subscriptions', amount: -15.49,   raw: -15.49 },
  { id: 6, date: 'Mar 2', description: 'Uber',                category: 'Transport',     amount: -18.40,   raw: -18.40 },
  { id: 7, date: 'Mar 2', description: 'Chipotle',            category: 'Dining',        amount: -14.52,   raw: -14.52 },
  { id: 8, date: 'Mar 1', description: 'Whole Foods',         category: 'Groceries',     amount: -67.43,   raw: -67.43 },
  { id: 9, date: 'Mar 1', description: 'Spotify',             category: 'Subscriptions', amount: -10.99,   raw: -10.99 },
  { id: 10, date: 'Mar 1', description: 'Adobe CC',           category: 'Subscriptions', amount: -54.99,   raw: -54.99 },
];

// Vault Stats
export const VAULT_STATS = {
  totalNotes: 1431,
  inbox: 227,
  activeProjects: 6,
};

// ============================================================
// Placeholder Functions (hooks for future Claude Code integration)
// ============================================================
export function importCSV(file) {
  // TODO: Parse CSV with PapaParse, store in IndexedDB via Dexie.js
  console.log('importCSV called with:', file?.name);
  return { success: false, message: 'CSV import not yet implemented' };
}

export function syncAppleHealth() {
  // TODO: Connect to Apple Health via HealthKit web API
  console.log('syncAppleHealth called');
  return { success: false, message: 'Apple Health sync not yet implemented' };
}

export function connectVault() {
  // TODO: Connect to Obsidian Local REST API
  console.log('connectVault called');
  return { success: false, message: 'Vault connection not yet implemented' };
}

// Vault MOC Cards
export const VAULT_MOCS = [
  { id: 1, name: 'Claude Mastery',      notes: 214,  color: '#3B82F6', icon: '🧠' },
  { id: 2, name: 'Product Management',  notes: 389,  color: '#22C55E', icon: '📋' },
  { id: 3, name: 'Creative Studio',     notes: 156,  color: '#F97316', icon: '🎨' },
  { id: 4, name: 'Life Systems',        notes: 203,  color: '#A78BFA', icon: '⚡' },
  { id: 5, name: 'Design Team',         notes: 178,  color: '#06B6D4', icon: '🎯' },
  { id: 6, name: 'Vault',               notes: 291,  color: '#F59E0B', icon: '🗄️' },
];
