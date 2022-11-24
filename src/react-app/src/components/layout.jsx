import { Box, Flex, Container } from '@chakra-ui/react'

export const Layout = ({ navbar, sidebar, content, footer, raw }) => {
    return (
        <Flex direction="column" flex="1">

            <Flex direction="row" flex="1" maxH="100vh">
                {sidebar}
                <Flex direction="column" flex="1" overflow="scroll">
                    <Box as="nav" role="navigation">
                        {navbar}
                    </Box>
                    {raw ? content : <Flex as="main" role="main" direction="column" flex="1" py="16" h={'100vh'}>
                        <Container flex="1">{content}</Container>
                    </Flex>}
                </Flex>
            </Flex>


            <Box as="footer" role="contentinfo">
                {footer}
            </Box>

        </Flex>
    )
}