import { createContext, useContext } from "react";
export function createStrictContext<T>(name: string) {
  const Ctx = createContext<T | undefined>(undefined);
  const useStrict = () => {
    const v = useContext(Ctx);
    if (!v) throw new Error(`${name} debe usarse dentro de su Provider`);
    return v;
  };
  return [Ctx, useStrict] as const;
}
