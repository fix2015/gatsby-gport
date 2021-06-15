import React from 'react'

import { UserHOC } from '@hoc/user'
import { LoadingHOC } from '@hoc/loading'
import { ErrorMessageHOC } from '@hoc/errorMessage'

export const Hoc = ({children}) => {
  return (
    <UserHOC>
      <LoadingHOC>
        <ErrorMessageHOC>
          {children}
        </ErrorMessageHOC>
      </LoadingHOC>
    </UserHOC>
  )
}
