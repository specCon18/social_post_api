import axios, { AxiosRequestConfig } from "axios";

interface db_auth_data {
  user:string,
  pass:string,
  db:string,
  sc?:string,
  ns:string  
};

interface spapi_user {
    name:string
    accounts?:Array<spapi_account>
};

interface spapi_account {
    id:string,
    username:string,
    post_count:number,
    platform_ident:string,
    last_post: ISO8601Timestamp,
};

interface platform_auth_data {
    [key: string]: {
        [key: string]: string;
    };
}

type ISO8601Timestamp = `${number}-${number}-${number}T${number}:${number}:${number}${'Z' | '' | `${'+' | '-'}${number}:${number}`}`;

const platform_auth_structures: platform_auth_data = {
    linkedin: {
        api_key: ""
    },
    //TODO find correct auth_data for twitter posts on v2 api
    twitter: {
        access_token: "",
        refresh_token: ""
    }
};

const platforms:{ [key: string]: any } = {
    twitter:{identifier:"twit",auth_data:platform_auth_structures.twitter},
    linkedin:{identifier:"li",auth_data:platform_auth_structures.linkedin}
};

//Create a user in the table User on the local running SurrealDB instance over http via the Surreal REST API on port 8000
function create_user(token:string, auth:db_auth_data, user:spapi_user){

    let surql_query = `CREATE User:${user.name} SET name = '${user.name}', accounts = null;`;
    let request_config:AxiosRequestConfig = {
        url: '/sql',
        method: 'post',
        baseURL: 'http://localhost:8000',  
        headers: {
            'Accept':'application/json',
            'Authorization':token,
            'NS': auth.ns,
            'DB': auth.db,
        },
        data: surql_query,
        auth: {
          username:auth.user,
          password:auth.pass
        },
        responseType: 'json',
    };
    let res = axios.request(request_config).then(function (response) {
      return response.data;
    });

    return res
}

function create_account(account:spapi_account, user:spapi_user,){
    if (account.platform_ident == platforms.twitter.identifier) {

    } else if (account.platform_ident === platforms.linkedin.identifier) {

    } else {
        console.log("Invalid Platform Identifier")
    }
}

//Authenticate with the local running SurrealDB instance over http via the Surreal REST API on port 8000
function db_auth(data:db_auth_data) {
    let request_config:AxiosRequestConfig = {
        url: '/signin',
        method: 'post',
        baseURL: 'http://127.0.0.1:8000',  
        headers: {
            'Accept':'application/json',
        },
        data: {
            NS: data.ns,
            DB: data.db,
            user: data.user,
            pass: data.pass
        },
        auth: {
          username: data.user,
          password: data.pass
        },
        responseType: 'json',
    };
    let res = axios.request(request_config).then(function (response) {
        return response.data.token;
    });

    return res
};

// * Example/test Code for creating a user
// let data:db_auth_data = {
//     ns: "social_post",
//     db: "social_post",
//     user: "root",
//     pass: "root"
// };
// let user:spapi_user = {
//     name: 'jessie'
// }
// try {
//     let token = await db_auth(data);
//     let res = await create_user(token,data,user);
//     // Assuming res is an array with one element containing the result object
//     if (res && res.length > 0) {
//         // Accessing the first element of the result array and then accessing the 'result' property of that object
//         let resultObject = res[0].result;
//         console.log(resultObject);
//         // Now you can work with the resultObject
//     } else {
//         console.log("No result found.");
//     }
// } catch (error) {
//     console.error('Error:', error);
// }
