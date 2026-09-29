import { ArrowUpRight } from "lucide-react";

interface PropertyCardProps {
  number: string;
  name: string;
  location: string;
  category: string;
  price: string;
  image: string;
}

export default function PropertyCard({
  number,
  name,
  location,
  category,
  price,
  image,
}: PropertyCardProps) {
  return (
    <article className="group relative min-h-[75vh] overflow-hidden border border-white/10">
      {/* Image */}
      <div className="property-image absolute inset-0 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="h-[115%] w-full object-cover grayscale transition-all duration-[1.2s] ease-out group-hover:scale-105 group-hover:grayscale-0"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
      </div>

      {/* Number */}
      <div className="absolute left-6 top-6 text-[10px] tracking-[0.3em] text-lv-gold">
        {number}
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
        <p className="mb-3 text-[9px] tracking-[0.3em] text-lv-gold">
          {category}
        </p>

        <h3 className="font-serif text-4xl italic text-lv-cream md:text-6xl">
          {name}
        </h3>

        <div className="mt-4 flex flex-col gap-1 text-[10px] tracking-[0.2em] text-white/60">
          <span>{location}</span>
          <span>{price}</span>
        </div>

        <button
          type="button"
          className="mt-7 inline-flex items-center gap-3 border border-white/30 px-5 py-3 text-[9px] tracking-[0.25em] text-lv-cream transition-all duration-300 group-hover:border-lv-gold group-hover:text-lv-gold"
        >
          VIEW PROPERTY

          <ArrowUpRight
            size={14}
            strokeWidth={1.2}
          />
        </button>
      </div>
    </article>
  );
}