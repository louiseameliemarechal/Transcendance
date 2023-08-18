import { Dispatch, SetStateAction, useState } from 'react';
import { useUser } from '../../../../../../hooks/useUser';
import { User } from '../../../../../../types/User.type';
import UserCard from '../../../../../UserCard';
import PromoteButton from './components/PromoteButton';
import MuteButton from './components/MuteButton';
import KickButton from './components/KickButton';
import BlockButton from './components/BlockButton';
import useChannel from '../../../../../../hooks/useChannel';

function MemberOptionsCard({
  member,
  setAdmins,
  members,
  setMembers,
}: {
  member: User;
  setAdmins: Dispatch<SetStateAction<{ userId: number }[]>>;
  members: { user: User }[];
  setMembers: Dispatch<SetStateAction<{ user: User }[]>>;
}) {
  const channelState = useChannel();
  const { myId } = useUser();
  const myRole: number = determineRole(myId);
  const [userRole, setUserRole] = useState<number>(determineRole(member.id));

  function determineRole(id: number): number {
    const adminIds: number[] = channelState.self.admins.map(
      (adminUser: { userId: number }): number => {
        return adminUser.userId;
      },
    );
    if (id === channelState.self.ownerId) {
      return 2; // OWNER
    } else if (adminIds.includes(id)) {
      return 1; // ADMIN
    } else {
      return 0; // MEMBER
    }
  }

  return (
    <div className="card">
      <UserCard key={`option-member-${member.id}`} user={member} />
      {member.id === myId ? (
        <div />
      ) : (
        <div className="action-buttons">
          <PromoteButton
            key={`option-${member.id}-promote`}
            user={member}
            userRole={userRole}
            setUserRole={setUserRole}
            myRole={myRole}
            setAdmins={setAdmins}
          />
          <MuteButton
            key={`option-${member.id}-mute`}
            user={member}
          />
          <KickButton
            key={`option-${member.id}-kick`}
            user={member}
            userRole={userRole}
            myRole={myRole}
            members={members}
            setMembers={setMembers}
          />
          <BlockButton
            key={`option-${member.id}-block`}
            user={member}
            userRole={userRole}
            myRole={myRole}
            members={members}
            setMembers={setMembers}
          />
        </div>
      )}
      <div />
    </div>
  );
}

export default MemberOptionsCard;