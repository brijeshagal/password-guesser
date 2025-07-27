'use client';

import { Rule } from '@/lib/types';
import { Theme } from '@/lib/themes';
import Image from 'next/image';

interface RuleCardProps {
  rule: Rule;
  isPassed: boolean;
  theme: Theme;
}

export default function RuleCard({ rule, isPassed, theme }: RuleCardProps) {
  return (
    <div 
      className="flex flex-col p-3 sm:p-4 rounded-lg border-2 transition-all duration-300 shadow-sm"
      style={{
        borderColor: isPassed ? theme.colors.success : theme.colors.border,
        backgroundColor: isPassed ? `${theme.colors.success}10` : theme.colors.surface,
      }}
    >
      {/* Main rule content */}
      <div className="flex items-start justify-between mb-2 sm:mb-3">
        <div className="flex items-start space-x-2 sm:space-x-3 flex-1 min-w-0">
          <div 
            className="w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold transition-all duration-300 flex-shrink-0 mt-0.5"
            style={{
              backgroundColor: isPassed ? theme.colors.success : theme.colors.border,
              color: isPassed ? theme.colors.surface : theme.colors.textSecondary,
              transform: isPassed ? 'scale(110%)' : 'scale(100%)',
            }}
          >
            {rule.id}
          </div>
          <span 
            className="font-medium text-sm sm:text-base leading-relaxed break-words"
            style={{ color: theme.colors.text }}
          >
            {rule.hint}
          </span>
        </div>
        
        <div 
          className="text-xl sm:text-2xl transition-all duration-300 flex-shrink-0 ml-2 mt-0.5"
          style={{
            color: isPassed ? theme.colors.success : theme.colors.error,
            transform: isPassed ? 'scale(110%)' : 'scale(100%)',
          }}
        >
          {isPassed ? '✅' : '❌'}
        </div>
      </div>

      {/* Sponsor logos for failed sponsor rule */}
      {!isPassed && rule.metadata?.sponsorLogos && (
        <div 
          className="mt-2 sm:mt-3 p-2 sm:p-3 rounded-lg"
          style={{ backgroundColor: `${theme.colors.border}20` }}
        >
          <p 
            className="text-xs sm:text-sm mb-2 font-medium"
            style={{ color: theme.colors.textSecondary }}
          >
            Sponsor Logos:
          </p>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {rule.metadata.sponsorLogos.map((sponsor, index) => (
              <div key={index} className="flex flex-col items-center">
                <div 
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg border flex items-center justify-center mb-1"
                  style={{
                    backgroundColor: theme.colors.surface,
                    borderColor: theme.colors.border,
                  }}
                >
                  <span 
                    className="text-xs font-bold uppercase"
                    style={{ color: theme.colors.textSecondary }}
                  >
                    {sponsor.name}
                  </span>
                </div>
                <span 
                  className="text-xs"
                  style={{ color: theme.colors.textSecondary }}
                >
                  {sponsor.name}
                </span>
              </div>
            ))}
          </div>
          <p 
            className="text-xs mt-2 leading-relaxed"
            style={{ color: theme.colors.textSecondary }}
          >
            💡 Look at the logos above and include one of the sponsor names in your password
          </p>
        </div>
      )}
    </div>
  );
} 