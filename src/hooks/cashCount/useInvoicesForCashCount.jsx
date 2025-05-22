import { useEffect, useState } from "react";
import { fbLoadInvoicesForCashCount } from "../../firebase/cashCount/fbLoadInvoicesForCashCount";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/auth/userSlice";
import { useQuery } from "@tanstack/react-query";

export const useInvoicesForCashCount = (cashCountId) => {
  const user = useSelector(selectUser)

  const query = useQuery({
    queryKey: ['invoices', user?.businessID, cashCountId],
    queryFn: () => fbLoadInvoicesForCashCount(user, cashCountId),
    enabled: !!user?.businessID && !!cashCountId,
  });

  return {
    data: query.data,
    loading: query.isLoading,
    error: query.error,
    count: query.data?.length || 0,
    refetch: query.refetch,
  };
};
