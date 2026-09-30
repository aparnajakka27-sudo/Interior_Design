import { FolderKanban, AlertTriangle, Clock, IndianRupee, Users } from 'lucide-react';

export const dashboardKPIs = [
  {
    title: 'Active Projects',
    value: '12',
    supporting: '3 completing this month',
    icon: FolderKanban,
  },
  {
    title: 'Projects at Risk',
    value: '2',
    supporting: 'Requires attention',
    icon: AlertTriangle,
  },
  {
    title: 'Pending Approvals',
    value: '5',
    supporting: 'Across 4 projects',
    icon: Clock,
  },
  {
    title: 'Pending Payments',
    value: '₹18.4L',
    supporting: '6 outstanding invoices',
    icon: IndianRupee,
  },
  {
    title: 'Team Members',
    value: '42',
    supporting: '34 active today',
    icon: Users,
  },
];

export type ProjectHealth = 'Healthy' | 'Attention' | 'At Risk';

export interface Project {
  clientId?: string;
  id: string;
  name: string;
  client: string;
  location: string;
  stage: string;
  progress: number;
  health: ProjectHealth;
  deadline: string;
}

export const overviewProjects: Project[] = [
  {
    id: 'P-101',
    name: 'Sharma Residence',
    client: 'Sharma Family',
    location: 'Bangalore',
    stage: 'Execution',
    progress: 72,
    health: 'Healthy',
    deadline: '18 Oct',
  },
  {
    id: 'P-102',
    name: 'Mehta Villa',
    client: 'Mehta Family',
    location: 'Bangalore',
    stage: 'Design Approval',
    progress: 48,
    health: 'Attention',
    deadline: '24 Oct',
  },
  {
    id: 'P-103',
    name: 'Rao Residence',
    client: 'Rao Family',
    location: 'Bangalore',
    stage: 'Site Execution',
    progress: 61,
    health: 'Healthy',
    deadline: '31 Oct',
  },
  {
    id: 'P-104',
    name: 'Kapoor Residence',
    client: 'Kapoor Family',
    location: 'Bangalore',
    stage: 'Material Procurement',
    progress: 38,
    health: 'At Risk',
    deadline: '12 Oct',
  },
];

export const projectStages = [
  { stage: 'Lead', count: 3 },
  { stage: 'Consultation', count: 2 },
  { stage: 'Site Visit', count: 1 },
  { stage: 'Design', count: 2 },
  { stage: 'Client Approval', count: 2 },
  { stage: 'Production', count: 1 },
  { stage: 'Execution', count: 4 },
  { stage: 'Handover', count: 1 },
];

export const todayActivity = [
  { id: 1, time: '09:15', title: 'Site update added', project: 'Sharma Residence' },
  { id: 2, time: '10:20', title: 'Client approval requested', project: 'Mehta Villa — Living Room' },
  { id: 3, time: '11:05', title: 'Material delivery received', project: 'Rao Residence' },
  { id: 4, time: '12:40', title: 'Payment recorded', project: 'Kapoor Residence' },
  { id: 5, time: '14:10', title: 'Design revision uploaded', project: 'Mehta Villa' },
];

export const needsAttentionItems = [
  { id: 1, title: 'Project deadline approaching', project: 'Sharma Residence', detail: 'Deadline in 4 days', severity: 'warning' },
  { id: 2, title: 'Client approval pending', project: 'Mehta Villa', detail: 'Living Room — V2', severity: 'attention' },
  { id: 3, title: 'Material delivery delayed', project: 'Kapoor Residence', detail: 'Custom wardrobes', severity: 'danger' },
  { id: 4, title: 'Payment overdue', project: 'Rao Residence', detail: 'Invoice #INV-204', severity: 'danger' },
];

export const teamWorkload = [
  { id: 1, name: 'Ananya Rao', role: 'Senior Designer', tasks: 8, maxTasks: 12 },
  { id: 2, name: 'Rahul Verma', role: 'Project Manager', tasks: 6, maxTasks: 10 },
  { id: 3, name: 'Kiran Kumar', role: 'Site Manager', tasks: 11, maxTasks: 15 },
  { id: 4, name: 'Priya Shah', role: 'Designer', tasks: 5, maxTasks: 10 },
];

export const projectHealthData = {
  healthy: 8,
  attention: 2,
  atRisk: 2,
};

// --- PHASE 3: LEADS & CRM ---

export type LeadStage = 'New' | 'Contacted' | 'Qualified' | 'Site Visit' | 'Proposal' | 'Negotiation' | 'Won' | 'Lost';
export type LeadSource = 'Instagram' | 'Facebook' | 'Website' | 'Google' | 'Referral' | 'Walk-in' | 'WhatsApp' | 'Other';

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  source: LeadSource;
  requirement: string;
  budget: string;
  stage: LeadStage;
  nextFollowUp: string;
  owner: string;
  location: string;
  propertyType: string;
  propertySize: string;
  rooms: string;
  designStyle: string;
  startDate: string;
  createdDate: string;
}

export const initialLeads: Lead[] = [
  {
    id: 'L-1001',
    name: 'Rohan Sharma',
    phone: '+91 9876543210',
    email: 'rohan.s@example.com',
    source: 'Instagram',
    requirement: '3 BHK Interior',
    budget: '₹18–22L',
    stage: 'Qualified',
    nextFollowUp: 'Tomorrow, 11:00 AM',
    owner: 'Ananya Rao',
    location: 'Indiranagar, Bangalore',
    propertyType: 'Apartment',
    propertySize: '1600 sq ft',
    rooms: '3 Bed, 3 Bath, Living, Kitchen',
    designStyle: 'Modern Minimalist',
    startDate: 'Next Month',
    createdDate: '28 Sep 2026',
  },
  {
    id: 'L-1002',
    name: 'Sneha Kapoor',
    phone: '+91 9123456789',
    email: 'sneha.k@example.com',
    source: 'Website',
    requirement: '4 BHK Villa',
    budget: '₹28–35L',
    stage: 'Site Visit',
    nextFollowUp: '2 Oct 2026',
    owner: 'Rahul Verma',
    location: 'Whitefield, Bangalore',
    propertyType: 'Villa',
    propertySize: '3200 sq ft',
    rooms: '4 Bed, Living, Kitchen, Home Theatre',
    designStyle: 'Contemporary Luxury',
    startDate: 'In 2 Months',
    createdDate: '25 Sep 2026',
  },
  {
    id: 'L-1003',
    name: 'Arjun Mehta',
    phone: '+91 9988776655',
    email: 'arjun.m@example.com',
    source: 'Referral',
    requirement: '2 BHK Apartment',
    budget: '₹10–14L',
    stage: 'Proposal',
    nextFollowUp: '3 Oct 2026',
    owner: 'Ananya Rao',
    location: 'Koramangala, Bangalore',
    propertyType: 'Apartment',
    propertySize: '1100 sq ft',
    rooms: '2 Bed, 2 Bath, Living, Kitchen',
    designStyle: 'Scandinavian',
    startDate: 'Immediately',
    createdDate: '20 Sep 2026',
  },
  {
    id: 'L-1004',
    name: 'Priya Reddy',
    phone: '+91 9871234560',
    email: 'priya.r@example.com',
    source: 'Google',
    requirement: 'Kitchen + Living Room',
    budget: '₹6–8L',
    stage: 'New',
    nextFollowUp: 'Today, 4:00 PM',
    owner: 'Priya Shah',
    location: 'HSR Layout, Bangalore',
    propertyType: 'Apartment (Renovation)',
    propertySize: 'N/A',
    rooms: 'Kitchen, Living',
    designStyle: 'Traditional Twist',
    startDate: 'Flexible',
    createdDate: '30 Sep 2026',
  },
];

