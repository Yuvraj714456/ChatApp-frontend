import { lazy, Suspense, useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './components/auth/ProtectedRoute'
import { useGetAdminMutation, useGetProfileMutation } from './redux/api/api'
import { adminExist, adminNotExist, userExists, userNotExists } from './redux/reducers/auth'
import { SocketProvider } from './socket'

const Home = lazy(()=>import('./pages/Home'))
const Login = lazy(()=>import('./pages/Login'))
const Chat = lazy(()=>import('./pages/Chat'))
const ChatInfo = lazy(()=>import('./pages/ChatInfo'))
const NotFound = lazy(()=>import('./pages/NotFound'))



const AdminLogin = lazy(()=>import('./pages/admin/AdminLogin'))
const Dashboard = lazy(()=>import('./pages/admin/Dashboard'))
const UserManagement = lazy(()=>import('./pages/admin/UserManagement'))

const App = () => {

  const {user,loader} = useSelector(state=>state.auth);

  const [getAdmin] = useGetAdminMutation();
  const [getProfile] = useGetProfileMutation();

  const dispatch = useDispatch();

  useEffect(()=>{
    const getData= async ()=>{
      try {
        const res = await getProfile().unwrap();
        if(res?.success){
          dispatch(userExists(res.user));
        }else{
          dispatch(userNotExists());
        }
      } catch (error) {
        dispatch(userNotExists());
      }
    }
    getData();
  },[getProfile,dispatch]);

  useEffect(()=>{
    const verifyAdmin= async ()=>{
      try {
        const res = await getAdmin().unwrap();
        if(res?.admin){
          dispatch(adminExist());
        }else{
          dispatch(adminNotExist());
        }
      } catch (error) {
        dispatch(adminNotExist());
      }
    }
    verifyAdmin();
  },[getAdmin,dispatch]);


  

  return loader ? (<div>Loading...</div>):(
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
          <Routes>
              <Route  element={<SocketProvider>
                            <ProtectedRoute user={user}/>
                          </SocketProvider>}>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/chat/:id' element={<Chat/>}/>
                    <Route path="/chat/info/:id" element={<ChatInfo />}/>
              </Route>      
              <Route path='/login'  
                    element={
                      <ProtectedRoute user={!user} redirect='/'>
                        <Login/>
                      </ProtectedRoute>
                    }
              />

              <Route path='/admin' element={<AdminLogin/>}/>
              <Route path='/admin/dashboard' element={<Dashboard/>}/>
              <Route path='/admin/usermanagement' element={<UserManagement/>}/>

              <Route path='*' element={<NotFound/>}/>  
        </Routes>

      </Suspense>
      <Toaster position='bottom-right'/>
    </BrowserRouter>
  )
}

export default App