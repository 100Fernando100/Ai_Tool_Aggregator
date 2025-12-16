import { ToolCombo } from '../services/aggregationService';
import {
  Star,
  TrendingUp,
  Users,
  Calendar,
  DollarSign,
  Link2,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Award
} from 'lucide-react';
import { useState } from 'react';
import { VideoPlayer } from './VideoPlayer';

interface ResultsDisplayProps {
  results: ToolCombo[];
  onShare: (comboId: string) => void;
  onFeedback: (comboId: string) => void;
}

export function ResultsDisplay({ results, onShare, onFeedback }: ResultsDisplayProps) {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set([results[0]?.id]));

  const toggleExpanded = (id: string) => {
    setExpandedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-600 dark:text-green-400';
    if (score >= 70) return 'text-blue-600 dark:text-blue-400';
    return 'text-yellow-600 dark:text-yellow-400';
  };

  const getScoreGradient = (score: number) => {
    if (score >= 85) return 'from-green-500 to-emerald-500';
    if (score >= 70) return 'from-blue-500 to-cyan-500';
    return 'from-yellow-500 to-orange-500';
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 animate-fade-in">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold mb-2">
          Top Recommended Combinations
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Scored and ranked based on multiple criteria
        </p>
      </div>

      {results.map((combo, index) => {
        const isExpanded = expandedIds.has(combo.id);
        const isTop = index === 0;

        return (
          <div
            key={combo.id}
            className={`bg-white dark:bg-gray-800 rounded-2xl shadow-xl border-2 transition-all duration-300 animate-slide-up ${
              isTop
                ? 'border-primary-500 dark:border-primary-400'
                : 'border-gray-200 dark:border-gray-700'
            }`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {isTop && (
              <div className="bg-gradient-to-r from-primary-600 to-accent-600 text-white px-6 py-2 rounded-t-2xl flex items-center justify-center space-x-2">
                <Award className="w-5 h-5" />
                <span className="font-semibold">Best Match</span>
              </div>
            )}

            <div className="p-6 space-y-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    {combo.tools.map((tool, i) => (
                      <span key={tool.id}>
                        <span className="font-semibold text-lg text-gray-900 dark:text-white">
                          {tool.name}
                        </span>
                        {i < combo.tools.length - 1 && (
                          <span className="text-gray-400 mx-2">+</span>
                        )}
                      </span>
                    ))}
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">
                    {combo.explanation}
                  </p>
                </div>

                <div className="flex flex-col items-center">
                  <div className={`text-4xl font-bold ${getScoreColor(combo.score)}`}>
                    {combo.score.toFixed(0)}
                  </div>
                  <div className="text-sm text-gray-500">Score</div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="flex items-center space-x-2 text-sm">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <div>
                    <div className="font-semibold">{(combo.breakdown.ratings / 20).toFixed(1)}/5.0</div>
                    <div className="text-xs text-gray-500">Rating</div>
                  </div>
                </div>

                <div className="flex items-center space-x-2 text-sm">
                  <Users className="w-4 h-4 text-blue-500" />
                  <div>
                    <div className="font-semibold">{combo.breakdown.overlap.toFixed(0)}%</div>
                    <div className="text-xs text-gray-500">Consensus</div>
                  </div>
                </div>

                <div className="flex items-center space-x-2 text-sm">
                  <Calendar className="w-4 h-4 text-green-500" />
                  <div>
                    <div className="font-semibold">{combo.breakdown.recency.toFixed(0)}%</div>
                    <div className="text-xs text-gray-500">Recency</div>
                  </div>
                </div>

                <div className="flex items-center space-x-2 text-sm">
                  <Link2 className="w-4 h-4 text-purple-500" />
                  <div>
                    <div className="font-semibold">{combo.breakdown.integration.toFixed(0)}%</div>
                    <div className="text-xs text-gray-500">Integration</div>
                  </div>
                </div>

                <div className="flex items-center space-x-2 text-sm">
                  <DollarSign className="w-4 h-4 text-emerald-500" />
                  <div>
                    <div className="font-semibold">{combo.breakdown.cost.toFixed(0)}%</div>
                    <div className="text-xs text-gray-500">Value</div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => toggleExpanded(combo.id)}
                className="w-full flex items-center justify-center space-x-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors py-2"
              >
                <span className="font-medium">
                  {isExpanded ? 'Hide Details' : 'Show Details & How-To Guide'}
                </span>
                {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>

              {isExpanded && (
                <div className="space-y-6 pt-6 border-t border-gray-200 dark:border-gray-700 animate-slide-up">
                  <div>
                    <h4 className="font-semibold text-lg mb-4 flex items-center space-x-2">
                      <TrendingUp className="w-5 h-5 text-primary-600" />
                      <span>Tools in This Stack</span>
                    </h4>
                    <div className="grid md:grid-cols-3 gap-4">
                      {combo.tools.map(tool => (
                        <div
                          key={tool.id}
                          className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <h5 className="font-semibold">{tool.name}</h5>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              tool.cost === 'free'
                                ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                                : tool.cost === 'freemium'
                                ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                                : 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300'
                            }`}>
                              {tool.cost}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                            {tool.description}
                          </p>
                          <a
                            href={tool.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-primary-600 dark:text-primary-400 hover:underline flex items-center space-x-1"
                          >
                            <span>Visit Site</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-lg mb-4">Video Tutorial</h4>
                    <VideoPlayer
                      videoUrl={combo.videoUrl}
                      toolNames={combo.tools.map(t => t.name)}
                    />
                  </div>

                  <div>
                    <h4 className="font-semibold text-lg mb-4">Step-by-Step Integration Guide</h4>
                    <ol className="space-y-3">
                      {combo.howTo.map((step, i) => (
                        <li key={i} className="flex space-x-4">
                          <div className={`flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br ${getScoreGradient(combo.score)} flex items-center justify-center text-white font-semibold`}>
                            {i + 1}
                          </div>
                          <p className="flex-1 text-gray-700 dark:text-gray-300 pt-1">{step}</p>
                        </li>
                      ))}
                    </ol>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => onShare(combo.id)}
                      className="flex-1 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-xl font-medium transition-colors"
                    >
                      Share This Stack
                    </button>
                    <button
                      onClick={() => onFeedback(combo.id)}
                      className="flex-1 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-medium transition-colors"
                    >
                      Give Feedback
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
