import { X, Link, Check, Twitter, Linkedin, Mail } from 'lucide-react';
import { useState } from 'react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  comboId: string;
  toolNames: string[];
}

export function ShareModal({ isOpen, onClose, comboId, toolNames }: ShareModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const shareUrl = `${window.location.origin}?combo=${comboId}`;
  const shareText = `Check out this amazing AI tool stack: ${toolNames.join(' + ')}!`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const shareToTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank', 'width=550,height=420');
  };

  const shareToLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank', 'width=550,height=420');
  };

  const shareToEmail = () => {
    const subject = 'AI Tool Stack Recommendation';
    const body = `${shareText}\n\n${shareUrl}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-6 space-y-6 animate-scale-in">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold">Share This Stack</h3>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
              Share Link
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={shareUrl}
                readOnly
                className="flex-1 px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-sm"
              />
              <button
                onClick={copyToClipboard}
                className="p-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
              >
                {copied ? <Check className="w-5 h-5" /> : <Link className="w-5 h-5" />}
              </button>
            </div>
            {copied && (
              <p className="text-sm text-green-600 dark:text-green-400 mt-2">
                Copied to clipboard!
              </p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
              Share via
            </label>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={shareToTwitter}
                className="flex flex-col items-center space-y-2 p-4 bg-gray-50 dark:bg-gray-900 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors group"
              >
                <Twitter className="w-6 h-6 text-blue-500" />
                <span className="text-xs font-medium">Twitter</span>
              </button>
              <button
                onClick={shareToLinkedIn}
                className="flex flex-col items-center space-y-2 p-4 bg-gray-50 dark:bg-gray-900 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors group"
              >
                <Linkedin className="w-6 h-6 text-blue-700" />
                <span className="text-xs font-medium">LinkedIn</span>
              </button>
              <button
                onClick={shareToEmail}
                className="flex flex-col items-center space-y-2 p-4 bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors group"
              >
                <Mail className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                <span className="text-xs font-medium">Email</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
