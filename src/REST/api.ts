import fetch from 'isomorphic-unfetch';
import jwtDecode from 'jwt-decode';
import { parseCookies, setCookie } from 'nookies';

type RequestParams = {
  endpoint: string;
  body?: any;
  direct?: boolean;
  headers?: any;
  unsafe?: boolean;
  query?: any;
};

export const api = {
  client: {
    get: ({
      endpoint,
      direct = false,
      headers,
      unsafe = !!process.env.IS_STORYBOOK,
      query,
    }: RequestParams) => {
      const exec = unsafe ? fetchWithoutRefresh : fetchWithRefresh;

      return exec({
        endpoint,
        method: 'GET',
        body: null,
        direct,
        headers,
        query,
      });
    },

    post: ({
      endpoint,
      body,
      direct = false,
      headers,
      unsafe = !!process.env.IS_STORYBOOK,
    }: RequestParams) => {
      const exec = unsafe ? fetchWithoutRefresh : fetchWithRefresh;

      return exec({
        endpoint,
        method: 'POST',
        body,
        direct,
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
      });
    },

    put: ({
      endpoint,
      body,
      direct = false,
      headers,
      query,
      unsafe = !!process.env.IS_STORYBOOK,
    }: RequestParams) => {
      const exec = unsafe ? fetchWithoutRefresh : fetchWithRefresh;

      return exec({
        endpoint,
        method: 'PUT',
        body,
        direct,
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        query,
      });
    },

    patch: ({
      endpoint,
      body,
      direct = false,
      headers,
      query,
      unsafe = !!process.env.IS_STORYBOOK,
    }: RequestParams) => {
      const exec = unsafe ? fetchWithoutRefresh : fetchWithRefresh;

      return exec({
        endpoint,
        method: 'PATCH',
        body,
        direct,
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        query,
      });
    },

    delete: ({
      endpoint,
      body,
      direct = false,
      headers,
      query,
      unsafe = !!process.env.IS_STORYBOOK,
    }: RequestParams) => {
      const exec = unsafe ? fetchWithoutRefresh : fetchWithRefresh;

      return exec({
        endpoint,
        method: 'DELETE',
        body,
        direct,
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        query,
      });
    },
  },
  server: {
    get: ({ endpoint, headers, query }: RequestParams) => {
      return fetch(
        `${process.env.NEXT_APP_API_URL}${endpoint}${query ? '?' + query : ''}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'access-control-allow-origin': '*',
            accept: 'application/json, text/plain, */*',
            ...headers,
          },
        },
      );
    },
    post: ({ endpoint, body, headers }: RequestParams) => {
      return fetch(`${process.env.NEXT_APP_API_URL}${endpoint}`, {
        method: 'POST',
        body,
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
      });
    },
    patch: ({ endpoint, body, headers }: RequestParams) => {
      return fetch(`${process.env.NEXT_APP_API_URL}${endpoint}`, {
        method: 'POST',
        body,
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
      });
    },
    delete: ({ endpoint, body, headers }: RequestParams) => {
      return fetch(`${process.env.NEXT_APP_API_URL}${endpoint}`, {
        method: 'DELETE',
        body,
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
      });
    },
    put: ({ endpoint, body, headers }: RequestParams) => {
      return fetch(`${process.env.NEXT_APP_API_URL}${endpoint}`, {
        method: 'PUT',
        body,
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
      });
    },
  },
};

interface Token {
  name: string;
  exp: number;
}

type ExecArgs = {
  endpoint: string;
  method: string;
  body: any;
  direct: boolean;
  headers?: any;
  query?: any;
};

export const fetchWithRefresh = async ({
  endpoint,
  method,
  body,
  direct = false,
  headers,
  query,
}: ExecArgs) => {
  const cookies = parseCookies();
  const search = query ? '?' + query : '';
  const url = direct
    ? endpoint
    : `${process.env.NEX_APP_API_URL}/${endpoint}${search}`;

  return fetch(url, {
    method,
    headers: {
      Authorization: 'Bearer ' + cookies[process.env.AUTH_TOKEN_NAME],
      ...headers,
    },
    body,
  });
};

export function fetchWithoutRefresh({
  endpoint,
  method,
  body,
  direct = false,
  headers,
  query,
}: ExecArgs) {
  const search = query ? '?' + query : '';
  const url = direct
    ? endpoint
    : `${process.env.NEXT_APP_API_URL}/${endpoint}${search}`;

  return fetch(url, {
    method,
    body,
    headers,
  });
}

export const getAccessToken = () => {
  const remember = localStorage.getItem('remember');

  if (remember) {
    return localStorage.getItem('accessToken');
  }

  return sessionStorage.getItem('accessToken');
};

export const saveAccessToken = (token: string, remember: boolean) => {
  if (!remember) {
    setCookie(null, process.env.AUTH_TOKEN_NAME, token, {
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60,
      path: '/',
      sameSite: 'lax',
    });

    return;
  }

  const { exp } = jwtDecode<Token>(token);

  setCookie(null, process.env.AUTH_TOKEN_NAME, token, {
    secure: process.env.NODE_ENV === 'production',
    maxAge: exp,
    path: '/',
    sameSite: 'lax',
  });
};

export const verifyToken = (token: string) => {
  const { exp } = jwtDecode<Token>(token);

  return Date.now() < exp * 1000;
};
