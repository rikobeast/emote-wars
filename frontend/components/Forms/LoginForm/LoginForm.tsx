import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Flex,
  Center,
  FormControl,
  Heading,
  Button,
  Spinner,
} from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { loginSchema } from '../../../validation/loginSchema';
import FormInput from '../FormInput/FormInput';
import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

interface FormValues {
  email: string;
  password: string;
}

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const initialValues: FormValues = {
    email: '',
    password: '',
  };

  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      router.push('/');
      localStorage.setItem('userJwt', session.user.jwt);
    }
  }, [session]);

  return (
    <Flex>
      <Container maxW="full" h="100vh" backgroundColor="blackAlpha.900">
        <Center h="100%">
          <Box
            color="white"
            maxW="full"
            w="400px"
            h="400px"
            backgroundColor="gray.900"
            border="1px solid"
            borderColor="cyan.900"
            borderRadius="md"
          >
            <Formik
              initialValues={initialValues}
              validationSchema={loginSchema}
              onSubmit={async (values, { setSubmitting }) => {
                setIsLoading(true);
                await signIn('credentials', {
                  redirect: false,
                  email: values.email,
                  password: values.password,
                  callbackUrl: `${window.location.origin}`,
                });

                setSubmitting(false);
                setIsLoading(false);
              }}
            >
              {({ errors, touched, values, handleChange }) => {
                return (
                  <Form>
                    <FormControl color="whiteAlpha.800" p="5">
                      <Heading textAlign="center">Login</Heading>
                      <FormInput
                        labelFor="email"
                        labelText="Email"
                        inputName="email"
                        type="text"
                        value={values.email}
                        isInvalid={!!(errors.email && touched.email)}
                        onChange={handleChange}
                      />
                      <FormInput
                        labelFor="password"
                        labelText="Password"
                        inputName="password"
                        type="password"
                        value={values.password}
                        isInvalid={
                          errors.password && touched.password ? true : false
                        }
                        onChange={handleChange}
                      />
                      <Button
                        w="100%"
                        mt="10"
                        color="black"
                        backgroundColor={isLoading ? 'gray' : 'cyan'}
                        borderRadius="0"
                        type="submit"
                        disabled={isLoading}
                        _disabled={{ pointerEvents: 'none' }}
                      >
                        {isLoading ? <Spinner speed="0.3s" /> : 'Login'}
                      </Button>
                      <Box
                        color="cyan"
                        mt="1"
                        display="flex"
                        justifyContent="space-between"
                        fontSize="sm"
                      >
                        <Link href="/register">Don't have an account?</Link>
                        <Link href="/reset-password">
                          Forgot your password?
                        </Link>
                      </Box>
                    </FormControl>
                  </Form>
                );
              }}
            </Formik>
          </Box>
        </Center>
      </Container>
    </Flex>
  );
};

export default LoginForm;
