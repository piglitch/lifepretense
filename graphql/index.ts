export const getUserQuery =`
    query GetUser($email: String!){
        user(by: { email: $email }){
            id
            name
            email
            avatarUrl
            description
            githubUrl
        }
    }
`;

export const createUserMutation = `
    mutation CreateUser($input: UserCreateInput!){
        userCreate(input: $input){
            user {
                name
                email
                avatarUrl
                description
                githubUrl
                id
            }
        }
    }
`;