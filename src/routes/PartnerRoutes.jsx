import { Navigate, Route, Routes } from "react-router";
import PartnerClients from "../pages/PartnerClients/PartnerClients";
import ViewPartnerClient from "../pages/PartnerClients/ViewPartnerClient/ViewPartnerClient";
import Requests from "../pages/Requests/Requests";
import ViewRequest from "../pages/Requests/ViewRequest/ViewRequest";
import EditRequest from "../pages/Requests/EditRequest/EditRequest";
import Profile from "../pages/Profile/Profile";
import Statistics from "../pages/Statistics/Statistics";
import EditProfile from "../pages/Profile/EditProfile/EditProfile";
import AddRequestPartner from "../pages/Requests/AddRequest/AddRequestPartner";

export default function ClientRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate replace to="/statistics" />} />
      <Route path="/*" element={<Navigate replace to="/statistics" />} />
      <Route path="/add-request/partner" element={<AddRequestPartner />} />
      <Route path="/requests" element={<Requests />} />
      <Route path="/requests/:requestId" element={<ViewRequest />} />
      <Route path="/requests/:requestId/edit" element={<EditRequest />} />
      <Route path="/clients" element={<PartnerClients />} />
      <Route path="/clients/:clientId" element={<PartnerClients />} />
      <Route path="/clients/profile/:clientId" element={<ViewPartnerClient />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/profile/edit" element={<EditProfile />} />
      <Route path="/statistics" element={<Statistics />} />
    </Routes>
  );
}
