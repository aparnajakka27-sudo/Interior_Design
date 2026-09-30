import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Search, MessageSquare, Plus, Users, FolderKanban } from 'lucide-react';
import { initialConversations, detailedProjects } from '@/lib/mock-data';
import { usePermissions } from '@/hooks/usePermissions';
import { Button } from '@/components/ui/Button';
import { Can } from '@/components/auth/Can';

export function Messages() {
  const [searchQuery, setSearchQuery] = useState('');
  const { canAccessProject } = usePermissions();

  // Filter conversations: if it's a project convo, check project access. Else assume accessible (for demo).
  const accessibleConversations = initialConversations.filter(c => {
    if (c.type === 'Project' && c.projectId) {
      return canAccessProject(c.projectId);
    }
    return true;
  });

  return (
    <div className="max-w-[1000px] mx-auto space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-primary">Messages</h1>
          <p className="text-secondary mt-1 text-sm">Internal team and project communication.</p>
        </div>
        <div className="flex gap-3">
          <Can permission="messages.send">
            <Button size="sm"><Plus className="h-4 w-4 mr-2" /> New Message</Button>
          </Can>
        </div>
      </div>

      <Card>
        <div className="p-4 border-b border-border bg-surface/50">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
            <Input 
              placeholder="Search conversations..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-background"
            />
          </div>
        </div>
        <CardContent className="p-0">
          <div className="divide-y divide-border">
            {accessibleConversations.map(conv => {
              const project = conv.projectId ? detailedProjects.find(p => p.id === conv.projectId) : null;
              return (
                <Link key={conv.id} to={`/messages/${conv.id}`} className="block hover:bg-elevated/30 transition-colors">
                  <div className="p-4 sm:px-6 flex items-start gap-4">
                    <div className="h-10 w-10 rounded-lg bg-surface border border-border flex items-center justify-center shrink-0">
                      {conv.type === 'Project' ? <FolderKanban className="h-5 w-5 text-accent" /> : <Users className="h-5 w-5 text-muted" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-medium text-primary truncate">{conv.name}</h3>
                          {project && <Badge variant="neutral" className="hidden sm:inline-flex text-[10px]">Project</Badge>}
                        </div>
                        <span className="text-[10px] text-muted whitespace-nowrap ml-2">{conv.lastMessageTime}</span>
                      </div>
                      <p className="text-xs text-secondary truncate mb-1">{conv.participants.map(p => p.name).join(', ')}</p>
                      <p className={`text-sm truncate ${conv.unreadCount > 0 ? 'text-primary font-medium' : 'text-secondary'}`}>
                        {conv.lastMessage}
                      </p>
                    </div>
                    {conv.unreadCount > 0 && (
                      <div className="shrink-0 flex flex-col items-end justify-center">
                        <Badge variant="warning" className="h-5 min-w-5 rounded-full flex items-center justify-center px-1 text-xs bg-accent text-accent-foreground border-accent">
                          {conv.unreadCount}
                        </Badge>
                      </div>
                    )}
                  </div>
                </Link>
              );
            })}
            {accessibleConversations.length === 0 && (
              <div className="p-8 text-center text-muted">
                <MessageSquare className="h-8 w-8 mx-auto mb-3 opacity-50" />
                No conversations found.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
