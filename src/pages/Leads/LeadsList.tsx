import React, { useState } from 'react';
import { Link } from '@/components/ui/Link';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Label } from '@/components/ui/Label';
import { Plus, Search, Filter, Download, ArrowRight } from 'lucide-react';
import { initialLeads, type Lead, type LeadStage } from '@/lib/mock-data';

const SUMMARY_METRICS = [
  { label: 'Total Leads', value: '48' },
  { label: 'New This Week', value: '9' },
  { label: 'Follow-ups Due', value: '7' },
  { label: 'Site Visits', value: '5' },
  { label: 'Conversion Rate', value: '24%' },
];

const PIPELINE_STAGES = [
  { name: 'New', count: 12 },
  { name: 'Contacted', count: 8 },
  { name: 'Qualified', count: 7 },
  { name: 'Site Visit', count: 6 },
  { name: 'Proposal', count: 5 },
  { name: 'Negotiation', count: 4 },
  { name: 'Won', count: 4 },
  { name: 'Lost', count: 2 },
];

export function LeadsList() {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [searchQuery, setSearchQuery] = useState('');
  const [isNewLeadModalOpen, setIsNewLeadModalOpen] = useState(false);

  // New Lead Form State
  const [newLeadForm, setNewLeadForm] = useState({
    name: '', phone: '', email: '', requirement: '', budget: '', source: 'Website',
  });

  const filteredLeads = leads.filter(lead => 
    lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.phone.includes(searchQuery) ||
    lead.requirement.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.owner.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStageBadge = (stage: LeadStage) => {
    switch(stage) {
      case 'New': return <Badge variant="warning">New</Badge>;
      case 'Won': return <Badge variant="success">Won</Badge>;
      case 'Lost': return <Badge variant="danger">Lost</Badge>;
      case 'Qualified':
      case 'Site Visit':
      case 'Proposal':
      case 'Negotiation':
      case 'Contacted':
        return <Badge variant="neutral">{stage}</Badge>;
      default: return <Badge variant="neutral">{stage}</Badge>;
    }
  };

  const handleCreateLead = (e: React.FormEvent) => {
    e.preventDefault();
    const newLead: Lead = {
      id: `L-${1000 + leads.length + 1}`,
      name: newLeadForm.name,
      phone: newLeadForm.phone,
      email: newLeadForm.email,
      source: newLeadForm.source as any,
      requirement: newLeadForm.requirement,
      budget: newLeadForm.budget,
      stage: 'New',
      nextFollowUp: 'Tomorrow',
      owner: 'Aarav Mehta',
      location: 'TBD',
      propertyType: 'TBD',
      propertySize: 'TBD',
      rooms: 'TBD',
      designStyle: 'TBD',
      startDate: 'TBD',
      createdDate: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
    };
    setLeads([newLead, ...leads]);
    setIsNewLeadModalOpen(false);
    setNewLeadForm({ name: '', phone: '', email: '', requirement: '', budget: '', source: 'Website' });
  };

  return (
    <div className="max-w-[1600px] mx-auto space-y-8 pb-12">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-primary">Leads</h1>
          <p className="text-secondary mt-1 text-sm">Manage enquiries, follow-ups and opportunities.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" className="hidden sm:flex">
            <Download className="mr-2 h-4 w-4" /> Import Leads
          </Button>
          <Button onClick={() => setIsNewLeadModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> New Lead
          </Button>
        </div>
      </div>

      {/* SUMMARY METRICS */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {SUMMARY_METRICS.map((metric, i) => (
          <div key={i} className="bg-surface border border-border rounded-xl p-5">
            <p className="text-sm font-medium text-secondary">{metric.label}</p>
            <p className="text-2xl font-semibold text-primary mt-2">{metric.value}</p>
          </div>
        ))}
      </div>

      {/* LEAD PIPELINE */}
      <div className="bg-elevated border border-border rounded-xl p-6 hidden md:block">
        <h3 className="text-sm font-semibold text-primary mb-4">Pipeline Distribution</h3>
        <div className="flex w-full h-10 bg-surface rounded-md border border-border overflow-hidden">
          {PIPELINE_STAGES.map((stage) => (
            <div 
              key={stage.name} 
              className="h-full flex items-center justify-center border-r border-border last:border-r-0 relative group"
              style={{ flex: stage.count }}
            >
              <span className="text-xs font-medium text-secondary group-hover:text-primary truncate px-2">
                {stage.name} ({stage.count})
              </span>
              {/* Subtle accent line on top */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-accent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </div>

      {/* LIST CONTROLS */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-surface border border-border rounded-xl p-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
          <Input 
            placeholder="Search leads by name, phone, requirement..." 
            className="pl-9 w-full"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex w-full md:w-auto items-center gap-3 overflow-x-auto custom-scrollbar pb-1 md:pb-0">
          <select className="h-9 rounded-md border border-border bg-background px-3 py-1 text-sm text-primary appearance-none focus:outline-none focus:ring-1 focus:ring-accent min-w-[120px]">
            <option>All Stages</option>
            <option>New</option>
            <option>Qualified</option>
            <option>Proposal</option>
          </select>
          <select className="h-9 rounded-md border border-border bg-background px-3 py-1 text-sm text-primary appearance-none focus:outline-none focus:ring-1 focus:ring-accent min-w-[120px]">
            <option>All Owners</option>
            <option>Ananya Rao</option>
            <option>Rahul Verma</option>
            <option>Priya Shah</option>
          </select>
          <Button variant="ghost" size="sm" className="whitespace-nowrap">
            <Filter className="mr-2 h-4 w-4" /> Clear Filters
          </Button>
        </div>
      </div>

      {/* LEAD TABLE (Desktop) */}
      <div className="bg-surface border border-border rounded-xl overflow-hidden hidden lg:block">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-muted uppercase bg-elevated/50 border-b border-border">
            <tr>
              <th className="px-6 py-4 font-medium">Lead</th>
              <th className="px-6 py-4 font-medium">Source</th>
              <th className="px-6 py-4 font-medium">Requirement</th>
              <th className="px-6 py-4 font-medium">Budget</th>
              <th className="px-6 py-4 font-medium">Stage</th>
              <th className="px-6 py-4 font-medium">Next Follow-up</th>
              <th className="px-6 py-4 font-medium">Owner</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredLeads.map((lead) => (
              <tr key={lead.id} className="hover:bg-elevated/50 transition-colors group">
                <td className="px-6 py-4">
                  <p className="font-medium text-primary">{lead.name}</p>
                  <p className="text-xs text-secondary mt-0.5">{lead.phone}</p>
                </td>
                <td className="px-6 py-4 text-secondary">{lead.source}</td>
                <td className="px-6 py-4 text-secondary">{lead.requirement}</td>
                <td className="px-6 py-4 text-secondary">{lead.budget}</td>
                <td className="px-6 py-4">{getStageBadge(lead.stage)}</td>
                <td className="px-6 py-4">
                  <span className="text-accent font-medium text-xs bg-accent/10 px-2 py-1 rounded">
                    {lead.nextFollowUp}
                  </span>
                </td>
                <td className="px-6 py-4 text-secondary">{lead.owner}</td>
                <td className="px-6 py-4 text-right">
                  <Link to={`/leads/${lead.id}`}>
                    <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                      View <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredLeads.length === 0 && (
          <div className="p-12 text-center text-muted">No leads found matching your search.</div>
        )}
      </div>

      {/* LEAD CARDS (Mobile/Tablet) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:hidden">
        {filteredLeads.map((lead) => (
          <Link to={`/leads/${lead.id}`} key={lead.id}>
            <div className="bg-surface border border-border rounded-xl p-5 hover:bg-elevated transition-colors space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium text-primary text-lg">{lead.name}</p>
                  <p className="text-sm text-secondary">{lead.phone}</p>
                </div>
                {getStageBadge(lead.stage)}
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-muted block text-xs mb-0.5">Requirement</span>
                  <span className="text-secondary">{lead.requirement}</span>
                </div>
                <div>
                  <span className="text-muted block text-xs mb-0.5">Budget</span>
                  <span className="text-secondary">{lead.budget}</span>
                </div>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-border">
                <span className="text-xs text-muted">Owner: {lead.owner}</span>
                <span className="text-accent font-medium text-xs bg-accent/10 px-2 py-1 rounded">
                  {lead.nextFollowUp}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* NEW LEAD MODAL */}
      <Modal
        isOpen={isNewLeadModalOpen}
        onClose={() => setIsNewLeadModalOpen(false)}
        title="Create New Lead"
        description="Add a new potential client to the CRM."
      >
        <form onSubmit={handleCreateLead} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2 col-span-2 sm:col-span-1">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" required value={newLeadForm.name} onChange={e => setNewLeadForm({...newLeadForm, name: e.target.value})} />
            </div>
            <div className="space-y-2 col-span-2 sm:col-span-1">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" required value={newLeadForm.phone} onChange={e => setNewLeadForm({...newLeadForm, phone: e.target.value})} />
            </div>
            <div className="space-y-2 col-span-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={newLeadForm.email} onChange={e => setNewLeadForm({...newLeadForm, email: e.target.value})} />
            </div>
            <div className="space-y-2 col-span-2">
              <Label htmlFor="requirement">Requirement</Label>
              <Input id="requirement" placeholder="e.g. 3 BHK Interior" required value={newLeadForm.requirement} onChange={e => setNewLeadForm({...newLeadForm, requirement: e.target.value})} />
            </div>
            <div className="space-y-2 col-span-2 sm:col-span-1">
              <Label htmlFor="budget">Estimated Budget</Label>
              <Input id="budget" placeholder="e.g. ₹18–22L" value={newLeadForm.budget} onChange={e => setNewLeadForm({...newLeadForm, budget: e.target.value})} />
            </div>
            <div className="space-y-2 col-span-2 sm:col-span-1">
              <Label htmlFor="source">Lead Source</Label>
              <select 
                id="source"
                className="flex h-10 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-primary appearance-none focus:outline-none focus:ring-1 focus:ring-accent"
                value={newLeadForm.source} 
                onChange={e => setNewLeadForm({...newLeadForm, source: e.target.value})}
              >
                <option>Website</option>
                <option>Instagram</option>
                <option>Google</option>
                <option>Referral</option>
                <option>Walk-in</option>
              </select>
            </div>
          </div>
          <div className="pt-4 flex justify-end gap-3 border-t border-border mt-6">
            <Button type="button" variant="ghost" onClick={() => setIsNewLeadModalOpen(false)}>Cancel</Button>
            <Button type="submit">Create Lead</Button>
          </div>
        </form>
      </Modal>

    </div>
  );
}
