import { FC } from 'react';

type PropsType = {
  name: string;
  onClick: () => void;
  className?: string;
};

export const Button: FC<PropsType> = ({ name, onClick, className }) => {
  return (
    <button className={className} onClick={onClick}>
      {name}
    </button>
  );
};
