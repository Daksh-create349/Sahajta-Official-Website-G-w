import logo from '@/assets/sahajta-logo.png';
import minimalist from '@/assets/minimalist-1.jpg';
import discovery from '@/assets/discovery-inspect.png';
import slaBuild from '@/assets/sla-build.png';
import integration from '@/assets/integration-connect.png';
import handover from '@/assets/handover-ownership.png';
import coverStratapilot from '@/assets/cover-stratapilot.png';
import coverHireai from '@/assets/cover-hireai.png';
import coverInvoice from '@/assets/cover-invoice.png';
import coverBlogagent from '@/assets/cover-blogagent.png';
import service1 from '@/assets/services/service-1.png';
import service2 from '@/assets/services/service-2.png';
import service3 from '@/assets/services/service-3.png';
import service4 from '@/assets/services/service-4.png';
import heroPoster from '@/assets/video/hero-showcase-poster.jpg';
import talentPoster from '@/assets/video/talent-showcase-poster.jpg';
import heroWebm from '@/assets/video/hero-showcase.webm';
import heroMp4 from '@/assets/video/hero-showcase.mp4';
import talentMp4 from '@/assets/video/talent-showcase.mp4';

const IMAGES = [
  logo,
  minimalist,
  discovery,
  slaBuild,
  integration,
  handover,
  coverStratapilot,
  coverHireai,
  coverInvoice,
  coverBlogagent,
  service1,
  service2,
  service3,
  service4,
  heroPoster,
  talentPoster,
];

const VIDEOS = [heroWebm, heroMp4, talentMp4];

const ASSET_TIMEOUT_MS = 15000;
const FONT_TIMEOUT_MS = 8000;

// Keeps warmed video elements alive until the page is revealed, so the browser
// does not abort buffering when the local reference goes out of scope.
const warmedVideos: HTMLVideoElement[] = [];

function withTimeout(task: Promise<void>, ms: number): Promise<void> {
  return new Promise((resolve) => {
    const timer = setTimeout(resolve, ms);
    task.then(() => {
      clearTimeout(timer);
      resolve();
    });
  });
}

function loadImage(url: string): Promise<void> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      // Decode before resolving so the first paint after reveal is not blocked
      // on rasterising a multi-megabyte PNG.
      if (typeof img.decode === 'function') img.decode().then(() => resolve(), () => resolve());
      else resolve();
    };
    img.onerror = () => resolve();
    img.src = url;
  });
}

function loadVideo(url: string): Promise<void> {
  return new Promise((resolve) => {
    const video = document.createElement('video');
    video.preload = 'auto';
    video.muted = true;
    video.playsInline = true;
    video.oncanplaythrough = () => resolve();
    video.onerror = () => resolve();
    warmedVideos.push(video);
    video.src = url;
    video.load();
  });
}

function fontsReady(): Promise<void> {
  if (!('fonts' in document)) return Promise.resolve();
  return document.fonts.ready.then(() => undefined);
}

function windowLoaded(): Promise<void> {
  if (document.readyState === 'complete') return Promise.resolve();
  return new Promise((resolve) => {
    window.addEventListener('load', () => resolve(), { once: true });
  });
}

export function releasePreloadedVideos(): void {
  warmedVideos.length = 0;
}

export function preloadEverything(onProgress: (loaded: number, total: number) => void): Promise<void> {
  const tasks: Promise<void>[] = [
    ...IMAGES.map((url) => withTimeout(loadImage(url), ASSET_TIMEOUT_MS)),
    ...VIDEOS.map((url) => withTimeout(loadVideo(url), ASSET_TIMEOUT_MS)),
    withTimeout(fontsReady(), FONT_TIMEOUT_MS),
    withTimeout(windowLoaded(), ASSET_TIMEOUT_MS),
  ];

  const total = tasks.length;
  let loaded = 0;
  onProgress(0, total);

  return Promise.all(
    tasks.map((task) =>
      task.then(() => {
        loaded += 1;
        onProgress(loaded, total);
      }),
    ),
  ).then(() => undefined);
}
