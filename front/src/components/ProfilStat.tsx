import { useEffect } from "react";
import { User } from "../types/User.type";

const divStyle = [
  "w-3/5",
  "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  "border border-grey-100",
  "rounded-[50px]",
  "shadow-xl"
].join(" ");

export const ProfilStat = ({ user }: { user: User }) => {

  useEffect(() => {
    console.log('ProfileStat loaded', user)
  }, [])
  

  return (
    <div className={divStyle}>
      <div className="m-auto">Victoires: {user?.statTotalWin}</div>
      <div className="m-auto">
        Defaites:{" "}
        {user.statTotalGame && user.statTotalWin
          ? user?.statTotalGame - user?.statTotalWin
          : -1}
      </div>
      <div className="m-auto">Taux de victoire:</div>
      <div className="m-auto">Other:</div>
    </div>
  );
};
