import { useEffect } from 'react';
import { auth } from './firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import HeroSection from './components/HeroSection';
import Banner from './components/Banner';
import AboutUs from './components/AboutUs';
import Projects from './components/Projects';
import ContactUs from './components/ContactUs';
function App() {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('User is signed in:', user);
      } else {
        console.log('No user signed in.');
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
    <Banner/>
    
    <div className="bg-gray-100 text-gray-800 min-h-screen pt-20">
      
      <HeroSection />
    </div>
    <AboutUs/>
    <Projects/>
    <ContactUs/>
    </>
  );
}

export default App;
