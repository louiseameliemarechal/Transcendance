import { Navigate, redirect, useNavigate, useParams } from 'react-router-dom';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useEffect, useState } from 'react';
import { useUser } from '../hooks/useUser';
import { User } from '../types/User.type';
// import UserCard from '../components/UserCard';
import ProgressBar from '../components/ProgressBar';
import { ProfilStat } from '../components/ProfilStat';
import { FriendRequest } from '../types/FriendRequest.type';
// import axios from 'axios';

export default function UserProfile() {
  const { id } = useParams();
  const axiosInstance = useAxiosPrivate();
  const [user, setUser] = useState<User>({});
  const [isLoading, setLoading] = useState<boolean>(true);
  const { myId } = useUser();
  const navigate = useNavigate();
  const [FR, setFR] = useState<FriendRequest>({})

  console.log('Entering UserProfile component with id =', id);

  const divStyle = [
    'w-3/5',
    'h-3/5',
    'flex flex-row items-start justify-evenly gap-10 pt-6',
    'border-t-[1px]',
    'border-r-[2px]',
    'border-b-[2px]',
    'border-l-[1px]',
    'border-[#0000001C]',
    'rounded-[50px]',
    'shadow-lg',
    'flex-wrap',
  ].join(' ');

  useEffect(() => {
    if (myId.toString() === id) {
      navigate('/profil');
    }

    axiosInstance
      .get(`user/${id}`)
      .then((res) => {
        setUser(res.data);
        setLoading(false);
      })
      .catch((e) => {
        navigate('/game');
      });
  }, [id]);

  if (isLoading) {
    return <div className="grid place-items-center h-screen">Loading...</div>;
  }

  // useEffect(() => {
  //   axiosInstance
  //   .get(`friend-request/with/${id}`)
  //   .then ((res) => {
  //     setFR(res.data);
  //   })
  // })
  
  const handleAddFriend = () => {
    axiosInstance
      .post(`friend-request/${id}`, {})
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        if (error.response.status !== 409) console.error(error);
      });
  };

  const handleAcceptFriend = () =>
  {
    axiosInstance
      .patch(`friend-request/${id}`, "ACCEPTED") //a voir si ca s'ecrit comme ca. pas sur...
  }

  return (
    <div className="profil-container">
      <div className="flex flex-row w-[55%] justify-end">
        <div className="profil-card">
          <img className="avatar" alt="avatar" src={user?.avatar} />
          <div className="flex flex-row items-center">
            <p className="user-name">{user?.name}</p>
          </div>
        </div>
        {/* if(FR.fromID === ${myId})
        {
          <button className="small-button friend-request-button">
            Pending request
          </button>
        } */}
        {/* else if (FR.status ==== "PENDING")
        <AcceptdeclineButtons/> */}
        {/* <ActionButtons id ={id ?? ''} /> */}
        <ActionButtons handleAddFriend = {handleAddFriend}/>
        {/* <ActionButtons userId ={myId}/> */}
      </div>
      <ProgressBar user={user} />
      <div className={divStyle}>
        <ProfilStat user={user} />
      </div>
    </div>
  );
}
// type ActionButtonsProps = {
//   id: string;
// };
type ActionButtonsProps = {
  handleAddFriend: Function;
};
// function ActionButtons( userId: ActionButtonsProps ) {
function ActionButtons( {handleAddFriend} : ActionButtonsProps) {
  // const handleAddFriend = (id : string) => {
  //   const axiosInstance = useAxiosPrivate();
  //   axiosInstance
  //     .post(`friend-request/${id}`, {})
  //     .then((response) => {
  //       console.log(response.data);
  //     })
  //     .catch((error) => {
  //       if (error.response.status !== 409) console.error(error);
  //     });
  // };
  return (
    <div className="flex flex-col gap-2 justify-end w-[55%] items-end">
      <button
        className="small-button friend-request-button"
        onClick={handleAddFriend}
      >
        Add friend
      </button>
      <button className="small-button game-request-button">
        Send game request
      </button>
    </div>
  );
}

// function AcceptdeclineButtons() {
//   return (
//     <div className="flex flex-col gap-2 justify-end w-[55%] items-end">
//       <button
//         className="small-button friend-request-button"
//         // onClick={handleAddFriend}
//       >
//         Add friend
//       </button>
//       <button className="small-button game-request-button">
//         Send game request
//       </button>
//     </div>
//   );
// }
