import React from 'react'

import { rem } from '@mantine/core'

import { IconType } from '@/components/icons/types'

const IconBrandDigitalOcean: React.FC<IconType> = ({ size, style }) => {
    const sizeRem = rem(size)

    const fullStyle = {
        ...style,
        marginTop: rem(-size / 8),
        verticalAlign: 'middle',
    }

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="65.2 173.5 32 32"
            width={sizeRem}
            height={sizeRem}
            style={fullStyle}
            fill="#ffffff"
        >
            <path d="M81.202 205.5v-6.2c6.568 0 11.666-6.5 9.144-13.418a9.27 9.27 0 0 0-5.533-5.531c-6.912-2.502-13.425 2.575-13.425 9.14H65.2c0-10.463 10.124-18.622 21.1-15.195 4.8 1.505 8.618 5.313 10.105 10.1 3.43 10.99-4.717 21.107-15.203 21.107z" />
            <path d="M75.05 199.317v-6.165h6.168v6.165zm-4.753 4.75v-4.75h4.753v4.75h-4.753zm0-4.75h-3.973v-3.97h3.973v3.97z" />
        </svg>
    )
}

export default IconBrandDigitalOcean