import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { parseCookies } from 'nookies';

export function withPrivatePage(getServerSidePropsFunc?: GetServerSideProps) {
  return async (context: GetServerSidePropsContext) => {
    const cookies = parseCookies(context);
    const token = cookies['your-token-cookie-name'];

    if (!token) {
      return {
        redirect: {
          destination: '/sign-in',
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
