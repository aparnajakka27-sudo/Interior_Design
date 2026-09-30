import { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from '@/components/ui/Link';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';

import { 
  ArrowLeft, Paperclip, Send, FolderKanban, Users, FileText
} from 'lucide-react';
import { initialConversations, initialMessages, initialEmployees, initialDocuments } from '@/lib/mock-data';
import { useAuth } from '@/contexts/AuthContext';
import { Can } from '@/components/auth/Can';

export function Conversation() {
  const { id } = useParams();
  const { user } = useAuth();
  
  const [conversation] = useState(initialConversations.find(c => c.id === id));
  const [messages, setMessages] = useState(initialMessages.filter(m => m.conversationId === id));
  const [newMessage, setNewMessage] = useState('');
  
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!conversation) return <div className="p-8 text-center text-secondary">Conversation not found</div>;

  const handleSend = () => {
    if (!newMessage.trim() || !user) return;
    
    const msg = {
      id: `MSG-${Date.now()}`,
      conversationId: conversation.id,
      senderId: user.id,
      text: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages([...messages, msg]);
    setNewMessage('');
  };

  return (
    <div className="max-w-[1000px] mx-auto h-[calc(100vh-8rem)] flex flex-col pb-6">
      <div className="flex items-center gap-3 mb-4 shrink-0">
        <Link to="/messages">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="h-10 w-10 rounded-lg bg-surface border border-border flex items-center justify-center shrink-0">
          {conversation.type === 'Project' ? <FolderKanban className="h-5 w-5 text-accent" /> : <Users className="h-5 w-5 text-muted" />}
        </div>
        <div>
          <h1 className="text-lg font-semibold text-primary leading-tight">{conversation.name}</h1>
          <p className="text-xs text-secondary leading-tight mt-0.5">{conversation.participants.map(p => p.name).join(', ')}</p>
        </div>
      </div>

      <Card className="flex-1 flex flex-col min-h-0">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {messages.map((msg, idx) => {
            const isMe = msg.senderId === user?.id;
            const sender = initialEmployees.find(e => e.id === msg.senderId);
            const doc = msg.documentId ? initialDocuments.find(d => d.id === msg.documentId) : null;
            
            const showHeader = idx === 0 || messages[idx - 1].senderId !== msg.senderId;

            return (
              <div key={msg.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                {showHeader && !isMe && (
                  <div className="flex items-center gap-2 mb-1 ml-1">
                    <span className="text-xs font-medium text-secondary">{sender?.name || 'Unknown'}</span>
                    <span className="text-[10px] text-muted">{msg.timestamp}</span>
                  </div>
                )}
                {showHeader && isMe && (
                  <div className="flex items-center gap-2 mb-1 mr-1">
                    <span className="text-[10px] text-muted">{msg.timestamp}</span>
                  </div>
                )}
                
                <div className={`max-w-[85%] sm:max-w-[70%] rounded-2xl px-4 py-2 ${
                  isMe 
                    ? 'bg-accent text-accent-foreground rounded-tr-sm' 
                    : 'bg-surface border border-border text-primary rounded-tl-sm'
                }`}>
                  <p className="text-sm whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                  
                  {/* Document Attachment */}
                  {doc && (
                    <div className={`mt-3 p-3 rounded-xl border flex items-start gap-3 ${
                      isMe ? 'bg-black/10 dark:bg-black/20 border-black/10 dark:border-white/10' : 'bg-background border-border'
                    }`}>
                      <FileText className={`h-8 w-8 shrink-0 ${isMe ? 'opacity-80' : 'text-muted'}`} />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium truncate">{doc.name}</p>
                        <p className={`text-xs mt-0.5 ${isMe ? 'opacity-70' : 'text-secondary'}`}>
                          {doc.size} · {doc.version}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
          <div ref={endRef} />
        </div>

        {/* Composer */}
        <Can permission="messages.send">
          <div className="p-3 sm:p-4 border-t border-border bg-surface/30">
            <div className="flex items-end gap-2">
              <Button variant="ghost" size="sm" className="h-10 w-10 shrink-0 rounded-full">
                <Paperclip className="h-5 w-5 text-muted" />
              </Button>
              <div className="flex-1 bg-background border border-border rounded-2xl relative min-h-[44px]">
                <Input
                  className="border-0 bg-transparent shadow-none focus-visible:ring-0 px-4 py-3 h-auto"
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                />
              </div>
              <Button size="sm" className="h-10 w-10 shrink-0 rounded-full" onClick={handleSend} disabled={!newMessage.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-[10px] text-muted text-center mt-2">
              Use @ to mention someone, or attach a document.
            </p>
          </div>
        </Can>
      </Card>
    </div>
  );
}