export interface LeadActivity {
  id: string;
  leadId: string;
  date: string;
  title: string;
  description: string;
  type: 'system' | 'note' | 'call' | 'meeting';
}

export const initialLeadActivities: LeadActivity[] = [
  {
    id: 'ACT-1',
    leadId: 'L-1001',
    date: 'Today — 11:30 AM',
    title: 'Called client',
    description: 'Discussed initial requirements. Wants a focus on natural light and neutral tones.',
    type: 'call',
  },
  {
    id: 'ACT-2',
    leadId: 'L-1001',
    date: 'Yesterday — 4:20 PM',
    title: 'WhatsApp message sent',
    description: 'Sent the initial company brochure and portfolio link.',
    type: 'system',
  },
  {
    id: 'ACT-3',
    leadId: 'L-1001',
    date: '28 Sep — 2:00 PM',
    title: 'Lead created',
    description: 'Lead originated from Instagram DM.',
    type: 'system',
  },
];
// --- PHASE 4: PROJECT MANAGEMENT ---

export type ProjectStage = 'Planning' | 'Site Visit' | 'Design' | 'Client Approval' | 'Procurement' | 'Production' | 'Execution' | 'Snagging' | 'Handover' | 'Completed' | 'Cancelled';

export interface ProjectTeamMember {
  role: string;
  name: string;
  avatarId?: string;
}

export interface DetailedProject extends Project {
  type: string;
  propertySize: string;
  estimatedBudget: string;
  approvedBudget: string;
  amountPaid: string;
  outstanding: string;
  startDate: string;
  expectedCompletion: string;
  projectManager: string;
  designer: string;
  siteManager: string;
  team: ProjectTeamMember[];
  healthDetail?: string;
  tasks: { total: number; completed: number; inProgress: number; pending: number };
  materials: { ordered: number; delivered: number; pending: number; delayed: number };
  design: { currentVersion: string; status: string; lastUpdated: string; rooms: string[] };
  approval: { latestVersion: string; status: string; approvedOn: string; previousVersions: string[] };
  documents: { total: number; latest: string[] };
}

export const detailedProjects: DetailedProject[] = [
  {
    id: 'PRJ-001',
    clientId: 'CLI-001',
    name: 'Sharma Residence',
    client: 'Sharma Family',
    location: 'Bangalore',
    stage: 'Execution',
    progress: 72,
    health: 'Healthy',
    deadline: '18 Oct 2026',
    type: '3 BHK Interior',
    propertySize: '1800 sq ft',
    estimatedBudget: '₹19.6L',
    approvedBudget: '₹22L',
    amountPaid: '₹11.5L',
    outstanding: '₹10.5L',
    startDate: '12 Sep 2026',
    expectedCompletion: '18 Oct 2026',
    projectManager: 'Rahul Verma',
    designer: 'Ananya Rao',
    siteManager: 'Kiran Kumar',
    healthDetail: 'No critical issues.',
    team: [
      { role: 'Project Manager', name: 'Rahul Verma' },
      { role: 'Designer', name: 'Ananya Rao' },
      { role: 'Site Manager', name: 'Kiran Kumar' },
      { role: 'Accounts', name: 'Priya Shah' },
    ],
    tasks: { total: 24, completed: 17, inProgress: 5, pending: 2 },
    materials: { ordered: 18, delivered: 12, pending: 6, delayed: 2 },
    design: { currentVersion: 'V3', status: 'Client Approved', lastUpdated: '28 Sep', rooms: ['Living Room', 'Kitchen', 'Master Bedroom'] },
    approval: { latestVersion: 'V3', status: 'Approved', approvedOn: '28 Sep', previousVersions: ['V1', 'V2'] },
    documents: { total: 12, latest: ['Floor Plan — V2', 'Contract — Signed', 'Quotation — Approved'] },
  }
];

export interface ProjectTimelineEvent {
  id: string;
  projectId: string;
  date: string;
  title: string;
}

export const initialProjectTimeline: ProjectTimelineEvent[] = [
  { id: 'T-1', projectId: 'PRJ-001', date: '12 Sep', title: 'Project created' },
  { id: 'T-2', projectId: 'PRJ-001', date: '14 Sep', title: 'Site visit completed' },
  { id: 'T-3', projectId: 'PRJ-001', date: '18 Sep', title: 'Initial design uploaded' },
  { id: 'T-4', projectId: 'PRJ-001', date: '21 Sep', title: 'Client requested revisions' },
  { id: 'T-5', projectId: 'PRJ-001', date: '24 Sep', title: 'Design V2 uploaded' },
  { id: 'T-6', projectId: 'PRJ-001', date: '26 Sep', title: 'Client approved living room' },
  { id: 'T-7', projectId: 'PRJ-001', date: '28 Sep', title: 'Material order placed' },
  { id: 'T-8', projectId: 'PRJ-001', date: '30 Sep', title: 'Site execution started' },
];
// --- PHASE 5: DESIGN STUDIO & CLIENT APPROVAL ---

export type DesignStatus = 'Draft' | 'Design Development' | 'Internal Review' | 'Client Review' | 'Changes Requested' | 'Approved' | 'Archived';

export interface DesignSpace {
  id: string;
  projectId: string;
  name: string;
  area: string;
  dimensions: string;
  style: string;
  currentVersionId: string;
  status: DesignStatus;
  lastUpdated: string;
  designer: string;
}

export interface DesignVersion {
  id: string;
  spaceId: string;
  versionNumber: string;
  title: string;
  date: string;
  designer: string;
  status: DesignStatus;
  thumbnail: string;
  commentsCount: number;
  revisionCount: number;
  materials: string[];
  colors: string[];
  furniture: string[];
  lighting: string[];
  measurements: string[];
}

export interface DesignComment {
  id: string;
  versionId: string;
  text: string;
  author: string;
  date: string;
  isResolved: boolean;
  type: 'client' | 'internal';
}

export interface ApprovalRecord {
  id: string;
  versionId: string;
  projectId: string;
  date: string;
  decision: 'Approved' | 'Changes Requested';
  comments: string;
}

export interface DesignActivity {
  id: string;
  projectId: string;
  date: string;
  title: string;
  description: string;
  author: string;
}

export const initialDesignSpaces: DesignSpace[] = [
  {
    id: 'SPC-001',
    projectId: 'PRJ-001',
    name: 'Living Room',
    area: '320 sq ft',
    dimensions: 'TBD',
    style: 'Modern Luxury',
    currentVersionId: 'VER-003',
    status: 'Client Review',
    lastUpdated: '18 Sep 2026',
    designer: 'Ananya Rao',
  },
  {
    id: 'SPC-002',
    projectId: 'PRJ-001',
    name: 'Master Bedroom',
    area: '240 sq ft',
    dimensions: 'TBD',
    style: 'Modern Luxury',
    currentVersionId: 'VER-004',
    status: 'Changes Requested',
    lastUpdated: '20 Sep 2026',
    designer: 'Priya Shah',
  },
  {
    id: 'SPC-003',
    projectId: 'PRJ-001',
    name: 'Kitchen',
    area: '180 sq ft',
    dimensions: 'TBD',
    style: 'Minimalist',
    currentVersionId: 'VER-005',
    status: 'Approved',
    lastUpdated: '22 Sep 2026',
    designer: 'Ananya Rao',
  }
];

