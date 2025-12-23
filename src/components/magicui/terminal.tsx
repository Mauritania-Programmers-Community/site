"use client";

import { createContext, useContext, useEffect, useState, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";

interface TerminalContextValue {
  registerLine: (id: string, duration: number) => void;
  notifyComplete: (id: string) => void;
  getDelay: (id: string) => number;
}

const TerminalContext = createContext<TerminalContextValue | null>(null);

const useTerminal = () => {
  const context = useContext(TerminalContext);
  if (!context) {
    throw new Error("Terminal components must be used within Terminal wrapper");
  }
  return context;
};

interface TerminalProps {
  children: React.ReactNode;
  className?: string;
}

export function Terminal({ children, className }: TerminalProps) {
  const [lineRegistry, setLineRegistry] = useState<Map<string, { delay: number; duration: number }>>(new Map());
  const [completedLines, setCompletedLines] = useState<Set<string>>(new Set());
  const lineOrder = useRef<string[]>([]);
  const currentDelay = useRef(0);
  const [totalLines, setTotalLines] = useState(0);

  const registerLine = (id: string, duration: number) => {
    if (!lineOrder.current.includes(id)) {
      lineOrder.current.push(id);
      const delay = currentDelay.current;
      currentDelay.current += duration;
      setTotalLines(lineOrder.current.length);

      setLineRegistry(prev => {
        const next = new Map(prev);
        next.set(id, { delay, duration });
        return next;
      });
    }
  };

  const notifyComplete = (id: string) => {
    setCompletedLines(prev => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  };

  const getDelay = (id: string) => {
    return lineRegistry.get(id)?.delay ?? 0;
  };

  const allLinesComplete = totalLines > 0 && completedLines.size === totalLines;

  const contextValue = useMemo<TerminalContextValue>(
    () => ({
      registerLine,
      notifyComplete,
      getDelay,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <TerminalContext.Provider value={contextValue}>
      <div className={cn("space-y-1.5 font-mono text-xs sm:text-sm", className)}>
        {children}

        {/* Blinking cursor after sequence completes */}
        {allLinesComplete && (
          <div className="flex items-center gap-2 pt-2 border-t border-border/30 mt-3">
            <span className="text-mpc-green-500">$</span>
            <motion.span
              className="inline-block h-4 w-2 bg-mpc-green-500"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </div>
        )}
      </div>
    </TerminalContext.Provider>
  );
}

interface TypingAnimationProps {
  children: string;
  className?: string;
  typingSpeed?: number;
}

let typingIdCounter = 0;

export function TypingAnimation({
  children,
  className,
  typingSpeed = 50
}: TypingAnimationProps) {
  const terminal = useTerminal();
  const [displayText, setDisplayText] = useState("");
  const [hasStarted, setHasStarted] = useState(false);
  const [lineId] = useState(() => `typing-${++typingIdCounter}`);
  const isRegistered = useRef(false);

  // Register this line with the terminal
  useEffect(() => {
    if (!isRegistered.current) {
      const duration = children.length * typingSpeed;
      terminal.registerLine(lineId, duration);
      isRegistered.current = true;
    }
  }, [children.length, typingSpeed, terminal, lineId]);

  // Start typing when delay is reached
  useEffect(() => {
    const delay = terminal.getDelay(lineId);
    const startTimer = setTimeout(() => {
      setHasStarted(true);
    }, delay);

    return () => clearTimeout(startTimer);
  }, [terminal, lineId]);

  // Character-by-character typing
  useEffect(() => {
    if (!hasStarted) return;

    let currentIndex = 0;
    const typeInterval = setInterval(() => {
      if (currentIndex < children.length) {
        setDisplayText(children.substring(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typeInterval);
        terminal.notifyComplete(lineId);
      }
    }, typingSpeed);

    return () => clearInterval(typeInterval);
  }, [hasStarted, children, typingSpeed, terminal, lineId]);

  return (
    <div className={cn("flex items-start gap-2 text-foreground", className)}>
      <ChevronRight className="h-3 w-3 mt-1 text-mpc-green-500 flex-shrink-0" />
      <span>{displayText}</span>
    </div>
  );
}

interface AnimatedSpanProps {
  children: string;
  className?: string;
}

let spanIdCounter = 0;

export function AnimatedSpan({ children, className }: AnimatedSpanProps) {
  const terminal = useTerminal();
  const [isVisible, setIsVisible] = useState(false);
  const [lineId] = useState(() => `span-${++spanIdCounter}`);
  const isRegistered = useRef(false);

  // Register this line with terminal (instant display, 0 duration)
  useEffect(() => {
    if (!isRegistered.current) {
      terminal.registerLine(lineId, 200); // 200ms for animation
      isRegistered.current = true;
    }
  }, [terminal, lineId]);

  // Show when delay is reached
  useEffect(() => {
    const delay = terminal.getDelay(lineId);
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(showTimer);
  }, [terminal, lineId]);

  // Notify completion after animation
  useEffect(() => {
    if (isVisible) {
      const completeTimer = setTimeout(() => {
        terminal.notifyComplete(lineId);
      }, 200);
      return () => clearTimeout(completeTimer);
    }
  }, [isVisible, terminal, lineId]);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: -3 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      className={cn("flex items-start gap-2", className)}
    >
      <span className={children === "" ? "" : ""}>{children}</span>
    </motion.div>
  );
}

// Helper functions for autocomplete and validation
function getCommandSuggestions(input: string, commands: string[]): string[] {
  const trimmed = input.trim().toLowerCase();
  if (!trimmed) return commands.slice(0, 5);

  return commands
    .filter(cmd => cmd.toLowerCase().includes(trimmed))
    .sort((a, b) => {
      // Prioritize commands starting with input
      const aStarts = a.toLowerCase().startsWith(trimmed);
      const bStarts = b.toLowerCase().startsWith(trimmed);
      if (aStarts && !bStarts) return -1;
      if (!aStarts && bStarts) return 1;
      return a.length - b.length;
    })
    .slice(0, 5);
}

function validateCommand(input: string, commands: string[]): 'valid' | 'invalid' | 'partial' | 'empty' {
  const trimmed = input.trim().toLowerCase();
  if (!trimmed) return 'empty';

  // Exact match
  if (commands.some(cmd => cmd.toLowerCase() === trimmed)) return 'valid';

  // Partial match (starts with)
  if (commands.some(cmd => cmd.toLowerCase().startsWith(trimmed))) return 'partial';

  return 'invalid';
}

function findClosestMatch(input: string, commands: string[]): string | null {
  const trimmed = input.trim().toLowerCase();
  if (!trimmed) return null;

  // Find commands that include the input
  const matches = commands.filter(cmd =>
    cmd.toLowerCase().includes(trimmed) ||
    trimmed.includes(cmd.toLowerCase())
  );

  if (matches.length > 0) {
    return matches[0];
  }

  return null;
}

interface InteractiveTerminalProps {
  initialCommands: Array<{
    type: "command" | "output";
    content: string;
    className?: string;
  }>;
  onComplete?: () => void;
  commandHandler: (command: string) => string | string[] | React.ReactNode;
  placeholder?: string;
}

const AVAILABLE_COMMANDS = [
  'whoami',
  'uname',
  'uname -a',
  'cat /etc/community.conf',
  'cat community.conf',
  'sudo join mpc-community',
  'help',
  'clear'
];

export function InteractiveTerminal({
  initialCommands,
  onComplete,
  commandHandler,
  placeholder = "Type a command..."
}: InteractiveTerminalProps) {
  const [showInput, setShowInput] = useState(false);
  const [userCommands, setUserCommands] = useState<Array<{ command: string; response: string | string[] | React.ReactNode }>>([]);
  const [inputValue, setInputValue] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const MAX_VISIBLE_COMMANDS = 7;

  // Get suggestions based on input
  const suggestions = useMemo(
    () => getCommandSuggestions(inputValue, AVAILABLE_COMMANDS),
    [inputValue]
  );

  // Validate current input
  const validationState = useMemo(
    () => validateCommand(inputValue, AVAILABLE_COMMANDS),
    [inputValue]
  );

  // Show input after initial animation completes
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInput(true);
      onComplete?.();
    }, (initialCommands.length * 400) + 1000); // Rough estimate of animation time

    return () => clearTimeout(timer);
  }, [initialCommands.length, onComplete]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const cmd = inputValue.trim().toLowerCase();

    // Mark as interacted (hides initial commands)
    if (!hasInteracted) {
      setHasInteracted(true);
    }

    // Handle clear command
    if (cmd === 'clear') {
      setUserCommands([]);
      setInputValue("");
      setShowSuggestions(false);
      return;
    }

    // Show loading indicator
    setIsLoading(true);
    const commandToExecute = inputValue.trim();
    setInputValue("");
    setShowSuggestions(false);

    // Simulate command execution delay (300-500ms)
    setTimeout(() => {
      // Get response
      const response = commandHandler(commandToExecute);

      // Add to history
      setCommandHistory(prev => {
        const filtered = prev.filter(c => c !== commandToExecute);
        return [...filtered, commandToExecute].slice(-50);
      });
      setHistoryIndex(-1);

      // Add command and limit to last MAX_VISIBLE_COMMANDS
      setUserCommands(prev => {
        const updated = [...prev, { command: commandToExecute, response }];
        return updated.slice(-MAX_VISIBLE_COMMANDS);
      });

      setIsLoading(false);

      // Auto-scroll to bottom
      setTimeout(() => {
        inputRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
      }, 100);
    }, 400);
  };

  // Handle keyboard shortcuts
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      if (suggestions.length > 0) {
        setInputValue(suggestions[selectedIndex]);
        setShowSuggestions(false);
      }
    } else if (e.key === 'Enter') {
      // If suggestions are shown, select the highlighted one instead of submitting
      if (showSuggestions && suggestions.length > 0) {
        e.preventDefault();
        setInputValue(suggestions[selectedIndex]);
        setShowSuggestions(false);
        inputRef.current?.focus();
      }
      // Otherwise, let the form submit naturally
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (showSuggestions && suggestions.length > 0) {
        setSelectedIndex(prev => prev > 0 ? prev - 1 : suggestions.length - 1);
      } else {
        // Navigate command history
        if (commandHistory.length > 0) {
          const newIndex = historyIndex + 1;
          if (newIndex < commandHistory.length) {
            setHistoryIndex(newIndex);
            setInputValue(commandHistory[commandHistory.length - 1 - newIndex]);
          }
        }
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (showSuggestions && suggestions.length > 0) {
        setSelectedIndex(prev => prev < suggestions.length - 1 ? prev + 1 : 0);
      } else {
        // Navigate command history
        const newIndex = historyIndex - 1;
        if (newIndex >= 0) {
          setHistoryIndex(newIndex);
          setInputValue(commandHistory[commandHistory.length - 1 - newIndex]);
        } else {
          setHistoryIndex(-1);
          setInputValue('');
        }
      }
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
      setSelectedIndex(0);
    }
  };

  // Show suggestions when typing (only if input is not empty and not already a valid command)
  useEffect(() => {
    if (inputValue && suggestions.length > 0 && validationState !== 'valid') {
    // eslint-disable-next-line react-hooks/set-state-in-effect
      setShowSuggestions(true);
      setSelectedIndex(0);
    } else {
      setShowSuggestions(false);
    }
  }, [inputValue, suggestions.length, validationState]);

  return (
    <div className="flex flex-col h-[280px] sm:h-[320px] lg:h-[350px]">
      {/* Scrollable output area */}
      <div className="flex-1 overflow-y-auto terminal-scroll space-y-2 font-mono text-xs sm:text-sm leading-relaxed pe-2 terminal-text">
        {/* Initial animated commands - hide after first interaction */}
        {!hasInteracted && initialCommands.map((cmd, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -3 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.15, delay: index * 0.2, ease: "easeOut" }}
            className={cn(
              "flex items-start gap-2",
              cmd.type === "command" ? "text-foreground" : "",
              cmd.className
            )}
          >
            {cmd.type === "command" && (
              <ChevronRight className="h-3 w-3 mt-1 text-mpc-green-500/70 flex-shrink-0" />
            )}
            <span className={cmd.type === "output" ? "text-muted-foreground/80" : ""}>
              {cmd.type === "command" ? cmd.content.replace("$ ", "") : cmd.content}
            </span>
          </motion.div>
        ))}

        {/* User-entered commands */}
        {userCommands.map((cmd, index) => (
          <div key={`user-${index}`} className="space-y-1.5">
            <div className="flex items-start gap-2 text-foreground">
              <ChevronRight className="h-3 w-3 mt-1 text-mpc-green-500/70 flex-shrink-0" />
              <span>{cmd.command}</span>
            </div>
            {Array.isArray(cmd.response) ? (
              cmd.response.map((line, i) => {
                // Check if this is an error message
                const isError = typeof line === 'string' && (line.includes('command not found') || line.includes('الأمر غير موجود') || line.includes('bash:'));
                const isSuggestion = typeof line === 'string' && (line.includes('Did you mean') || line.includes('هل تقصد'));
                const isHelp = typeof line === 'string' && (line.includes('Type \'help\'') || line.includes('اكتب'));

                return (
                  <div
                    key={i}
                    className={cn(
                      "ps-5",
                      isError && "text-red-400",
                      isSuggestion && "text-yellow-400",
                      isHelp && "text-muted-foreground/60",
                      !isError && !isSuggestion && !isHelp && "text-muted-foreground/80"
                    )}
                  >
                    {line}
                  </div>
                );
              })
            ) : typeof cmd.response === 'string' ? (
              <div className="text-muted-foreground/80 ps-5">{cmd.response}</div>
            ) : (
              <div className="ps-5">{cmd.response}</div>
            )}
          </div>
        ))}

        {/* Loading indicator */}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 text-mpc-green-500"
          >
            <ChevronRight className="h-3 w-3 flex-shrink-0" />
            <div className="flex gap-1">
              <motion.span
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0 }}
              >
                .
              </motion.span>
              <motion.span
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
              >
                .
              </motion.span>
              <motion.span
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
              >
                .
              </motion.span>
            </div>
          </motion.div>
        )}
      </div>

      {/* Fixed input at bottom */}
      {showInput && (
        <div className="relative flex-shrink-0 mt-2 py-2 px-3 bg-transparent">
          <form onSubmit={handleSubmit} className="flex items-baseline gap-2">
            <span className={cn(
              "transition-colors [text-shadow:0_0_8px_rgba(76,175,80,0.3)] font-mono text-xs sm:text-sm",
              validationState === 'valid' && 'text-mpc-green-500',
              validationState === 'partial' && 'text-yellow-500',
              validationState === 'invalid' && 'text-red-500',
              validationState === 'empty' && 'text-muted-foreground'
            )}>$</span>
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              className="terminal-input-override flex-1 bg-transparent border-none outline-none focus:outline-none focus:ring-0 font-mono text-xs sm:text-sm text-foreground placeholder:text-muted-foreground/30 terminal-text p-0 m-0"
              style={{
                boxShadow: 'none',
                border: 'none',
                WebkitAppearance: 'none',
                MozAppearance: 'none',
                appearance: 'none'
              }}
              autoFocus
              autoComplete="off"
            />
          </form>

          {/* Autocomplete dropdown */}
          <AnimatePresence>
            {showSuggestions && suggestions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="absolute bottom-full left-0 right-0 mb-2 bg-background/95 backdrop-blur-sm border border-border rounded-md shadow-lg overflow-hidden"
              >
                <Command>
                  <CommandList className="max-h-[200px]">
                    <CommandGroup>
                      {suggestions.map((suggestion, index) => (
                        <CommandItem
                          key={suggestion}
                          value={suggestion}
                          onSelect={() => {
                            setInputValue(suggestion);
                            setShowSuggestions(false);
                            inputRef.current?.focus();
                          }}
                          className={cn(
                            "font-mono text-xs sm:text-sm cursor-pointer",
                            index === selectedIndex && "bg-accent"
                          )}
                        >
                          <span className="text-mpc-green-500">{suggestion}</span>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
