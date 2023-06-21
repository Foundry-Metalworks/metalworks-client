import React, { createContext, useMemo, PropsWithChildren } from 'react'

import { useAuth } from '@clerk/nextjs'

import { useQuery } from '@/api/network'
import RedirectTo from '@/components/shared/redirect'
import { PATHS } from '@/constants'
import { UserType } from '@/context/user/types'
import { ContextType } from '@/types'

type UserContextType = ContextType<UserType | null, undefined>

const UserContext = createContext<UserContextType>({
    isLoading: false,
    data: null,
    dispatch: undefined,
})

const InnerUserProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const { isSignedIn, isLoaded, userId } = useAuth()

    const shouldFetchUser = isLoaded && !!isSignedIn
    const { status, data, error } = useQuery<UserType>(
        {
            endpoint: '/users/me',
            enabled: shouldFetchUser,
        },
        [userId, shouldFetchUser],
    )

    const isLoading = !isLoaded || (shouldFetchUser && (status == 'loading' || status == 'idle'))
    const value: UserContextType = useMemo(
        () => ({
            data: isSignedIn ? data || null : null,
            isLoading: !isLoaded || isLoading,
            error: error || undefined,
            dispatch: undefined,
        }),
        [isLoading, isSignedIn, status, userId],
    )

    if (isLoaded && !isLoading) {
        if (!data) return <RedirectTo path={PATHS.HOME} />
        return <UserContext.Provider value={value}>{children}</UserContext.Provider>
    }
    return null
}

export const UserProvider: React.FC<PropsWithChildren> = ({ children }) => {
    return <InnerUserProvider>{children}</InnerUserProvider>
}

export default UserContext
