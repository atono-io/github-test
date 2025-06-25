"use client";
import { useEffect, useRef, useState } from 'react';

export default function SpaceInvaders() {
  const canvasRef = useRef(null);
  const [context, setContext] = useState(null);

  const canvasWidth = 600;
  const canvasHeight = 400;

  const player = useRef({ x: 270, y: 360, width: 60, height: 20 });
  const bullets = useRef([]);
  const aliens = useRef([]);
  const keys = useRef({});

  // Initialize aliens
  useEffect(() => {
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 8; c++) {
        aliens.current.push({ x: 60 * c + 30, y: 40 * r + 30, width: 40, height: 20, alive: true });
      }
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    setContext(ctx);

    const handleKeyDown = (e) => (keys.current[e.key] = true);
    const handleKeyUp = (e) => (keys.current[e.key] = false);

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    const gameLoop = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      // Move player
      if (keys.current['ArrowLeft'] && player.current.x > 0) player.current.x -= 5;
      if (keys.current['ArrowRight'] && player.current.x + player.current.width < canvasWidth)
        player.current.x += 5;

      // Shoot bullet
      if (keys.current[' ']) {
        keys.current[' '] = false;
        bullets.current.push({ x: player.current.x + 27, y: player.current.y, radius: 4 });
      }

      // Draw player
      ctx.fillStyle = 'lime';
      ctx.fillRect(player.current.x, player.current.y, player.current.width, player.current.height);

      // Draw and move bullets
      ctx.fillStyle = 'red';
      bullets.current.forEach((bullet, index) => {
        bullet.y -= 5;
        ctx.beginPath();
        ctx.arc(bullet.x, bullet.y, bullet.radius, 0, Math.PI * 2);
        ctx.fill();
        if (bullet.y < 0) bullets.current.splice(index, 1);
      });

      // Draw aliens
      ctx.fillStyle = 'white';
      aliens.current.forEach((alien) => {
        if (!alien.alive) return;
        ctx.fillRect(alien.x, alien.y, alien.width, alien.height);
      });

      // Bullet-alien collision
      bullets.current.forEach((bullet, bIndex) => {
        aliens.current.forEach((alien) => {
          if (
            alien.alive &&
            bullet.x > alien.x &&
            bullet.x < alien.x + alien.width &&
            bullet.y > alien.y &&
            bullet.y < alien.y + alien.height
          ) {
            alien.alive = false;
            bullets.current.splice(bIndex, 1);
          }
        });
      });

      requestAnimationFrame(gameLoop);
    };

    requestAnimationFrame(gameLoop);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [context]);

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold text-white mb-4">Space Invaders</h1>
      <canvas ref={canvasRef} width={canvasWidth} height={canvasHeight} className="bg-black rounded" />
    </div>
  );
}
