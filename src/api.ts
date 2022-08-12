export const getCoins = () => {
  return fetch(`https://api.coinpaprika.com/v1/coins`).then((res) =>
    res.json()
  );
};

export const getCoin = ({ queryKey }: any) => {
  const [_key, coinId] = queryKey;
  return fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`).then((res) =>
    res.json()
  );
};

export const getTicker = ({ queryKey }: any) => {
  const [_key, coinId] = queryKey;
  return fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`).then((res) =>
    res.json()
  );
};

export const getOhlcv = ({ queryKey }: any) => {
  const [_key, coinId] = queryKey;
  return fetch(
    `https://ohlcv-api.nomadcoders.workers.dev/?coinId=${coinId}`
  ).then((res) => res.json());
};
