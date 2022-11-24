import { useEffect, useState } from 'react';
import { useParams, useNavigate, redirect } from 'react-router-dom';
import {
    Button,
    Container,
    Heading,
    HStack,
    Stack,
    Text,
    Center,
    PinInput,
    PinInputField,

    useToast,
    useColorModeValue,
    useBreakpointValue,
} from '@chakra-ui/react';

import { useInput } from '../../utils/forms';

import { Auth } from "aws-amplify";

export function Page() {
    const toast = useToast();

    const { uid } = useParams();
    const [ uniqueID, setUniqueID] = useState(uid);

    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const { value: code, bind: bindCode, reset: resetCodeInput } = useInput("", true);

    useEffect(() => {
        try {
            setUniqueID(atob(uid));
            if (!/\S+@\S+\.\S+/.test(uniqueID)) redirect("/signin");
        } catch (error) {
            navigate("/signin");
        }
    }, [uniqueID, uid, navigate])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await Auth.confirmSignUp(atob(uid), code);
            toast({
                title: "Verification Successful",
                description: "Sign in to start making your dreams come true",
                status: "success",
                duration: 5000,
                isClosable: true,
                // position: "top-right"
            });
            navigate("/signin");
        } catch (error) {
            toast({
                title: "Verification Failed",
                description: error.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                // position: "top-right"
            });
        }
        setIsLoading(false);
    };

    const handleResendCode = async () => {
        try {
            resetCodeInput();
            await Auth.resendSignUp(atob(uid));
            toast({
                title: "Verification Code Requested",
                description: "A new verification code has been sent to your email",
                status: "success",
                duration: 5000,
                isClosable: true,
                // position: "top-right"
            });
        } catch (error) {
            toast({
                title: "Verification Code Request Failed",
                description: error.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                // position: "top-right"
            });
        }
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
                                Verify your Email
                            </Heading>
                            <Text color="muted">We have sent a code to your email</Text>
                            <Text
                                fontSize={{ base: 'sm', sm: 'md' }}
                                fontWeight="bold"
                                color={useColorModeValue('gray.800', 'gray.400')}
                            >
                                {uniqueID}
                            </Text>
                        </Stack>

                    </Stack>
                    <Stack spacing="6">

                        <Center>
                            <HStack spacing="5">
                                <PinInput {...bindCode}>
                                    <PinInputField />
                                    <PinInputField />
                                    <PinInputField />
                                    <PinInputField />
                                    <PinInputField />
                                    <PinInputField />
                                </PinInput>
                            </HStack>
                        </Center>

                        <Stack spacing="4">
                            <Button isLoading={isLoading} variant="primary" onClick={handleSubmit}>Verify</Button>
                            <Button isLoading={isLoading} onClick={handleResendCode}>Resend Code</Button>
                        </Stack>

                    </Stack>
                </Stack>
            </Container>
        </Center>
    )
}