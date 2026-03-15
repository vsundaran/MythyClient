import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { createMMKV } from 'react-native-mmkv';

const storage = createMMKV({ id: 'auth-storage' });

const mmkvStorage = {
  setItem: (name: string, value: string) => storage.set(name, value),
  getItem: (name: string) => storage.getString(name) ?? null,
  removeItem: (name: string) => storage.remove(name),
};

interface BabyProfile {
  nickname: string;
  gender: 'girl' | 'boy';
  dob: string;
  weight: number;
}

interface AuthState {
  user: any | null;
  token: string | null;
  isAuthenticated: boolean;
  isUserDataComplete: boolean;
  isBabyProfileComplete: boolean;
  isConsentGiven: boolean;
  babyProfile: BabyProfile | null;
  login: (user: any, token: string) => void;
  logout: () => void;
  setUserDataComplete: (value: boolean) => void;
  setBabyProfile: (profile: BabyProfile) => void;
  setBabyProfileComplete: (value: boolean) => void;
  setConsentGiven: (value: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isUserDataComplete: false,
      isBabyProfileComplete: false,
      isConsentGiven: false,
      babyProfile: null,

      login: (user, token) =>
        set({
          user,
          token,
          isAuthenticated: true,
        }),

      logout: () =>
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isUserDataComplete: false,
          isBabyProfileComplete: false,
          isConsentGiven: false,
          babyProfile: null,
        }),

      setUserDataComplete: (value) => set({ isUserDataComplete: value }),
      setBabyProfile: (profile) => set({ babyProfile: profile }),
      setBabyProfileComplete: (value) => set({ isBabyProfileComplete: value }),
      setConsentGiven: (value) => set({ isConsentGiven: value }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => mmkvStorage),
    }
  )
);
