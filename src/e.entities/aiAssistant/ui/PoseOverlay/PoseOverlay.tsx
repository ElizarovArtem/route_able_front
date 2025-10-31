import type { Keypoint } from '@tensorflow-models/pose-detection';
import React from 'react';

import styles from './PoseOverlay.module.scss';

const PAIRS: [string, string][] = [
  ['left_shoulder', 'right_shoulder'],
  ['left_hip', 'right_hip'],
  ['left_shoulder', 'left_elbow'],
  ['left_elbow', 'left_wrist'],
  ['right_shoulder', 'right_elbow'],
  ['right_elbow', 'right_wrist'],
  ['left_hip', 'left_knee'],
  ['left_knee', 'left_ankle'],
  ['right_hip', 'right_knee'],
  ['right_knee', 'right_ankle'],
  ['left_shoulder', 'left_hip'],
  ['right_shoulder', 'right_hip'],
];

export function PoseOverlay({
  video,
  keypoints,
}: {
  video: HTMLVideoElement | null;
  keypoints: Keypoint[];
}) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const cvs = canvasRef.current;
    if (!cvs || !video) return;

    const videoWidth = video.clientWidth;
    const videoHeight = video.clientHeight;
    cvs.width = videoWidth;
    cvs.height = videoHeight;

    const ctx = cvs.getContext('2d')!;
    ctx.clearRect(0, 0, videoWidth, videoHeight);

    // линии
    const map = new Map(
      keypoints.filter((k) => k.name).map((k) => [k.name!, k]),
    );
    ctx.lineWidth = 3;
    ctx.globalAlpha = 0.9;
    for (const [a, b] of PAIRS) {
      const p = map.get(a);
      const q = map.get(b);

      if (!p || !q) continue;
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(q.x, q.y);
      ctx.strokeStyle = 'rgba(255,255,255,0.7)';
      ctx.stroke();
    }
    // точки
    for (const p of keypoints) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(56,189,248,0.9)'; // голубые точки
      ctx.fill();
    }
  }, [video, keypoints]);

  return (
    <canvas
      ref={canvasRef}
      className={styles.canvas}
      style={{ transform: 'scaleX(-1)' }}
    />
  );
}
