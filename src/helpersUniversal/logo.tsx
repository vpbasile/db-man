import { Box, Image } from '@chakra-ui/react';
import { ReactNode } from 'react';

export default function Logo(props: { url: string, alt: string, bgColor?: string }): JSX.Element {
    return <Box bg={props.bgColor} rounded={'full'}>
        <Image src={props.url} className="h-20 p-3" alt='props.alt' />
    </Box>
}