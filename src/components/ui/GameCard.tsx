'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Star, Play } from 'lucide-react';

interface Game {
  id: string;
  name: string;
  publisher: string;
  image: string;
  isPopular: boolean;
}

export default function GameCard({ game }: { game: Game }) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer"
    >
      {/* Background Image */}
      <Image
        src={game.image}
        alt={game.name}
        fill
        className="object-cover group-hover:scale-110 transition-transform duration-300"
      />

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">
        {/* Popular Badge */}
        {game.isPopular && (
          <div className="flex items-center gap-1 bg-yellow-500 text-black px-2 py-1 rounded-full w-fit text-xs font-bold">
            <Star size={12} fill="currentColor" />
            Popular
          </div>
        )}

        {/* Content */}
        <div>
          <h3 className="text-white font-black text-lg leading-tight mb-1">{game.name}</h3>
          <p className="text-gray-300 text-xs">{game.publisher}</p>
          <button className="mt-3 w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded-lg flex items-center justify-center gap-2 transition-colors">
            <Play size={14} fill="currentColor" />
            Top Up
          </button>
        </div>
      </div>
    </motion.div>
  );
}