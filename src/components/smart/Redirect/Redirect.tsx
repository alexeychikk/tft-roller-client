import { useLocation } from 'preact-iso';

export type RedirectProps = {
  to?: string;
};

export const Redirect: React.FC<RedirectProps> = ({ to = '/' }) => {
  const { route } = useLocation();
  route(to);
  return null;
};