export const initialDesignVersions: DesignVersion[] = [
  {
    id: 'VER-001',
    spaceId: 'SPC-001',
    versionNumber: 'V1',
    title: 'Concept Design',
    date: '12 Sep 2026',
    designer: 'Ananya Rao',
    status: 'Changes Requested',
    thumbnail: 'placeholder-1',
    commentsCount: 3,
    revisionCount: 1,
    materials: ['Italian marble', 'Oak veneer'],
    colors: ['Warm white', 'Walnut'],
    furniture: ['Custom sofa', 'TV console'],
    lighting: ['Cove lighting', 'Track lights'],
    measurements: ['Ceiling height: 10ft', 'TV unit width: 8ft'],
  },
  {
    id: 'VER-002',
    spaceId: 'SPC-001',
    versionNumber: 'V2',
    title: 'Revised Layout',
    date: '15 Sep 2026',
    designer: 'Ananya Rao',
    status: 'Changes Requested',
    thumbnail: 'placeholder-2',
    commentsCount: 2,
    revisionCount: 2,
    materials: ['Italian marble', 'Oak veneer', 'Fluted wood'],
    colors: ['Warm white', 'Walnut', 'Charcoal'],
    furniture: ['Custom sofa', 'TV console', 'Accent chair'],
    lighting: ['Cove lighting', 'Track lights', 'Pendant'],
    measurements: ['Ceiling height: 10ft', 'TV unit width: 8ft', 'Sofa clearance: 3ft'],
  },
  {
    id: 'VER-003',
    spaceId: 'SPC-001',
    versionNumber: 'V3',
    title: 'Final Design',
    date: '18 Sep 2026',
    designer: 'Ananya Rao',
    status: 'Client Review',
    thumbnail: 'placeholder-3',
    commentsCount: 0,
    revisionCount: 0,
    materials: ['Italian marble', 'Oak veneer', 'Fluted wood', 'Brass finish'],
    colors: ['Warm white', 'Walnut', 'Charcoal', 'Champagne'],
    furniture: ['Custom sofa', 'TV console', 'Accent chair', 'Coffee table'],
    lighting: ['Cove lighting', 'Track lights', 'Pendant', 'Wall sconces'],
    measurements: ['Ceiling height: 10ft', 'TV unit width: 8ft', 'Sofa clearance: 3ft'],
  }
];

export const initialDesignComments: DesignComment[] = [
  {
    id: 'CMT-001',
    versionId: 'VER-002',
    text: 'I like the overall design, but can we make the TV wall slightly lighter?',
    author: 'Sharma Family',
    date: '16 Sep 2026',
    isResolved: true,
    type: 'client'
  },
  {
    id: 'CMT-002',
    versionId: 'VER-002',
    text: 'Noted. Will switch the veneer to a lighter oak shade in V3.',
    author: 'Ananya Rao',
    date: '16 Sep 2026',
    isResolved: true,
    type: 'internal'
  }
];

export const initialApprovalRecords: ApprovalRecord[] = [
  {
    id: 'APP-001',
    versionId: 'VER-001',
    projectId: 'PRJ-001',
    date: '14 Sep 2026',
    decision: 'Changes Requested',
    comments: 'Layout feels cramped near the dining area.'
  },
  {
    id: 'APP-002',
    versionId: 'VER-002',
    projectId: 'PRJ-001',
    date: '17 Sep 2026',
    decision: 'Changes Requested',
    comments: 'Make the TV wall slightly lighter.'
  }
];

export const initialDesignActivities: DesignActivity[] = [
  { id: 'DA-1', projectId: 'PRJ-001', date: '18 Sep 2026, 14:30', title: 'V3 submitted for review', description: 'Living Room design updated and submitted.', author: 'Ananya Rao' },
  { id: 'DA-2', projectId: 'PRJ-001', date: '17 Sep 2026, 10:15', title: 'Client requested changes', description: 'Requested lighter TV wall on V2.', author: 'Sharma Family' },
  { id: 'DA-3', projectId: 'PRJ-001', date: '16 Sep 2026, 09:00', title: 'Designer replied to comment', description: 'Ananya acknowledged TV wall change.', author: 'Ananya Rao' },
];


// --- PHASE 6: SITE MANAGEMENT ---

export type ExecutionStage = 'Pre-Execution' | 'Civil Work' | 'Electrical' | 'Plumbing' | 'Carpentry' | 'Painting' | 'Flooring' | 'Furniture Installation' | 'Finishing' | 'Snagging' | 'Handover';

export interface SiteUpdate {
  id: string;
  projectId: string;
  date: string;
  author: string;
  progressBefore: number;
  progressAfter: number;
  completed: string[];
  planned: string[];
  blockers: string[];
  materials: string[];
  notes: string;
}

export interface SiteVisit {
  id: string;
  projectId: string;
  date: string;
  time: string;
  visitor: string;
  purpose: 'Routine Inspection' | 'Client Visit' | 'Designer Visit' | 'Vendor Visit' | 'Quality Check' | 'Measurement' | 'Final Inspection';
  status: 'Scheduled' | 'Completed' | 'Rescheduled' | 'Cancelled';
  notes: string;
}

export interface SiteIssue {
  id: string;
  projectId: string;
  title: string;
  description: string;
  location: string;
  reportedBy: string;
  date: string;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  owner: string;
  status: 'Open' | 'In Progress' | 'Waiting' | 'Resolved';
  dueDate: string;
  relatedCategory: string;
}

export interface SiteSnag {
  id: string;
  projectId: string;
  title: string;
  room: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'Open' | 'In Progress' | 'Resolved';
  assignedTo: string;
  reportedDate: string;
  dueDate: string;
  comments: string;
}

export const initialSiteUpdates: SiteUpdate[] = [
  {
    id: 'UPD-001',
    projectId: 'PRJ-001',
    date: '18 Sep 2026',
    author: 'Vikram Singh',
    progressBefore: 68,
    progressAfter: 72,
    completed: ['False ceiling work completed in living room', 'Electrical wiring completed in master bedroom', 'Kitchen carpentry started'],
    planned: ['Wall preparation in living room', 'Bathroom plumbing'],
    blockers: [],
    materials: ['Marble delivery received'],
    notes: 'Work proceeding smoothly. Will need extra sand by tomorrow.'
  },
  {
    id: 'UPD-002',
    projectId: 'PRJ-001',
    date: '17 Sep 2026',
    author: 'Vikram Singh',
    progressBefore: 65,
    progressAfter: 68,
    completed: ['Wall preparation completed', 'Bathroom plumbing work continued'],
    planned: ['False ceiling framework'],
    blockers: ['Two workers absent'],
    materials: [],
    notes: 'Slight delay due to labour shortage, will cover up this weekend.'
  }
];

export const initialSiteVisits: SiteVisit[] = [
  {
    id: 'VIS-001',
    projectId: 'PRJ-001',
    date: '18 Sep 2026',
    time: '11:30 AM',
    visitor: 'Rahul Mehta',
    purpose: 'Quality Check',
    status: 'Completed',
    notes: 'Checked the false ceiling framework, levels are perfect.'
  },
  {
    id: 'VIS-002',
    projectId: 'PRJ-001',
    date: '20 Sep 2026',
    time: '10:00 AM',
    visitor: 'Ananya Rao',
    purpose: 'Designer Visit',
    status: 'Scheduled',
    notes: 'Verify electrical points before plastering.'
  }
];

