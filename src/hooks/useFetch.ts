import { useState, useCallback, useEffect } from 'react';

type ApiFunction<T, P extends unknown[]> = (...args: P) => Promise<T>;

type ApiResponse<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};

type UseFetch<T, P extends unknown[]> = ApiResponse<T> & {
  execute: (...args: P) => Promise<void>;
};

export const useFetch = <T, P extends unknown[] = []>(
  apiFunction: ApiFunction<T, P>,
  ...args: P
): UseFetch<T, P> => {
  const [state, setState] = useState<ApiResponse<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (...callArgs: P) => {
      // если в аргументах есть undefined/null → не выполняем запрос
      if (callArgs.some((arg) => arg === undefined || arg === null)) return;

      setState({ data: null, loading: true, error: null });
      try {
        const data = await apiFunction(...callArgs);
        setState({ data, loading: false, error: null });
      } catch (e) {
        setState({
          data: null,
          loading: false,
          error: e instanceof Error ? e.message : String(e),
        });
      }
    },
    [apiFunction]
  );

  useEffect(() => {
    execute(...args);
  }, [execute, ...args]);

  return {
    ...state,
    execute,
  };
};
