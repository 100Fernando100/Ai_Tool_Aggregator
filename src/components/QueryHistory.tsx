import { Query } from '../services/databaseService';
import { Clock, Search } from 'lucide-react';

interface QueryHistoryProps {
  queries: Query[];
  onSelectQuery: (query: Query) => void;
}

export function QueryHistory({ queries, onSelectQuery }: QueryHistoryProps) {
  if (queries.length === 0) {
    return null;
  }

  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Clock className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          <h3 className="font-semibold text-lg">Recent Searches</h3>
        </div>
        <div className="space-y-2">
          {queries.slice(0, 5).map((query) => (
            <button
              key={query.id}
              onClick={() => onSelectQuery(query)}
              className="w-full text-left p-3 rounded-lg bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
            >
              <div className="flex items-start space-x-3">
                <Search className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate group-hover:text-primary-600 dark:group-hover:text-primary-400">
                    {query.query_text}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(query.created_at).toLocaleDateString()} at{' '}
                    {new Date(query.created_at).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
