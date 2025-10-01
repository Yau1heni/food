import { useEffect, useRef } from 'react';

export type LocalStore = {
  /**
   * Любой локальный store должен реализовывать метод destroy,
   * в котором реализована логика разрушения стора при демонтировании компонента
   */
  destroy(): void;
};

// сделаем функцию дженериком <T>, это значит что она принимает
// функцию creator, которая возвращает сущность типа T и сама
// функция useLocalStore возвращает сущность типа T
export const useLocalStore = <T extends LocalStore>(creator: () => T): T => {
  // повторили логику создания из компонента
  const container = useRef<null | T>(null);
  if (container.current === null) {
    container.current = creator();
  }

  useEffect(() => {
    return () => container.current?.destroy();
  }, []);

  return container.current;
};