export const initialSiteIssues: SiteIssue[] = [
  {
    id: 'ISS-001',
    projectId: 'PRJ-001',
    title: 'Marble delivery delayed',
    description: 'Vendor truck broke down. Delivery pushed by 2 days.',
    location: 'Overall Site',
    reportedBy: 'Vikram Singh',
    date: '17 Sep 2026',
    priority: 'High',
    owner: 'Procurement Team',
    status: 'Open',
    dueDate: '19 Sep 2026',
    relatedCategory: 'Material'
  },
  {
    id: 'ISS-002',
    projectId: 'PRJ-002',
    title: 'Electrical point mismatch',
    description: 'TV wall point is 6 inches off from design drawing.',
    location: 'Living Room',
    reportedBy: 'Arjun Rao',
    date: '16 Sep 2026',
    priority: 'Medium',
    owner: 'Site Manager',
    status: 'In Progress',
    dueDate: '18 Sep 2026',
    relatedCategory: 'Execution'
  }
];

export const initialSiteSnags: SiteSnag[] = [
  {
    id: 'SNG-001',
    projectId: 'PRJ-001',
    title: 'Paint touch-up required',
    room: 'Master Bedroom',
    description: 'Scratches on the wall near the window edge.',
    priority: 'Medium',
    status: 'Open',
    assignedTo: 'Painting Team',
    reportedDate: '15 Sep 2026',
    dueDate: '19 Sep 2026',
    comments: ''
  },
  {
    id: 'SNG-002',
    projectId: 'PRJ-001',
    title: 'Cabinet alignment issue',
    room: 'Kitchen',
    description: 'Top drawer is slightly misaligned and rubbing against the frame.',
    priority: 'High',
    status: 'In Progress',
    assignedTo: 'Carpentry Team',
    reportedDate: '16 Sep 2026',
    dueDate: '18 Sep 2026',
    comments: 'Carpenter scheduled for tomorrow.'
  },
  {
    id: 'SNG-003',
    projectId: 'PRJ-001',
    title: 'Switchboard cover missing',
    room: 'Living Room',
    description: 'The bottom right switchboard is missing its outer plate.',
    priority: 'Low',
    status: 'Resolved',
    assignedTo: 'Electrical Team',
    reportedDate: '10 Sep 2026',
    dueDate: '12 Sep 2026',
    comments: 'Plate installed.'
  }
];


// --- PHASE 7: MATERIALS & PROCUREMENT ---

export type MaterialCategory = 'Civil' | 'Electrical' | 'Plumbing' | 'Flooring' | 'Marble' | 'Wood' | 'Furniture' | 'Hardware' | 'Paint' | 'Lighting' | 'Sanitary' | 'Kitchen' | 'Décor' | 'Other';
export type MaterialStatus = 'Required' | 'Quotation Pending' | 'Approved' | 'Ordered' | 'Partially Received' | 'Received' | 'Delayed' | 'Cancelled';
export type POStatus = 'Draft' | 'Sent' | 'Confirmed' | 'Partially Received' | 'Delivered' | 'Delayed' | 'Cancelled';
export type DeliveryStatus = 'Pending' | 'Dispatched' | 'In Transit' | 'Partially Received' | 'Received' | 'Delayed' | 'Rejected';

export interface Vendor {
  id: string;
  clientId?: string;
  name: string;
  category: string;
  contact: string;
  phone: string;
  email: string;
  address: string;
  status: 'Active' | 'Inactive';
}

export interface Material {
  id: string;
  projectId: string;
  name: string;
  category: MaterialCategory;
  specification: string;
  requiredQty: number;
  orderedQty: number;
  receivedQty: number;
  unit: string;
  unitCost: number;
  vendorId: string;
  expectedDelivery: string;
  status: MaterialStatus;
  source: string;
}

export interface POItem {
  id: string;
  materialId: string;
  name: string;
  specification: string;
  quantity: number;
  unit: string;
  unitCost: number;
  total: number;
}

export interface PurchaseOrder {
  id: string;
  poNumber: string;
  projectId: string;
  vendorId: string;
  date: string;
  expectedDelivery: string;
  status: POStatus;
  items: POItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
}

export interface DeliveryItem {
  materialId: string;
  name: string;
  orderedQty: number;
  receivedQty: number;
  damagedQty: number;
  acceptedQty: number;
  pendingQty: number;
}

export interface Delivery {
  id: string;
  purchaseOrderId: string;
  projectId: string;
  vendorId: string;
  expectedDate: string;
  actualDate: string;
  status: DeliveryStatus;
  site: string;
  items: DeliveryItem[];
}

export const initialVendors: Vendor[] = [
  { id: 'VEN-001', name: 'Classic Marbles', category: 'Marble & Stone', contact: 'Rohit Sharma', phone: '+91 9876543210', email: 'sales@classicmarbles.com', address: '12 Industrial Area, Bangalore', status: 'Active' },
  { id: 'VEN-002', name: 'WoodCraft Suppliers', category: 'Wood', contact: 'Amit Patel', phone: '+91 9876543211', email: 'amit@woodcraft.com', address: '45 Timber Market, Bangalore', status: 'Active' },
  { id: 'VEN-003', name: 'Lumina Studio', category: 'Lighting', contact: 'Priya Verma', phone: '+91 9876543212', email: 'orders@luminastudio.in', address: 'Light Street, Bangalore', status: 'Active' },
];

export const initialMaterials: Material[] = [
  {
    id: 'MAT-001',
    projectId: 'PRJ-001',
    name: 'Italian Marble',
    category: 'Marble',
    specification: 'Italian Statuario Marble, 18mm',
    requiredQty: 420,
    orderedQty: 420,
    receivedQty: 280,
    unit: 'sq ft',
    unitCost: 800,
    vendorId: 'VEN-001',
    expectedDelivery: '22 Sep 2026',
    status: 'Partially Received',
    source: 'Design Studio - Living Room (V3)'
  },
  {
    id: 'MAT-002',
    projectId: 'PRJ-002',
    name: 'Oak Veneer',
    category: 'Wood',
    specification: 'Natural Oak, 4x8 ft',
    requiredQty: 120,
    orderedQty: 120,
    receivedQty: 0,
    unit: 'Sheets',
    unitCost: 1800,
    vendorId: 'VEN-002',
    expectedDelivery: '24 Sep 2026',
    status: 'Ordered',
    source: 'Project Manager'
  },
  {
    id: 'MAT-003',
    projectId: 'PRJ-001',
    name: 'Pendant Lights',
    category: 'Lighting',
    specification: 'Brass finish, 40W LED',
    requiredQty: 14,
    orderedQty: 0,
    receivedQty: 0,
    unit: 'Units',
    unitCost: 7000,
    vendorId: 'VEN-003',
    expectedDelivery: '28 Sep 2026',
    status: 'Approved',
    source: 'Design Studio - Dining (V2)'
  }
];

export const initialPurchaseOrders: PurchaseOrder[] = [
  {
    id: 'PO-001',
    poNumber: 'PO-2026-014',
    projectId: 'PRJ-001',
    vendorId: 'VEN-001',
    date: '18 Sep 2026',
    expectedDelivery: '24 Sep 2026',
    status: 'Confirmed',
    items: [
      { id: 'POI-1', materialId: 'MAT-001', name: 'Italian Marble', specification: 'Italian Statuario Marble', quantity: 420, unit: 'sq ft', unitCost: 800, total: 336000 }
    ],
    subtotal: 336000,
    tax: 60480,
    shipping: 5000,
    discount: 0,
    total: 401480
  }
];

