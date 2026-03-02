import { Cake, Mars, Venus } from "lucide-react";
import type { Character } from "../lib/api";
import { useMemo } from "react";

function CharacterDetail(props: Character) {
  const randomPhrase = useMemo(() => {
    if (!props.phrases || props.phrases.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * props.phrases.length);
    return props.phrases[randomIndex];
  }, [props.phrases]);

  return (
    <div className="group w-80 flex flex-col items-center text-center border border-gray-200 rounded-3xl p-6 shadow-lg transform transition-all duration-300 hover:scale-105 hover:-rotate-1 hover:shadow-2xl cursor-pointer">
      <div className="flex items-center justify-center gap-2 mb-4">
        <h1 className="font-extrabold text-black leading-tight">
          {props.name.split(" ").map((word, index) => (
            <span key={index} className="block">
              {word}
            </span>
          ))}
        </h1>

        {props.gender === "Male" && (
          <Mars className="text-blue-500" size={22} />
        )}

        {props.gender === "Female" && (
          <Venus className="text-pink-500" size={22} />
        )}
      </div>

      {/* Image */}
      <img
        src={`https://cdn.thesimpsonsapi.com/500/character/${props.id}.webp`}
        alt={`${props.name} portrait`}
        className="w-32 h-32 object-cover object-top rounded-2xl shadow-xl mb-4 transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-2xl"
      />

      {/* Info */}
      <div className="flex flex-col items-center space-y-2">
        <p className="font-semibold">{props.occupation}</p>

        <p>{props.age} years</p>

        <div className="flex items-center gap-1">
          <Cake className="text-red-500" size={20} />
          <p className="text-gray-700">{props.birthdate}</p>
        </div>

        {randomPhrase && (
          <p className="italic text-yellow-600 mt-4 max-w-xs">
            "{randomPhrase}"
          </p>
        )}
      </div>
    </div>
  );
}

export default CharacterDetail;
