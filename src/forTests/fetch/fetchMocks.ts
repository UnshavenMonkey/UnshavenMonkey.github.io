import fetch from 'node-fetch';

export const getUsers = async (): Promise<typeof MOCK_USER> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                login: 'Fundorin',
                id: 55087980,
                node_id: 'MDQ6VXNlcjU1MDg3OTgw',
                avatar_url: 'https://avatars.githubusercontent.com/u/55087980?v=4',
                gravatar_id: '',
                url: 'https://api.github.com/users/MaxAkkerman',
            });
        }, 200);
    });
}

export const getText = async (): Promise<string> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('Hello, World!');
        }, 200);
    });
}

export const MOCK_USER = {
    login: 'Fundorin',
    id: 55087980,
    node_id: 'MDQ6VXNlcjU1MDg3OTgw',
    avatar_url: 'https://avatars.githubusercontent.com/u/55087980?v=4',
    gravatar_id: '',
    url: 'https://api.github.com/users/MaxAkkerman',
}

