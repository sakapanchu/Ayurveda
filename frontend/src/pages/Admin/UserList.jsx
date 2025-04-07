import { useEffect, useState } from "react";
import { FaTrash, FaEdit, FaCheck, FaTimes, FaCopy } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
  useUpdateUserMutation,
} from "../../redux/api/usersApiSlice";
import { toast } from "react-toastify";
import AdminMenu from "./AdminMenu";

const UserList = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [editableUserId, setEditableUserId] = useState(null);
  const [editableUserName, setEditableUserName] = useState("");
  const [editableUserEmail, setEditableUserEmail] = useState("");
  const [expandedIds, setExpandedIds] = useState({});
  const [updateUser] = useUpdateUserMutation();

  useEffect(() => {
    refetch();
  }, [refetch]);

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(id);
        toast.success("User deleted successfully");
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const toggleEdit = (id, username, email) => {
    setEditableUserId(id);
    setEditableUserName(username);
    setEditableUserEmail(email);
  };

  const toggleExpandId = (id) => {
    setExpandedIds(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("ID copied to clipboard!");
  };

  const updateHandler = async (id) => {
    try {
      await updateUser({
        userId: id,
        username: editableUserName,
        email: editableUserEmail,
      });
      setEditableUserId(null);
      toast.success("User updated successfully");
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 transition-all duration-300 ease-in-out md:ml-[4%] p-4 md:p-8"
    >
      <motion.h1 
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        className="text-3xl font-bold text-green-800 mb-6 mt-10"
      >
        Users Management
      </motion.h1>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <div className="flex flex-col lg:flex-row gap-6">
          <AdminMenu />
          
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="w-full overflow-x-auto bg-white/80 backdrop-blur-sm rounded-xl shadow-lg"
          >
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-green-600 text-white">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    NAME
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    EMAIL
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    ADMIN
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    ACTIONS
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <AnimatePresence>
                  {users.map((user) => (
                    <motion.tr
                      key={user._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="hover:bg-green-50/50"
                    >
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => toggleExpandId(user._id)}
                            className="text-green-600 hover:text-green-800 transition"
                          >
                            {expandedIds[user._id] ? (
                              <span className="text-sm font-mono">{user._id}</span>
                            ) : (
                              <span className="text-sm font-mono">{user._id.substring(0, 8)}...</span>
                            )}
                          </button>
                          <button
                            onClick={() => copyToClipboard(user._id)}
                            className="text-gray-500 hover:text-green-600 transition"
                            title="Copy ID"
                          >
                            <FaCopy size={14} />
                          </button>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        {editableUserId === user._id ? (
                          <motion.div
                            initial={{ scale: 0.95 }}
                            animate={{ scale: 1 }}
                            className="flex items-center"
                          >
                            <input
                              type="text"
                              value={editableUserName}
                              onChange={(e) => setEditableUserName(e.target.value)}
                              className="w-full p-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500"
                            />
                            <button
                              onClick={() => updateHandler(user._id)}
                              className="ml-2 bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition"
                            >
                              <FaCheck />
                            </button>
                          </motion.div>
                        ) : (
                          <div className="flex items-center">
                            <span className="text-sm font-medium text-gray-900">
                              {user.username}
                            </span>
                            <button
                              onClick={() =>
                                toggleEdit(user._id, user.username, user.email)
                              }
                              className="ml-2 text-green-600 hover:text-green-800 transition"
                            >
                              <FaEdit />
                            </button>
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        {editableUserId === user._id ? (
                          <motion.div
                            initial={{ scale: 0.95 }}
                            animate={{ scale: 1 }}
                            className="flex items-center"
                          >
                            <input
                              type="email"
                              value={editableUserEmail}
                              onChange={(e) => setEditableUserEmail(e.target.value)}
                              className="w-full p-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500"
                            />
                            <button
                              onClick={() => updateHandler(user._id)}
                              className="ml-2 bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition"
                            >
                              <FaCheck />
                            </button>
                          </motion.div>
                        ) : (
                          <div className="flex items-center">
                            <a
                              href={`mailto:${user.email}`}
                              className="text-sm text-blue-600 hover:underline"
                            >
                              {user.email}
                            </a>
                            <button
                              onClick={() =>
                                toggleEdit(user._id, user.username, user.email)
                              }
                              className="ml-2 text-green-600 hover:text-green-800 transition"
                            >
                              <FaEdit />
                            </button>
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        {user.isAdmin ? (
                          <FaCheck className="text-green-600" />
                        ) : (
                          <FaTimes className="text-red-500" />
                        )}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                        {!user.isAdmin && (
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => deleteHandler(user._id)}
                            className="text-red-600 hover:text-red-900 p-2 rounded-full hover:bg-red-100 transition"
                          >
                            <FaTrash />
                          </motion.button>
                        )}
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default UserList;