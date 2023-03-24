import { gql } from '@apollo/client';

export const GET_PROFILE = gql`
	query ($id: ID!) {
		node(id: $id) {
			... on CeramicAccount {
				profileConnection(first: 1) {
					edges {
						node {
							id
							userId
							private
							wallets
							createdAt
							updatedAt
							deletedAt
						}
					}
				}
			}
		}
	}
`;
