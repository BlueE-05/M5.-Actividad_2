import { Cake, Mars, Venus } from "lucide-react";
import type { Character } from "../lib/api";
import { useMemo } from "react";

function CharacterDetail(props: Character) {
  // Select one random phrase
  const randomPhrase = useMemo(() => {
    if (!props.phrases || props.phrases.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * props.phrases.length);
    return props.phrases[randomIndex];
  }, [props.phrases]);

  return (
    <div className="text-center items-center justify-center border-1 border-gray-100 rounded-3xl p-6 shadow-lg transform transition-all duration-300 hover:scale-105 hover:-rotate-1 hover:shadow-2xl cursor-pointer">
      <div className="flex">
        <h1 className="font-extrabold text-black mb-4 leading-tight">
          {props.name.split(" ").map((word, index) => (
            <span key={index} className="block">
              {word}
            </span>
          ))}
        </h1>
        {(props.gender == "Male" && (
          <Mars className="inline-block mr-1 text-blue-500" size={20} />
        )) ||
          (props.gender == "Female" && (
            <Venus className="inline-block mr-1 text-pink-500" size={20} />
          ))}
      </div>

      <img
        src={`https://cdn.thesimpsonsapi.com/500/character/${props.id}.webp`}
        alt={`${props.name} portrait`}
        className="w-30 h-30 object-cover object-top rounded-2xl shadow-xl mb-4"
      />

      <div className="space-y-1 text-black">
        <p>
          <strong>{props.occupation}</strong>
        </p>

        <p>{props.age} years</p>
        <div>
          <Cake className="inline-block mr-1 text-red-500" size={20} />
          <p className="inline-block text-gray-700">{props.birthdate}</p>
        </div>
        {randomPhrase && (
          <>
            <p className="italic text-yellow-600 mt-4">"{randomPhrase}"</p>
          </>
        )}
      </div>
    </div>
  );
}

export default CharacterDetail;
