import React from 'react'

import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core'
import { useLocalStorage } from '@mantine/hooks'
import { Notifications } from '@mantine/notifications'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { DehydratedState, QueryClient, QueryClientProvider } from 'react-query'
import NextNProgress from 'nextjs-progressbar'

import MainLayout from '@/components/layouts/main'
import { CLERK_PAGES, PATHS } from '@/constants'
import { ModalsProvider } from '@mantine/modals'
import { UserProvider } from '@/hooks/api/use-user/context'

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps<{ dehydratedState: DehydratedState }>): React.ReactNode {
    const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
        key: 'mantine-color-scheme',
        defaultValue: 'dark',
        getInitialValueInEffect: true,
    })
    const { asPath } = useRouter()

    const showLogo =
        !CLERK_PAGES.find((p) => asPath.includes(p)) &&
        PATHS.HOME != asPath &&
        PATHS.ROOT != asPath &&
        !asPath.includes(PATHS.DASHBOARD)

    const toggleColorScheme = (value?: ColorScheme) =>
        setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))

    return (
        <>
            <Head>
                <title>Metalworks</title>
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
            </Head>
            <QueryClientProvider client={queryClient}>
                <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
                    <MantineProvider
                        theme={{
                            colorScheme,
                            fontFamily: 'Signika, sans-serif',
                            headings: { fontFamily: 'Domine, serif' },
                        }}
                        withGlobalStyles
                        withNormalizeCSS
                    >
                        <ClerkProvider
                            {...pageProps}
                            appearance={{ baseTheme: colorScheme == 'dark' ? dark : undefined }}
                        >
                            <UserProvider>
                                <ModalsProvider modalProps={{ zIndex: 1005 }}>
                                    <MainLayout showLogo={showLogo}>
                                        <NextNProgress showOnShallow={false} options={{ showSpinner: false }} />
                                        <Notifications position="top-center" zIndex={1002} mt="4rem" />
                                        <Component {...pageProps} />
                                    </MainLayout>
                                </ModalsProvider>
                            </UserProvider>
                        </ClerkProvider>
                    </MantineProvider>
                </ColorSchemeProvider>
            </QueryClientProvider>
        </>
    )
}
