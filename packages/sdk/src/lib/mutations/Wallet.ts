import { gql } from '@apollo/client';

export const CREATE_WALLET = gql`
	mutation CreateWallet($i: CreateWalletInput!) {
		createWallet(input: $i) {
			document {
				id
				address
				name
				description
				provider
				chain
				primary
				private
				favorite
				createdAt
				updatedAt
			}
		}
	}
`;

export const UPDATE_WALLET_NAME = gql`
	mutation UpdateWalletName($i: UpdateWalletInput!) {
		updateWallet(input: $i) {
			document {
				id
				name
			}
		}
	}
`;

export const UPDATE_WALLET_DESCRIPTION = gql`
	mutation UpdateWalletDescription($i: UpdateWalletInput!) {
		updateWallet(input: $i) {
			document {
				id
				description
			}
		}
	}
`;

export const UPDATE_WALLET_FAVORITE = gql`
	mutation UpdateWalletFavorite($i: UpdateWalletInput!) {
		updateWallet(input: $i) {
			document {
				id
				favorite
			}
		}
	}
`;

export const DELETE_WALLET = gql`
	mutation DeleteWallet($i: UpdateWalletInput!) {
		updateWallet(input: $i) {
			document {
				id
				deletedAt
			}
		}
	}
`;
