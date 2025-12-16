export interface AITool {
  id: string;
  name: string;
  description: string;
  category: string[];
  popularity: number;
  rating: number;
  lastUpdated: string;
  integrations: string[];
  integrationScore: number;
  cost: 'free' | 'freemium' | 'paid';
  sources: string[];
  url: string;
  videoUrl?: string;
}

export const mockAITools: AITool[] = [
  {
    id: 'claude',
    name: 'Claude',
    description: 'Advanced AI assistant for coding, analysis, and complex reasoning tasks',
    category: ['programming', 'writing', 'analysis'],
    popularity: 95,
    rating: 4.8,
    lastUpdated: '2024-12-01',
    integrations: ['API', 'Slack', 'VSCode', 'Zapier'],
    integrationScore: 9,
    cost: 'freemium',
    sources: ['Toolify.ai', 'Futurepedia', 'There\'s An AI For That'],
    url: 'https://claude.ai',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 'crewai',
    name: 'CrewAI',
    description: 'Framework for orchestrating role-playing AI agents for collaborative tasks',
    category: ['automation', 'programming', 'agents'],
    popularity: 82,
    rating: 4.6,
    lastUpdated: '2024-11-15',
    integrations: ['Python', 'LangChain', 'OpenAI', 'Anthropic'],
    integrationScore: 8,
    cost: 'free',
    sources: ['Insidr.ai', 'AiMatchPro', 'Toolify.ai'],
    url: 'https://crewai.com',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 'langgraph',
    name: 'LangGraph',
    description: 'Build stateful, multi-actor applications with LLMs for complex workflows',
    category: ['programming', 'automation', 'workflows'],
    popularity: 78,
    rating: 4.5,
    lastUpdated: '2024-11-20',
    integrations: ['LangChain', 'Python', 'TypeScript', 'OpenAI'],
    integrationScore: 9,
    cost: 'free',
    sources: ['Futurepedia', 'Toolify.ai', 'AiMatchPro'],
    url: 'https://langchain.com/langgraph',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 'autogen',
    name: 'AutoGen',
    description: 'Microsoft framework for building LLM applications with multiple conversational agents',
    category: ['programming', 'agents', 'automation'],
    popularity: 85,
    rating: 4.7,
    lastUpdated: '2024-11-25',
    integrations: ['Python', 'OpenAI', 'Azure', 'LangChain'],
    integrationScore: 8,
    cost: 'free',
    sources: ['Insidr.ai', 'Futurepedia', 'There\'s An AI For That'],
    url: 'https://microsoft.github.io/autogen',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 'gumloop',
    name: 'Gumloop',
    description: 'No-code AI workflow automation platform for complex business processes',
    category: ['automation', 'no-code', 'workflows'],
    popularity: 72,
    rating: 4.4,
    lastUpdated: '2024-10-30',
    integrations: ['Zapier', 'Make', 'Airtable', 'APIs'],
    integrationScore: 7,
    cost: 'freemium',
    sources: ['Toolify.ai', 'AiMatchPro'],
    url: 'https://gumloop.com',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 'devin',
    name: 'Devin AI',
    description: 'Autonomous AI software engineer for end-to-end development tasks',
    category: ['programming', 'automation'],
    popularity: 88,
    rating: 4.6,
    lastUpdated: '2024-11-10',
    integrations: ['GitHub', 'VSCode', 'Slack', 'Jira'],
    integrationScore: 8,
    cost: 'paid',
    sources: ['Insidr.ai', 'Futurepedia', 'There\'s An AI For That'],
    url: 'https://devin.ai',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 'n8n',
    name: 'n8n',
    description: 'Fair-code workflow automation tool with AI integrations',
    category: ['automation', 'workflows', 'no-code'],
    popularity: 80,
    rating: 4.7,
    lastUpdated: '2024-12-05',
    integrations: ['APIs', 'OpenAI', 'Anthropic', 'Databases', 'Webhooks'],
    integrationScore: 9,
    cost: 'freemium',
    sources: ['Toolify.ai', 'Futurepedia', 'AiMatchPro'],
    url: 'https://n8n.io',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 'huggingface',
    name: 'Hugging Face',
    description: 'Platform for ML models, datasets, and collaborative AI development',
    category: ['programming', 'ml', 'models'],
    popularity: 92,
    rating: 4.8,
    lastUpdated: '2024-12-10',
    integrations: ['Python', 'PyTorch', 'TensorFlow', 'APIs', 'Gradio'],
    integrationScore: 9,
    cost: 'freemium',
    sources: ['Insidr.ai', 'Futurepedia', 'There\'s An AI For That', 'Toolify.ai'],
    url: 'https://huggingface.co',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 'midjourney',
    name: 'Midjourney',
    description: 'AI image generation tool for creating stunning visuals from text prompts',
    category: ['design', 'creative', 'image-generation'],
    popularity: 94,
    rating: 4.7,
    lastUpdated: '2024-11-28',
    integrations: ['Discord', 'API'],
    integrationScore: 6,
    cost: 'paid',
    sources: ['Toolify.ai', 'Futurepedia', 'There\'s An AI For That'],
    url: 'https://midjourney.com',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 'runway',
    name: 'Runway ML',
    description: 'AI-powered creative suite for video, image, and content generation',
    category: ['video', 'creative', 'design'],
    popularity: 86,
    rating: 4.6,
    lastUpdated: '2024-11-30',
    integrations: ['API', 'Adobe', 'Figma'],
    integrationScore: 7,
    cost: 'freemium',
    sources: ['Insidr.ai', 'Futurepedia', 'Toolify.ai'],
    url: 'https://runwayml.com',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 'zapier',
    name: 'Zapier',
    description: 'Automation platform connecting thousands of apps with AI capabilities',
    category: ['automation', 'no-code', 'integration'],
    popularity: 90,
    rating: 4.5,
    lastUpdated: '2024-12-01',
    integrations: ['5000+ Apps', 'OpenAI', 'Webhooks', 'APIs'],
    integrationScore: 10,
    cost: 'freemium',
    sources: ['Toolify.ai', 'AiMatchPro', 'Futurepedia'],
    url: 'https://zapier.com',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 'notion-ai',
    name: 'Notion AI',
    description: 'AI-powered workspace for notes, docs, and knowledge management',
    category: ['productivity', 'writing', 'organization'],
    popularity: 91,
    rating: 4.6,
    lastUpdated: '2024-11-22',
    integrations: ['API', 'Slack', 'Google Drive', 'Zapier'],
    integrationScore: 8,
    cost: 'freemium',
    sources: ['Insidr.ai', 'Toolify.ai', 'There\'s An AI For That'],
    url: 'https://notion.so',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 'cursor',
    name: 'Cursor',
    description: 'AI-first code editor built for pair programming with AI',
    category: ['programming', 'ide', 'coding'],
    popularity: 87,
    rating: 4.8,
    lastUpdated: '2024-12-08',
    integrations: ['VSCode', 'GitHub', 'OpenAI', 'Anthropic'],
    integrationScore: 9,
    cost: 'freemium',
    sources: ['Toolify.ai', 'Futurepedia', 'Insidr.ai'],
    url: 'https://cursor.sh',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 'perplexity',
    name: 'Perplexity AI',
    description: 'AI-powered search engine and research assistant with citations',
    category: ['research', 'search', 'analysis'],
    popularity: 84,
    rating: 4.7,
    lastUpdated: '2024-12-05',
    integrations: ['API', 'Browser Extension'],
    integrationScore: 6,
    cost: 'freemium',
    sources: ['AiMatchPro', 'Futurepedia', 'There\'s An AI For That'],
    url: 'https://perplexity.ai',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 'make',
    name: 'Make (Integromat)',
    description: 'Visual automation platform for connecting apps and AI services',
    category: ['automation', 'no-code', 'workflows'],
    popularity: 79,
    rating: 4.6,
    lastUpdated: '2024-11-18',
    integrations: ['1500+ Apps', 'OpenAI', 'APIs', 'Webhooks'],
    integrationScore: 9,
    cost: 'freemium',
    sources: ['Toolify.ai', 'AiMatchPro'],
    url: 'https://make.com',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  }
];
