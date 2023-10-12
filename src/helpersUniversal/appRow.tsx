import { Box, Heading } from "@chakra-ui/react";
import React from "react";

export default function AppRow(props: { children: React.ReactNode, id?: string, headingText?: string }): React.ReactNode {
    return (
        <Box maxWidth={'container.lg'} id={props.id || "defaultID"} w='100%' p={4} borderTop={'3px'} >
            {props.headingText && <Heading as='h2' size='xl'>{props.headingText}</Heading>}
            {props.children}
        </Box>
    )
}