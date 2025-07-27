"use client";

import RuleCard from "@/components/RuleCard";
import { rules } from "@/lib/rules";
import { Theme, getDefaultTheme } from "@/lib/themes";
import { useEffect, useRef, useState } from "react";

// Farcaster Mini App SDK
let sdk: any = null;
if (typeof window !== 'undefined') {
  import('@farcaster/miniapp-sdk').then((module) => {
    sdk = module.sdk;
  }).catch(console.error);
}

export default function MiniAppPage() {
  const [password, setPassword] = useState("");
  const [completedRules, setCompletedRules] = useState<number[]>([]);
  const [currentFailedRuleIndex, setCurrentFailedRuleIndex] = useState<
    number | null
  >(null);
  const [rulesComponents, setRulesComponents] = useState<any[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<Theme>(getDefaultTheme());
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus input on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Check rules progressively
  const checkRulesProgressively = () => {
    // Mark that the game has started
    if (!hasStarted) {
      setHasStarted(true);
    }
    
    // Check each rule one by one in a loop
    for (let i = 0; i < rules.length; i++) {
      // Skip if this rule is already completed
      if (completedRules.includes(i)) {
        continue;
      }
      
      const rule = rules[i];
      const isPassed = rule.validate(password);
      
      if (isPassed) {
        // Rule passed - add to completed
        setCompletedRules((prev) => [...prev, i]);
        setRulesComponents((prev) => [rule, ...prev]);
        
        // Check if all rules are completed
        if (completedRules.length + 1 === rules.length) {
          setIsCompleted(true);
          return;
        }
      } else {
        // Rule failed - set as current failed rule and stop checking
        setCurrentFailedRuleIndex(i);
        return;
      }
    }
  };

  // Handle Enter key
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      checkRulesProgressively();
    }
  };

  // Share result on Farcaster
  const handleShareResult = async () => {
    if (!sdk) {
      console.error('Farcaster SDK not available');
      return;
    }

    try {
      const shareText = `🎉 I just cracked the Password Guesser challenge! 
      
I successfully guessed a password that meets all ${rules.length} requirements! 

Can you beat my score? Try it yourself! 🔐`;

      const result = await sdk.actions.composeCast({
        text: shareText,
        embeds: [window.location.origin],
      });

      if (result?.cast) {
        console.log('Cast posted successfully:', result.cast.hash);
      }
    } catch (error) {
      console.error('Failed to share result:', error);
    }
  };

  // Reset game
  const handleReset = () => {
    setPassword("");
    setCompletedRules([]);
    setCurrentFailedRuleIndex(null);
    setRulesComponents([]);
    setIsCompleted(false);
    setHasStarted(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  if (isCompleted) {
    return (
      <div
        className="min-h-screen flex items-center justify-center p-4 transition-all duration-300"
        style={{ background: currentTheme.colors.background }}
      >
        <div className="text-center w-full max-w-sm px-4">
          <div className="text-6xl mb-6">🎉</div>
          <h1
            className="text-3xl font-bold mb-4"
            style={{ color: currentTheme.colors.text }}
          >
            You cracked it!
          </h1>
          <p
            className="mb-8 text-base"
            style={{ color: currentTheme.colors.textSecondary }}
          >
            Congratulations! You&apos;ve successfully guessed the password that
            meets all the requirements.
          </p>
          <div className="space-y-3">
            <button
              onClick={handleShareResult}
              className="w-full px-6 py-3 text-base text-white rounded-lg hover:opacity-90 transition-all duration-200 font-medium"
              style={{ background: currentTheme.gradients.primary }}
            >
              🎉 Share on Farcaster
            </button>
            <button
              onClick={handleReset}
              className="w-full px-6 py-3 text-base rounded-lg hover:opacity-90 transition-all duration-200 font-medium border-2"
              style={{ 
                color: currentTheme.colors.primary,
                borderColor: currentTheme.colors.primary,
                backgroundColor: 'transparent'
              }}
            >
              Play Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-4 transition-all duration-300 ${currentTheme.gradients.background}`}
    >
      <div className="w-full max-w-sm px-2">
        {/* Header */}
        <div className="text-center mb-8">
          <h1
            className="text-3xl font-bold mb-2"
            style={{ color: currentTheme.colors.text }}
          >
            Password Guesser
          </h1>
          <h2
            className="text-lg font-medium mb-2"
            style={{ color: currentTheme.colors.primary }}
          >
            Mini App Edition
          </h2>
        </div>

        {/* Password Input */}
        <div className="mb-8">
          <input
            ref={inputRef}
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter your password..."
            className="w-full px-4 py-3 text-lg rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 font-mono"
            style={{
              backgroundColor: currentTheme.colors.inputBg,
              borderColor: currentTheme.colors.inputBorder,
              color: currentTheme.colors.text,
              borderWidth: "2px",
              borderStyle: "solid",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = currentTheme.colors.inputFocus;
              e.target.style.boxShadow = `0 0 0 3px ${currentTheme.colors.inputFocus}20`;
            }}
            onBlur={(e) => {
              e.target.style.borderColor = currentTheme.colors.inputBorder;
              e.target.style.boxShadow = "none";
            }}
            autoComplete="off"
            spellCheck="false"
          />
        </div>

        {/* Rules only show after game has started */}
        {hasStarted && (
          <>
            {/* All Rule Cards in Order */}
            <div className="space-y-3 mb-6">
              {/* Completed Rules - Show in order they were completed */}
              {rulesComponents.map((rule, index) => (
                <div
                  key={`rule-${rule.id}-${index}`}
                  className="transform translate-y-0 transition-all duration-500"
                >
                  <RuleCard
                    rule={rule}
                    isPassed={true}
                    theme={currentTheme}
                  />
                </div>
              ))}

              {/* Current Failed Rule - Always at the bottom */}
              {currentFailedRuleIndex !== null && (
                <div
                  key={`rule-${currentFailedRuleIndex}-failed`}
                  className="transform translate-y-0 transition-all duration-500"
                >
                  <RuleCard
                    rule={rules[currentFailedRuleIndex]}
                    isPassed={false}
                    theme={currentTheme}
                  />
                </div>
              )}
            </div>

            {/* Progress */}
            <div className="mt-6 text-center">
              <div
                className="text-sm mb-2"
                style={{ color: currentTheme.colors.textSecondary }}
              >
                {completedRules.length} of {rules.length} rules completed
              </div>
              <div
                className="w-full rounded-full h-2"
                style={{ backgroundColor: currentTheme.colors.border }}
              >
                <div
                  className="rounded-full transition-all duration-300 h-2"
                  style={{
                    width: `${(completedRules.length / rules.length) * 100}%`,
                    backgroundColor: currentTheme.colors.success,
                  }}
                ></div>
              </div>
            </div>
          </>
        )}

        {/* Instructions */}
        <div className="mt-8 text-center">
          <p
            className="text-sm"
            style={{ color: currentTheme.colors.textSecondary }}
          >
            Press{" "}
            <kbd
              className="px-2 py-1 rounded text-sm"
              style={{
                backgroundColor: currentTheme.colors.border,
                color: currentTheme.colors.text,
              }}
            >
              Enter
            </kbd>{" "}
            to {hasStarted ? "check the current rule" : "start checking rules"}
          </p>
        </div>
      </div>
    </div>
  );
} 