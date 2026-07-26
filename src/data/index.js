const today = () => new Date().toISOString().split('T')[0]

export const SEED_TASKS = [
  { id: 't1', title: 'Review project proposal', priority: 'high',   category: 'work',     completed: false, due: today() },
  { id: 't2', title: 'Team standup meeting',    priority: 'medium', category: 'work',     completed: true,  due: today() },
  { id: 't3', title: 'Exercise 30 minutes',     priority: 'low',    category: 'health',   completed: false, due: today() },
  { id: 't4', title: 'Read 20 pages',           priority: 'low',    category: 'personal', completed: false, due: today() },
]

export const SEED_EXPENSES = [
  { id: 'e1', title: 'Groceries',        amount: 3500, category: 'food',      date: today() },
  { id: 'e2', title: 'Internet Bill',    amount: 2000, category: 'utilities', date: today() },
  { id: 'e3', title: 'Freelance Tools',  amount: 5000, category: 'business',  date: today() },
]

export const EXPENSE_CATS = ['food','utilities','business','transport','entertainment','other']

export const CAT_COLORS = {
  food: '#f97316', utilities: '#06b6d4', business: '#4f46e5',
  transport: '#8b5cf6', entertainment: '#ec4899', other: '#64748b',
}

export const NAV_ITEMS = [
  { id: 'dashboard',  label_en: 'Dashboard',     label_ur: 'ڈیش بورڈ' },
  { id: 'planner',    label_en: 'AI Planner',    label_ur: 'پلانر'    },
  { id: 'voice',      label_en: 'Voice Notes',   label_ur: 'وائس نوٹس' },
  { id: 'proposals',  label_en: 'Proposals',     label_ur: 'تجاویز'   },
  { id: 'expenses',   label_en: 'Expenses',      label_ur: 'اخراجات'  },
  { id: 'assistant',  label_en: 'AI Assistant',  label_ur: 'اسسٹنٹ'  },
  { id: 'settings',   label_en: 'Settings',      label_ur: 'ترتیبات' },
]