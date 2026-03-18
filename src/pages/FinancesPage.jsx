import React, { useState, useRef } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ResponsiveContainer, Cell,
} from 'recharts';
import { FINANCIAL_SUMMARY, MONTHLY_CHART_DATA, TRANSACTIONS } from '../data.js';

// ---- Custom Tooltip for Chart (spec section 17) ----
function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  const spent = payload.find((p) => p.dataKey === 'spent')?.value || 0;
  const budget = payload.find((p) => p.dataKey === 'budget')?.value || 0;
  const overBudget = spent > budget;
  return (
    <div style={{
      backgroundColor: 'var(--surface-2)',
      border: '1px solid var(--surface-3)',
      borderRadius: 'var(--radius-button)',
      padding: '10px 14px',
      fontSize: 'var(--text-caption)',
      fontFamily: 'var(--font-mono)',
      boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
    }}>
      <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: 6 }}>{label}</div>
      <div style={{ color: overBudget ? 'var(--color-accent)' : 'var(--color-primary)' }}>
        Spent: ${spent.toLocaleString()}
      </div>
      <div style={{ color: 'var(--text-tertiary)' }}>Budget: ${budget.toLocaleString()}</div>
    </div>
  );
}

// ---- Budget Gauge ----
function BudgetGauge({ spent, total, label }) {
  const pct = Math.min((spent / total) * 100, 100);
  // Blue default fill per spec ("Blue as default data color").
  // Orange (accent) when approaching budget (>=80%), red when over (>=100%).
  const color = pct < 80 ? 'var(--color-primary)' : pct < 100 ? 'var(--color-accent)' : 'var(--color-error)';

  return (
    <div style={{ marginBottom: 'var(--space-3)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-1)' }}>
        <span style={{ fontSize: 'var(--text-caption)', color: 'var(--text-secondary)' }}>{label}</span>
        <span style={{ fontSize: 'var(--text-caption)', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)', fontVariantNumeric: 'tabular-nums' }}>
          ${spent.toLocaleString()} / ${total.toLocaleString()}
        </span>
      </div>
      <div style={{
        height: 6,
        backgroundColor: 'var(--surface-2)',
        borderRadius: '999px',
        overflow: 'hidden',
      }}>
        <div style={{
          height: '100%',
          width: '100%',
          backgroundColor: color,
          borderRadius: '999px',
          transform: `scaleX(${pct / 100})`,
          transformOrigin: 'left',
          transition: 'transform 600ms ease-out',
        }}/>
      </div>
    </div>
  );
}

// ---- Transaction row amount formatter ----
function formatAmount(amount) {
  const abs = Math.abs(amount);
  const formatted = abs.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return amount >= 0 ? `+$${formatted}` : `-$${formatted}`;
}

// ---- Transaction row color ----
function amountColor(amount) {
  if (amount > 0) return 'var(--color-success)';
  return 'var(--text-primary)';
}

// ---- Sortable Transactions Table ----
function TransactionsTable({ data }) {
  const [sortKey, setSortKey] = useState('id');
  const [sortDir, setSortDir] = useState('asc');

  const sorted = [...data].sort((a, b) => {
    const aVal = a[sortKey];
    const bVal = b[sortKey];
    if (aVal < bVal) return sortDir === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortDir === 'asc' ? 1 : -1;
    return 0;
  });

  const handleSort = (key) => {
    if (sortKey === key) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    else { setSortKey(key); setSortDir('asc'); }
  };

  const cols = [
    { key: 'date', label: 'Date', sortable: true },
    { key: 'description', label: 'Description', sortable: true },
    { key: 'category', label: 'Category', sortable: true },
    { key: 'amount', label: 'Amount', sortable: true, mono: true, align: 'right' },
  ];

  return (
    <div style={{ overflowX: 'auto', overscrollBehavior: 'contain' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 'var(--text-small)' }}>
        <thead>
          <tr>
            {cols.map((col) => (
              <th
                key={col.key}
                onClick={() => col.sortable && handleSort(col.key)}
                style={{
                  textAlign: col.align || 'left',
                  padding: '8px 12px',
                  fontSize: 'var(--text-caption)',
                  fontWeight: 600,
                  color: sortKey === col.key ? 'var(--text-primary)' : 'var(--text-secondary)',
                  borderBottom: '1px solid var(--surface-3)',
                  cursor: col.sortable ? 'pointer' : 'default',
                  userSelect: 'none',
                  whiteSpace: 'nowrap',
                  position: 'sticky',
                  top: 0,
                  backgroundColor: 'var(--surface-1)',
                  zIndex: 1,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                {col.label}
                {col.sortable && (
                  <span style={{ marginLeft: 4, opacity: sortKey === col.key ? 1 : 0.3, fontSize: 9 }}>
                    {sortKey === col.key && sortDir === 'desc' ? '▼' : '▲'}
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map((row, i) => (
            <tr
              key={row.id}
              style={{ transition: 'background-color 150ms ease' }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--surface-2)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
            >
              <td style={{ padding: '10px 12px', borderBottom: '1px solid var(--surface-3)', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)', fontSize: 'var(--text-caption)', whiteSpace: 'nowrap', fontVariantNumeric: 'tabular-nums' }}>{row.date}</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid var(--surface-3)', color: 'var(--text-primary)' }}>{row.description}</td>
              <td style={{ padding: '10px 12px', borderBottom: '1px solid var(--surface-3)' }}>
                <span style={{
                  fontSize: 'var(--text-caption)',
                  color: 'var(--text-secondary)',
                  backgroundColor: 'var(--surface-2)',
                  padding: '2px 8px',
                  borderRadius: 'var(--radius-button)',
                }}>
                  {row.category}
                </span>
              </td>
              <td style={{
                padding: '10px 12px',
                borderBottom: '1px solid var(--surface-3)',
                textAlign: 'right',
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-small)',
                color: amountColor(row.amount),
                fontVariantNumeric: 'tabular-nums lining-nums',
                whiteSpace: 'nowrap',
              }}>
                {formatAmount(row.amount)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ---- Drop Zone ----
function CSVDropZone() {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef(null);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    // Placeholder: importCSV()
  };

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      style={{
        border: `2px dashed ${dragging ? 'var(--color-primary)' : 'var(--surface-3)'}`,
        borderRadius: 'var(--radius-dashboard-card)',
        backgroundColor: dragging
          ? 'color-mix(in srgb, var(--color-primary) 5%, var(--surface-1))'
          : 'var(--surface-1)',
        padding: 'var(--space-8) var(--space-6)',
        textAlign: 'center',
        cursor: 'pointer',
        transition: 'border-color 200ms ease, background-color 200ms ease',
      }}
    >
      <input ref={inputRef} type="file" accept=".csv" style={{ display: 'none' }} onChange={() => {}} />
      <div style={{ marginBottom: 'var(--space-2)', color: dragging ? 'var(--color-primary)' : 'var(--text-tertiary)' }}>
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ margin: '0 auto', display: 'block' }}>
          <path d="M14 4v14M7 11l7-7 7 7"/>
          <path d="M4 22h20"/>
        </svg>
      </div>
      <div style={{ fontSize: 'var(--text-small)', fontWeight: 500, color: dragging ? 'var(--color-primary)' : 'var(--text-secondary)', marginBottom: 'var(--space-1)' }}>
        Drop Chase or Bilt CSV here
      </div>
      <div style={{ fontSize: 'var(--text-caption)', color: 'var(--text-tertiary)' }}>
        or click to browse — .csv files only
      </div>
    </div>
  );
}

export default function FinancesPage() {
  const summary = FINANCIAL_SUMMARY;
  const budgetPct = (summary.spentThisMonth / summary.monthlyBudget) * 100;

  return (
    <div style={{ padding: 'var(--space-8)', maxWidth: 960, margin: '0 auto' }}>

      {/* Header */}
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <h1 style={{ fontSize: 'var(--text-h2)', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.2, marginBottom: 'var(--space-1)' }}>
          Finances
        </h1>
        <p style={{ fontSize: 'var(--text-small)', color: 'var(--text-secondary)' }}>March 2026</p>
      </div>

      {/* Top row: Budget overview + CSV Import */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 'var(--space-5)', marginBottom: 'var(--space-5)', alignItems: 'start' }}>

        {/* Budget summary card */}
        <div style={{
          backgroundColor: 'var(--surface-1)',
          border: '1px solid var(--surface-3)',
          borderRadius: 'var(--radius-dashboard-card)',
          padding: 'var(--space-5)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-5)' }}>
            <h2 style={{ fontSize: 'var(--text-small)', fontWeight: 600, color: 'var(--text-primary)' }}>Monthly Budget</h2>
            <span style={{
              fontSize: 'var(--text-caption)',
              fontWeight: 500,
              color: 'var(--color-primary)',
              backgroundColor: 'color-mix(in srgb, var(--color-primary) 12%, transparent)',
              padding: '3px 10px',
              borderRadius: 'var(--radius-button)',
            }}>
              On Track
            </span>
          </div>

          {/* Main gauge */}
          <div style={{ marginBottom: 'var(--space-5)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
              <span style={{ fontSize: 'var(--text-h4)', fontWeight: 700, color: 'var(--text-primary)', fontVariantNumeric: 'tabular-nums' }}>
                ${summary.spentThisMonth.toLocaleString()}
              </span>
              <span style={{ fontSize: 'var(--text-small)', color: 'var(--text-tertiary)', fontVariantNumeric: 'tabular-nums', alignSelf: 'flex-end' }}>
                / ${summary.monthlyBudget.toLocaleString()}
              </span>
            </div>
            <div style={{ height: 8, backgroundColor: 'var(--surface-2)', borderRadius: '999px', overflow: 'hidden' }}>
              <div style={{
                height: '100%',
                width: '100%',
                backgroundColor: 'var(--color-primary)',
                borderRadius: '999px',
                transform: `scaleX(${budgetPct / 100})`,
                transformOrigin: 'left',
                transition: 'transform 600ms ease-out',
              }}/>
            </div>
            <div style={{ fontSize: 'var(--text-caption)', color: 'var(--text-tertiary)', marginTop: 'var(--space-1)' }}>
              {budgetPct.toFixed(0)}% of monthly budget · ${(summary.monthlyBudget - summary.spentThisMonth).toLocaleString()} remaining
            </div>
          </div>

          {/* Category breakdown */}
          {summary.categories.filter((c) => c.spent > 0).map((cat) => (
            <BudgetGauge key={cat.name} label={cat.name} spent={cat.spent} total={cat.budget} />
          ))}
        </div>

        {/* CSV Import + Privacy */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <CSVDropZone />

          {/* Privacy badge */}
          <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: 'var(--space-3)',
            padding: 'var(--space-4)',
            backgroundColor: 'var(--surface-1)',
            border: '1px solid var(--surface-3)',
            borderRadius: 'var(--radius-dashboard-card)',
          }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="var(--color-success)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }}>
              <path d="M8 2L3 4.5V8c0 3 2.5 5.5 5 6 2.5-.5 5-3 5-6V4.5L8 2z"/>
              <path d="M5.5 8l2 2 3-3"/>
            </svg>
            <p style={{ fontSize: 'var(--text-caption)', color: 'var(--text-secondary)', lineHeight: 1.5, maxWidth: 'none' }}>
              All financial data is stored locally in your browser. Nothing is uploaded to any server.
            </p>
          </div>
        </div>
      </div>

      {/* Spending Chart */}
      <div style={{
        backgroundColor: 'var(--surface-1)',
        border: '1px solid var(--surface-3)',
        borderRadius: 'var(--radius-dashboard-card)',
        padding: 'var(--space-5)',
        marginBottom: 'var(--space-5)',
      }}>
        <h2 style={{ fontSize: 'var(--text-small)', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 'var(--space-5)' }}>
          Monthly Spending (6 months)
        </h2>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={MONTHLY_CHART_DATA} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="color-mix(in srgb, #3F3F46 40%, transparent)" vertical={false} />
            <XAxis
              dataKey="month"
              tick={{ fill: '#71717A', fontSize: 12, fontFamily: "'JetBrains Mono', monospace" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: '#71717A', fontSize: 12, fontFamily: "'JetBrains Mono', monospace" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
              width={40}
            />
            <Tooltip content={<ChartTooltip />} cursor={{ fill: 'color-mix(in srgb, var(--color-primary) 8%, transparent)' }} />
            <ReferenceLine y={3800} stroke="#F97316" strokeDasharray="4 3" strokeWidth={1} />
            <Bar
              dataKey="spent"
              radius={[4, 4, 0, 0]}
              maxBarSize={52}
            >
              {MONTHLY_CHART_DATA.map((entry, index) => (
                <Cell key={index} fill={entry.spent > entry.budget ? '#F97316' : '#3B82F6'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Transactions */}
      <div style={{
        backgroundColor: 'var(--surface-1)',
        border: '1px solid var(--surface-3)',
        borderRadius: 'var(--radius-dashboard-card)',
        overflow: 'hidden',
      }}>
        <div style={{
          padding: 'var(--space-4) var(--space-5)',
          borderBottom: '1px solid var(--surface-3)',
        }}>
          <h2 style={{ fontSize: 'var(--text-small)', fontWeight: 600, color: 'var(--text-primary)' }}>
            Recent Transactions
          </h2>
        </div>
        <TransactionsTable data={TRANSACTIONS} />
      </div>

    </div>
  );
}
