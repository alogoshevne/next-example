// utils/withPublicPage.ts
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { parseCookies } from 'nookies';

export function withPublicPage(getServerSidePropsFunc: GetServerSideProps) {
  return async (context: GetServerSidePropsContext) => {
    const cookies = parseCookies(context);
    const token = cookies[process.env.AUTH_TOKEN_NAME];

    if (token) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }

    if (getServerSidePropsFunc) {
      return getServerSidePropsFunc(context);
    }

    return { props: {} };
  };
}
