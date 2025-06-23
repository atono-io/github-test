'use client';

import { useEffect, useRef, useState } from 'react';

const CANVAS_SIZE = 400;
const SCALE = 20;
const INITIAL_SNAKE = [
  { x: 8, y: 10 },
  { x: 7, y: 10 },
];
const INITIAL_DIRECTION = { x: 1, y: 0 };

export default function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [food, setFood] = useState(generateFood(INITIAL_SNAKE));
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const context = canvasRef.current?.getContext('2d');
    if (!context) return;

    const interval = setInterval(() => {
      setSnake((prev) => {
        const newHead = {
          x: prev[0].x + direction.x,
          y: prev[0].y + direction.y,
        };

        if (checkCollision(newHead, prev)) {
          setGameOver(true);
          clearInterval(interval);
          return prev;
        }

        const newSnake = [newHead, ...prev];
        if (newHead.x === food.x && newHead.y === food.y) {
          setScore((s) => s + 1);
          setFood(generateFood(newSnake));
          return newSnake;
        }

        newSnake.pop();
        return newSnake;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [direction, food]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          if (direction.y === 0) setDirection({ x: 0, y: -1 });
          break;
        case 'ArrowDown':
          if (direction.y === 0) setDirection({ x: 0, y: 1 });
          break;
        case 'ArrowLeft':
          if (direction.x === 0) setDirection({ x: -1, y: 0 });
          break;
        case 'ArrowRight':
          if (direction.x === 0) setDirection({ x: 1, y: 0 });
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction]);

  useEffect(() => {
    const context = canvasRef.current?.getContext('2d');
    if (!context) return;

    context.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    // Draw food
    context.fillStyle = '#ef4444'; // red
    context.fillRect(food.x * SCALE, food.y * SCALE, SCALE, SCALE);

    // Draw snake
    context.fillStyle = '#22c55e'; // green
    for (let segment of snake) {
      context.fillRect(segment.x * SCALE, segment.y * SCALE, SCALE, SCALE);
    }
  }, [snake, food]);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setFood(generateFood(INITIAL_SNAKE));
    setGameOver(false);
    setScore(0);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-950 text-white gap-6 p-4">
      <h1 className="text-4xl font-bold">🐍 Snake Game</h1>
      <canvas
        ref={canvasRef}
        width={CANVAS_SIZE}
        height={CANVAS_SIZE}
        className="bg-gray-800 border-4 border-gray-700 rounded shadow-lg"
      />
      <p className="text-lg">Score: {score}</p>
      {gameOver && (
        <div className="flex flex-col items-center gap-2">
          <p className="text-red-400 font-semibold text-xl">Game Over</p>
          <button
            onClick={resetGame}
            className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-500 transition"
          >
            Restart
          </button>
        </div>
      )}
    </div>
  );
}

// Utilities
function generateFood(snake: { x: number; y: number }[]) {
  let newFood;
  do {
    newFood = {
      x: Math.floor(Math.random() * (CANVAS_SIZE / SCALE)),
      y: Math.floor(Math.random() * (CANVAS_SIZE / SCALE)),
    };
  } while (snake.some((seg) => seg.x === newFood.x && seg.y === newFood.y));
  return newFood;
}

function checkCollision(head: { x: number; y: number }, snake: { x: number; y: number }[]) {
  if (
    head.x < 0 ||
    head.x >= CANVAS_SIZE / SCALE ||
    head.y < 0 ||
    head.y >= CANVAS_SIZE / SCALE
  ) {
    return true;
  }
  return snake.some((seg) => seg.x === head.x && seg.y === head.y);
}
