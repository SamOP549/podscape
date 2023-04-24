import '@/styles/globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Player from '@/components/Player'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }) {
  const router = useRouter()
  const [user, setUser] = useState({ value: null })
  const [creator, setCreator] = useState({ value: null })
  useEffect(() => {
    const myuser = JSON.parse(localStorage.getItem("myuser"))
    if (myuser) {
      setUser({ value: myuser.token, email: myuser.email })
    }
    const mycreator = JSON.parse(localStorage.getItem("mycreator"))
    if (mycreator) {
      setCreator({ value: mycreator.token, email: mycreator.email })
    }
  }, [router.query])
  const userlogout = () => {
    localStorage.removeItem("myuser");
    setUser({ value: null })
    router.push('/')
  }
  const creatorlogout = () => {
    localStorage.removeItem("mycreator");
    setCreator({ value: null })
    router.push('/')
  }
  return <div className='relative'>
    <Navbar user={user} userlogout={userlogout} creatorlogout={creatorlogout} creator={creator} />
    <Component {...pageProps} />
    <Footer />
    <ToastContainer
      position="bottom-center"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  </div>
}
