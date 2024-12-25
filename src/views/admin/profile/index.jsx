import { Box } from "@chakra-ui/react";
import Projects from "views/admin/profile/components/Projects";
import React from "react";

export default function Overview() {
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Projects/>
    </Box>
  );
}
