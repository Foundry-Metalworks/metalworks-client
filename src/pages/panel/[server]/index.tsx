import React, { useContext, useEffect } from 'react'

import { Button, MantineColor, Space, Stack, Text, Title } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

import PanelLayout from '@/components/layouts/panel'
import InviteModal from '@/components/panel/invite-modal'
import Loading from '@/components/shared/loading'
import { PATHS } from '@/constants'
import ServerContext from '@/context/server'
import { useInstance } from '@/hooks/use-instance'

import styles from './styles.module.scss'

const InnerPanel: React.FC = () => {
    const { data } = useContext(ServerContext)
    const [isModalOpen, { open: openModal, close: closeModal }] = useDisclosure(false)
    const permissions = data?.permissions
    const server = data?.name || ''

    const {
        isFetching,
        instanceStatus,
        actions: { startServer, stopServer, saveServer, goToServer, updateStatus },
    } = useInstance(server)
    const { push } = useRouter()

    useEffect(() => {
        const interval = setInterval(() => updateStatus(), 10000)
        return () => clearInterval(interval)
    }, [updateStatus])

    if (isFetching || !instanceStatus) return <Loading />

    return (
        <Stack className={styles.panelContent} ta="center">
            <InviteModal opened={isModalOpen} onClose={closeModal} />
            <Title className={styles.serverTitle} order={2} h="md">
                SERVER:
            </Title>
            <Text
                size={'xl'}
                display="inline"
                weight="normal"
                color={(instanceStatus == 'active' ? 'green' : 'red') as MantineColor}
            >{`${server}`}</Text>
            <br />
            <Stack className={styles.panelButtons}>
                {instanceStatus == 'active' ? (
                    <>
                        <Button component="a" color="green" onClick={goToServer}>
                            Go To Server
                        </Button>
                        {!!permissions?.canstop && (
                            <Button component="a" color="red" onClick={stopServer}>
                                Stop Server
                            </Button>
                        )}
                        {!!permissions?.cansave && (
                            <Button component="a" onClick={saveServer}>
                                Save Server
                            </Button>
                        )}
                    </>
                ) : (
                    <>
                        {!!permissions?.canstart && (
                            <Button component="a" color="green" onClick={startServer}>
                                Start Server
                            </Button>
                        )}
                    </>
                )}
                <Space h="sm" />
                {!!permissions?.caninvite && (
                    <Button component="a" onClick={openModal}>
                        Invite
                    </Button>
                )}
                <Button component="a" color="red" onClick={() => push(PATHS.HOME)}>
                    Return Home
                </Button>
            </Stack>
        </Stack>
    )
}

const Panel: NextPage = () => {
    const { query } = useRouter()

    return (
        <PanelLayout server={query.server as string | undefined}>
            <InnerPanel />
        </PanelLayout>
    )
}

export default Panel