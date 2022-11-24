import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Button,
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

import { useToast } from '@chakra-ui/react';
import { useInput } from '../../utils/forms';

import { Auth } from "aws-amplify";

export function Page() {
    const toast = useToast();

    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const { value: email, bind: bindEmail } = useInput("");
    const { value: password, bind: bindPassword } = useInput("");
    const { value: confirmPassword, bind: bindConfirmPassword } = useInput("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        if (password !== confirmPassword) {
            toast({
                title: "Account Creation Failed",
                description: "Password and Confirm Password should be same",
                status: "error",
                duration: 5000,
                isClosable: true,
                // position: "top-right"
            });
        } else {
            try {
                await Auth.signUp({
                    username: email,
                    password: confirmPassword,
                    attributes: {
                        email,
                    },
                    autoSignIn: {
                        enabled: true,
                    }
                });
                navigate("/confirmation/"+btoa(email));
            } catch (error) {
                console.error(error);
                toast({
                    title: "Account Creation Failed",
                    description: error.message,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    // position: "top-right"
                });
            }
        }
        setIsLoading(false);
    };

    return (
        <Center h={'100%'}>
            <Container
                maxW="md"
                py={{
                    base: '12',
                    md: '24',
                }}
            >
                <Stack spacing="8">
                    <Stack spacing="6" align="center">

                        <Stack spacing="3" textAlign="center">
                            <Heading
                                size={useBreakpointValue({
                                    base: 'xs',
                                    md: 'sm',
                                })}
                            >
                                Create an account
                            </Heading>
                            <Text color="muted">Start making your dreams come true</Text>
                        </Stack>

                    </Stack>
                    <Stack spacing="6">

                        <Stack spacing="5">
                            <FormControl isRequired>
                                <FormLabel htmlFor="email">Email</FormLabel>
                                <Input id="email" type="email" {...bindEmail}/>
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel htmlFor="password">Password</FormLabel>
                                <Input id="password" type="password" {...bindPassword}/>
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel htmlFor="confirm-password">Confirm Password</FormLabel>
                                <Input id="confirm-password" type="password" {...bindConfirmPassword}/>
                            </FormControl>
                        </Stack>

                        <Stack spacing="4">
                            <Button variant="primary" isLoading={isLoading} onClick={handleSubmit}>Create account</Button>
                        </Stack>

                    </Stack>
                    <HStack justify="center" spacing="1">

                        <Text fontSize="sm" color="muted">
                            Already have an account?
                        </Text>
                        <Button variant="link" colorScheme="blue" size="sm">
                            <Link href="/signin">Log in</Link>
                        </Button>
                        

                    </HStack>
                </Stack>
            </Container>
        </Center>
    )
}