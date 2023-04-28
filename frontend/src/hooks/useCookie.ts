import Cookies from 'js-cookie';
import { useState } from 'react';

export default function useCookie(name: string, defaultVal = null) {
  const [cookieValue, setCookieValue] = useState(() => {
    const value = Cookies.get(name);
    if (value) return JSON.parse(value);

    if (!defaultVal) return null;
    Cookies.set(name, JSON.stringify(defaultVal));
    return defaultVal;
  });

  const setValue = (value: unknown) => {
    Cookies.set(name, JSON.stringify(value));
    setCookieValue(value);
  };

  return [cookieValue, setValue] as [unknown, (value: unknown) => void];
}
