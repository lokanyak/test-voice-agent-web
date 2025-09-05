import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CALL_VOLUME_DATA } from '@/lib/mock-data';

export function CallVolumeChart() {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={CALL_VOLUME_DATA}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="calls" fill="#3B82F6" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