export const initialDeliveries: Delivery[] = [
  {
    id: 'DEL-001',
    purchaseOrderId: 'PO-001',
    projectId: 'PRJ-001',
    vendorId: 'VEN-001',
    expectedDate: '24 Sep 2026',
    actualDate: '',
    status: 'In Transit',
    site: 'Sharma Residence',
    items: [
      { materialId: 'MAT-001', name: 'Italian Marble', orderedQty: 420, receivedQty: 280, damagedQty: 0, acceptedQty: 280, pendingQty: 140 }
    ]
  }
];


// --- PHASE 8: FINANCE & ACCOUNTS ---

export type QuotationStatus = 'Draft' | 'Sent' | 'Viewed' | 'Approved' | 'Rejected' | 'Expired';
export type InvoiceStatus = 'Draft' | 'Sent' | 'Partially Paid' | 'Paid' | 'Overdue' | 'Cancelled';
export type PaymentStatus = 'Pending' | 'Partially Paid' | 'Paid' | 'Overdue';
export type ExpenseStatus = 'Recorded' | 'Approved' | 'Reimbursed';

export interface BOQItem {
  id: string;
  description: string;
  quantity: number;
  unit: string;
  rate: number;
  amount: number;
}

export interface Quotation {
  id: string;
  quoteNumber: string;
  projectId: string;
  clientId: string;
  date: string;
  validUntil: string;
  amount: number;
  status: QuotationStatus;
  items: BOQItem[];
  subtotal: number;
  discount: number;
  tax: number;
  notes: string;
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  projectId: string;
  clientId: string;
  issueDate: string;
  dueDate: string;
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  paid: number;
  outstanding: number;
  status: InvoiceStatus;
  items: InvoiceItem[];
}

export interface Payment {
  id: string;
  clientId: string;
  projectId: string;
  invoiceId: string;
  date: string;
  amount: number;
  method: 'Bank Transfer' | 'UPI' | 'Cash' | 'Cheque' | 'Card' | 'Other';
  reference: string;
  status: 'Completed' | 'Pending' | 'Failed';
}

export interface Expense {
  id: string;
  projectId: string;
  category: 'Materials' | 'Labour' | 'Transport' | 'Site Expense' | 'Design Expense' | 'Office Expense' | 'Vendor' | 'Miscellaneous';
  description: string;
  amount: number;
  date: string;
  paidBy: string;
  vendorId?: string;
  status: ExpenseStatus;
}

export interface VendorPayment {
  id: string;
  vendorId: string;
  purchaseOrderId: string;
  projectId: string;
  amount: number;
  date: string;
  method: string;
  reference: string;
  status: PaymentStatus;
}

export interface FinanceActivity {
  id: string;
  type: string;
  projectId: string;
  description: string;
  amount?: number;
  date: string;
  status: string;
}

export const initialQuotations: Quotation[] = [
  {
    id: 'QT-001',
    quoteNumber: 'QT-2026-018',
    projectId: 'PRJ-001',
    clientId: 'L-001', // Sharma Residence
    date: '10 Aug 2026',
    validUntil: '10 Sep 2026',
    subtotal: 1567797,
    discount: 0,
    tax: 282203,
    amount: 1850000,
    status: 'Approved',
    notes: 'Advance payment of 40% required to begin execution.',
    items: [
      { id: 'BOQ-1', description: 'Civil & Modification works', quantity: 1, unit: 'Lumpsum', rate: 450000, amount: 450000 },
      { id: 'BOQ-2', description: 'Flooring (Italian Marble)', quantity: 420, unit: 'sq ft', rate: 800, amount: 336000 },
      { id: 'BOQ-3', description: 'Modular Kitchen (Complete Setup)', quantity: 1, unit: 'Lumpsum', rate: 781797, amount: 781797 }
    ]
  }
];

export const initialInvoices: Invoice[] = [
  {
    id: 'INV-001',
    invoiceNumber: 'INV-2026-042',
    projectId: 'PRJ-001',
    clientId: 'L-001',
    issueDate: '15 Aug 2026',
    dueDate: '25 Aug 2026',
    subtotal: 627118.64,
    discount: 0,
    tax: 112881.36,
    total: 740000,
    paid: 740000,
    outstanding: 0,
    status: 'Paid',
    items: [
      { id: 'INV-I-1', description: 'Advance Payment (40%)', quantity: 1, rate: 627118.64, amount: 627118.64 }
    ]
  },
  {
    id: 'INV-002',
    invoiceNumber: 'INV-2026-048',
    projectId: 'PRJ-001',
    clientId: 'L-001',
    issueDate: '10 Sep 2026',
    dueDate: '17 Sep 2026',
    subtotal: 627118.64,
    discount: 0,
    tax: 112881.36,
    total: 740000,
    paid: 380000,
    outstanding: 360000,
    status: 'Partially Paid',
    items: [
      { id: 'INV-I-2', description: 'Execution Milestone 1 (40%)', quantity: 1, rate: 627118.64, amount: 627118.64 }
    ]
  }
];

export const initialPayments: Payment[] = [
  {
    id: 'PAY-001',
    clientId: 'L-001',
    projectId: 'PRJ-001',
    invoiceId: 'INV-001',
    date: '18 Aug 2026',
    amount: 740000,
    method: 'Bank Transfer',
    reference: 'UTIB00012345678',
    status: 'Completed'
  },
  {
    id: 'PAY-002',
    clientId: 'L-001',
    projectId: 'PRJ-001',
    invoiceId: 'INV-002',
    date: '15 Sep 2026',
    amount: 380000,
    method: 'Bank Transfer',
    reference: 'HDFC00098765432',
    status: 'Completed'
  }
];

export const initialExpenses: Expense[] = [
  {
    id: 'EXP-001',
    projectId: 'PRJ-001',
    category: 'Materials',
    description: 'Advance to Classic Marbles',
    amount: 200000,
    date: '19 Aug 2026',
    paidBy: 'Accounts',
    vendorId: 'VEN-001',
    status: 'Recorded'
  },
  {
    id: 'EXP-002',
    projectId: 'PRJ-001',
    category: 'Labour',
    description: 'Weekly wage payout (Civil Team)',
    amount: 45000,
    date: '04 Sep 2026',
    paidBy: 'Vikram Singh',
    status: 'Reimbursed'
  }
];

export const initialVendorPayments: VendorPayment[] = [
  {
    id: 'VPAY-001',
    vendorId: 'VEN-001',
    purchaseOrderId: 'PO-001',
    projectId: 'PRJ-001',
    amount: 200000,
    date: '19 Aug 2026',
    method: 'Bank Transfer',
    reference: 'SBIN0001234',
    status: 'Paid'
  }
];

export const initialFinanceActivity: FinanceActivity[] = [
  { id: 'FA-1', type: 'Invoice', projectId: 'PRJ-001', description: 'Invoice INV-2026-042 created', amount: 740000, date: '15 Aug 2026', status: 'Created' },
  { id: 'FA-2', type: 'Payment', projectId: 'PRJ-001', description: 'Payment PAY-2026-031 received', amount: 740000, date: '18 Aug 2026', status: 'Received' },
  { id: 'FA-3', type: 'Expense', projectId: 'PRJ-001', description: 'Expense EXP-2026-026 recorded', amount: 45000, date: '04 Sep 2026', status: 'Recorded' },
  { id: 'FA-4', type: 'Vendor Payment', projectId: 'PRJ-001', description: 'Vendor payment made to Classic Marbles', amount: 200000, date: '19 Aug 2026', status: 'Paid' },
  { id: 'FA-5', type: 'Quotation', projectId: 'PRJ-001', description: 'Quotation QT-2026-018 approved', amount: 1850000, date: '12 Aug 2026', status: 'Approved' }
];


// --- PHASE 9: TEAM & TASKS ---

