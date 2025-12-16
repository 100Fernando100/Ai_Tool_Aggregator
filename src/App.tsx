import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { SearchInterface } from './components/SearchInterface';
import { ResultsDisplay } from './components/ResultsDisplay';
import { QueryHistory } from './components/QueryHistory';
import { ShareModal } from './components/ShareModal';
import { FeedbackModal } from './components/FeedbackModal';
import { aggregateRecommendations, ToolCombo } from './services/aggregationService';
import {
  saveQuery,
  getQueryHistory,
  saveFeedback,
  getOrCreateSessionId,
  Query
} from './services/databaseService';

function App() {
  const [results, setResults] = useState<ToolCombo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [queryHistory, setQueryHistory] = useState<Query[]>([]);
  const [sessionId] = useState(() => getOrCreateSessionId());
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [selectedComboId, setSelectedComboId] = useState<string>('');
  const [currentQueryId, setCurrentQueryId] = useState<string>('');

  useEffect(() => {
    loadQueryHistory();
  }, []);

  const loadQueryHistory = async () => {
    const history = await getQueryHistory(sessionId);
    setQueryHistory(history);
  };

  const handleSearch = async (query: string, category?: string) => {
    setIsLoading(true);

    setTimeout(async () => {
      const recommendations = aggregateRecommendations(query, category);
      setResults(recommendations);
      setIsLoading(false);

      const savedQuery = await saveQuery(query, category, sessionId, recommendations);
      if (savedQuery) {
        setCurrentQueryId(savedQuery.id);
        await loadQueryHistory();
      }

      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
      });
    }, 1000);
  };

  const handleSelectHistoryQuery = (query: Query) => {
    if (typeof query.results === 'string') {
      setResults(JSON.parse(query.results));
    } else {
      setResults(query.results);
    }
    setCurrentQueryId(query.id);

    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth'
    });
  };

  const handleShare = (comboId: string) => {
    setSelectedComboId(comboId);
    setShareModalOpen(true);
  };

  const handleFeedback = (comboId: string) => {
    setSelectedComboId(comboId);
    setFeedbackModalOpen(true);
  };

  const handleSubmitFeedback = async (rating: number, comment: string) => {
    if (currentQueryId) {
      await saveFeedback({
        query_id: currentQueryId,
        rating,
        comment
      });
    }
  };

  const selectedCombo = results.find(r => r.id === selectedComboId);

  return (
    <div className="min-h-screen">
      <Header />

      <main className="container mx-auto px-4 py-12">
        <div className="space-y-12">
          <SearchInterface onSearch={handleSearch} isLoading={isLoading} />

          {queryHistory.length > 0 && results.length === 0 && (
            <QueryHistory
              queries={queryHistory}
              onSelectQuery={handleSelectHistoryQuery}
            />
          )}

          {results.length > 0 && (
            <ResultsDisplay
              results={results}
              onShare={handleShare}
              onFeedback={handleFeedback}
            />
          )}
        </div>
      </main>

      {selectedCombo && (
        <>
          <ShareModal
            isOpen={shareModalOpen}
            onClose={() => setShareModalOpen(false)}
            comboId={selectedCombo.id}
            toolNames={selectedCombo.tools.map(t => t.name)}
          />
          <FeedbackModal
            isOpen={feedbackModalOpen}
            onClose={() => setFeedbackModalOpen(false)}
            onSubmit={handleSubmitFeedback}
            comboId={selectedCombo.id}
          />
        </>
      )}
    </div>
  );
}

export default App;
