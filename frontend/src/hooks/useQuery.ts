import { useLocation } from "react-router-dom";
import React from "react";
import { number } from "prop-types";

export function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

export const getQuery = (query: any, param: string, defaultValue: any=undefined) => {
  const value = query.get(param);
  if (value === null) return defaultValue;
  return value;
}