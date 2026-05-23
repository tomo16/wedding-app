import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import GuestPage from "./pages/GuestPage";
import ReceptionPage from "./pages/ReceptionPage";
import SeatingChartPage from "./pages/SeatingChartPage";
import { GuestProvider } from "./context/GuestContext";
import MenuPage from "./pages/MenuPage";
import PhotoGalleryPage from "./pages/PhotoGalleryPage";
import TimelinePage from "./pages/TimelinePage";
import ProfilePage from "./pages/ProfilePage";
import VenueInfoPage from "./pages/VenueInfoPage";
import VenueMapPage from "./pages/VenueMapPage";
import MessagePage from "./pages/MessagePage";
import PhotoUploadPage from "./pages/PhotoUploadPage";
import MessageListPage from "./pages/MessageListPage";
import DrinkMenuPage from "./pages/DrinkMenuPage";
import { ReceptionSummary } from "./pages/ReceptionSummaryPage";
import HistoryPage from "./pages/History";

function App() {
  return (
    <GuestProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/guest/:id" element={<GuestPage />} />
          <Route path="/reception/:code" element={<ReceptionPage />} />
          <Route path="/seating" element={<SeatingChartPage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/photo" element={<PhotoGalleryPage />} />
          <Route path="/timeline" element={<TimelinePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/venueInfo" element={<VenueInfoPage />} />
          <Route path="/venueMap" element={<VenueMapPage />} />
          <Route path="/message" element={<MessagePage />} />
          <Route path="/photoUpload" element={<PhotoUploadPage />} />
          <Route path="/messageList" element={<MessageListPage />} />
          <Route path="/drink" element={<DrinkMenuPage />} />
          <Route path="/groomSummary" element={<ReceptionSummary side={"groom"} />} />
          <Route path="/brideSummary" element={<ReceptionSummary side={"bride"} />} />
          <Route path="/history" element={<HistoryPage />} />
        </Routes>
      </Router>
    </GuestProvider>
  );
}

export default App;
