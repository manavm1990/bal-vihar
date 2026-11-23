import { CheckmarkIcon } from "@sanity/icons/Checkmark";
import { EyeOpenIcon } from "@sanity/icons/EyeOpen";
import { Button, Flex, Menu, MenuButton, MenuDivider, MenuItem } from "@sanity/ui";
import type { ToolMenuProps } from "sanity";
import { DEMO_VIEWS, isDemoView } from "../roles";
import useViewAs from "./use-view-as";

const VIEW_IDS = Object.keys(DEMO_VIEWS).filter(isDemoView);

export default function ToolMenu(props: ToolMenuProps) {
  const { canSwitch, switchView, viewAs } = useViewAs();
  const isTopbar = props.context === "topbar";

  return !canSwitch ? (
    props.renderDefault(props)
  ) : (
    <Flex align={isTopbar ? "center" : "stretch"} direction={isTopbar ? "row" : "column"} gap={2}>
      {props.renderDefault(props)}
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
    </Flex>
  );
}
