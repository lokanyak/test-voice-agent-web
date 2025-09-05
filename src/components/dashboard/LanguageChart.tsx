import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { LANGUAGE_DISTRIBUTION } from '@/lib/mock-data';

export function LanguageChart() {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie
          data={LANGUAGE_DISTRIBUTION}
          cx="50%"
          cy="50%"
          outerRadius={80}
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {LANGUAGE_DISTRIBUTION.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => [`${value}%`, 'Usage']} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
