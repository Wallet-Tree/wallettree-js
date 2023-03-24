import { gql } from '@apollo/client';

export const CREATE_PROFILE = gql`
	mutation CreateProfile($i: CreateProfileInput!) {
		createProfile(input: $i) {
			document {
				id
				userId
				private
				createdAt
				updatedAt
			}
		}
	}
`;

export const UPDATE_PROFILE_PRIVACY = gql`
	mutation UpdateProfilePrivacy($i: UpdateProfileInput!) {
		updateProfile(input: $i) {
			document {
				id
				private
			}
		}
	}
`;

export const DELETE_PROFILE = gql`
	mutation DeleteProfile($i: UpdateProfileInput!) {
		updateProfile(input: $i) {
			document {
				id
				deletedAt
			}
		}
	}
`;
