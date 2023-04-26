import { useState, useEffect } from "react";
import axios from 'axios';
import EditProfile from "./editProfile";
import CreatePost from "./createPost";
import { InternalApi } from "../../utils/app";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import loader from '../../Assets/loading.gif'
export default function Myprofile(){
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState({});
    const [posts, setPosts]= useState(null);
    const [loading, setLoading]=useState(true);
    const [role, setRole]=useState(0)      
    useEffect(() => {
      axios.get(InternalApi+'me', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      .then(response => {
        setCurrentUser(response.data);
        localStorage.setItem('i_d', response.data._id);
        if(response.data.role=='Contributor'){
          setRole(1)
        }
      })
      .catch(error => {
        console.error(error);
      });
    }, []);
  
    const [numOfPosts, setNumOfPosts] = useState(0);
    const [numOfLikes, setNumOfLikes] = useState(0);
  
    useEffect(() => {
      async function fetchPosts() {
        try {
          axios.get(InternalApi+`posts/author/${currentUser._id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
          })
          .then(response => {
            console.log('response ', response.data)
            setPosts(response.data)
            setLoading(false)
            console.log("posts", posts)
    
            let likesCount = 0;
            response.data.forEach((post) => {
              likesCount += post.likes;
            });
    
            setNumOfPosts(response.data.length);
            setNumOfLikes(likesCount);
          })
        } catch (error) {
          console.error(error);
        }
      }
    
      console.log(numOfLikes, ' posts: ',numOfPosts)
      fetchPosts();
    }, [currentUser._id]);
    
console.log(currentUser);
    const handleOpenPopup = () => setIsEditOpen(true);
    const handleClosePopup = () => setIsEditOpen(false);
    const handleOpenCreatePopup = () => setIsCreateOpen(true);
    const handleCloseCreatePopup = () => setIsCreateOpen(false);
    function showToast(type, message) {
      switch (type) {
        case 'success':
          toast.success(message);
          break;
        case 'error':
          toast.error(message);
          break;
        case 'warning':
          toast.warning(message);
          break;
        default:
          toast.info(message);
          break;
      }
    }
    const date = new Date("2023-04-18T16:08:46.042Z");
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
const formattedDate = date.toLocaleDateString('en-US', options);

console.log(formattedDate);
    return (
        <div class="p-16 bg-gradient-to-r from-indigo-200 via-gray-200 to-green-100">
           {loading && <div className='my-12'>
            <img src={loader} className='mx-auto'/>
            </div>}
          {!loading &&
<div class="p-8 bg-white shadow mt-24">
  <div class="grid grid-cols-1 md:grid-cols-3">
    <div class="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
      <div>
       {!loading && <p class="font-bold text-gray-700 text-xl">{numOfPosts}</p>}
        <p class="text-gray-400">Posts</p>
      </div>
      <div>
           <p class="font-bold text-gray-700 text-xl">{numOfLikes}</p>
        <p class="text-gray-400">likes</p>
      </div>
    </div>
    <div class="relative">
      <div class="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
      <img class="object-center object-cover w-full h-full rounded-full" src={currentUser.image} alt="photo"/>
      </div>
    </div>

    <div class="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">
<button onClick={handleOpenPopup}
  class="text-white py-2 px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
>
  Edit Profile
</button>
{role && 
<button onClick={handleOpenCreatePopup}
  class="text-white py-2 px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
>
  Create a post
</button>
}
    </div>
  </div>

  <div class="mt-20 text-center border-b pb-12">
    <h1 class="text-4xl font-medium text-gray-700">{currentUser.fullName}</h1>
    <p class="font-light text-gray-600 mt-3">{currentUser.email}</p>
    <p class="mt-2 text-gray-500">{currentUser.role}</p>
    <p class="mt-2 text-gray-500">Joined on {new Date(currentUser.createdAt).toLocaleDateString('en-US', options)}</p>
  </div>

  <div class="mt-12 flex flex-col justify-center">
    {isEditOpen && (<EditProfile onClose={handleClosePopup} showToast={showToast}/>)}
  </div>
  <div class="mt-12 flex flex-col justify-center">
  {isCreateOpen && (<CreatePost onClose={handleCloseCreatePopup} showToast={showToast}/>)}
  </div>
</div>
}
<ToastContainer
        position="top-right"
        pauseOnFocusLoss={false}
        delay={200}
      />
</div>
)
}