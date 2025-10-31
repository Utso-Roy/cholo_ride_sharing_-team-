import { Carousel } from "primereact/carousel";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../../Loading/Loading";

interface Partner {
  _id: string;
  name: string;
  logo: string;
}

export default function PartnershipSection() {
  
  const { data: partners = [], isLoading, isError } = useQuery<Partner[]>({
    queryKey: ["partners"],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/partners`);
      return res.data;
    },
  });

  if (isLoading) return <Loading/>;
  if (isError) return <p className="text-center my-20">ডেটা আনতে সমস্যা হয়েছে!</p>;

  const responsiveOptions = [
    { breakpoint: "1024px", numVisible: 3, numScroll: 1 },
    { breakpoint: "768px", numVisible: 2, numScroll: 1 },
    { breakpoint: "560px", numVisible: 1, numScroll: 1 },
  ];

  const partnerTemplate = (partner: Partner) => (
    <motion.div
      whileHover={{ scale: 1.08 }}
      className="flex flex-col justify-center items-center h-40 w-full bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-6 border border-[#71BBB2]/40 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#71BBB2]/10 to-transparent opacity-60 rounded-2xl pointer-events-none"></div>
      <img
        src={partner.logo}
        alt={partner.name}
        className="h-16 w-auto object-contain mb-3 grayscale hover:grayscale-0 transition duration-500"
      />
      <h3 className="text-lg font-semibold text-[#27445D]">{partner.name}</h3>
    </motion.div>
  );

  return (
    <section
       className="bg-cover bg-center py-20 px-6  bg-no-repeat bg-fixed"
                style={{
                    // backgroundImage: "url('https://i.ibb.co.com/zTQ6z80G/map.jpg')",
                    backgroundImage: "linear-gradient(to right, rgba(230,252,249,0.8), rgba(249,250,251,0.8)), url('https://i.ibb.co/zTQ6z80G/map.jpg')",
                    backgroundColor: "rgba(0, 0, 0, 0.1)",
                    backgroundBlendMode: "overlay",
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
