import { Routes, Route } from 'react-router-dom';
import { CampusSafetyRoutes } from 'views/LostAndFound';
import LostAndFoundKiosk from '.';

// Define which admin routes should be available to kiosk users.
const kioskRoutePrefixes = [
  '/lostandfoundadmin/founditemdatabase',
  '/lostandfoundadmin/reportitemforothers',
];

const KioskRoutes = () => {
  // Filter only the routes whose path starts with one of the kiosk prefixes.
  const filteredEntries = Object.entries(CampusSafetyRoutes).filter(([path]) =>
    kioskRoutePrefixes.some((prefix) => path.startsWith(prefix))
  );

  console.log('Filtered kiosk routes:', filteredEntries);

  return (
    <Routes>
      {/* Index route: landing page for kiosk users */}
      <Route index element={<LostAndFoundKiosk />} />

      {filteredEntries.map(([path, config]) => {
        // Remove the '/lostandfoundadmin' prefix and any leading/trailing slash.
        const kioskPath = path.replace('/lostandfoundadmin', '').replace(/^\//, '').replace(/\/$/, '');
        return <Route key={path} path={kioskPath} element={config.element} />;
      })}
      <Route path="*" element={<div>Kiosk Page Not Found</div>} />
    </Routes>
  );
};

export default KioskRoutes;
