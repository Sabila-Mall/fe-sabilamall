import { createStandaloneToast } from "@chakra-ui/react";

const toast = createStandaloneToast();

export const SuccessToast = (title, description) =>
  toast({
    title: title,
    description: description,
    status: "success",
    variant: "subtle",
    duration: 5000,
    position: "top",
    isClosable: true,
  });

export const ErrorToast = (title, description) =>
  toast({
    title: title,
    description: description,
    status: "error",
    variant: "subtle",
    duration: 5000,
    position: "top",
    isClosable: true,
  });
