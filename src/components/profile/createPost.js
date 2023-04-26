import axios from 'axios';
import { useState, useEffect } from 'react';
import { InternalApi } from '../../utils/app';
export default function CreatePost({ onClose , showToast }) {
    const [title, setTitle] = useState('');
    const [postCid1, setPostCid1] = useState('');
    const [authorId, setAuthId]= useState('')
    const [postImageUrl, setPostImageUrl] = useState('');
    const [description, setDescription] = useState('');
    useEffect(() => {
        axios.get(InternalApi+'me', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        .then(response => {
          setAuthId(response.data._id);
        })
        .catch(error => {
          console.error(error);
        });
      }, []);
    const handleSubmit = async (event) => {
      event.preventDefault();
    
      try {
        let postCid=postCid1.toUpperCase();
        const response = await axios.post(InternalApi + 'posts', {
          authorId,
          title,
          postCid,
          postImageUrl,
          description,

        }, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
    
        showToast('success','post added successfully');
        onClose()
      } catch (error) {
        showToast('error','something went wrong');
          onClose()
      }
    };
    
    return(
        <div className="fixed z-50 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <p className="text-right pr-4 text-xl cursor-pointer" onClick={() => onClose()} >X</p>
<div class="heading text-center font-bold text-2xl m-5 text-gray-800">New Post</div>
  <div class="editor mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl">
    <input class="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none" spellcheck="false" placeholder="Title" type="text"
     value={title}
     onChange={(event) => setTitle(event.target.value)}
     />
     <input class="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none" spellcheck="false" placeholder="Country code" type="text"
    value={postCid1}
    onChange={(event) => setPostCid1(event.target.value)}
    />
    <input class="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none" spellcheck="false" placeholder="Image url" type="text"
    value={postImageUrl}
    onChange={(event) => setPostImageUrl(event.target.value)}
    />
    <textarea class="description bg-gray-100 sec p-3 h-60 border border-gray-300 outline-none" spellcheck="false" placeholder="Describe everything about this post here"
     value={description}
     onChange={(event) => setDescription(event.target.value)}
     ></textarea>
    <div class="buttons flex mt-4">
      <div class="btn border border-gray-300 p-1 px-4 font-semibold cursor-pointer text-gray-500 ml-auto" onClick={() => onClose()} >Cancel</div>
      <div class="btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-blue-500" onClick={handleSubmit}>Post</div>
    </div>
    </div>
    </div>
    </div>
    </div>
    )
}