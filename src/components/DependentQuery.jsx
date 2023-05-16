import axios from "axios";
import { useQuery } from "react-query";

// http://localhost:3000/dependent-query
const fetchUserByEmail = (email) => {
  return axios.get(`http://localhost:4000/users/${email}`);
};
const fetchCoursesByChannelId = (channelId) => {
  return axios.get(`http://localhost:4000/channels/${channelId}`);
};

const DependentQuery = ({ email }) => {
  const { data: userData } = useQuery(["user", email], () =>
    fetchUserByEmail(email)
  );
  const channelId = userData?.data.channelId;
  //   console.log(channelId);
  const { data: channelData } = useQuery(
    ["channel", channelId],
    () => fetchCoursesByChannelId(channelId),
    {
      //   enabled: !!channelId,
      // the above statment does the same as below one did,
      // if it is undefined, it result in false else true
      enabled: channelId === undefined ? false : true,
    }
  );
  return <div>DependentQuery</div>;
};

export default DependentQuery;
