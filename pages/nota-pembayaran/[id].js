import { Box } from "@chakra-ui/react";
import dynamic from "next/dynamic";

const PDFViewer = dynamic(() => import("../../components/PDFViewer"), {
  ssr: false,
});
export default function PDF() {
  return (
    <Box h="100%">
      <PDFViewer />
    </Box>
  );
}
