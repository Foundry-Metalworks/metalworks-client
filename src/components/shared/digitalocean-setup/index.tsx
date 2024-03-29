import React, { useEffect, useState } from 'react'

import { Badge, Button, Group, rem, Skeleton, Stack, Title } from '@mantine/core'
import process from 'process'

import IconBrandDigitalOcean from '@/components/icons/digital-ocean'
import { useUser } from '@/hooks/api/use-user'

const REFERRAL_LINK =
    'https://www.digitalocean.com/?refcode=d69d3faf8632&utm_campaign=Referral_Invite&utm_medium=Referral_Program&utm_source=badge'

const DOSetup: React.FC = () => {
    const { isLoading, data } = useUser()
    const [setupStage, setSetupStage] = useState<number | undefined>(isLoading ? undefined : data?.authorized ? 3 : 0)
    const [hasDOAcc, setHasDOAcc] = useState<boolean | undefined>(undefined)

    useEffect(() => {
        if (!isLoading) setSetupStage(data?.authorized ? 3 : 0)
    }, [data?.authorized])

    const updateData = (hasDoAcc: boolean, stage: number) => {
        setHasDOAcc(hasDoAcc)
        setSetupStage(stage)
    }

    const Stage0 = () => (
        <>
            <Title order={4}>Do you have a DigitalOcean Account?</Title>
            <Group mx="auto">
                <Button radius="xl" size="md" component="a" onClick={() => updateData(true, 1)}>
                    Yes
                </Button>
                <Button radius="xl" size="md" component="a" onClick={() => updateData(false, 1)}>
                    No
                </Button>
            </Group>
        </>
    )

    const Stage1 = () => {
        return (
            <Button
                radius="xl"
                size="md"
                component="a"
                href={hasDOAcc ? process.env.NEXT_PUBLIC_DO_URL : REFERRAL_LINK}
                target={hasDOAcc ? '_self' : '_blank'}
                onClick={() => !hasDOAcc && setSetupStage(2)}
                disabled={isLoading}
            >
                <IconBrandDigitalOcean size={16} style={{ marginRight: rem(12) }} />
                {hasDOAcc ? 'Connect DigitalOcean' : 'Create DigitalOcean Account'}
            </Button>
        )
    }

    const Stage2 = () => (
        <>
            <Title order={4}>Account Created?</Title>
            <Group mx="auto">
                <Button radius="xl" size="md" component="a" onClick={() => updateData(true, 1)}>
                    Yes
                </Button>
                <Button radius="xl" size="md" component="a" onClick={() => updateData(false, 1)}>
                    No
                </Button>
            </Group>
        </>
    )

    const Stage3 = () => (
        <Badge radius="xl" size="xl" h={42} color="green" w="max-content" mx="auto" tt="capitalize">
            <IconBrandDigitalOcean size={18} style={{ marginRight: rem(12) }} />
            DigitalOcean Connected
        </Badge>
    )

    const SetupContent = () => {
        switch (setupStage) {
            default:
                return <Stage0 />
            case 1:
                return <Stage1 />
            case 2:
                return <Stage2 />
            case 3:
                return <Stage3 />
        }
    }

    return (
        <Stack>
            {isLoading || setupStage === undefined ? (
                <Skeleton height={42} width="60%" mx="auto" radius="xl" />
            ) : (
                <SetupContent />
            )}
        </Stack>
    )
}

export default DOSetup
