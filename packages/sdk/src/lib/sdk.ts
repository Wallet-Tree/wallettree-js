import { DIDSession } from 'did-session'
import { EthereumWebAuth, getAccountId } from '@didtools/pkh-ethereum'
import { ComposeClient } from '@composedb/client'
import { definition } from './__generated__/definition.js'
import { ApolloClient, ApolloLink, Observable, InMemoryCache, useMutation } from '@apollo/client'
import { CREATE_PROFILE, UPDATE_PROFILE_PRIVACY } from './mutations/Profile.js'
import {
  DELETE_WALLET,
  UPDATE_WALLET_DESCRIPTION,
  UPDATE_WALLET_FAVORITE,
  UPDATE_WALLET_NAME,
} from './mutations/Wallet.js'
import { RuntimeCompositeDefinition } from '@composedb/types'

export const WalletTreeSDK = (args: { ethProvider: any; ceramicUrl?: string }) => {
  if (!args.ethProvider) {
    throw new Error('EthProvider required for WalletTree SDK')
  }

  /**
   * Setup ComposeDB and Apollo clients
   */

  const compose = new ComposeClient({
    ceramic: args.ceramicUrl || 'http://localhost:7007',
    definition: definition as RuntimeCompositeDefinition,
  })

  const link = new ApolloLink((operation) => {
    return new Observable((observer) => {
      compose.execute(operation.query, operation.variables).then(
        (result) => {
          observer.next(result)
          observer.complete()
        },
        (error) => {
          observer.error(error)
        },
      )
    })
  })

  const client = new ApolloClient({ cache: new InMemoryCache(), link })

  /**
   * Utilities
   */

  const _loadSession = async (authMethod: any) => {
    const sessionStr = localStorage.getItem('didsession')
    let session

    if (sessionStr) {
      session = await DIDSession.fromSession(sessionStr)
    }

    if (!session || (session.hasSession && session.isExpired)) {
      const session = await DIDSession.authorize(authMethod, { resources: compose.resources })
      localStorage.setItem('didsession', session.serialize())
    }

    return session
  }

  const _authenticate = async () => {
    const addresses = await args.ethProvider.request({ method: 'eth_requestAccounts' })
    const accountId = await getAccountId(args.ethProvider, addresses[0])
    const authMethod = await EthereumWebAuth.getAuthMethod(args.ethProvider, accountId)
    const session = await _loadSession(authMethod)
    compose.setDID(session.did)
  }

  /**
   * Public Functions
   */

  const createProfile = async (userId: string) => {
    const [createProfile, { loading, error }] = useMutation(CREATE_PROFILE)
    const now = Date.now().toString()
    const response = await createProfile({
      variables: {
        i: {
          content: {
            userId: userId,
            private: false,
            createdAt: now,
            updatedAt: now,
          },
        },
      },
    })
    return response
  }

  const updateProfilePrivacy = async () => {
    const [updateProfilePrivacy, { loading, error }] = useMutation(UPDATE_PROFILE_PRIVACY)
  }

  const deleteProfile = async () => {
    const [createProfile, { loading, error }] = useMutation(CREATE_PROFILE)
  }

  const createWallet = async () => {
    const [createProfile, { loading, error }] = useMutation(CREATE_PROFILE)
  }

  const updateWalletName = async (profileID: string, name: string) => {
    const [updateWalletName, { loading, error }] = useMutation(UPDATE_WALLET_NAME)

    const response = await updateWalletName({
      variables: {
        i: {
          id: profileID,
          content: {
            name: name,
          },
        },
      },
    })
    return response
  }

  const updateWalletDescription = async (profileID: string, description: string) => {
    const [updateWalletDescription, { loading, error }] = useMutation(UPDATE_WALLET_DESCRIPTION)

    const response = await updateWalletDescription({
      variables: {
        i: {
          id: profileID,
          content: {
            description: description,
          },
        },
      },
    })
    return response
  }

  const updateWalletFavorite = async (profileID: string, favorite: boolean) => {
    const [updateWalletFavorite, { loading, error }] = useMutation(UPDATE_WALLET_FAVORITE)

    const response = await updateWalletFavorite({
      variables: {
        i: {
          id: profileID,
          content: {
            favorite: favorite,
          },
        },
      },
    })
    return response
  }

  const deleteWallet = async (profileID: string) => {
    const [deleteWallet, { loading, error }] = useMutation(DELETE_WALLET)

    const response = await deleteWallet({
      variables: {
        i: {
          id: profileID,
          content: {
            deletedAt: new Date().toString(),
          },
        },
      },
    })
    return response
  }

  return {
    profile: {
      create: createProfile,
      updatePrivacy: updateProfilePrivacy,
      delete: deleteProfile,
    },
    wallet: {
      create: createWallet,
      updateName: updateWalletName,
      updateDescription: updateWalletDescription,
      update: updateWalletFavorite,
      delete: deleteWallet,
    },
  }
}
