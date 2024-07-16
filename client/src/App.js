import './App.css';
import { Route, Routes } from 'react-router-dom';
import GuestLayout from './components/guestLayout/GuestLayout';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Import Bootstrap JS
import Home from './components/guestLayout/Home';
import About from './components/guestLayout/About';
import StudentRegister from './components/guestLayout/StudentRegister';
import InstituteRegister from './components/guestLayout/InstituteRegister';
import StudentLogin from './components/guestLayout/StudentLogin';
import InstituteLogin from './components/guestLayout/InstituteLogin';
import StudentLayout from './components/StudentLayout/StudentLayout';
import StudentApplication from './components/StudentLayout/StudentApplication';
import PassStatus from './components/StudentLayout/PassStatus';
import EditProfile from './components/StudentLayout/EditProfile';
import ChangePassword from './components/StudentLayout/ChangePassword';
import InstituteLayout from './components/instituteLayout/InstituteLayout';
import ViewApplications from './components/instituteLayout/ViewApplications';
import EditInstituteDetails from './components/instituteLayout/EditInstituteDetails';
import ChangeInstituePassword from './components/instituteLayout/ChangeInstituePassword';
import DepoLayout from './components/depoLayout/DepoLayout';
import ViewDepoApplications from './components/depoLayout/ViewDepoApplications';
import DepoLogin from './components/guestLayout/DepoLogin';
import ViewAllInstitutes from './components/depoLayout/ViewAllInstitutes';
import InstituteForgotPassword from './components/guestLayout/InstituteForgotPassword';
import StudentForgotPassword from './components/guestLayout/StudentForgotPassword';

function App() {
  return (
    <div className="App">
      <Routes>

        <Route path='/' element={<GuestLayout />}>
          <Route index element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/guestLayout/studentRegistration' element={<StudentRegister />} />
          <Route path='/guestLayout/instituteRegistration' element={<InstituteRegister />} />
          <Route path='/guestLayout/studentLogin' element={<StudentLogin />} />
          <Route path='/guestLayout/instituteLogin' element={<InstituteLogin />} />
          <Route path='/guestLayout/depoLogin' element={<DepoLogin />} />
          <Route path='/instituteForgotPassword' element={<InstituteForgotPassword />} />
          <Route path='/studentForgotPassword' element={<StudentForgotPassword />} />
        </Route>

        <Route path='/student' element={<StudentLayout />}>
          <Route index element={<StudentApplication />} />
          <Route path='/student/Apply' element={<StudentApplication />} />
          <Route path='/student/checkStatus' element={<PassStatus />} />
          <Route path='/student/edit-profile' element={<EditProfile />} />
          <Route path='/student/change-password' element={<ChangePassword />} />
        </Route>

        <Route path='/institute' element={<InstituteLayout />}>
          <Route index element={<ViewApplications />} />
          <Route path='/institute/viewApplications' element={<ViewApplications />} />
          <Route path='/institute/edit-profile' element={<EditInstituteDetails />} />
          <Route path='/institute/change-password' element={<ChangeInstituePassword />} />
        </Route>

        <Route path='/depo' element={<DepoLayout />}>
          <Route index element={<ViewDepoApplications />} />
          <Route path='/depo/viewApplications' element={<ViewDepoApplications />} />
          <Route path='/depo/viewInstitutes' element={<ViewAllInstitutes />} />
        </Route>




      </Routes>
    </div>
  );
}

export default App;
