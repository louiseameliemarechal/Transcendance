import { useState } from 'react';
import '../../../style/components/chat/chat-container/create-channel-form.css';
import '../../../style/components/buttons.css';
import { useChatContext } from '../../../hooks/useChatContext';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import FriendsList from './CreateChannelForm/FriendsList';
import FormHeader from './CreateChannelForm/FormHeader';
import { useUser } from '../../../hooks/useUser';
import { notifSocket } from '../../../api/socket';
import { User } from '../../../types/User.type';

const CreateChannelForm = () => {
  const [avatar, setAvatar] = useState<string>(
    `default.jpg`,
  );
  const axiosPrivate = useAxiosPrivate();
  const { myId, myLogin } = useUser();
  const { channelList, setChannelList, setShowCreateChannel, setShowChannel } =
    useChatContext();
  const [selectedFriends, setSelectedFriends] = useState<number[]>([]);
  const [channelName, setChannelName] = useState<string>();

  async function handleSubmit() {
    if (!channelName) {
      alert('Channel name must be filled.');
    } else if (selectedFriends.length < 2) {
      alert('Group channel should have at least 3 members.');
    } else {
      await axiosPrivate
        .post('channel', {
          name: channelName,
          avatar,
          members: [...selectedFriends, myId],
        })
        .then((res) => {
          setChannelList([...channelList, res.data]);
          res.data.members.map((member: { user: User }) => {
            if (member.user.login !== myLogin)
              notifSocket.emit('client.notif.chatNotif', member.user.login);
          });
          setShowCreateChannel(false);
          setShowChannel(res.data.id);
        })
        .catch((err) => {
          if (err.response.status === 409) {
            setShowCreateChannel(false);
            setShowChannel(err.response.data.channelId);
          }
        });
    }
  }

  return (
    <div className="channel-form">
      <FormHeader
        key={`channel-form-header`}
        avatar={avatar}
        setAvatar={setAvatar}
        setChannelName={setChannelName}
      />
      <FriendsList
        key={`channel-form-list`}
        selectedFriends={selectedFriends}
        setSelectedFriends={setSelectedFriends}
      />
      <button
        className="small-button"
        onClick={() => handleSubmit()}
        // onKeyUp={(event) => {
        //   event.key === 'Enter' && handleSubmit();
        // }}
      >
        create channel
      </button>
    </div>
  );
};

export default CreateChannelForm;
