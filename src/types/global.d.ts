interface Window {
  turnstile?: {
    render: (container: string | HTMLElement, options: object) => string;
    reset: (widgetId: string) => void;
    getResponse: (widgetId: string) => string | undefined;
    remove: (widgetId: string) => void;
  };
} 