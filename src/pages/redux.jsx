import { useDispatch, useSelector } from "react-redux";

import LayoutPage from "../components/layoutPage";
import { addUser } from "../redux/userSlice";

const Redux = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const cambio = (e) => {
    dispatch(addUser({ ...user, [e.target.name]: e.target.value }));
  };

  return (
    <LayoutPage>
      <h1>Redux</h1>
      <hr />
      <h2>
        <b>datos de redux</b>
      </h2>
      <div>
        <b>name:</b> {user.name}
      </div>
      <div>
        <b>username:</b> {user.username}
      </div>
      <div>
        <b>email:</b> {user.email}
      </div>
      <input
        type="text"
        placeholder="name"
        name="name"
        onChange={(e) => cambio(e)}
      />
      <input
        type="text"
        placeholder="username"
        name="username"
        onChange={(e) => cambio(e)}
      />
      <input
        type="text"
        placeholder="email"
        name="email"
        onChange={(e) => cambio(e)}
      />
    </LayoutPage>
  );
};

export default Redux;
