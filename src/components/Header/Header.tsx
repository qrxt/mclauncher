import React from "react";
import { useTranslation } from "react-i18next";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Container,
  Link,
  Stack,
  Tab,
  TabList,
  Tabs,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  headerStyles,
  navigationStyles,
  controlLinkStyles,
} from "./Header.style";
import { indexOf } from "lodash";

interface HeaderControlProps {
  children: React.ReactNode;
  to: string;
}

function MenuItem(props: HeaderControlProps) {
  const { children, to } = props;

  return (
    <Link as={RouterLink} to={to} css={controlLinkStyles}>
      <Tab>{children}</Tab>
    </Link>
  );
}

interface HeaderProps {
  selectedTab: string;
}

function Header(props: HeaderProps) {
  const { selectedTab } = props;
  const { t } = useTranslation();
  const tabs = ["instances", "settings"];
  const index = indexOf(tabs, selectedTab);

  return (
    <header css={headerStyles}>
      <Box
        as="nav"
        css={navigationStyles}
        boxShadow={useColorModeValue("sm", "sm-dark")}
        width="100%"
      >
        <Container maxW="l" py={0}>
          <Stack
            spacing={8}
            justify={"flex-start"}
            direction="row"
            pt={[4, 4, 0, 0]}
          >
            <Tabs isFitted isManual index={index} colorScheme="purple">
              <TabList>
                <MenuItem to="/">
                  {t("header.controls.instances.name")}
                </MenuItem>
                <MenuItem to="/settings">
                  {t("header.controls.settings.name")}
                </MenuItem>
              </TabList>
            </Tabs>
          </Stack>
        </Container>
      </Box>
    </header>
  );
}

export default Header;
