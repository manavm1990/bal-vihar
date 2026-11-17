import type { LayoutProps } from "sanity";
import { createGlobalStyle } from "styled-components";

export default function Layout(props: LayoutProps) {
  return (
    <>
      <FontFaces />
      {props.renderDefault(props)}
    </>
  );
}

const FontFaces = createGlobalStyle`
  @font-face {
    font-family: "Baloo 2";
    font-style: normal;
    font-weight: 400 800;
    font-display: swap;
    src: url("/static/fonts/baloo-2-latin.woff2") format("woff2");
  }
`;
