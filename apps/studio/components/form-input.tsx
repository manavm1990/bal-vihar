import { ArrowLeftIcon } from "@sanity/icons/ArrowLeft";
import { HomeIcon } from "@sanity/icons/Home";
import { Button, Flex, Spinner } from "@sanity/ui";
import { Suspense } from "react";
import { type InputProps, isObjectInputProps } from "sanity";
import { type RouterState, useRouter, useRouterState } from "sanity/router";
import { usePaneRouter } from "sanity/structure";
import MemberInput from "./member-input";

const MEMBER_TYPE = "studioMember";

export default function FormInput(props: InputProps) {
  if (isObjectInputProps(props) && isMemberType(props.schemaType))
    return (
      <Suspense fallback={<Spinner muted />}>
        <MemberInput {...props} />
      </Suspense>
    );

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

const isMemberType = (schemaType: { name: string; type?: { name: string } }) =>
  schemaType.name === MEMBER_TYPE || schemaType.type?.name === MEMBER_TYPE;

const selectTool = (state: RouterState) => state["tool"];
