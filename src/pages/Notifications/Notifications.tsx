import { useState } from 'react';
import { Link } from '@/components/ui/Link';
import { Card, CardContent } from '@/components/ui/Card';

import { Button } from '@/components/ui/Button';
import { 
  Bell, CheckSquare, MessageSquare, CreditCard, Package, HardHat, FileText, CheckCircle2, AlertTriangle
} from 'lucide-react';
import { initialNotifications, type AppNotification } from '@/lib/mock-data';
import { useAuth } from '@/contexts/AuthContext';

export function Notifications() {
  const { user } = useAuth();
  const [filter, setFilter] = useState<'All' | 'Unread'>('All');
  const [notifications, setNotifications] = useState(
    initialNotifications.filter(n => n.recipientId === user?.id)
  );

  const filteredNotifications = notifications.filter(n => filter === 'All' || !n.read);

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const getIcon = (type: AppNotification['type']) => {
    switch (type) {
      case 'task': return <CheckSquare className="h-5 w-5 text-accent" />;
      case 'message': return <MessageSquare className="h-5 w-5 text-blue-400" />;
      case 'payment': return <CreditCard className="h-5 w-5 text-emerald-400" />;
      case 'material': return <Package className="h-5 w-5 text-amber-400" />;
      case 'site': return <HardHat className="h-5 w-5 text-orange-400" />;
      case 'document': return <FileText className="h-5 w-5 text-purple-400" />;
      case 'approval': return <CheckCircle2 className="h-5 w-5 text-emerald-400" />;
      case 'lead': return <AlertTriangle className="h-5 w-5 text-red-400" />;
      default: return <Bell className="h-5 w-5 text-muted" />;
    }
  };

  const getDestination = (n: AppNotification) => {
    if (n.taskId) return `/team/tasks/${n.taskId}`;
    if (n.documentId) return `/documents/${n.documentId}`;
    if (n.conversationId) return `/messages/${n.conversationId}`;
    if (n.projectId && n.type === 'approval') return `/design-studio/${n.projectId}/approval`;
    if (n.projectId && n.type === 'payment') return `/finance/projects/${n.projectId}`;
    if (n.projectId) return `/projects/${n.projectId}`;
    return '#';
  };

  return (
    <div className="max-w-[800px] mx-auto space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-primary">Notifications</h1>
        </div>
        <div className="flex gap-3">
          <div className="flex bg-surface border border-border rounded-lg p-1">
            <button 
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${filter === 'All' ? 'bg-elevated text-primary' : 'text-secondary hover:text-primary'}`}
              onClick={() => setFilter('All')}
            >
              All
            </button>
            <button 
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${filter === 'Unread' ? 'bg-elevated text-primary' : 'text-secondary hover:text-primary'}`}
              onClick={() => setFilter('Unread')}
            >
              Unread
            </button>
          </div>
          <Button variant="secondary" size="sm" onClick={markAllAsRead}>Mark All as Read</Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="divide-y divide-border">
            {filteredNotifications.map(notification => (
              <div 
                key={notification.id} 
                className={`p-4 sm:p-6 flex gap-4 transition-colors ${!notification.read ? 'bg-accent/5' : 'hover:bg-elevated/30'}`}
              >
                <div className="shrink-0 pt-1">
                  {getIcon(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1 gap-2">
                    <p className={`text-sm ${!notification.read ? 'font-semibold text-primary' : 'font-medium text-secondary'}`}>
                      {notification.title}
                    </p>
                    <span className="text-[10px] text-muted whitespace-nowrap">{notification.timestamp}</span>
                  </div>
                  <p className={`text-sm mb-3 ${!notification.read ? 'text-primary' : 'text-muted'}`}>
                    {notification.message}
                  </p>
                  <div className="flex gap-2">
                    <Link to={getDestination(notification)}>
                      <Button size="sm" className="h-7 text-xs px-3">View</Button>
                    </Link>
                    {!notification.read && (
                      <Button variant="ghost" size="sm" className="h-7 text-xs px-3" onClick={() => markAsRead(notification.id)}>
                        Mark as Read
                      </Button>
                    )}
                  </div>
                </div>
                {!notification.read && (
                  <div className="shrink-0 flex items-center justify-center w-3">
                    <div className="h-2 w-2 rounded-full bg-accent"></div>
                  </div>
                )}
              </div>
            ))}
            {filteredNotifications.length === 0 && (
              <div className="p-12 text-center text-muted">
                <Bell className="h-12 w-12 mx-auto mb-4 opacity-20" />
                <p>No {filter === 'Unread' ? 'unread ' : ''}notifications.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
