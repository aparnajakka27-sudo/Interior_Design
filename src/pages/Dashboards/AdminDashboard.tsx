import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { 
  Plus, UserPlus, FolderPlus, CheckSquare, HardHat, Receipt, 
  ArrowRight, AlertCircle, Clock, CheckCircle2, AlertTriangle 
, Bell} from 'lucide-react';
import { UpcomingEvents } from '@/components/calendar/UpcomingEvents';
import { Link } from '@/components/ui/Link';
import {  
  dashboardKPIs, overviewProjects, projectStages, todayActivity, 
  needsAttentionItems, projectHealthData, type ProjectHealth 
, initialEmployees, initialTasks } from '@/lib/mock-data';

export function AdminDashboard() {
  const { user } = useAuth();
  
  const getHealthBadge = (health: ProjectHealth) => {
    switch(health) {
      case 'Healthy': return <Badge variant="success">Healthy</Badge>;
      case 'Attention': return <Badge variant="warning">Attention</Badge>;
      case 'At Risk': return <Badge variant="danger">At Risk</Badge>;
      default: return <Badge variant="neutral">{health}</Badge>;
    }
  };

  return (
    <div className="max-w-[1600px] mx-auto space-y-8 pb-12">
      {/* 1. PAGE HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-primary">Good morning, {user?.name?.split(' ')[0] || 'User'}</h1>
          <p className="text-secondary mt-1 text-sm">Here's what's happening across Decormart Studio today.</p>
        </div>
        <Link to="/projects">
          <Button className="whitespace-nowrap">
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Button>
        </Link>
      </div>
      
      {/* 2. KPI GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {dashboardKPIs.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <Card key={index} className="flex flex-col justify-between p-5">
              <div className="flex justify-between items-start mb-4">
                <span className="text-sm font-medium text-secondary">{kpi.title}</span>
                <Icon className="h-4 w-4 text-muted" />
              </div>
              <div>
                <p className="text-3xl font-semibold text-primary">{kpi.value}</p>
                <p className="text-xs text-muted mt-1">{kpi.supporting}</p>
              </div>
            </Card>
          );
        })}
      </div>

      {/* 3. PROJECT OVERVIEW & STAGES */}
      <Card className="overflow-hidden">
        <div className="p-6 border-b border-border flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold text-primary">Project Overview</h2>
            <p className="text-sm text-secondary">Track current projects across the delivery lifecycle.</p>
          </div>
          <Link to="/projects">
            <Button variant="ghost" className="text-sm hidden sm:flex">
              View All Projects <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
        
        {/* Project Stage Distribution */}
        <div className="px-6 py-4 bg-elevated border-b border-border">
          <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar pb-2 sm:pb-0">
            {projectStages.map((stage, idx) => (
              <React.Fragment key={stage.stage}>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-sm text-secondary">{stage.stage}</span>
                  <span className="text-xs font-medium bg-surface border border-border px-1.5 py-0.5 rounded text-primary">
                    {stage.count}
                  </span>
                </div>
                {idx < projectStages.length - 1 && (
                  <div className="w-4 h-px bg-border shrink-0" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Project Table (Desktop) / Cards (Mobile) */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left hidden md:table">
            <thead className="text-xs text-muted uppercase bg-surface/50 border-b border-border">
              <tr>
                <th className="px-6 py-4 font-medium">Project</th>
                <th className="px-6 py-4 font-medium">Client</th>
                <th className="px-6 py-4 font-medium">Location</th>
                <th className="px-6 py-4 font-medium">Stage</th>
                <th className="px-6 py-4 font-medium">Progress</th>
                <th className="px-6 py-4 font-medium">Health</th>
                <th className="px-6 py-4 font-medium">Deadline</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {overviewProjects.map((project) => (
                <tr key={project.id} className="hover:bg-elevated/50 transition-colors cursor-pointer">
                  <td className="px-6 py-4 font-medium text-primary">{project.name}</td>
                  <td className="px-6 py-4 text-secondary">{project.client}</td>
                  <td className="px-6 py-4 text-secondary">{project.location}</td>
                  <td className="px-6 py-4 text-secondary">{project.stage}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-surface border border-border rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-accent rounded-full" 
                          style={{ width: `${project.progress}%` }} 
                        />
                      </div>
                      <span className="text-xs text-muted">{project.progress}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">{getHealthBadge(project.health)}</td>
                  <td className="px-6 py-4 text-secondary">{project.deadline}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Mobile view */}
          <div className="md:hidden divide-y divide-border">
            {overviewProjects.map((project) => (
              <Link to="/projects" key={project.id} className="block p-4 hover:bg-elevated transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-medium text-primary">{project.name}</span>
                  {getHealthBadge(project.health)}
                </div>
                <div className="text-sm text-secondary mb-3">{project.stage} • {project.deadline}</div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-surface border border-border rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-accent rounded-full" 
                      style={{ width: `${project.progress}%` }} 
                    />
                  </div>
                  <span className="text-xs text-muted">{project.progress}%</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Card>

      {/* 4. MAIN DASHBOARD CONTENT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT COLUMN */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Today's Activity */}
          <Card>
            <CardHeader className="border-b border-border pb-4">
              <CardTitle>Today's Activity</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
          <UpcomingEvents />
                {todayActivity.map((activity, index) => (
                  <div key={activity.id} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-2 h-2 rounded-full bg-accent mt-2"></div>
                      {index !== todayActivity.length - 1 && (
                        <div className="w-px h-full bg-border mt-2"></div>
                      )}
                    </div>
                    <div className="pb-1">
                      <span className="text-xs font-medium text-muted block mb-1">{activity.time}</span>
                      <p className="text-sm font-medium text-primary">{activity.title}</p>
                      <p className="text-sm text-secondary">{activity.project}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          
          {/* Team Overview */}
          <Card>
            <CardHeader className="border-b border-border pb-4 flex flex-row justify-between items-center">
              <CardTitle>Team Overview</CardTitle>
              <Link to="/team"><Button variant="ghost" size="sm">Manage Team</Button></Link>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-surface border border-border p-3 rounded-lg text-center">
                  <p className="text-xl font-bold text-primary">{initialEmployees.length}</p>
                  <p className="text-[10px] text-muted">Total Employees</p>
                </div>
                <div className="bg-surface border border-border p-3 rounded-lg text-center">
                  <p className="text-xl font-bold text-accent">{initialEmployees.filter(e => e.assignedProjects.length > 0).length}</p>
                  <p className="text-[10px] text-muted">On Projects</p>
                </div>
                <div className="bg-surface border border-border p-3 rounded-lg text-center">
                  <p className="text-xl font-bold text-amber-400">{initialTasks.filter(t => t.dueDate.includes('Sep')).length}</p>
                  <p className="text-[10px] text-muted">Tasks Due</p>
                </div>
                <div className="bg-surface border border-border p-3 rounded-lg text-center">
                  <p className="text-xl font-bold text-red-400">{initialTasks.filter(t => t.status !== 'Completed' && t.dueDate === '12 Sep 2026').length}</p>
                  <p className="text-[10px] text-muted">Overdue</p>
                </div>
              </div>
              
              <h4 className="text-xs font-semibold text-muted uppercase tracking-wider mb-4">Requires Attention</h4>
              <div className="space-y-3">
                {initialEmployees.filter(e => {
                  const overdue = initialTasks.filter(t => t.assigneeId === e.id && t.status !== 'Completed' && t.dueDate === '12 Sep 2026').length;
                  const active = initialTasks.filter(t => t.assigneeId === e.id && t.status !== 'Completed').length;
                  return overdue > 0 || active > 3;
                }).slice(0, 3).map(emp => {
                  const overdue = initialTasks.filter(t => t.assigneeId === emp.id && t.status !== 'Completed' && t.dueDate === '12 Sep 2026').length;
                  const active = initialTasks.filter(t => t.assigneeId === emp.id && t.status !== 'Completed').length;
                  
                  return (
                    <div key={emp.id} className="flex items-center justify-between gap-4 p-3 border border-border rounded-lg hover:border-accent/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-accent/20 flex items-center justify-center text-accent text-xs font-medium">
                          {emp.avatarInitials}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-primary">{emp.name}</p>
                          <p className="text-xs text-muted">{emp.role}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        {overdue > 0 ? (
                          <p className="text-xs font-medium text-red-400">{overdue} overdue tasks</p>
                        ) : (
                          <p className="text-xs font-medium text-amber-400">{active} active tasks</p>
                        )}
                        <Link to={`/team/${emp.id}`} className="text-[10px] text-secondary hover:text-primary">View details</Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-6">
          
          {/* Needs Attention */}
          <Card className="border-red-900/30">
            <CardHeader className="border-b border-border pb-4">
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-red-400" /> 
                Needs Attention
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 p-0">
              <div className="divide-y divide-border">
                {needsAttentionItems.map((item) => (
                  <div key={item.id} className="p-5 hover:bg-elevated/50 transition-colors">
                    <div className="flex justify-between items-start mb-1">
                      <p className="text-sm font-medium text-primary">{item.title}</p>
                      <Link to="/projects">
                        <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">Review</Button>
                      </Link>
                    </div>
                    <p className="text-sm text-secondary mb-1">{item.project}</p>
                    <p className={
                      item.severity === 'danger' ? "text-xs font-medium text-red-400" :
                      item.severity === 'warning' ? "text-xs font-medium text-amber-400" :
                      "text-xs font-medium text-accent"
                    }>
                      {item.detail}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Project Health */}
          <Card>
            <CardHeader className="border-b border-border pb-4">
              <CardTitle>Project Health</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    <span className="text-sm text-secondary">Healthy</span>
                  </div>
                  <span className="text-sm font-medium text-primary">{projectHealthData.healthy}</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-amber-500" />
                    <span className="text-sm text-secondary">Attention</span>
                  </div>
                  <span className="text-sm font-medium text-primary">{projectHealthData.attention}</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                    <span className="text-sm text-secondary">At Risk</span>
                  </div>
                  <span className="text-sm font-medium text-primary">{projectHealthData.atRisk}</span>
                </div>
                <div className="h-2 w-full flex rounded-full overflow-hidden mt-4">
                  <div className="h-full bg-emerald-500/80" style={{flex: projectHealthData.healthy}}></div>
                  <div className="h-full bg-amber-500/80" style={{flex: projectHealthData.attention}}></div>
                  <div className="h-full bg-red-500/80" style={{flex: projectHealthData.atRisk}}></div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader className="border-b border-border pb-4">
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 gap-3">
                <Link to="/leads">
                  <Button variant="secondary" className="w-full justify-start font-normal text-xs h-10">
                    <UserPlus className="mr-2 h-4 w-4 text-muted" /> New Lead
                  </Button>
                </Link>
                <Link to="/projects">
                  <Button variant="secondary" className="w-full justify-start font-normal text-xs h-10">
                    <FolderPlus className="mr-2 h-4 w-4 text-muted" /> New Project
                  </Button>
                </Link>
                <Link to="/tasks">
                  <Button variant="secondary" className="w-full justify-start font-normal text-xs h-10">
                    <CheckSquare className="mr-2 h-4 w-4 text-muted" /> Create Task
                  </Button>
                </Link>
                <Link to="/site-management">
                  <Button variant="secondary" className="w-full justify-start font-normal text-xs h-10">
                    <HardHat className="mr-2 h-4 w-4 text-muted" /> Site Update
                  </Button>
                </Link>
                <Link to="/finance" className="col-span-2">
                  <Button variant="secondary" className="w-full justify-center font-normal text-xs h-10">
                    <Receipt className="mr-2 h-4 w-4 text-muted" /> Create Invoice
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>

      {/* Recent Activity / Notifications */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2"><Bell className="h-5 w-5 text-muted"/> Recent Notifications</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-surface border border-border rounded-xl">
            <div className="flex justify-between items-start mb-2">
              <Badge variant="warning" className="text-[10px]">High Priority</Badge>
              <span className="text-[10px] text-muted">5 min ago</span>
            </div>
            <p className="text-sm font-medium text-primary mb-1">Client approval requested</p>
            <p className="text-xs text-secondary mb-3">Sharma Residence: Kitchen Layout V3 is awaiting your review.</p>
            <Link to="/notifications"><Button variant="ghost" size="sm" className="h-6 px-2 text-xs w-full">View Details</Button></Link>
          </div>
          <div className="p-4 bg-surface border border-border rounded-xl">
            <div className="flex justify-between items-start mb-2">
              <Badge variant="neutral" className="text-[10px]">Message</Badge>
              <span className="text-[10px] text-muted">20 min ago</span>
            </div>
            <p className="text-sm font-medium text-primary mb-1">New message in Sharma Residence</p>
            <p className="text-xs text-secondary mb-3">Rahul Sharma: "Material delivery has been received."</p>
            <Link to="/messages/CONV-001"><Button variant="ghost" size="sm" className="h-6 px-2 text-xs w-full">Open Conversation</Button></Link>
          </div>
          <div className="p-4 bg-surface border border-border rounded-xl">
            <div className="flex justify-between items-start mb-2">
              <Badge variant="neutral" className="text-[10px]">Document</Badge>
              <span className="text-[10px] text-muted">2 hrs ago</span>
            </div>
            <p className="text-sm font-medium text-primary mb-1">New document uploaded</p>
            <p className="text-xs text-secondary mb-3">Ananya Rao uploaded Kitchen Layout V3.pdf for Sharma Residence.</p>
            <Link to="/documents/DOC-001"><Button variant="ghost" size="sm" className="h-6 px-2 text-xs w-full">View Document</Button></Link>
          </div>
        </div>
      </div>
    </div>
  );
}