export type EmployeeRole = 'Admin / Owner' | 'Designer' | 'Project Manager' | 'Site Manager' | 'Accounts' | 'Sales';
export type Department = 'Management' | 'Design' | 'Projects' | 'Site Operations' | 'Accounts' | 'Sales';
export type EmployeeStatus = 'Active' | 'Away' | 'Inactive';

export type TaskStatus = 'To Do' | 'In Progress' | 'Blocked' | 'Completed';
export type TaskPriority = 'Low' | 'Medium' | 'High' | 'Urgent';

export interface Employee {
  id: string;
  clientId?: string;
  name: string;
  email: string;
  phone: string;
  role: EmployeeRole;
  department: Department;
  employeeId: string;
  joinDate: string;
  status: EmployeeStatus;
  avatarInitials: string;
  assignedProjects: string[]; // Project IDs
}

export interface Task {
  id: string;
  title: string;
  description: string;
  projectId: string;
  assigneeId: string;
  priority: TaskPriority;
  status: TaskStatus;
  startDate: string;
  dueDate: string;
  estimatedHours: number;
  progress: number;
  notes: string;
  relatedModule?: 'Lead' | 'Design' | 'Client Approval' | 'Materials' | 'Site' | 'Finance' | 'General';
}

export interface TeamActivity {
  id: string;
  employeeId: string;
  projectId: string;
  description: string;
  date: string;
}

export const initialEmployees: Employee[] = [
  { id: 'EMP-001', name: 'Aarav Mehta', email: 'aarav@decormart.com', phone: '+91 98765 43210', role: 'Admin / Owner', department: 'Management', employeeId: 'DM-001', joinDate: '01 Jan 2020', status: 'Active', avatarInitials: 'AM', assignedProjects: ['PRJ-001', 'PRJ-002'] },
  { id: 'EMP-002', name: 'Ananya Rao', email: 'ananya@decormart.com', phone: '+91 98765 43211', role: 'Designer', department: 'Design', employeeId: 'DM-002', joinDate: '15 Mar 2021', status: 'Active', avatarInitials: 'AR', assignedProjects: ['PRJ-001'] },
  { id: 'EMP-003', name: 'Rahul Sharma', email: 'rahul@decormart.com', phone: '+91 98765 43212', role: 'Site Manager', department: 'Site Operations', employeeId: 'DM-003', joinDate: '10 Jun 2022', status: 'Active', avatarInitials: 'RS', assignedProjects: ['PRJ-001', 'PRJ-002'] },
  { id: 'EMP-004', name: 'Priya Kapoor', email: 'priya@decormart.com', phone: '+91 98765 43213', role: 'Accounts', department: 'Accounts', employeeId: 'DM-004', joinDate: '05 Aug 2022', status: 'Active', avatarInitials: 'PK', assignedProjects: [] },
  { id: 'EMP-005', name: 'Meera Nair', email: 'meera@decormart.com', phone: '+91 98765 43214', role: 'Sales', department: 'Sales', employeeId: 'DM-005', joinDate: '20 Nov 2023', status: 'Away', avatarInitials: 'MN', assignedProjects: [] },
  { id: 'EMP-006', name: 'Kabir Singh', email: 'kabir@decormart.com', phone: '+91 98765 43215', role: 'Designer', department: 'Design', employeeId: 'DM-006', joinDate: '10 Feb 2024', status: 'Active', avatarInitials: 'KS', assignedProjects: ['PRJ-002'] },
  { id: 'EMP-007', name: 'Riya Verma', email: 'riya@decormart.com', phone: '+91 98765 43216', role: 'Project Manager', department: 'Projects', employeeId: 'DM-007', joinDate: '01 Apr 2024', status: 'Active', avatarInitials: 'RV', assignedProjects: ['PRJ-001', 'PRJ-002'] }
];

export const initialTasks: Task[] = [
  { id: 'TSK-001', title: 'Finalize Living Room Concept', description: 'Complete 3D renders and moodboards for client review.', projectId: 'PRJ-001', assigneeId: 'EMP-002', priority: 'High', status: 'In Progress', startDate: '15 Sep 2026', dueDate: '20 Sep 2026', estimatedHours: 16, progress: 70, notes: '', relatedModule: 'Design' },
  { id: 'TSK-002', title: 'Approve Kitchen Material', description: 'Review quartz countertop samples with client.', projectId: 'PRJ-002', assigneeId: 'EMP-007', priority: 'Urgent', status: 'To Do', startDate: '18 Sep 2026', dueDate: '19 Sep 2026', estimatedHours: 4, progress: 0, notes: 'Client visiting studio at 4PM.', relatedModule: 'Materials' },
  { id: 'TSK-003', title: 'Complete Electrical Site Work', description: 'Wiring and conduit placement in master bedroom.', projectId: 'PRJ-001', assigneeId: 'EMP-003', priority: 'High', status: 'In Progress', startDate: '17 Sep 2026', dueDate: '22 Sep 2026', estimatedHours: 24, progress: 45, notes: '', relatedModule: 'Site' },
  { id: 'TSK-004', title: 'Follow Up On Pending Payment', description: 'Call Mehta regarding milestone 2 payment.', projectId: 'PRJ-002', assigneeId: 'EMP-004', priority: 'Medium', status: 'To Do', startDate: '18 Sep 2026', dueDate: '21 Sep 2026', estimatedHours: 1, progress: 0, notes: '', relatedModule: 'Finance' },
  { id: 'TSK-005', title: 'Schedule Client Design Review', description: 'Setup meeting for Phase 1 approval.', projectId: 'PRJ-001', assigneeId: 'EMP-007', priority: 'Medium', status: 'Completed', startDate: '10 Sep 2026', dueDate: '12 Sep 2026', estimatedHours: 2, progress: 100, notes: '', relatedModule: 'Client Approval' }
];

export const initialTeamActivity: TeamActivity[] = [
  { id: 'TA-001', employeeId: 'EMP-002', projectId: 'PRJ-001', description: 'Ananya completed "Living Room Concept"', date: '18 Sep 2026' },
  { id: 'TA-002', employeeId: 'EMP-003', projectId: 'PRJ-001', description: 'Rahul updated site progress for Electrical works', date: '17 Sep 2026' },
  { id: 'TA-003', employeeId: 'EMP-004', projectId: 'PRJ-002', description: 'Priya recorded a vendor payment to Classic Marbles', date: '17 Sep 2026' },
  { id: 'TA-004', employeeId: 'EMP-007', projectId: 'PRJ-001', description: 'Riya created a project task "Finalize Living Room Concept"', date: '15 Sep 2026' }
];

// -------------------------------------------------------------
// PHASE 12: DOCUMENTS, MESSAGES & NOTIFICATIONS
// -------------------------------------------------------------

export type DocumentStatus = 'Draft' | 'Under Review' | 'Approved' | 'Rejected' | 'Archived';
export type DocumentCategory = 'Design' | 'Contract' | 'Quotation' | 'BOQ' | 'Invoice' | 'Payment' | 'Material' | 'Site' | 'Client Approval' | 'Project' | 'Other';

export interface DocumentVersion {
  id: string;
  version: string;
  uploadedBy: string;
  date: string;
  status: 'Current' | 'Previous';
}

export interface DocumentActivity {
  id: string;
  type: 'Uploaded' | 'Reviewed' | 'Approved' | 'Comment added' | 'New version uploaded' | 'Archived';
  user: string;
  date: string;
  comment?: string;
}

