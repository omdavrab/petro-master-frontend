import React, { useEffect, useState } from 'react'
import Footer from './Footer'
import Header from './Header'



const Layout = ({ children }) => {


    const [containerHeight, setContainerHeight] = useState(0);

    useEffect(() => {
      const handleResize = () => {
        const height = window.innerHeight;
        setContainerHeight(height);
      };
  
      // Add event listener for window resize
      window.addEventListener('resize', handleResize);
  
      // Initial height calculation
      handleResize();
  
      // Clean up the event listener on component unmount
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);
    return (
        <div  style={{ height: containerHeight }} className='flex bg-white flex-col mx-auto'>
            <Header />
            <main  style={{ height: containerHeight }} className=' overflow-auto '>
                {children}
            </main>
            <Footer />
        </div>
    )
}

export default Layout
