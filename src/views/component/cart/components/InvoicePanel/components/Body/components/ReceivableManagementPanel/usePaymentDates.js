import { useState, useLayoutEffect } from "react";
import { DateTime } from "luxon";

export default function usePaymentDates(
  frequency = "monthly",
  installments = 1,
  userStartDate = null,
  forceRecalculate = false
) {
  const [paymentDates, setPaymentDates] = useState([]);
  const [nextPaymentDate, setNextPaymentDate] = useState(null);

  useLayoutEffect(() => {
    if (installments < 1 || installments > 36) {
      setPaymentDates([]);
      setNextPaymentDate(null);
      return;
    }

    const baseDate = forceRecalculate || !userStartDate
      ? DateTime.now().startOf("day")
      : DateTime.fromMillis(userStartDate).startOf("day");

    const interval = {
      weekly: { days: 7 },
      annual: { years: 1 },
      monthly: { months: 1 }
    }[frequency] || { months: 1 };

    const dates = [];
    for (let i = 0; i < installments; i++) {
      let installmentDate;
      if (frequency === "weekly") {
        installmentDate = baseDate.plus({ days: 7 * (i + 1) });
      } else if (frequency === "annual") {
        installmentDate = baseDate.plus({ years: i + 1 });
      } else {
        installmentDate = baseDate.plus({ months: i + 1 });
      }
      dates.push(installmentDate.toMillis());
    }

    setPaymentDates(dates);
    setNextPaymentDate(dates[0] || null);
  }, [frequency, installments, userStartDate, forceRecalculate]);

  return { paymentDates, nextPaymentDate };
}
