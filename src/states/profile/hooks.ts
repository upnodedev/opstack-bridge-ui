import { useAppSelector } from '@states/hooks';

export const useToken = () => {
  const account = useAccount();
  const token = useAppSelector((state) => state.profile.token);
  if (account) {
    return token;
  }
};

export const useAccount = () => {
  const account = useAppSelector((state) => state.profile.account);
  return account;
};

/* export const useIsLogin = () => {
  const IsLogin = useAppSelector((state) => state.profile.islogin);
  return IsLogin;
}; */
