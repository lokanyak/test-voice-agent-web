import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const pricingTiers = [
  { name: 'Free', price: '₹0', features: ['5 Agents', '1000 Platform Minutes', 'Basic Analytics'] },
  { name: 'Pro', price: '₹4,999', popular: true, features: ['25 Agents', '5000 Platform Minutes', 'BYO Keys', 'Advanced Analytics'] },
  { name: 'Enterprise', price: 'Custom', features: ['Unlimited Agents', 'Custom Minutes', 'Voice Cloning', 'Dedicated Support'] },
]

const invoices = [
    { id: 'INV-001', date: 'Sep 1, 2025', amount: '₹4,999.00', status: 'Paid' },
    { id: 'INV-002', date: 'Aug 1, 2025', amount: '₹4,999.00', status: 'Paid' },
]

export function Billing() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Billing</h1>
        <p className="text-muted-foreground">Manage your subscription, view usage, and download invoices.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {pricingTiers.map(tier => (
          <Card key={tier.name} className={tier.popular ? 'border-primary' : ''}>
            <CardHeader>
              {tier.popular && <Badge className="absolute -top-3 right-4">Most Popular</Badge>}
              <CardTitle>{tier.name}</CardTitle>
              <CardDescription className="text-3xl font-bold">{tier.price}<span className="text-sm font-normal text-muted-foreground">/mo</span></CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2">
                {tier.features.map(feature => (
                  <li key={feature} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button className="w-full" variant={tier.name === 'Pro' ? 'default' : 'outline'}>
                {tier.name === 'Free' ? 'Current Plan' : 'Upgrade'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Invoice History</CardTitle>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead>Invoice ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {invoices.map(invoice => (
                        <TableRow key={invoice.id}>
                            <TableCell>{invoice.id}</TableCell>
                            <TableCell>{invoice.date}</TableCell>
                            <TableCell>{invoice.amount}</TableCell>
                            <TableCell><Badge variant={invoice.status === 'Paid' ? 'default' : 'secondary'} className={invoice.status === 'Paid' ? 'bg-green-500' : ''}>{invoice.status}</Badge></TableCell>
                            <TableCell><Button variant="outline" size="sm">Download</Button></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
      </Card>
    </div>
  );
}
