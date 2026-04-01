import { createContext, useState, useContext } from 'react';
import type { ReactNode } from 'react';

// กำหนด Type ว่ามีแค่ 2 ภาษา
type Language = 'TH' | 'EN';

// กำหนดโครงสร้างข้อมูลที่ Context จะส่งไปให้ Component อื่นๆ ใช้
interface LanguageContextType {
  lang: Language;
  toggleLang: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// ตัว Provider ที่เอาไปครอบใน main.tsx
export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Language>('TH'); // Default เป็นภาษาไทย

  const toggleLang = () => {
    setLang((prev) => (prev === 'TH' ? 'EN' : 'TH'));
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook สำหรับให้ไฟล์อื่นเรียกใช้แบบสั้นๆ (เช่น const { lang } = useLanguage())
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage ต้องถูกใช้งานอยู่ภายใต้ <LanguageProvider> เท่านั้นเว้ย!');
  }
  return context;
};