export interface Document {
  id: string;
  clientId?: string;
  name: string;
  projectId?: string;
  category: DocumentCategory;
  visibility?: 'internal' | 'client';
  version: string;
  uploadedBy: string;
  date: string;
  status: DocumentStatus;
  size: string;
  versions: DocumentVersion[];
  activity: DocumentActivity[];
}

export const initialDocuments: Document[] = [
  {
    id: 'DOC-001',
    visibility: 'client',
    name: 'Sharma Residence — Kitchen Layout V3.pdf',
    projectId: 'PRJ-001',
    category: 'Design',
    version: 'V3',
    uploadedBy: 'EMP-002', // Ananya Rao
    date: 'Today, 10:42 AM',
    status: 'Under Review',
    size: '2.4 MB',
    versions: [
      { id: 'V3', version: 'V3', uploadedBy: 'EMP-002', date: 'Today', status: 'Current' },
      { id: 'V2', version: 'V2', uploadedBy: 'EMP-002', date: 'Sep 28, 2026', status: 'Previous' },
      { id: 'V1', version: 'V1', uploadedBy: 'EMP-001', date: 'Sep 25, 2026', status: 'Previous' }
    ],
    activity: [
      { id: 'ACT-1', type: 'New version uploaded', user: 'EMP-002', date: 'Today, 10:42 AM' },
      { id: 'ACT-2', type: 'Reviewed', user: 'EMP-001', date: 'Sep 29, 2026', comment: 'Please revise the island dimension.' },
      { id: 'ACT-3', type: 'Uploaded', user: 'EMP-001', date: 'Sep 25, 2026' }
    ]
  },
  {
    id: 'DOC-002',
    visibility: 'client',
    name: 'Sharma Residence — BOQ Final.xlsx',
    projectId: 'PRJ-001',
    category: 'BOQ',
    version: 'V1',
    uploadedBy: 'EMP-001',
    date: 'Sep 28, 2026',
    status: 'Approved',
    size: '1.1 MB',
    versions: [
      { id: 'V1', version: 'V1', uploadedBy: 'EMP-001', date: 'Sep 28, 2026', status: 'Current' }
    ],
    activity: [
      { id: 'ACT-1', type: 'Approved', user: 'Client', date: 'Sep 29, 2026' },
      { id: 'ACT-2', type: 'Uploaded', user: 'EMP-001', date: 'Sep 28, 2026' }
    ]
  },
  {
    id: 'DOC-003',
    visibility: 'client',
    name: 'Mehta Villa — Quotation.pdf',
    projectId: 'PRJ-002',
    category: 'Quotation',
    version: 'V2',
    uploadedBy: 'EMP-006', // Meera Nair
    date: 'Oct 01, 2026',
    status: 'Approved',
    size: '840 KB',
    versions: [
      { id: 'V2', version: 'V2', uploadedBy: 'EMP-006', date: 'Oct 01, 2026', status: 'Current' }
    ],
    activity: [
      { id: 'ACT-1', type: 'Uploaded', user: 'EMP-006', date: 'Oct 01, 2026' }
    ]
  }
];

export interface ConversationParticipant {
  userId: string;
  name: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  text: string;
  timestamp: string;
  taskId?: string;
  documentId?: string;
}

export interface Conversation {
  id: string;
  clientId?: string;
  name: string;
  type: 'Project' | 'Team' | 'Direct' | 'Client';
  projectId?: string;
  participants: ConversationParticipant[];
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
}

export const initialConversations: Conversation[] = [
  {
    id: 'CONV-001',
    name: 'Sharma Residence',
    type: 'Project',
    projectId: 'PRJ-001',
    participants: [
      { userId: 'EMP-001', name: 'Aarav Mehta' },
      { userId: 'EMP-002', name: 'Ananya Rao' },
      { userId: 'EMP-004', name: 'Rahul Sharma' }
    ],
    lastMessage: 'Material delivery has been received.',
    lastMessageTime: '10:42 AM',
    unreadCount: 2
  },
  {
    id: 'CONV-002',
    type: 'Client',
    name: 'Mehta Villa',
    projectId: 'PRJ-002',
    participants: [
      { userId: 'EMP-001', name: 'Aarav Mehta' },
      { userId: 'EMP-003', name: 'Riya Verma' }
    ],
    lastMessage: 'Client approved the kitchen layout.',
    lastMessageTime: 'Yesterday',
    unreadCount: 0
  },
  {
    id: 'CONV-003',
    name: 'Finance & Accounts',
    type: 'Team',
    participants: [
      { userId: 'EMP-001', name: 'Aarav Mehta' },
      { userId: 'EMP-005', name: 'Priya Kapoor' }
    ],
    lastMessage: 'Payment received for Mehta Villa.',
    lastMessageTime: 'Yesterday',
    unreadCount: 0
  }
];

export const initialMessages: Message[] = [
  {
    id: 'MSG-001',
    conversationId: 'CONV-001',
    senderId: 'EMP-002',
    text: "I've uploaded the revised Kitchen Layout V3.",
    timestamp: '10:30 AM',
    documentId: 'DOC-001'
  },
  {
    id: 'MSG-002',
    conversationId: 'CONV-001',
    senderId: 'EMP-001',
    text: "Great, I will review it today.",
    timestamp: '10:35 AM'
  },
  {
    id: 'MSG-003',
    conversationId: 'CONV-001',
    senderId: 'EMP-004',
    text: "Material delivery has been received.",
    timestamp: '10:42 AM'
  }
];

export type NotificationType = 'task' | 'approval' | 'message' | 'payment' | 'material' | 'site' | 'lead' | 'document';

export interface AppNotification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  priority: 'High' | 'Normal';
  recipientId: string;
  projectId?: string;
  taskId?: string;
  documentId?: string;
  conversationId?: string;
}

export const initialNotifications: AppNotification[] = [
  {
    id: 'NOT-001',
    type: 'approval',
    title: 'Client approval requested',
    message: 'Sharma Residence: Kitchen Layout V3 is awaiting your review.',
    timestamp: '5 min ago',
    read: false,
    priority: 'High',
    recipientId: 'EMP-001',
    projectId: 'PRJ-001',
    documentId: 'DOC-001'
  },
  {
    id: 'NOT-002',
    type: 'task',
    title: 'Task overdue',
    message: 'Kitchen Material Approval for Sharma Residence is overdue.',
    timestamp: '20 min ago',
    read: false,
    priority: 'High',
    recipientId: 'EMP-001',
    projectId: 'PRJ-001',
    taskId: 'TSK-002'
  },
  {
    id: 'NOT-003',
    type: 'payment',
    title: 'Payment received',
    message: 'Payment of ₹2,50,000 received for Mehta Villa.',
    timestamp: '1 hr ago',
    read: true,
    priority: 'Normal',
    recipientId: 'EMP-001',
    projectId: 'PRJ-002'
  },
  {
    id: 'NOT-004',
    type: 'document',
    title: 'New document uploaded',
    message: 'Ananya Rao uploaded Kitchen Layout V3.pdf',
    timestamp: '2 hrs ago',
    read: true,
    priority: 'Normal',
    recipientId: 'EMP-001',
    projectId: 'PRJ-001',
    documentId: 'DOC-001'
  }
];

// -------------------------------------------------------------
// PHASE 13: CLIENT MANAGEMENT + PORTAL
// -------------------------------------------------------------

export interface Client {
  id: string;
  clientId?: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  avatarInitials: string;
  role: 'Client';
  status: 'Active' | 'Onboarding' | 'Completed' | 'Inactive';
  createdAt: string;
}

