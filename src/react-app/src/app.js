import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import { Layout } from "./components/layout";
import { Footer } from "./components/footer";

import { Amplify } from "aws-amplify";
import { COGNITO } from "./configs/aws";

import { Page as Landing } from "./pages/landing";

import { Page as Signup } from "./pages/auth/signup";
import { Page as Confirmation } from "./pages/auth/confirmation";
import { Page as Signin } from "./pages/auth/signin";

import { ProtectedApp as App } from './pages/application';

Amplify.configure({
    aws_cognito_region: COGNITO.REGION,
    aws_user_pools_id: COGNITO.USER_POOL_ID,
    aws_user_pools_web_client_id: COGNITO.APP_CLIENT_ID,
});

export default function Application() {
    return (
        <Router>
            <Routes>


                <Route path='/' element={<Layout content={<Landing />} footer={<Footer />} />} />

                <Route path='/signup' element={<Layout content={<Signup />} footer={<Footer />} />} />
                <Route path='/confirmation/:uid' element={<Layout content={<Confirmation />} footer={<Footer />} />} />
                <Route path='/signin' element={<Layout content={<Signin />} footer={<Footer />} />} />

                <Route path='/app' element={<Layout content={<App />} sidebar={<div />} footer={<div />} raw/>}/>

                <Route path="*" element={<Navigate to="/" replace />} />

            </Routes>
        </Router>
    )
}