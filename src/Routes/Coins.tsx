import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getCoins } from "../api";
import { ICoins } from "../Types/CoinType";

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Container = styled.div`
  padding: 0px 20px;
  max-width: 620px;
  margin: 0 auto;
`;
const Header = styled.div`
  display: flex;
  height: 15vh;
  justify-content: center;
  align-items: center;
`;

const CoinList = styled.ul``;

const Coin = styled.li`
  background-color: white;
  color: ${(props) => props.theme.bgColor};
  border-radius: 15px;
  margin-bottom: 10px;
  a {
    display: flex;
    align-items: center;
    transition: color 0.2s ease-in-out;
    padding: 20px;
    img {
      width: 30px;
      height: 30px;
      margin-right: 10px;
    }
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Title = styled.h1`
  font-size: 36px;
  color: ${(props) => props.theme.accentColor};
`;

function Coins() {
  const { data: coins, isLoading: coinsLoading } = useQuery<ICoins[]>(
    ["Coins"],
    getCoins
  );
  return (
    <Container>
      <Helmet>
        <title>Cryptocurrency</title>
      </Helmet>
      <Header>
        <Title>Cryptocurrency</Title>
      </Header>
      {coinsLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinList>
          {coins?.slice(0, 100).map((coin) => (
            <Coin key={coin.id}>
              <Link to={`/${coin.id}`} state={{ name: coin.name }}>
                <img
                  src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                />
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinList>
      )}
    </Container>
  );
}

export default Coins;
