import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Briefcase, User, Users, CheckSquare, Calendar, FileText, Package, IndianRupee, TrendingUp } from 'lucide-react';
import { performGlobalSearch } from '@/lib/global-search';
import type { GlobalSearchResult, SearchEntityType } from '@/lib/global-search';
import { usePermissions } from '@/hooks/usePermissions';

interface GlobalSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GlobalSearch({ isOpen, onClose }: GlobalSearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<GlobalSearchResult[]>([]);
  const [filter, setFilter] = useState<'All' | SearchEntityType>('All');
  const navigate = useNavigate();
  const { can } = usePermissions();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setQuery('');
      setFilter('All');
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    if (query.length > 1) {
      const allResults = performGlobalSearch(query, can);
      if (filter !== 'All') {
        setResults(allResults.filter(r => r.type === filter));
      } else {
        setResults(allResults);
      }
    } else {
      setResults([]);
    }
  }, [query, filter, can]);

  if (!isOpen) return null;

  const getIcon = (type: SearchEntityType) => {
    switch (type) {
      case 'Project': return <Briefcase className="h-4 w-4" />;
      case 'Client': return <User className="h-4 w-4" />;
      case 'Lead': return <TrendingUp className="h-4 w-4" />;
      case 'Employee': return <Users className="h-4 w-4" />;
      case 'Task': return <CheckSquare className="h-4 w-4" />;
      case 'Material': return <Package className="h-4 w-4" />;
      case 'PO': return <FileText className="h-4 w-4" />;
      case 'Invoice': return <IndianRupee className="h-4 w-4" />;
      case 'Quotation': return <IndianRupee className="h-4 w-4" />;
      case 'Document': return <FileText className="h-4 w-4" />;
      case 'Event': return <Calendar className="h-4 w-4" />;
      default: return <Search className="h-4 w-4" />;
    }
  };

  const handleSelect = (result: GlobalSearchResult) => {
    navigate(result.route);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] px-4 sm:px-0">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-2xl bg-surface border border-border rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input */}
        <div className="flex items-center px-4 py-4 border-b border-border">
          <Search className="h-5 w-5 text-muted shrink-0" />
          <input
            autoFocus
            type="text"
            placeholder="Search projects, clients, leads, employees..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none px-4 text-primary placeholder:text-muted"
          />
          <button onClick={onClose} className="p-1 rounded-md hover:bg-elevated text-secondary hover:text-primary transition-colors shrink-0">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 px-4 py-2 border-b border-border overflow-x-auto scrollbar-hide shrink-0">
          {['All', 'Project', 'Client', 'Lead', 'Employee', 'Task', 'Event'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`px-3 py-1 text-xs font-medium rounded-full whitespace-nowrap transition-colors ${
                filter === f ? 'bg-primary text-background' : 'bg-elevated text-secondary hover:text-primary'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Results Area */}
        <div className="flex-1 overflow-y-auto p-2">
          {query.length <= 1 ? (
            <div className="py-12 text-center">
              <Search className="h-12 w-12 text-muted/50 mx-auto mb-4" />
              <p className="text-primary font-medium">Search anything across Decormart Studio</p>
              <p className="text-secondary text-sm mt-1">Start typing to find projects, clients, and more.</p>
            </div>
          ) : results.length > 0 ? (
            <div className="space-y-1">
              {results.map(result => (
                <button
                  key={result.id}
                  onClick={() => handleSelect(result)}
                  className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-elevated transition-colors text-left group"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-md bg-background border border-border flex items-center justify-center text-muted group-hover:text-accent transition-colors shrink-0">
                      {getIcon(result.type)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-primary">{result.title}</p>
                      {result.subtitle && <p className="text-xs text-secondary mt-0.5">{result.subtitle}</p>}
                    </div>
                  </div>
                  <span className="text-xs font-medium text-muted uppercase tracking-wider">{result.metadata}</span>
                </button>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center">
              <p className="text-primary font-medium mb-1">No results found</p>
              <p className="text-secondary text-sm">Try searching for a project, client, employee, or task.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
