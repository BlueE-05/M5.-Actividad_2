import { CalendarDays } from "lucide-react";
import type { Episode } from "../lib/api";

function EpisodeDetail(props: Episode) {
  return (
    <div className="group w-80 flex flex-col items-center text-center border border-gray-200 rounded-3xl p-6 shadow-lg transform transition-all duration-300 hover:scale-105 hover:-rotate-1 hover:shadow-2xl cursor-pointer">
      <h1 className="font-extrabold text-black leading-tight">{props.name}</h1>

      {/* Image */}
      <img
        src={`https://cdn.thesimpsonsapi.com/500/episode/${props.id}.webp`}
        alt={`${props.name} portrait`}
        className="w-32 h-32 object-cover object-top rounded-2xl shadow-xl mb-4 transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-2xl group-hover:shadow-yellow-500/50"
      />

      {/* Info */}
      <div className="flex flex-col items-center space-y-2">
        <p>Season: {props.season}</p>
        <p className="font-semibold">Episode: {props.episode_number}</p>

        <div className="flex items-center gap-1">
          <CalendarDays className="text-red-500" size={20} />
          <p className="text-gray-700">{props.airdate}</p>
        </div>

        <p className="italic text-yellow-600 mt-4 max-w-xs">
          "{props.synopsis}"
        </p>
      </div>
    </div>
  );
}

export default EpisodeDetail;
