import { Carousel } from "primereact/carousel";
import { motion } from "framer-motion";

interface Partner {
  id: number;
  name: string;
  logo: string;
}

const partners: Partner[] = [
  { id: 1, name: "Uber", logo: "https://cdn.worldvectorlogo.com/logos/uber-2.svg" },
  { id: 2, name: "Airbnb", logo: "https://cdn.worldvectorlogo.com/logos/airbnb-1.svg" },
  { id: 3, name: "Spotify", logo: "https://cdn.worldvectorlogo.com/logos/spotify-2.svg" },
  { id: 4, name: "Slack", logo: "https://cdn.worldvectorlogo.com/logos/slack-new-logo.svg" },
  { id: 5, name: "Dropbox", logo: "https://cdn.worldvectorlogo.com/logos/dropbox.svg" },
];

export default function PartnershipSection() {
  const responsiveOptions = [
    { breakpoint: "1024px", numVisible: 3, numScroll: 1 },
    { breakpoint: "768px", numVisible: 2, numScroll: 1 },
    { breakpoint: "560px", numVisible: 1, numScroll: 1 },
  ];

  const partnerTemplate = (partner: Partner) => {
    return (
      <motion.div
        whileHover={{ scale: 1.08 }}
        className="flex flex-col justify-center items-center h-40 w-full bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-6 border border-[#71BBB2]/40 relative overflow-hidden"
      >
        {/* Decorative Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#71BBB2]/10 to-transparent opacity-60 rounded-2xl pointer-events-none"></div>

        <img
          src={partner.logo}
          alt={partner.name}
          className="h-16 w-auto object-contain mb-3 grayscale hover:grayscale-0 transition duration-500"
        />
        <h3 className="text-lg font-semibold text-[#27445D]">{partner.name}</h3>
      </motion.div>
    );
  };

  return (
    <section
      className="py-20 px-6"
      style={{
        background: "linear-gradient(135deg, #EFE9D5 0%, #71BBB2 100%)",
      }}
    >
  
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-4xl font-bold text-[#27445D] text-center mb-4"
      >
        আমাদের সাথে যুক্ত প্রতিষ্ঠানগুলো
      </motion.h2>

      
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
        className="text-center text-lg text-[#27445D]/80 max-w-2xl mx-auto mb-12"
      >
        আমরা গর্বিত যে শীর্ষস্থানীয় কিছু প্রতিষ্ঠান আমাদের সাথে কাজ করছে। তাদের আস্থা
        আমাদের যাত্রাকে আরও শক্তিশালী করেছে।
      </motion.p>

     
      <div className="w-full mx-auto px-6">
        <Carousel
          value={partners}
          numVisible={4}
          numScroll={1}
          circular
          autoplayInterval={2500}
          responsiveOptions={responsiveOptions}
          itemTemplate={partnerTemplate}
          className="mb-12"
        />
      </div>
    </section>
  );
}
