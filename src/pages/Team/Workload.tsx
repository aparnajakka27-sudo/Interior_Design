import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/Input';
import { Search, Filter, AlertCircle } from 'lucide-react';
import { initialEmployees, initialTasks } from '@/lib/mock-data';

export function Workload() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEmployees = initialEmployees.filter(emp => 
    emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getWorkloadBars = (taskCount: number) => {
    const totalBars = 10;
    const filledBars = Math.min(taskCount, totalBars);
    
    let colorClass = 'bg-amber-400';
    if (filledBars > 5) colorClass = 'bg-red-400';
    else if (filledBars > 2) colorClass = 'bg-emerald-400';

    return (
      <div className="flex gap-1">
        {Array.from({ length: totalBars }).map((_, i) => (
          <div key={i} className={`h-4 w-2 sm:w-3 rounded-sm ${i < filledBars ? colorClass : 'bg-surface border border-border'}`}></div>
        ))}
      </div>
    );
  };

  const getWorkloadLabel = (taskCount: number) => {
    if (taskCount > 5) return <span className="text-xs font-medium text-red-400 bg-red-400/10 px-2 py-1 rounded">Overloaded</span>;
    if (taskCount > 2) return <span className="text-xs font-medium text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded">Balanced</span>;
    return <span className="text-xs font-medium text-amber-400 bg-amber-400/10 px-2 py-1 rounded">Low</span>;
  };

  return (
    <div className="max-w-[1200px] mx-auto space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-semibold text-primary">Team Workload</h1>
        <p className="text-secondary mt-1 text-sm">Monitor task distribution and capacity across the team.</p>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-surface border border-border rounded-xl p-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
          <Input 
            placeholder="Search employee or role..." 
            className="pl-9 w-full"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex w-full md:w-auto items-center gap-3 overflow-x-auto custom-scrollbar pb-1 md:pb-0">
          <select className="h-9 rounded-md border border-border bg-background px-3 py-1 text-sm text-primary appearance-none focus:outline-none focus:ring-1 focus:ring-accent min-w-[120px]">
            <option>All Workloads</option>
            <option>Overloaded</option>
            <option>Balanced</option>
            <option>Low</option>
          </select>
          <div className="flex items-center gap-2 border border-border rounded-md px-3 h-9">
            <Filter className="h-4 w-4 text-muted" />
            <span className="text-sm text-secondary">Sort by: Heaviest</span>
          </div>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-xl overflow-hidden hidden md:block">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-muted uppercase bg-elevated/50 border-b border-border">
            <tr>
              <th className="px-6 py-4 font-medium">Employee</th>
              <th className="px-6 py-4 font-medium text-center">Active Projects</th>
              <th className="px-6 py-4 font-medium text-center">Active Tasks</th>
              <th className="px-6 py-4 font-medium text-center">Overdue</th>
              <th className="px-6 py-4 font-medium">Workload Level</th>
              <th className="px-6 py-4 font-medium">Capacity Visualization</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredEmployees.map((emp) => {
              const empTasks = initialTasks.filter(t => t.assigneeId === emp.id && t.status !== 'Completed');
              const overdueTasks = empTasks.filter(t => t.dueDate.includes('12 Sep'));
              return (
                <tr key={emp.id} className="hover:bg-elevated/50 transition-colors">
                  <td className="px-6 py-4">
                    <Link to={`/team/${emp.id}`} className="flex items-center gap-3 group">
                      <div className="h-8 w-8 rounded-full bg-accent/20 flex items-center justify-center text-accent font-medium group-hover:bg-accent group-hover:text-background transition-colors">
                        {emp.avatarInitials}
                      </div>
                      <div>
                        <p className="font-medium text-primary group-hover:text-accent transition-colors">{emp.name}</p>
                        <p className="text-[10px] text-muted">{emp.role}</p>
                      </div>
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-center font-medium text-secondary">{emp.assignedProjects.length}</td>
                  <td className="px-6 py-4 text-center font-medium text-primary">{empTasks.length}</td>
                  <td className="px-6 py-4 text-center">
                    {overdueTasks.length > 0 ? (
                      <span className="flex items-center justify-center gap-1 text-red-400 font-medium"><AlertCircle className="h-3 w-3"/> {overdueTasks.length}</span>
                    ) : (
                      <span className="text-secondary">0</span>
                    )}
                  </td>
                  <td className="px-6 py-4">{getWorkloadLabel(empTasks.length)}</td>
                  <td className="px-6 py-4">{getWorkloadBars(empTasks.length)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 gap-4 md:hidden">
        {filteredEmployees.map(emp => {
          const empTasks = initialTasks.filter(t => t.assigneeId === emp.id && t.status !== 'Completed');
          const overdueTasks = empTasks.filter(t => t.dueDate.includes('12 Sep'));
          return (
            <div key={emp.id} className="bg-surface border border-border rounded-xl p-5 space-y-4">
              <div className="flex justify-between items-start">
                <Link to={`/team/${emp.id}`} className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-accent/20 flex items-center justify-center text-accent font-medium">
                    {emp.avatarInitials}
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary">{emp.name}</h3>
                    <p className="text-xs text-secondary mt-0.5">{emp.role}</p>
                  </div>
                </Link>
                {getWorkloadLabel(empTasks.length)}
              </div>
              
              <div className="pt-2">
                {getWorkloadBars(empTasks.length)}
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-sm border-t border-border pt-4">
                <div>
                  <p className="text-primary font-medium">{emp.assignedProjects.length}</p>
                  <p className="text-[10px] text-muted">Projects</p>
                </div>
                <div>
                  <p className="text-primary font-medium">{empTasks.length}</p>
                  <p className="text-[10px] text-muted">Tasks</p>
                </div>
                <div>
                  <p className={overdueTasks.length > 0 ? "text-red-400 font-medium" : "text-secondary font-medium"}>{overdueTasks.length}</p>
                  <p className="text-[10px] text-muted">Overdue</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
