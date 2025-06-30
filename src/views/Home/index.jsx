import React, { useState } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

import { useUser } from 'hooks';
import GordonLoader from 'components/Loader';
import GuestWelcome from './components/GuestWelcome';
import Carousel from './components/Carousel';
import DiningBalance from './components/DiningBalance';
import LostAndFoundCard from './components/LostAndFoundCard';
import NewsCard from './components/NewsCard';
import DaysLeft from './components/DaysLeft';

const ResponsiveGridLayout = WidthProvider(Responsive);

const rowHeight = 150; // <--- 🔥 DEFINE THIS at top-level

const Home = () => {
  const { profile, loading } = useUser();

  const [layout, setLayout] = useState({
    lg: [
      { i: 'carousel', x: 0, y: 0, w: 6, h: 8, resizeHandles: ['e', 'w'] },
      { i: 'daysLeft', x: 0, y: 2, w: 6, h: 0.6, resizeHandles: ['e', 'w'] },
      { i: 'diningBalance', x: 0, y: 3, w: 3, h: 2, resizeHandles: ['e', 'w'] },
      { i: 'news', x: 3, y: 3, w: 3, h: 3, resizeHandles: ['e', 'w'] },
      { i: 'lost', x: 3, y: 6, w: 3, h: 2, resizeHandles: ['e', 'w'] },
    ],
  });

  const handleLayoutChange = (newLayout) => {
    // setLayout((prev) => ({ ...prev, lg: newLayout }));
  };

  function updateItemHeightFromDOM(id) {
    const el = document.querySelector(`[data-grid-item-id="${id}"]`);
    console.log('lement', el);
    if (!el) return;

    const heightInPx = el.children[0].offsetHeight;
    const newH = Math.ceil(heightInPx / rowHeight) + 1;

    console.log(el);

    const newLayout = {
      ...layout,
      lg: layout.lg.map((item) => (item.i === id ? { ...item, h: newH } : item)),
    };
    console.log('new layout', newLayout);
    setLayout(newLayout);
  }

  if (loading) return <GordonLoader />;
  if (!profile) return <GuestWelcome />;

  return (
    <div style={{ padding: '20px' }}>
      <ResponsiveGridLayout
        className="layout"
        compactType="vertical"
        layouts={layout}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480 }}
        cols={{ lg: 6, md: 6, sm: 3, xs: 2 }}
        rowHeight={100}
        onLayoutChange={handleLayoutChange}
        onResizeStop={(layout, oldItem, newItem, placeholder, event, element) => {
          console.log('new item', newItem);
          updateItemHeightFromDOM(newItem.i);
        }}
        draggableHandle=".drag-handle"
      >
        <div key="carousel" data-grid-item-id="carousel" className="grid-item">
          <Carousel />
        </div>

        <div key="daysLeft" data-grid-item-id="daysLeft" className="grid-item">
          <DaysLeft />
        </div>

        <div key="diningBalance" data-grid-item-id="diningBalance" className="grid-item">
          <DiningBalance />
        </div>

        <div key="news" data-grid-item-id="news" className="grid-item">
          <LostAndFoundCard />
        </div>

        <div key="lost" data-grid-item-id="lost" className="grid-item">
          <NewsCard />
        </div>
      </ResponsiveGridLayout>
    </div>
  );
};

export default Home;
