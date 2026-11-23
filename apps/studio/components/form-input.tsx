import { ArrowLeftIcon } from "@sanity/icons/ArrowLeft";
import { HomeIcon } from "@sanity/icons/Home";
import { Button, Flex } from "@sanity/ui";
import type { InputProps } from "sanity";
import { type RouterState, useRouter, useRouterState } from "sanity/router";
import { usePaneRouter } from "sanity/structure";

export default function FormInput(props: InputProps) {
  return props.path.length > 0 ? (
    props.renderDefault(props)
  ) : (
    <>
      <DocumentNav />
      {props.renderDefault(props)}
    </>
  );
}

function DocumentNav() {
  const tool = useRouterState(selectTool);
  const { closeCurrent, index } = usePaneRouter();
  const { navigate } = useRouter();

  return tool !== "structure" || index === 0 ? null : (
    <Flex gap={2} marginBottom={5}>
      <Button icon={ArrowLeftIcon} mode="ghost" onClick={closeCurrent} text="Back" />
      <Button icon={HomeIcon} mode="bleed" onClick={() => navigate({ tool: "home" })} text="Home" />
    </Flex>
  );
}

const selectTool = (state: RouterState) => state["tool"];