export const initialClients: Client[] = [
  {
    id: 'CLI-001',
    name: 'Rahul Sharma',
    email: 'rahul.sharma@example.com',
    phone: '+91 98765 43210',
    avatarInitials: 'RS',
    role: 'Client',
    status: 'Active',
    createdAt: '2026-08-15'
  },
  {
    id: 'CLI-002',
    name: 'Neha Mehta',
    email: 'neha.m@example.com',
    phone: '+91 98765 43211',
    avatarInitials: 'NM',
    role: 'Client',
    status: 'Active',
    createdAt: '2026-09-01'
  },
  {
    id: 'CLI-003',
    name: 'Arjun Rao',
    email: 'arjun.rao@example.com',
    phone: '+91 98765 43212',
    avatarInitials: 'AR',
    role: 'Client',
    status: 'Active',
    createdAt: '2026-07-10'
  },
  {
    id: 'CLI-004',
    name: 'Priya Kapoor',
    email: 'priya.k@example.com',
    phone: '+91 98765 43213',
    avatarInitials: 'PK',
    role: 'Client',
    status: 'Completed',
    createdAt: '2026-01-20'
  }
];

// Extend Document and Conversation
// Note: TypeScript might complain if we redefine interfaces, so we will just assume they exist and add properties in the instances or just use them dynamically.


export type CalendarEventType = 'Site Visit' | 'Client Meeting' | 'Design Review' | 'Project Deadline' | 'Task Deadline' | 'Follow-up' | 'Material Delivery' | 'Payment Due' | 'Internal Meeting' | 'Other';
export type CalendarEventStatus = 'Scheduled' | 'Completed' | 'Cancelled' | 'Rescheduled';

export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  type: CalendarEventType;
  startAt: string;
  endAt: string;
  allDay?: boolean;
  status: CalendarEventStatus;
  priority?: 'Low' | 'Medium' | 'High';
  projectId?: string;
  leadId?: string;
  clientId?: string;
  taskId?: string;
  employeeIds: string[];
  location?: string;
  createdBy: string;
  createdAt: string;
}

export const initialCalendarEvents: CalendarEvent[] = [
  {
    id: 'CE-001',
    title: 'Site Visit',
    type: 'Site Visit',
    startAt: '2026-10-02T10:00:00Z',
    endAt: '2026-10-02T11:30:00Z',
    status: 'Scheduled',
    priority: 'High',
    projectId: 'PRJ-001',
    clientId: 'CLI-001',
    employeeIds: ['EMP-001', 'EMP-004'],
    location: 'Sharma Residence, Bangalore',
    createdBy: 'EMP-001',
    createdAt: '2026-09-28T10:00:00Z'
  },
  {
    id: 'CE-002',
    title: 'Kitchen Design Review',
    type: 'Design Review',
    startAt: '2026-10-03T15:00:00Z',
    endAt: '2026-10-03T16:00:00Z',
    status: 'Scheduled',
    priority: 'Medium',
    projectId: 'PRJ-002',
    clientId: 'CLI-002',
    employeeIds: ['EMP-001', 'EMP-002'],
    location: 'Decormart Studio HQ',
    createdBy: 'EMP-002',
    createdAt: '2026-09-29T11:00:00Z'
  },
  {
    id: 'CE-003',
    title: 'Material Delivery - Italian Marble',
    type: 'Material Delivery',
    startAt: '2026-10-04T11:00:00Z',
    endAt: '2026-10-04T13:00:00Z',
    status: 'Scheduled',
    priority: 'High',
    projectId: 'PRJ-003',
    employeeIds: ['EMP-004'],
    location: 'Rao Residence, Hyderabad',
    createdBy: 'EMP-004',
    createdAt: '2026-09-30T09:00:00Z'
  },
  {
    id: 'CE-004',
    title: 'Initial Consultation',
    type: 'Follow-up',
    startAt: '2026-10-05T14:00:00Z',
    endAt: '2026-10-05T15:00:00Z',
    status: 'Scheduled',
    priority: 'Medium',
    leadId: 'L-1001',
    employeeIds: ['EMP-006'],
    location: 'Google Meet',
    createdBy: 'EMP-006',
    createdAt: '2026-09-30T10:00:00Z'
  },
  {
    id: 'CE-005',
    title: 'Invoice Payment Due',
    type: 'Payment Due',
    startAt: '2026-10-08T00:00:00Z',
    endAt: '2026-10-08T23:59:59Z',
    allDay: true,
    status: 'Scheduled',
    priority: 'High',
    projectId: 'PRJ-001',
    clientId: 'CLI-001',
    employeeIds: ['EMP-005'],
    createdBy: 'EMP-005',
    createdAt: '2026-09-20T10:00:00Z'
  }
];


export type AuditAction = 'created' | 'updated' | 'deleted' | 'approved' | 'rejected' | 'assigned' | 'completed' | 'uploaded' | 'received' | 'paid' | 'sent' | 'archived';

export interface AuditActivity {
  id: string;
  actorId: string;
  actorName: string;
  actorRole: string;
  action: AuditAction;
  entityType: 'project' | 'lead' | 'design' | 'site' | 'material' | 'finance' | 'team' | 'document' | 'calendar' | 'settings' | 'client' | 'task';
  entityId: string;
  entityName: string;
  description: string;
  projectId?: string;
  timestamp: string;
  metadata?: Record<string, string>;
}

export const initialAuditActivity: AuditActivity[] = [
  {
    id: 'AUD-001',
    actorId: 'EMP-001',
    actorName: 'Aarav Mehta',
    actorRole: 'Admin / Owner',
    action: 'updated',
    entityType: 'project',
    entityId: 'PRJ-001',
    entityName: 'Sharma Residence',
    description: 'Changed project stage from Design to Client Approval',
    projectId: 'PRJ-001',
    timestamp: '2026-09-30T10:42:00Z'
  },
  {
    id: 'AUD-002',
    actorId: 'EMP-002',
    actorName: 'Ananya Rao',
    actorRole: 'Designer',
    action: 'uploaded',
    entityType: 'document',
    entityId: 'DOC-001',
    entityName: 'Design Revision 03',
    description: 'Uploaded Design Revision 03 for Sharma Residence',
    projectId: 'PRJ-001',
    timestamp: '2026-09-30T10:18:00Z'
  },
  {
    id: 'AUD-003',
    actorId: 'EMP-003',
    actorName: 'Rohan Gupta',
    actorRole: 'Project Manager',
    action: 'assigned',
    entityType: 'task',
    entityId: 'TSK-001',
    entityName: 'Finalize Kitchen Layout',
    description: 'Assigned Ananya Rao to Finalize Kitchen Layout',
    projectId: 'PRJ-001',
    timestamp: '2026-09-29T14:30:00Z'
  },
  {
    id: 'AUD-004',
    actorId: 'EMP-004',
    actorName: 'Rahul Sharma',
    actorRole: 'Site Manager',
    action: 'received',
    entityType: 'material',
    entityId: 'MAT-001',
    entityName: 'Italian Marble Batch 1',
    description: 'Marked material delivery as received at site',
    projectId: 'PRJ-001',
    timestamp: '2026-09-29T11:20:00Z'
  },
  {
    id: 'AUD-005',
    actorId: 'EMP-005',
    actorName: 'Priya Kapoor',
    actorRole: 'Accounts',
    action: 'paid',
    entityType: 'finance',
    entityId: 'INV-1048',
    entityName: 'Invoice INV-1048',
    description: 'Recorded payment of ₹4,50,000 for Sharma Residence',
    projectId: 'PRJ-001',
    timestamp: '2026-09-28T09:15:00Z'
  }
];
