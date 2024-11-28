import { FC } from "react";

type PropsType = {
  name: string;
  onClick: () => void;
};

export const Button: FC<PropsType> = ({ name, onClick }) => {
  return <button onClick={onClick}>{name}</button>;
};
