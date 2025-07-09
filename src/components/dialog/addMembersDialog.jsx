import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { setIsAddMembers } from "../../redux/reducers/misc";

const AddMembersDialog = ({ users = [], onAdd ,isLoadingFriendsData}) => {
  const {isAddMembers} = useSelector(state=>state.misc);  
  const dispatch = useDispatch();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");

  const handleToggle = (userId) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const handleAdd = () => {
    if (selectedUsers.length > 0) {
      onAdd(selectedUsers);
    }
  };

  const handleClose = () => {
    dispatch(setIsAddMembers(false));
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return isLoadingFriendsData? (<div>Loading Friends data</div>) : (
    <div className="fixed inset-0 bg-opacity-20 flex items-center justify-center z-50 transition-opacity duration-300"
                    style={{opacity: isAddMembers ? 1 : 0, backdropFilter: 'blur(2px)' }}>
      <div className="relative bg-[#0f1117] text-white w-full max-w-md rounded-lg p-6 shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Find People</h2>

        <button
          className="absolute top-3 right-3 text-red-500 hover:text-red-700"
          onClick={handleClose}
        >
          <IoMdClose size={22} />
        </button>

        <input
          type="text"
          placeholder="username"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 mb-2 bg-[#181b23] border border-gray-700 rounded-md focus:outline-none"
        />

        { users.length === 0 ?(<div>No Friends...</div>):(filteredUsers.length === 0? (
          <p className="text-center text-sm text-gray-400">Enter The Name...</p>
        ) : (
          <ul className="max-h-60 overflow-y-auto space-y-2">
            {filteredUsers.map((user) => (
              <li
                key={user._id}
                onClick={() => handleToggle(user._id)}
                className={`cursor-pointer px-4 py-2 rounded flex items-center justify-between ${
                  selectedUsers.includes(user._id)
                    ? "bg-blue-600"
                    : "hover:bg-[#1c1f26]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span>{user.name}</span>
                </div>
                {selectedUsers.includes(user._id) && (
                  <span className="text-green-400">✔</span>
                )}
              </li>
            ))}
          </ul>
        ))}

        <button
          onClick={handleAdd}
          disabled={selectedUsers.length === 0}
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white py-2 rounded"
        >
          Add Selected
        </button>
      </div>
    </div>
  );
};

export default AddMembersDialog;
