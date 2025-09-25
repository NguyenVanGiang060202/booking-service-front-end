
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import './App.css'
import UserInfo from './pages/User-Info/user-info';
import LandingPage from './pages/LandingPage/LandingPage';
import Dashboard from './pages/Dashboard/dashboard';
import { useAuth } from './hooks/useAuth';
import LoginPage from './pages/Auth/Login/LoginPage';
import AnalysisDetail from './pages/AnalysisDetail/analysis-detail';

const ProtectRoute = () => {
	const {accessToken, user} = useAuth();
	const isAuth = accessToken && user;
	if (isAuth) {
		return <Outlet />
	}
	return <Navigate to="/login" />
}

function App() {
	return (
		<div className="">
			<Routes>
				<Route>
					<Route path="/" element={<LandingPage />} />
					<Route path="/login" element={<LoginPage />} />
				</Route>
				<Route element={<ProtectRoute />}>
					<Route path='/dashboard' element={<Dashboard />} />
					<Route path='/user-info' element={<UserInfo />} />
					<Route path='/analysis-detail' element={<AnalysisDetail />} />
				</Route>
			</Routes>
			
		</div>
	)
}

export default App
