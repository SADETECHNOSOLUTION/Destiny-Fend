import './App.css';
import Navbar from './components/navbar';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Signin from './pages/signin';
import Forgotpassword from './components/forgotpassword';
import Signup from './pages/signup';
import Default from './pages/default';
import Menu from './pages/menu';
import Home from './pages/home';
import Profileheader from './userview/Profileheader';
import ProfileView from './userview/profile';
import Post from './userview/timeline';
import Friends from './userview/friendlist';
import Photos from './userview/Photos';
import Videos from './userview/videos';
import Displayphoto from './pages/displaypost';
import StoryPage from './pages/storydisplay';
import Friendrequest from './pages/friendrequest';
import Notifications from './pages/notifications';
import MessageList from './pages/messagelist';
import Chat from './pages/chat';
import StoryUpload from './components/createstory';
import Postinfo from './components/postDetails';
import Birthday from './components/birthday';
import Search from './components/search';
import Weather from './components/weather';
import Formbar from './components/formheader';
import Reels from './components/reels';
import DisplayReels from './pages/displayreels';
import Aboutus from './pages/aboutus';
import Profession from './pages/profession';
import ProfessionType from './pages/professiontype';
import FormDisplay from './pages/formdisplay';
import DirectorPortfolio from './pages/directorPortfolio';
import Scriptwriter from './pages/scriptPortfolio';
import MusicDirectorPortfolio from './pages/musicportfolio';
import CostumeDesignerPortfolio from './pages/choreographerPortfolio';
import FilmEditorPortfolio from './pages/editor';
import ProducerPortfolio from './pages/producerPortfolio';
import CinematographerPortfolio from './pages/cinematographer';
import RecruiterDashboard from './pages/recruiterdashboard';
import CastAndCrew from './pages/castandcrew';
import Budget from './pages/budget';
import Positions from './pages/jobPosition';
import TalentPartnerOnboardingMobile from './pages/talent';
import SetUpPartnerProfileMobile from './pages/talentprofileorg';
import SetupOrg from './pages/talentorg';
import TalentPartnerDashboard from './pages/talenthome';
import PostJob from './pages/postjob';
import Findtalent from './pages/findtalent';
import Applicants from './pages/applicants';
import Applications from './pages/application';
import Compare from './pages/compare';
import CreateAudition from './pages/scheduleaudition';
import MakeOffer from './pages/makeoffer';
import Promote from './pages/promote';
import Events from './pages/events';
import CreateEvent from './pages/createevents';
import TeamManagement from './pages/teams';
import Verification from './pages/verification';
import CreateProject from './pages/createproject';


