import { mockAITools, AITool } from '../data/mockTools';

export interface ToolCombo {
  id: string;
  tools: AITool[];
  score: number;
  breakdown: {
    popularity: number;
    ratings: number;
    overlap: number;
    recency: number;
    cost: number;
    integration: number;
  };
  explanation: string;
  howTo: string[];
  videoUrl: string;
}

const WEIGHTS = {
  ratings: 0.30,
  overlap: 0.25,
  recency: 0.15,
  cost: 0.10,
  integration: 0.20
};

function calculateRecencyScore(dateString: string): number {
  const date = new Date(dateString);
  const now = new Date();
  const daysDiff = (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24);

  if (daysDiff < 30) return 100;
  if (daysDiff < 60) return 90;
  if (daysDiff < 90) return 80;
  if (daysDiff < 180) return 70;
  return 60;
}

function calculateOverlapScore(tools: AITool[]): number {
  const sourceCounts = tools.map(t => t.sources.length);
  const avgSources = sourceCounts.reduce((a, b) => a + b, 0) / sourceCounts.length;
  return (avgSources / 5) * 100;
}

function calculateCostScore(tools: AITool[]): number {
  const costValues = { free: 100, freemium: 75, paid: 50 };
  const scores = tools.map(t => costValues[t.cost]);
  return scores.reduce((a, b) => a + b, 0) / scores.length;
}

function calculateIntegrationScore(tools: AITool[]): number {
  const scores = tools.map(t => t.integrationScore);
  return (scores.reduce((a, b) => a + b, 0) / scores.length) * 10;
}

function matchesQuery(tool: AITool, query: string, category?: string): boolean {
  const queryLower = query.toLowerCase();
  const matchesCategory = !category || tool.category.includes(category);

  const matchesText =
    tool.name.toLowerCase().includes(queryLower) ||
    tool.description.toLowerCase().includes(queryLower) ||
    tool.category.some(cat => queryLower.includes(cat.toLowerCase()) || cat.toLowerCase().includes(queryLower));

  return matchesCategory && matchesText;
}

function findComplementaryTools(primaryTool: AITool, allTools: AITool[]): AITool[] {
  return allTools.filter(tool => {
    if (tool.id === primaryTool.id) return false;

    const hasCommonIntegration = tool.integrations.some(
      integration => primaryTool.integrations.includes(integration)
    );

    const hasComplementaryCategory = tool.category.some(
      cat => primaryTool.category.includes(cat)
    );

    return hasCommonIntegration || hasComplementaryCategory;
  }).sort((a, b) => {
    const aScore = a.rating * a.popularity;
    const bScore = b.rating * b.popularity;
    return bScore - aScore;
  }).slice(0, 2);
}

function generateExplanation(combo: ToolCombo): string {
  const toolNames = combo.tools.map(t => t.name).join(', ');
  const avgRating = combo.breakdown.ratings.toFixed(1);
  const sourceCount = Math.round(combo.breakdown.overlap / 20);

  const integrationQuality = combo.breakdown.integration >= 80 ? 'excellent' :
                            combo.breakdown.integration >= 60 ? 'good' : 'moderate';

  return `This combination of ${toolNames} scores ${combo.score.toFixed(1)}/100 based on aggregated data from multiple AI tool directories. The tools have an average rating of ${avgRating}/5.0 with consensus from ${sourceCount}+ sources. Integration compatibility is ${integrationQuality}, making setup and workflow creation seamless. The stack balances cutting-edge capabilities with practical reliability.`;
}

function generateHowTo(tools: AITool[]): string[] {
  const steps: string[] = [];

  tools.forEach((tool, index) => {
    steps.push(`Set up ${tool.name}: Visit ${tool.url} and create an account. ${tool.cost === 'free' ? 'It\'s completely free!' : tool.cost === 'freemium' ? 'Start with the free tier.' : 'Choose a plan that fits your needs.'}`);
  });

  steps.push(`Connect the tools: Use ${tools[0].integrations.filter(i => tools.slice(1).some(t => t.integrations.includes(i)))[0] || 'APIs'} to integrate ${tools.map(t => t.name).join(' and ')}.`);

  steps.push(`Configure your workflow: Set up data flow between tools, define triggers and actions, and test the integration.`);

  steps.push(`Optimize and monitor: Fine-tune parameters, monitor performance, and iterate based on results.`);

  return steps;
}

export function aggregateRecommendations(query: string, category?: string): ToolCombo[] {
  const matchingTools = mockAITools.filter(tool => matchesQuery(tool, query, category));

  if (matchingTools.length === 0) {
    const fallbackTools = mockAITools
      .sort((a, b) => b.popularity - a.popularity)
      .slice(0, 3);

    return [{
      id: 'fallback',
      tools: fallbackTools,
      score: 75,
      breakdown: {
        popularity: 90,
        ratings: 85,
        overlap: 60,
        recency: 75,
        cost: 70,
        integration: 80
      },
      explanation: 'No exact matches found. Here are some popular general-purpose AI tools that might help.',
      howTo: generateHowTo(fallbackTools),
      videoUrl: fallbackTools[0].videoUrl || ''
    }];
  }

  const combos: ToolCombo[] = [];

  matchingTools.slice(0, 5).forEach(primaryTool => {
    const complementaryTools = findComplementaryTools(primaryTool, matchingTools);
    const comboTools = [primaryTool, ...complementaryTools];

    const avgRating = comboTools.reduce((sum, t) => sum + t.rating, 0) / comboTools.length;
    const avgPopularity = comboTools.reduce((sum, t) => sum + t.popularity, 0) / comboTools.length;
    const avgRecency = comboTools.reduce((sum, t) => sum + calculateRecencyScore(t.lastUpdated), 0) / comboTools.length;

    const ratingsScore = (avgRating / 5) * 100;
    const overlapScore = calculateOverlapScore(comboTools);
    const recencyScore = avgRecency;
    const costScore = calculateCostScore(comboTools);
    const integrationScore = calculateIntegrationScore(comboTools);

    const totalScore =
      (ratingsScore * WEIGHTS.ratings) +
      (overlapScore * WEIGHTS.overlap) +
      (recencyScore * WEIGHTS.recency) +
      (costScore * WEIGHTS.cost) +
      (integrationScore * WEIGHTS.integration);

    const breakdown = {
      popularity: avgPopularity,
      ratings: ratingsScore,
      overlap: overlapScore,
      recency: recencyScore,
      cost: costScore,
      integration: integrationScore
    };

    const combo: ToolCombo = {
      id: comboTools.map(t => t.id).join('-'),
      tools: comboTools,
      score: totalScore,
      breakdown,
      explanation: '',
      howTo: generateHowTo(comboTools),
      videoUrl: comboTools[0].videoUrl || ''
    };

    combo.explanation = generateExplanation(combo);
    combos.push(combo);
  });

  return combos.sort((a, b) => b.score - a.score).slice(0, 3);
}
