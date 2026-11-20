import { ArrowRightIcon } from "@sanity/icons/ArrowRight";
import { ClockIcon } from "@sanity/icons/Clock";
import { Box, Container, Flex, Grid, Stack, Text } from "@sanity/ui";
import type { MouseEventHandler, ReactNode } from "react";
import { useColorSchemeValue, useCurrentUser, useWorkspace } from "sanity";
import { useIntentLink, useLink } from "sanity/router";
import { css, keyframes, styled } from "styled-components";
import { getAccess } from "../roles";
import { BRAND } from "../theme";
import { TASK_GROUPS, type Task, type TaskTarget } from "./tasks";
import useDraftCount from "./use-draft-count";

type LinkProps = { href: string; onClick: MouseEventHandler<HTMLElement> };

const STAGGER_MS = 40;

export default function Home() {
  const user = useCurrentUser();
  const scheme = useColorSchemeValue();
  const { canSee, types } = getAccess(user?.id);
  const draftCount = useDraftCount(types);
  const firstName = user?.name?.split(" ")[0];
  const groups = TASK_GROUPS.map((group) => ({
    ...group,
    tasks: group.tasks.filter((task) => canSee(task.section)),
  })).filter((group) => group.tasks.length > 0);
  const groupStarts = groups.map((_, index) =>
    groups.slice(0, index).reduce((total, group) => total + group.tasks.length, 0),
  );

  return (
    <Box height="fill" overflow="auto" data-scheme={scheme}>
      <Hero>
        <Container width={3} paddingX={4} paddingY={5}>
          <Flex align="center" gap={4}>
            <HeroLogo src="/static/logo.svg" alt="" />
            <Stack gap={3}>
              <HeroTitle>{firstName ? `Namaste, ${firstName}` : "Namaste"}</HeroTitle>
              <HeroText>What would you like to change on the website?</HeroText>
            </Stack>
          </Flex>
        </Container>
      </Hero>
      <Container width={3} paddingX={4} paddingY={5}>
        <Stack gap={6}>
          {draftCount > 0 ? (
            <TaskLink target={{ pane: "unpublished" }}>
              {(link) => (
                <WaitingCard {...link} key={draftCount}>
                  <Flex align="center" gap={3}>
                    <Text size={3}>
                      <ClockIcon />
                    </Text>
                    <Stack gap={2}>
                      <Text size={2} weight="semibold">
                        {draftCount === 1
                          ? "1 change is not published yet"
                          : `${draftCount} changes are not published yet`}
                      </Text>
                      <Text size={1} muted>
                        Open them and click Publish so they show on the website.
                      </Text>
                    </Stack>
                  </Flex>
                </WaitingCard>
              )}
            </TaskLink>
          ) : null}

          {groups.map((group, groupIndex) => (
            <Stack as="section" gap={4} key={group.title}>
              <GroupTitle>{group.title}</GroupTitle>
              <Grid gridTemplateColumns={[1, 1, 2, 3]} gap={3}>
                {group.tasks.map((task, index) => (
                  <TaskCard
                    key={task.title}
                    task={task}
                    delay={((groupStarts[groupIndex] ?? 0) + index) * STAGGER_MS}
                  />
                ))}
              </Grid>
            </Stack>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}

function IntentTaskLink({
  target,
  children,
}: {
  target: Extract<TaskTarget, { intent: string }>;
  children: (link: LinkProps) => ReactNode;
}) {
  return children(useIntentLink({ intent: target.intent, params: target.params }));
}

function PaneTaskLink({
  pane,
  children,
}: {
  pane: string;
  children: (link: LinkProps) => ReactNode;
}) {
  const { basePath } = useWorkspace();
  const href = `${basePath.replace(/\/$/, "")}/structure/${pane}`;
  const { onClick } = useLink({ href });

  return children({ href, onClick });
}

function TaskCard({ task, delay }: { task: Task; delay: number }) {
  const Icon = task.icon;

  return (
    <TaskLink target={task.target}>
      {(link) => (
        <LinkCard {...link} delay={delay}>
          <Flex gap={4} align="flex-start">
            <IconBubble>
              <Icon />
            </IconBubble>
            <Stack gap={3} flex={1}>
              <CardTitle>{task.title}</CardTitle>
              <Text size={1} muted>
                {task.description}
              </Text>
            </Stack>
            <CardArrow>
              <ArrowRightIcon />
            </CardArrow>
          </Flex>
        </LinkCard>
      )}
    </TaskLink>
  );
}

function TaskLink({
  target,
  children,
}: {
  target: TaskTarget;
  children: (link: LinkProps) => ReactNode;
}) {
  return "pane" in target ? (
    <PaneTaskLink pane={target.pane}>{children}</PaneTaskLink>
  ) : (
    <IntentTaskLink target={target}>{children}</IntentTaskLink>
  );
}

const fadeUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(8px);
  }
`;

const nudge = keyframes`
  0%,
  100% {
    transform: scale(1);
  }
  40% {
    transform: scale(1.015);
  }
`;

const popIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.9);
  }
`;

const REDUCED_MOTION = css`
  @media (prefers-reduced-motion: reduce) {
    animation: none;
    transition: none;
  }
`;

const CardArrow = styled.span`
  flex: none;
  align-self: center;
  font-size: 22px;
  color: ${BRAND.saffronInk};
  opacity: 0;
  transform: translateX(-6px);
  transition: opacity 160ms, transform 160ms;

  [data-scheme="dark"] & {
    color: ${BRAND.saffron};
  }

  ${REDUCED_MOTION}
`;

const CardTitle = styled.h3`
  margin: 0;
  font-family: "Baloo 2", var(--font-family-base, sans-serif);
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.2;
  color: ${BRAND.navy};

  [data-scheme="dark"] & {
    color: #fff;
  }
`;

const GroupTitle = styled.h2`
  margin: 0;
  font-family: "Baloo 2", var(--font-family-base, sans-serif);
  font-size: 1.5rem;
  font-weight: 700;
  color: ${BRAND.navy};

  [data-scheme="dark"] & {
    color: #fff;
  }
`;

const Hero = styled.header`
  background: ${BRAND.navyDark};
  border-bottom: 6px solid ${BRAND.saffron};
  color: #fff;
`;

const HeroLogo = styled.img`
  width: 72px;
  height: 72px;
  flex: none;
  padding: 6px;
  border-radius: 50%;
  background: #fff;
  animation: ${popIn} 400ms cubic-bezier(0.2, 0.8, 0.2, 1) backwards;

  ${REDUCED_MOTION}
`;

const HeroText = styled.p`
  margin: 0;
  font-size: 1.125rem;
  color: rgb(255 255 255 / 0.85);
  animation: ${fadeUp} 400ms 120ms ease-out backwards;

  ${REDUCED_MOTION}
`;

const HeroTitle = styled.h1`
  margin: 0;
  font-family: "Baloo 2", var(--font-family-base, sans-serif);
  font-size: 2.25rem;
  font-weight: 700;
  line-height: 1.1;
  animation: ${fadeUp} 400ms 60ms ease-out backwards;

  ${REDUCED_MOTION}
`;

const IconBubble = styled.span`
  display: inline-flex;
  flex: none;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: ${BRAND.cream};
  color: ${BRAND.saffronInk};
  font-size: 30px;

  [data-scheme="dark"] & {
    background: rgb(255 153 52 / 0.15);
    color: ${BRAND.saffron};
  }
`;

const LinkCard = styled.a.withConfig({ shouldForwardProp: (prop) => prop !== "delay" })<{
  delay: number;
}>`
  display: block;
  height: 100%;
  box-sizing: border-box;
  padding: 20px;
  border: 1px solid #dfe1e6;
  border-radius: 12px;
  background: #fff;
  color: inherit;
  text-decoration: none;
  animation: ${fadeUp} 360ms ${({ delay }) => delay}ms ease-out backwards;
  transition: border-color 160ms, transform 160ms, box-shadow 160ms;

  [data-scheme="dark"] & {
    border-color: rgb(255 255 255 / 0.12);
    background: rgb(255 255 255 / 0.04);
  }

  &:hover,
  &:focus-visible {
    border-color: ${BRAND.saffron};
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgb(27 37 76 / 0.12);
  }

  &:hover ${CardArrow}, &:focus-visible ${CardArrow} {
    opacity: 1;
    transform: translateX(0);
  }

  &:active {
    transform: translateY(-1px);
  }

  &:focus-visible {
    outline: 3px solid ${BRAND.saffronInk};
    outline-offset: 2px;
  }

  ${REDUCED_MOTION}
`;

const WaitingCard = styled.a`
  display: block;
  padding: 16px 20px;
  border: 1px solid ${BRAND.saffron};
  border-radius: 12px;
  background: ${BRAND.cream};
  color: inherit;
  text-decoration: none;
  animation:
    ${fadeUp} 360ms ease-out backwards,
    ${nudge} 600ms 400ms ease-in-out;

  [data-scheme="dark"] & {
    background: rgb(255 153 52 / 0.12);
  }

  &:focus-visible {
    outline: 3px solid ${BRAND.saffronInk};
    outline-offset: 2px;
  }

  ${REDUCED_MOTION}
`;