function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Signin />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/forgotpassword' element={<Forgotpassword />} />
        <Route path='/signup' element={<Signup />}/>
                <Route path='/talent/dashboard' element={<DefaultWithNavbar><TalentPartnerDashboard /></DefaultWithNavbar>}/>
                <Route path='/talent/compare' element={<DefaultWithNavbar><Compare /></DefaultWithNavbar>}/>
                <Route path='/talent/promote' element={<DefaultWithNavbar><Promote /></DefaultWithNavbar>}/>
                <Route path='/talent/create-event' element={<DefaultWithNavbar><CreateEvent /></DefaultWithNavbar>}/>
                <Route path='/talent/create-project' element={<DefaultWithNavbar><CreateProject /></DefaultWithNavbar>}/>

                <Route path='/talent/verification' element={<DefaultWithNavbar><Verification /></DefaultWithNavbar>}/>

                <Route path='/talent/team' element={<DefaultWithNavbar><TeamManagement /></DefaultWithNavbar>}/>

                <Route path='/talent/events' element={<DefaultWithNavbar><Events /></DefaultWithNavbar>}/>

                <Route path='/talent/makeoffer' element={<DefaultWithNavbar><MakeOffer /></DefaultWithNavbar>}/>

                <Route path='/talent/create-audition' element={<DefaultWithNavbar><CreateAudition /></DefaultWithNavbar>}/>

                <Route path='/talent/applications' element={<DefaultWithNavbar><Applications /></DefaultWithNavbar>}/>

                <Route path='/talent/applicants' element={<DefaultWithNavbar><Applicants /></DefaultWithNavbar>}/>

                <Route path='/talent/post-a-job' element={<DefaultWithNavbar><PostJob /></DefaultWithNavbar>}/>
                <Route path='/talent/findtalent' element={<DefaultWithNavbar><Findtalent /></DefaultWithNavbar>}/>
        <Route path='/talent' element={<DefaultWithNavbar><TalentPartnerOnboardingMobile /></DefaultWithNavbar>}/>
        <Route path='/talent/setup-organization' element={<DefaultWithNavbar><SetupOrg /></DefaultWithNavbar>}/>

        <Route path='/talent/setup-profile' element={<DefaultWithNavbar><SetUpPartnerProfileMobile /></DefaultWithNavbar>}/>
        <Route path='/newsfeed' element={<DefaultWithNavbar><Home /></DefaultWithNavbar>}/>
        <Route path='/menu' element={<Menu />} />
        <Route path='/user/:userID' element={<DefaultWithNavbar><DefaultHeader><ProfileView/></DefaultHeader></DefaultWithNavbar>} />
        <Route path='/timeline/:userID' element={<DefaultWithNavbar><DefaultHeader><Post /></DefaultHeader></DefaultWithNavbar>}/>
        <Route path='/friends/:userID' element={<DefaultWithNavbar><DefaultHeader><Friends /></DefaultHeader></DefaultWithNavbar>} />
        <Route path='/photos/:userID' element={<DefaultWithNavbar><DefaultHeader><Photos /></DefaultHeader></DefaultWithNavbar>} />
        <Route path='/videos/:userID' element={<DefaultWithNavbar><DefaultHeader><Videos /></DefaultHeader></DefaultWithNavbar>} />
        <Route path='/post/:userID/:postID' element={<DefaultWithNavbar><Displayphoto /></DefaultWithNavbar>} />
        <Route path='/storypage' element={<StoryPage />}/>
        <Route path='/friendrequest' element={<DefaultWithNavbar> <Friendrequest /></DefaultWithNavbar>}/>
        <Route path='/notifications' element={<DefaultWithNavbar> <Notifications /></DefaultWithNavbar>}/>
        <Route path='/messages' element={<DefaultWithNavbar> <MessageList /></DefaultWithNavbar>}/>
        <Route path='/messages/:messageID' element={<Chat />} />
        <Route path='/profession' element={<DefaultWithNavbar><Profession /></DefaultWithNavbar>} />
        <Route path='/uploadStory' element={<StoryUpload />} />
        <Route path='/about/:userID' element={<DefaultWithNavbar><Aboutus /></DefaultWithNavbar>} />
        <Route path='/postinfo' element={<Postinfo />} />
        <Route path='/birthdays' element={<DefaultWithNavbar><Birthday /></DefaultWithNavbar>} />
        <Route path='/weather' element={<DefaultWithNavbar><Weather /></DefaultWithNavbar>} />
        <Route path='/search' element={<DefaultWithNavbar><Search /></DefaultWithNavbar>} />
        <Route path='/profession/professiontype' element={<DefaultWithNavbar><ProfessionType /></DefaultWithNavbar>} />
        <Route path='/profession/form' element={<FormDisplay />} />
        <Route path='/profession/script' element={<Scriptwriter />} />
        <Route path='/profession/music' element={<MusicDirectorPortfolio />} />
                <Route path='/recruiterdashboard' element={<RecruiterDashboard />} />
                <Route path='/Content/Budget' element={<Budget />} />
                <Route path='/JobPosition' element={<Positions />} />

        <Route path='/Content/Castandcrew' element={<CastAndCrew />} />

        <Route path='/profession/director' element={<DirectorPortfolio />} />
        <Route path='/profession/costume' element={<CostumeDesignerPortfolio />} />
                <Route path='/profession/producer' element={<ProducerPortfolio />} />
                            <Route path='/profession/cinematographer' element={<CinematographerPortfolio />} />
        <Route path='/profession/editor' element={<FilmEditorPortfolio />} />   
        <Route path='/profiledetails' element={<Formbar />} />
        <Route path='/reels' element={<Reels />} />
        <Route path='/Reels/:userID' element={<DisplayReels />} />
        <Route path='/profession/:userID' element={<Aboutus />} />
      </Routes>
    </Router>
    </>
  );
}

const DefaultWithNavbar = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

const DefaultHeader = ({ children }) => {
  return (
    <>
      <Profileheader />
      {children}
    </>
  );
}




export default App;
