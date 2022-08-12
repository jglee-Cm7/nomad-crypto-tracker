import { useOutletContext } from "react-router-dom";
import styled from "styled-components";
import { ITicker } from "../Types/CoinType";
import { MdTrendingFlat, MdTrendingUp, MdTrendingDown } from "react-icons/md";

const Container = styled.div``;

const Overview = styled.div`
  background-color: ${(props) => props.theme.sectionBgColor};
  box-shadow: rgb(10 10 10 / 10%) 0px 0.2rem 0.5rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 20px 10px;
  border-radius: 10px;
`;

const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const AthPrice = styled.span`
  font-size: 28px;
  font-weight: 600;
`;

const SectionList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: 6rem;
  gap: 1rem;
  margin-top: 20px;
  margin-bottom: 100px;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.sectionBgColor};
  box-shadow: rgb(10 10 10 / 10%) 0px 0.2rem 0.5rem;
  padding: 1.3rem;
  border-radius: 10px;
  justify-content: space-between;
`;

const Item = styled.div<{ ticks: number }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 28px;
  color: ${(props) =>
    props.ticks > 0 ? "green" : props.ticks < 0 ? "red" : "gray"};
`;

const SectionTitle = styled.span`
  font-size: 14px;
`;
const Fluctuation = styled.span`
  font-size: 28px;
`;

interface PriceProps {
  ticker: ITicker;
}

function Price() {
  const { ticker } = useOutletContext<PriceProps>();

  return (
    <Container>
      <Overview>
        <OverviewItem>
          <span style={{ marginBottom: 10 }}>{ticker.quotes.USD.ath_date}</span>
          <span>최고가 달성</span>
        </OverviewItem>
        <OverviewItem>
          <AthPrice>${ticker.quotes.USD.ath_price.toFixed(3)}</AthPrice>
        </OverviewItem>
      </Overview>
      <SectionList>
        <Section>
          <SectionTitle>1시간 전보다</SectionTitle>
          <Item ticks={ticker.quotes.USD.percent_change_1h}>
            <Fluctuation>{ticker.quotes.USD.percent_change_1h}%</Fluctuation>
            {ticker.quotes.USD.percent_change_1h > 0 ? (
              <MdTrendingUp />
            ) : ticker.quotes.USD.percent_change_1h < 0 ? (
              <MdTrendingDown />
            ) : (
              <MdTrendingFlat />
            )}
          </Item>
        </Section>
        <Section>
          <SectionTitle>6시간 전보다</SectionTitle>
          <Item ticks={ticker.quotes.USD.percent_change_6h}>
            <Fluctuation>{ticker.quotes.USD.percent_change_6h}%</Fluctuation>
            {ticker.quotes.USD.percent_change_6h > 0 ? (
              <MdTrendingUp />
            ) : ticker.quotes.USD.percent_change_6h < 0 ? (
              <MdTrendingDown />
            ) : (
              <MdTrendingFlat />
            )}
          </Item>
        </Section>
        <Section>
          <SectionTitle>12시간 전보다</SectionTitle>
          <Item ticks={ticker.quotes.USD.percent_change_12h}>
            <Fluctuation>{ticker.quotes.USD.percent_change_12h}%</Fluctuation>
            {ticker.quotes.USD.percent_change_12h > 0 ? (
              <MdTrendingUp />
            ) : ticker.quotes.USD.percent_change_12h < 0 ? (
              <MdTrendingDown />
            ) : (
              <MdTrendingFlat />
            )}
          </Item>
        </Section>
        <Section>
          <SectionTitle>24시간 전보다</SectionTitle>
          <Item ticks={ticker.quotes.USD.percent_change_24h}>
            <Fluctuation>{ticker.quotes.USD.percent_change_24h}%</Fluctuation>
            {ticker.quotes.USD.percent_change_24h > 0 ? (
              <MdTrendingUp />
            ) : ticker.quotes.USD.percent_change_24h < 0 ? (
              <MdTrendingDown />
            ) : (
              <MdTrendingFlat />
            )}
          </Item>
        </Section>
        <Section>
          <SectionTitle>7일 전보다</SectionTitle>
          <Item ticks={ticker.quotes.USD.percent_change_7d}>
            <Fluctuation>{ticker.quotes.USD.percent_change_7d}%</Fluctuation>
            {ticker.quotes.USD.percent_change_7d > 0 ? (
              <MdTrendingUp />
            ) : ticker.quotes.USD.percent_change_7d < 0 ? (
              <MdTrendingDown />
            ) : (
              <MdTrendingFlat />
            )}
          </Item>
        </Section>
        <Section>
          <SectionTitle>30일 전보다</SectionTitle>
          <Item ticks={ticker.quotes.USD.percent_change_30d}>
            <Fluctuation>{ticker.quotes.USD.percent_change_30d}%</Fluctuation>
            {ticker.quotes.USD.percent_change_30d > 0 ? (
              <MdTrendingUp />
            ) : ticker.quotes.USD.percent_change_30d < 0 ? (
              <MdTrendingDown />
            ) : (
              <MdTrendingFlat />
            )}
          </Item>
        </Section>
      </SectionList>
    </Container>
  );
}

export default Price;
