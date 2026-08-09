import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from 'react';
import type { User } from '../types/User';

type GuestContextType = {
  guest: User | null;
  setGuest: React.Dispatch<React.SetStateAction<User | null>>;

  guests: User[];
  setGuests: React.Dispatch<React.SetStateAction<User[]>>;
};

const GuestContext = createContext<
  GuestContextType | undefined
>(undefined);

export function GuestProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [guest, setGuest] = useState<User | null>(null);
  const [guests, setGuests] = useState<User[]>([]);

  return (
    <GuestContext.Provider
      value={{
        guest,
        setGuest,
        guests,
        setGuests,
      }}
    >
      {children}
    </GuestContext.Provider>
  );
}

export function useGuest() {
  const context = useContext(GuestContext);

  if (!context) {
    throw new Error(
      'useGuest must be used within GuestProvider'
    );
  }

  return context;
}