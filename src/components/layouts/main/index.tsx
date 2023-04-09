import React, { PropsWithChildren } from 'react'

import { Stack } from '@mantine/core'

import styles from './styles.module.scss'

interface MainLayoutProps {
    showLogo: boolean
}

const MainLayout: React.FC<PropsWithChildren<MainLayoutProps>> = ({
    children,
    showLogo,
}: PropsWithChildren<MainLayoutProps>) => {
    return (
        <div className={styles.root}>
            <Stack className={styles.content}>
                <img
                    className={styles.logo}
                    src="/logo512.png"
                    alt="Foundry Logo"
                    width="512"
                    style={{ display: showLogo ? 'inherit' : 'none' }}
                />
                <div className={styles.mainContent}>{children}</div>
            </Stack>
        </div>
    )
}

export default MainLayout