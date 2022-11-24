import {
    Button,
    Checkbox,
    Container,
    FormControl,
    FormLabel,
    Heading,
    HStack,
    Input,
    Stack,
    Text,
    Center,
    Link,
    
    useBreakpointValue,
} from '@chakra-ui/react';

export const Page = () => (
    <Center h={'100%'}>
        <Container maxW="md" py={{ base: '12', md: '24' }}>
            <Stack spacing="8">
                <Stack spacing="6">

                    <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
                        <Heading size={useBreakpointValue({ base: 'xs', md: 'sm' })}>
                            Log in to your account
                        </Heading>
                        <Text color="muted">Start making your dreams come true</Text>
                    </Stack>

                </Stack>
                <Stack spacing="6">

                    <Stack spacing="5">
                        <FormControl>
                            <FormLabel htmlFor="email">Email</FormLabel>
                            <Input id="email" placeholder="Enter your email" type="email" />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="password">Password</FormLabel>
                            <Input id="password" placeholder="********" type="password" />
                        </FormControl>
                    </Stack>

                    <HStack justify="space-between">
                        <Checkbox defaultChecked>Remember me</Checkbox>
                        <Button variant="link" colorScheme="blue" size="sm">
                            Forgot password
                        </Button>
                    </HStack>

                    <Stack spacing="4">
                        <Button variant="primary">Sign in</Button>
                    </Stack>

                </Stack>
                <HStack spacing="1" justify="center">

                    <Text fontSize="sm" color="muted">
                        Don't have an account?
                    </Text>
                    <Button variant="link" colorScheme="blue" size="sm">
                        <Link href="/signup">Sign up</Link>
                    </Button>

                </HStack>
            </Stack>
        </Container>
    </Center>
)