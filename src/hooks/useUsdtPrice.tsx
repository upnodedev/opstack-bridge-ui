import React, { useState } from "react";
import { useInterval } from "./useInterval";

export const useUsdtPrice = (tokenName: string, ms = 3000) => {
  const [price, setPrice] = useState<number | undefined>(undefined);
  useInterval(() => {
    fetch(
      `https://api.binance.com/api/v3/ticker/price?symbol=${tokenName.toUpperCase()}USDT`,
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.price !== price) {
          setPrice(parseFloat(data.price));
        }
      });
  }, ms);

  if (!tokenName) {
    return undefined;
  }

  return price;
};
