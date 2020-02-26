import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
 :root {
    --bg: #121212;
    --primary: #8dc9fa;
    --primary-hover: #91cbfa;
    --secondary: #ffc97d;
    --secondary-hover: #fecb82;
    --white: #ffffff;
    --hi-emph: rgba(255,255,255,0.87);
    --med-emph: rgba(255,255,255,0.60);
    --lo-emph: rgba(255,255,255,0.38);
    --dp-1: #1d1d1d;
    --dp-2: #222222;
    --dp-3: #252525;
    --dp-4: #272727;
    --dp-6: #2c2c2c;
  }
  body {
      background: var(--bg);
  }
  a {
    color: var(--hi-emph);
    text-decoration: none;
  }
`;
