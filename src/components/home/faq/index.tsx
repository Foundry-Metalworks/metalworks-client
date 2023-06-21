import React from 'react'

import { Accordion } from '@mantine/core'

import Section from '@/components/home/section'
import Link from '@/components/shared/link'

const FAQ: React.FC = () => {
    return (
        <Section title="Frequently Asked Questions">
            <Accordion variant="separated">
                <Accordion.Item value={'token-safety'}>
                    <Accordion.Control>{'Is my DigitalOcean account safe?'}</Accordion.Control>
                    <Accordion.Panel>
                        {`Yes! All requests are encrypted with HTTPS, and the DigitalOcean API Token you give us is securely stored encrypted in a database`}
                    </Accordion.Panel>
                </Accordion.Item>
                <Accordion.Item value={'account-safety'}>
                    <Accordion.Control>{'Is my account info safe?'}</Accordion.Control>
                    <Accordion.Panel>
                        Yes! All user auth is handled by{' '}
                        <Link href="https://clerk.com/">
                            <strong>Clerk</strong>
                        </Link>
                        , a trusted user auth toolkit
                    </Accordion.Panel>
                </Accordion.Item>
                <Accordion.Item value={'payment-info'}>
                    <Accordion.Control>{'How is payment handled?'}</Accordion.Control>
                    <Accordion.Panel>
                        {`Metalworks does not collect any money from you! Payment is directly handled on DigitalOcean. We are non-profit!`}
                    </Accordion.Panel>
                </Accordion.Item>
                <Accordion.Item value={'pricing'}>
                    <Accordion.Control>{'How much does it cost?'}</Accordion.Control>
                    <Accordion.Panel>
                        {`We do not collect a penny from you, but the cost on DigitalOcean will vary based on your usage. If you play 4 4-hour sessions a month, it will cost less than $0.15 USD. Even if the server stays on all month, its still only $6 USD`}
                    </Accordion.Panel>
                </Accordion.Item>
            </Accordion>
        </Section>
    )
}

export default FAQ