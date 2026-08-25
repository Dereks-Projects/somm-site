// components/homepage/VideoRail.js
// Purpose: Homepage "Latest Videos" strip. Server component: renders the 9:16
// cards (no mounted players) and hands them to the client scroll shell as
// children, so the cards stay server-rendered and never enter the client bundle.

import VideoCard from '../videos/VideoCard';
import VideoRailScroller from './VideoRailScroller';
import styles from './VideoRail.module.css';

export default function VideoRail({ videos }) {
  if (!videos || videos.length === 0) return null;

  return (
    <div className={styles.rail}>
      <VideoRailScroller>
        {videos.map((video) => (
          <div key={video.id} className={styles.railItem}>
            <VideoCard video={video} href={`/videos/scroll?v=${video.id}`} />
          </div>
        ))}
      </VideoRailScroller>
    </div>
  );
}