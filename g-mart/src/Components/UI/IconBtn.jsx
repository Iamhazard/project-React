import { Button, ButtonGroup, VisuallyHidden } from "@chakra-ui/react";
import { GoogleIcon, TwitterIcon, GitHubIcon } from "./IconProvider";
import React from "react";
const providers = [
  {
    name: "Google",
    icon: <GoogleIcon boxSize="5" />,
  },
  {
    name: "Twitter",
    icon: <TwitterIcon boxSize="5" />,
  },
  {
    name: "GitHub",
    icon: <GitHubIcon boxSize="5" />,
  },
];

export const IconBtn = () => (
  <ButtonGroup variant="outline" spacing="4" width="full">
    {providers.map(({ name, icon }) => (
      <Button key={name} width="full">
        <VisuallyHidden>Sign in with {name}</VisuallyHidden>
        {icon}
      </Button>
    ))}
  </ButtonGroup>
);
