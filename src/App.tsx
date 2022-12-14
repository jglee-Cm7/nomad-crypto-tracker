import { useState } from "react";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import Router from "./Router";
import { darkTheme, lightTheme } from "./theme";
import { MdDarkMode, MdLightMode } from "react-icons/md";

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap');
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}
body {
  line-height: 1;
}
menu, ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
* {
  box-sizing: border-box;
}
body {
  font-family: 'Source Sans Pro', sans-serif;
  background-color:${(props) => props.theme.bgColor};
  color:${(props) => props.theme.textColor};
  transition: background-color 0.3s ease 0s, box-shadow 0.3s ease 0s;
}
a {
  text-decoration:none;
  color:inherit;
}
`;

const FloatingButton = styled.button`
  position: absolute;
  margin: 20px;
  top: 0;
  right: 0;
  width: 60px;
  height: 60px;
  border-radius: 30px;
  box-shadow: rgb(10 10 10 / 10%) 0px 0.2rem 0.5rem;

  cursor: pointer;
  font-size: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function App() {
  const [theme, setTheme] = useState(darkTheme);
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Router />
        <FloatingButton
          onClick={() => {
            if (theme === darkTheme) setTheme(lightTheme);
            else setTheme(darkTheme);
          }}
        >
          {theme === darkTheme ? <MdLightMode /> : <MdDarkMode />}
        </FloatingButton>
      </ThemeProvider>
    </>
  );
}

export default App;
