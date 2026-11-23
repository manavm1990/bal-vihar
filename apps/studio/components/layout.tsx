import { Button, Card, Flex, Text } from "@sanity/ui";
import type { LayoutProps } from "sanity";
import { createGlobalStyle } from "styled-components";
import { DEMO_VIEWS } from "../roles";
import useViewAs from "./use-view-as";

export default function Layout(props: LayoutProps) {
  const { switchView, viewAs } = useViewAs();

  return (
    <>
      <FontFaces />
      {!viewAs ? (
        props.renderDefault(props)
      ) : (
        <Flex direction="column" height="fill">
          <Card borderBottom padding={2} tone="caution">
            <Flex align="center" gap={3} justify="center" wrap="wrap">
              <Text size={1}>
                Viewing as <strong>{DEMO_VIEWS[viewAs].title}</strong>: their menus and locked
                fields.
              </Text>
              <Button
                fontSize={1}
                mode="ghost"
                onClick={() => switchView(null)}
                padding={2}
                text="Back to full view"
              />
            </Flex>
          </Card>
          <Flex direction="column" flex={1} overflow="hidden">
            {props.renderDefault(props)}
          </Flex>
        </Flex>
      )}
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
