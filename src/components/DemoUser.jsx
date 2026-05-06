import React, { useContext } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { AuthContext } from '../../context/AuthContext';

const DemoUser = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  if (!user) return null;

  const handleRoleChange = async (dbUser, newRole) => {
    try {
      const res = await axiosSecure.patch(
        `/users/${dbUser._id}/role`,
        { role: newRole }
      );
// Demo User, demo-user
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: `${dbUser.displayName || 'User'} is now a ${newRole}`,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.response?.data?.message || 'Failed to update role',
      });
    }
  };

  return (
    <div>
      {/* Desktop */}
      <div className="overflow-x-auto hidden sm:block">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>User</th>
              <th>Email</th>
              <th>Role</th>
              <th>Admin Action</th>
              <th>Others</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>

              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src={user.photoURL || ''}
                        alt="User Avatar"
                      />
                    </div>
                  </div>
                  <div className="font-bold">
                    {user.displayName || 'No Name'}
                  </div>
                </div>
              </td>

              <td>{user.email}</td>
              <td>{user.role || 'student'}</td>

              <td>
                <select
                  value={user.role || 'student'}
                  onChange={(e) =>
                    handleRoleChange(user, e.target.value)
                  }
                  className="border rounded-lg p-2 bg-white text-black"
                >
                  <option value="student">Student</option>
                  <option value="tutor">Tutor</option>
                  <option value="admin">Admin</option>
                </select>
              </td>

              <td>
                <button
                  className="btn btn-primary ml-2"
                  onClick={() => navigate(`${user._id}`)}
                >
                  Update
                </button>

                <button
                  className="btn btn-secondary ml-2"
                  onClick={() =>
                    navigate(`user-details/${user._id}`)
                  }
                >
                  Details
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Mobile */}
      <div className="sm:hidden">
        <div className="card bg-base-100 shadow p-4">
          <div className="flex gap-3 items-center">
            <img
              className="w-12 h-12 rounded-full"
              src={user.photoURL || ''}
              alt=""
            />
            <div>
              <p className="font-bold">{user.displayName}</p>
              <p>{user.email}</p>
              <p className="text-sm">{user.role}</p>
            </div>
          </div>

          <select
            value={user.role || 'student'}
            onChange={(e) =>
              handleRoleChange(user, e.target.value)
            }
            className="border rounded-lg p-2 mt-3"
          >
            <option value="student">Student</option>
            <option value="tutor">Tutor</option>
            <option value="admin">Admin</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default DemoUser;
