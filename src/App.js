import './styles.css';
import { useEffect,useRef  } from 'react';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Signup from './pages/signup';
import Forgotpassword from './components/forgotpassword';
import Resetpassword from './components/resetpassword';
import Forgotpassword2 from './components/forgotpassword2';
import Home from './pages/home';
import Notifications from './pages/notifications';
import Navbar from './components/navbar';
import Friendrequest from './pages/friendrequest';
import SetEditprofile from './pages/editprofilesetting';
import Personalinfo from './pages/Personal info';
import Photos from './pages/photos';
import Modal from 'react-modal';
import Photodisplay from './pages/photodisplay';
import Videodisplay from './pages/videodisplay';
import Saved from './components/saved';
import Generalsettings from './pages/generalsettings';
import PrivacyandDataSetting from './pages/privacyndatasettings';
import Notificationsettings from './pages/notificationsetting';
import MessageSettings from './pages/messagesettings';
import ErrorPage from './pages/errorpage';
import Messages from './pages/messages';
import MessageDetails from './components/messagedetails';
import data from './message.json'
import StoryPage from './pages/storydisplay';
import PhotosUser from './userview/Photos';
import ProfileheaderUser from './userview/Profileheader';
import VideosUser from './userview/videos';
import ProfileView from './userview/profile';
import Friendview from './userview/friendlist';
import Followers from './pages/follower';
import Following from './pages/following';
import Formbar from './userview/formbar';
import PersonalInfo from './userview/perinfo';
import Addfriends from './userview/addfriends';
import UserDetails from './pages/userdetails';
import UserForm from './userview/defaultform';
import Chat from './pages/chat';
import Post from './userview/timeline';
import StoryUpload from './pages/uploadstory';
import Sliper from './pages/uploadreels.';
import DisplayReels from './pages/displayreels';
import OneSignal from 'react-onesignal';
import Shortcut from './components/shortcut';
import Displayphoto from './pages/displayposts';
import ProfessionPost from './userview/professionview';
import Aboutus from './pages/aboutus';
import ProfessionEditForm from './pages/professioneditform';
import ProfessionPage from './pages/professionpage';
import ProfessionType from './pages/Professiontype';
import PhysicalAttributes from './pages/professionaleditform2';
import ProfessionalExperience from './pages/professioneditform3';
import Availability from './pages/professioneditform4';
import AdditionalInformation from './pages/professioneditform5.jsx';
import CrewInformation from './pages/crewform1.jsx';
import CrewCollaboration from './pages/crewform2.jsx';
import ProfileUser from './userview/userProfileHeader.jsx';
import Signin from './pages/signin.js';
import Department from './pages/select department.jsx';
import HorizontalScrollGallery from './pages/scroll.jsx';
import Aboutmod from './pages/about1.js';
import AboutEdit from './pages/about2.js';
import AboutCostume from './pages/about3.js';
import Musicdirector from './pages/about4.js';
import AboutProducer from './pages/about5.js';
import AboutArtdirection from './pages/about6.js';
import AboutChoreo from './pages/about7.js';
import ProfileFormWizard from './pages/demowizard.js'
import Dashboard from './admindashboard/dashboard';
import ProfileForm from './pages/profileform.js';
import LoginWizard from './pages/wizardlogin.js';
import LoginAdminWizard from './pages/wizardadminlogin.js';
import AdminDashboard from './pages/dashboard.js';

Modal.setAppElement('#root');

