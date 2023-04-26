import { useState } from "react";
import { InternalApi } from "../../utils/app";

export default function EditProfile({ onClose , showToast }) {

    const [email, setEmail] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [retypePassword, setRetypePassword] = useState("");
    const [passMatch, setPassMatch]=useState(true)
    const handleSubmit = async (event) => {
      event.preventDefault();
      if(retypePassword===newPassword){
        const token = localStorage.getItem('token');
        const response = await fetch(InternalApi+'me/edit', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ currentPassword, newPassword, email })
        });
        
        if (response.status === 200) {
          showToast('success','Password and/or email changed successfully');
          onClose()
        } else {
          showToast('error','something went wrong');
          onClose()
        }
      }else{
        setPassMatch(false)
      }
    };
      
    

  return (
        <div className="fixed z-50 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <p className="text-right pr-4 text-xl cursor-pointer" onClick={() => onClose()} >X</p>
              <form onSubmit={handleSubmit}>
               {!passMatch&& <p className="px-6 text-red-600">new password must match !!!</p>}
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
                      Email
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="email"
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="oldPassword">
                      Old Password
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="oldPassword"
                      type="password"
                      value={currentPassword}
                      onChange={(event) => setCurrentPassword(event.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="newPassword">
                      New Password
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="newPassword"
                      type="password"
                      value={newPassword}
                      onChange={(event) => setNewPassword(event.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="retypePassword">
                      Retype Password
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="retypePassword"
                      type="password"
                      value={retypePassword}
                      onChange={(event) => setRetypePassword(event.target.value)}
                      required
                    />
                  </div>
                  <button
          type="submit"
          class="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
        >
          Save
        </button>
                  </div>
                  </form>
                  </div>
                  </div>
                  </div>
                  )}