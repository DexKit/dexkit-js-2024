'use client';

import { createContext, useContext, useState } from 'react';

type CaptchaContextType = {
  setCaptchaToken: (token: string) => void;
  captchaToken: string | null;
};

const CaptchaContext = createContext<CaptchaContextType>({
  setCaptchaToken: () => {},
  captchaToken: null
});

export const CaptchaProvider = ({ children }: { children: React.ReactNode }) => {
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  return (
    <CaptchaContext.Provider value={{ captchaToken, setCaptchaToken }}>
      {children}
    </CaptchaContext.Provider>
  );
};

export const useCaptcha = () => useContext(CaptchaContext); 