function App() {

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Use token (e.g., set it in state)
    }
  }, []);
  
  const isInitialized = useRef(false);

  useEffect(() => {
    // Ensure this code runs only on the client side
    if (typeof window !== 'undefined' && !isInitialized.current) {
      OneSignal.init({
        appId: '4278726c-031a-4bb7-8a8b-b85b021e762e',
        notifyButton: {
          enable: false,
        },
      });
      isInitialized.current = true; // Set the flag to true after initialization
    }
  }, []);

  return(
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Signin />} />
        <Route path='/adminlogin' element={<LoginAdminWizard />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/department' element={<Department />} />
        <Route path='/forgotpassword' element={<Forgotpassword />} />
        <Route path='/resetpassword' element={<Resetpassword />} />
        <Route path='/gw' element={<Formbar />} />
        <Route path='/userform' element={<UserForm />} />
        <Route path='/pw' element={<PersonalInfo />} />
        <Route path="/user/:userID/profile" element={<DefaultWithNavbar><DefaultShortcut><UserDetails /></DefaultShortcut></DefaultWithNavbar>} />
        <Route path='/forgotpassword2' element={<Forgotpassword2 />} />
        <Route path="/newsfeed" element={<DefaultWithNavbar><Home /></DefaultWithNavbar>} />
        <Route path='/messages' element={<Messages />} />
        <Route path='/FormWizard' element={<ProfileFormWizard />} />
        <Route path='/scroll' element={<HorizontalScrollGallery />} />
        <Route path='messages/:messagesId' element={<MessageDetails data={data} />} />
        <Route path='/notifications/:userID' element={<DefaultWithNavbar><DefaultWithHeaderUser><Notifications /></DefaultWithHeaderUser></DefaultWithNavbar>} />
        <Route path='/photos'  exact element={<DefaultWithNavbar><DefaultWithHeaderUser><DefaultShortcut><Photos /></DefaultShortcut></DefaultWithHeaderUser></DefaultWithNavbar>} />
        <Route path='/:userID/followers/' element={<DefaultWithNavbar><DefaultWithHeaderUser><Followers /></DefaultWithHeaderUser></DefaultWithNavbar>} />
        <Route path='/:userID/following/' element={<DefaultWithNavbar><DefaultWithHeaderUser><Following /></DefaultWithHeaderUser></DefaultWithNavbar>} />
        <Route path='/editpersonal' element={<DefaultWithNavbar><Personalinfo /></DefaultWithNavbar>} />
        <Route path='/friendrequest/:userID' element={<DefaultWithNavbar><DefaultWithHeaderUser><Friendrequest /></DefaultWithHeaderUser></DefaultWithNavbar>} />
        <Route path='/editprofile' element={<DefaultWithNavbar><SetEditprofile /></DefaultWithNavbar>} />
        <Route path='/photos/:id/photos' element={<DefaultWithNavbar><Photodisplay /></DefaultWithNavbar>}/>
        <Route path='/videos/:id/videos' element={<Videodisplay />} />
        <Route path='/saved' element={<DefaultWithNavbar><DefaultWithHeader><Saved /></DefaultWithHeader></DefaultWithNavbar>} />
        <Route path='/settings' element={<DefaultWithNavbar><Generalsettings /></DefaultWithNavbar>} />
        <Route path='/Privacydata' element={<DefaultWithNavbar><PrivacyandDataSetting /></DefaultWithNavbar>} />
        <Route path='/notificationsettings' element={<DefaultWithNavbar><Notificationsettings /></DefaultWithNavbar>} />
        <Route path='/messagesettings' element={<DefaultWithNavbar><MessageSettings /></DefaultWithNavbar>} />
        <Route path='/storypage' element={<StoryPage />}/>
        <Route path='/timelineview/:userID/timeline' element={<DefaultWithNavbar><DefaultWithHeaderUser><DefaultShortcut><Post /></DefaultShortcut></DefaultWithHeaderUser></DefaultWithNavbar>}/>
        <Route path='/professionview/:userID' element={<DefaultWithNavbar><DefaultWithHeaderUser><DefaultShortcut><ProfessionPost /></DefaultShortcut></DefaultWithHeaderUser></DefaultWithNavbar>}/>
        <Route path='/photosview/:userID/photos' element={<DefaultWithNavbar><DefaultWithHeaderUser><DefaultShortcut><PhotosUser /></DefaultShortcut></DefaultWithHeaderUser></DefaultWithNavbar>}/>
        <Route path='/profilehead' element={<ProfileheaderUser />}/>
                <Route path='/profileWizard' element={<ProfileForm/>}/>
                <Route path='/Dashboardview' element={<Dashboard/>}/>
        <Route path='/uploadstory' element={<StoryUpload />}/>
        <Route path='/addfriends' element={<Addfriends />}/>
        <Route path='/videosview/:userID/videos' element={<DefaultWithNavbar><DefaultWithHeaderUser><DefaultShortcut><VideosUser /></DefaultShortcut></DefaultWithHeaderUser></DefaultWithNavbar>} />
        <Route path='/profileview' element={<DefaultWithNavbar><DefaultWithHeaderUser><ProfileView /></DefaultWithHeaderUser></DefaultWithNavbar>}/>
        <Route path='/friendsview/:userID/friends' element={<DefaultWithNavbar><DefaultWithHeaderUser><DefaultShortcut><Friendview /></DefaultShortcut></DefaultWithHeaderUser></DefaultWithNavbar>} />
        <Route path='*' element={<ErrorPage />} />
                <Route path='/login' element={<LoginWizard />} />
        <Route path='test' element={ <Sliper />} />
        <Route path='/Reels/:userID/reel' element={<DefaultWithNavbar><DisplayReels /></DefaultWithNavbar>} />
        <Route path='/chat' element={<Chat />} />
        <Route path='/about/:userID' element={<DefaultWithNavbar><Aboutus /></DefaultWithNavbar>} />
        <Route path='/aboutEdit' element={<AboutEdit />} />
        <Route path='/musicdirector' element={<Musicdirector />} />
        <Route path='/post/:userID/:postID/posts' element={<DefaultWithNavbar><Displayphoto /></DefaultWithNavbar>} />
        <Route path='/Profession/Professiontype/Artist/Personal' element={<DefaultWithNavbar><ProfessionEditForm /></DefaultWithNavbar>} />
        <Route path='/Profession/Professiontype/Crew/Personal' element={<DefaultWithNavbar><CrewInformation/></DefaultWithNavbar>}/>
        <Route path='/Profession/Professiontype/Crew/TeamCollaboration' element={<DefaultWithNavbar><CrewCollaboration/></DefaultWithNavbar>}/>
        <Route path='/Profession/Professiontype/Artist/PhysicalAttributes' element={<DefaultWithNavbar><PhysicalAttributes /></DefaultWithNavbar>} />
        <Route path='/Profession/Professiontype/Artist/ProfessionalExperience' element={<DefaultWithNavbar><ProfessionalExperience/></DefaultWithNavbar>}/>
        <Route path='/Profession/Professiontype/Artist/Availability' element={<DefaultWithNavbar><Availability/></DefaultWithNavbar>}/>
        <Route path='/Profession/Professiontype/Artist/Additionalinformation' element={<DefaultWithNavbar><AdditionalInformation/></DefaultWithNavbar>}/>
        <Route path='/Profession' element={<ProfessionPage />} />
        <Route path='/costume' element={<AboutCostume />} />
        <Route path='/choreo' element={<AboutChoreo />} />
        <Route path='/Producer' element={<AboutProducer />} />
        <Route path='/Dashboard' element={<AdminDashboard />} />
        <Route path='/profileform' element={<ProfileForm />} />
        <Route path='/art' element={<AboutArtdirection />} />
        <Route path='/cinematographer' element={<Aboutmod />} />
        <Route path='/Profession/Professiontype' element={<ProfessionType />} />
      </Routes>
    </Router>
    </>
  )
}

const DefaultWithNavbar = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  )
  ;
}

const DefaultShortcut = ({children}) =>{
  return(
    <>
            <Shortcut />
            {children}
    </>
  )
  
}

const DefaultWithHeaderUser = ({ children }) => {
  return (
    <>
      <ProfileheaderUser />
      {children}
    </>
  );
};


  const DefaultWithHeader = ({ children }) => {
  return (
    <>
       <ProfileUser />
      {children}
    </>
  );
};

export default App;
