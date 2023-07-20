import { GraphQLClient} from "graphql-request";
import { createProjectMutation, createUserMutation, getUserQuery, projectsQuery } from "@/graphql";
import { ProjectForm } from "@/common.type";


const isProduction = process.env.NODE_ENV === 'production';
const apiUrl = isProduction ? process.env.NEXT_PUBLIC_GRAFBASE_API_URL || '' : 'http://127.0.0.1:4000/graphql';
const apiKey = isProduction ? process.env.NEXT_PUBLIC_GRAFBASE_API_KEY || '' : 'letmein';

const serverUrl = isProduction ? process.env.NEXT_PUBLIC_SERVER_URL  : 'http://localhost:3000'

const clientOptions = {
  headers: {
    'x-api-key': apiKey,
  },
};

const client = new GraphQLClient(apiUrl, clientOptions)

export const fetchToken = async () => {
    try {
        const response = await fetch(`${serverUrl}/api/auth/token`);
        return response.json();
    } catch (error) {
        throw error
    }
};

export const uploadImage = async (imagePath: string) => {
    try {
        const response = await fetch(`${serverUrl}/api/upload`, {
            method: 'POST',
            body: JSON.stringify({ path: imagePath, }),
        });   
        return response.json();
    } catch (error) {
        throw error;        
    }
}

const makeGraphQLRequest = async (query: string, variables = {}, headers = {}) => {
    try {
      return await client.request(query, variables, headers);
    } catch (error) {
      throw error;
    }
  };
  

export const createNewProject = async (form: ProjectForm, creatorId: string, token: string) => {
    const imageUrl = await uploadImage(form.image);
    if (imageUrl.url) {      
  
      const headers = {
        Authorization: `Bearer ${token}`
      };
      const variables = {
        input: {
          ...form,
          image: imageUrl.url,
          createdBy: {
            link: creatorId
          }
        }
      };
      return makeGraphQLRequest(createProjectMutation, variables, headers);
    }
  };
  
export const fetchAllProjects =async (category?: string, endcursor?: string) => {
  client.setHeader('x-api-key', apiKey);

  return makeGraphQLRequest(projectsQuery, {category, endcursor})
}

    
export const createUser = (name: string, email: string, avatarUrl: string) => {
    client.setHeader('x-api-key', apiKey);
    const variables = {
        input: {
            name,
            email,
            avatarUrl
          },
    };
    return makeGraphQLRequest(createUserMutation, variables)
}


export const getUser = (email: string) => {
    client.setHeader('x-api-key', apiKey);
    return makeGraphQLRequest(getUserQuery, { email })
}




