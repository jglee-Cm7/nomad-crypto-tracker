import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import {
  Link,
  Outlet,
  useLocation,
  useMatch,
  useNavigate,
  useParams,
} from "react-router-dom";
import styled from "styled-components";
import { getCoin, getTicker } from "../api";
import { ICoin, ITicker } from "../Types/CoinType";
import { FiArrowLeft } from "react-icons/fi";

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
  position: relative;
  display: flex;
  height: 15vh;
  justify-content: center;
  align-items: center;
  padding: 0px 20px;
  a:first-child {
    position: absolute;
    left: 0px;
    font-size: 2.2rem;
    padding: 0.8rem;
  }
`;

const Title = styled.h1`
  font-size: 36px;
  font-weight: 600;
  color: ${(props) => props.theme.accentColor};
`;

const Overview = styled.div`
  background-color: ${(props) => props.theme.sectionBgColor};
  box-shadow: rgb(10 10 10 / 10%) 0px 0.2rem 0.5rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px;
  border-radius: 10px;
`;

const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    margin-bottom: 5px;
  }
`;

const Description = styled.p`
  margin-top: 20px;
  margin-bottom: 20px;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  background-color: ${(props) => props.theme.sectionBgColor};
  box-shadow: rgb(10 10 10 / 10%) 0px 0.2rem 0.5rem;
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
  }
`;

interface CoinParams {
  coinId: string;
}

interface LocationState {
  state: {
    name: string;
  };
}

function Coin() {
  const { coinId } = useParams();
  const { state } = useLocation() as LocationState;
  const priceMatch = useMatch("/:coinId/price");
  const chartMatch = useMatch("/:coinId/chart");
  const navigate = useNavigate();
  const { data: coin, isLoading: coinLoading } = useQuery<ICoin>(
    ["Coin", coinId],
    getCoin
  );
  const { data: ticker, isLoading: tickerLoding } = useQuery<ITicker>(
    ["Ticker", coinId],
    getTicker
  );

  return (
    <Container>
      <Helmet>
        <title>
          {state?.name ? state.name : coinLoading ? "Loading..." : coin?.name}
        </title>
      </Helmet>
      <Header>
        <Link to={`/`}>
          <FiArrowLeft />
        </Link>
        <Title>
          {state?.name ? state.name : coinLoading ? "Loading..." : coin?.name}
        </Title>
      </Header>
      {coinLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>RANK</span>
              <span>{coin?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>SYMBOL</span>
              <span>${coin?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>PRICE</span>
              <span>${ticker?.quotes.USD.price.toFixed(3)}</span>
            </OverviewItem>
          </Overview>
          <Description>{coin?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>TOTAL SUPPLY</span>
              <span>{ticker?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>MAX SUPPLY</span>
              <span>{ticker?.max_supply}</span>
            </OverviewItem>
          </Overview>
          <Tabs>
            <Tab isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>Price</Link>
            </Tab>
            <Tab isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`}>Chart</Link>
            </Tab>
          </Tabs>
          <Outlet context={{ coinId, ticker }} />
        </>
      )}
    </Container>
  );
}

export default Coin;
