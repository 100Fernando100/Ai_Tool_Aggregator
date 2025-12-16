import { useState } from 'react';
import { Search, Filter } from 'lucide-react';

interface SearchInterfaceProps {
  onSearch: (query: string, category?: string) => void;
  isLoading: boolean;
}

const categories = [
  'All',
  'programming',
  'automation',
  'writing',
  'design',
  'video',
  'research',
  'productivity',
  'no-code'
];

export function SearchInterface({ onSearch, isLoading }: SearchInterfaceProps) {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showFilters, setShowFilters] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query, selectedCategory === 'All' ? undefined : selectedCategory);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 animate-fade-in">
      <div className="text-center space-y-4 mb-12">
        <h2 className="text-4xl sm:text-5xl font-bold text-balance">
          Discover Your Perfect
          <span className="block bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
            AI Tool Stack
          </span>
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Get intelligent recommendations from multiple AI tool directories, scored and ranked for your specific needs.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-accent-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
          <div className="relative flex items-center bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <Search className="w-6 h-6 text-gray-400 ml-6" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g., I want to create a predictive model for AI ethics..."
              className="flex-1 px-6 py-6 bg-transparent focus:outline-none text-lg"
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className="p-4 text-gray-500 hover:text-primary-600 transition-colors"
            >
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>

        {showFilters && (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 animate-slide-up">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Filter by Category
            </h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-primary-600 text-white shadow-md scale-105'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading || !query.trim()}
          className="w-full py-4 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]"
        >
          {isLoading ? 'Searching...' : 'Find My AI Stack'}
        </button>
      </form>

      <div className="flex items-center justify-center space-x-8 text-sm text-gray-600 dark:text-gray-400">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span>5 Directories</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          <span>15+ Tools</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
          <span>Smart Scoring</span>
        </div>
      </div>
    </div>
  );
}
