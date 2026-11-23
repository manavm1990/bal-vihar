import { CheckmarkIcon } from "@sanity/icons/Checkmark";
import { EyeOpenIcon } from "@sanity/icons/EyeOpen";
import { Button, Flex } from "@sanity/ui";
import { Menu, MenuButton, MenuDivider, MenuItem } from "@sanity/ui/menu";
import type { Tool, ToolMenuProps } from "sanity";
import { useStateLink } from "sanity/router";
import { DEMO_VIEWS, isDemoView } from "../roles";
import useViewAs from "./use-view-as";

const VIEW_IDS = Object.keys(DEMO_VIEWS).filter(isDemoView);

export default function ToolMenu(props: ToolMenuProps) {
  const { canSwitch } = useViewAs();

  return props.context !== "topbar" ? (
    <Flex direction="column" gap={2}>
      {props.renderDefault(props)}
      {canSwitch ? <ViewAsMenu /> : null}
    </Flex>
  ) : (
    <Flex align="center" gap={2}>
      {props.tools.map((tool) => (
        <ToolButton key={tool.name} isActive={tool.name === props.activeToolName} tool={tool} />
      ))}
      {canSwitch ? <ViewAsMenu /> : null}
    </Flex>
  );
}

type ToolButtonProps = { isActive: boolean; tool: Tool };

function ToolButton({ isActive, tool }: ToolButtonProps) {
  const link = useStateLink({ state: { tool: tool.name } });

  return (
    <Button
      {...link}
      aria-current={isActive ? "page" : undefined}
      as="a"
      fontSize={2}
      icon={tool.icon}
      mode={isActive ? "default" : "bleed"}
      padding={3}
      selected={isActive}
      text={tool.title}
      tone={isActive ? "primary" : "default"}
    />
  );
}

function ViewAsMenu() {
  const { switchView, viewAs } = useViewAs();

  return (
    <MenuButton
      id="view-as"
      button={
        <Button
          icon={EyeOpenIcon}
          mode={viewAs ? "default" : "bleed"}
          text={viewAs ? DEMO_VIEWS[viewAs].title : "View as"}
          tone={viewAs ? "caution" : "default"}
        />
      }
      menu={
        <Menu>
          <MenuItem
            iconRight={viewAs ? undefined : CheckmarkIcon}
            onClick={() => switchView(null)}
            pressed={!viewAs}
            text="Everyone (full view)"
          />
          <MenuDivider />
          {VIEW_IDS.map((id) => (
            <MenuItem
              key={id}
              iconRight={viewAs === id ? CheckmarkIcon : undefined}
              onClick={() => switchView(id)}
              pressed={viewAs === id}
              text={DEMO_VIEWS[id].title}
            />
          ))}
        </Menu>
      }
      popover={{ portal: true, placement: "bottom-end" }}
    />
  );
}
