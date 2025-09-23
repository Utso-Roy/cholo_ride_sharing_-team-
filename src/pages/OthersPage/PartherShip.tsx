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
        {
            breakpoint: "1024px",
            numVisible: 3,
            numScroll: 1,
        },
        {
            breakpoint: "768px",
            numVisible: 2,
            numScroll: 1,
        },
        {
            breakpoint: "560px",
            numVisible: 1,
            numScroll: 1,
        },
    ];

    const partnerTemplate = (partner: Partner) => {
        return (
            <motion.div
                whileHover={{ scale: 1.1 }}
                className="flex justify-center items-center h-28 bg-white rounded-xl shadow-md p-2"
                style={{ borderColor: "#71BBB2" }}
            >
                <img
                    src={partner.logo}
                    alt={partner.name}
                    className="h-16 w-auto object-contain grayscale hover:grayscale-0 transition duration-500"
                />
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
            {/* Title */}
            <motion.h2
                initial={{ opacity: 0, y: -30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-4xl font-bold text-[#27445D] text text-center mb-12"

            >
                আমাদের সাথে যুক্ত প্রতিষ্ঠানগুলো
            </motion.h2>

            {/* Carousel */}
            <div className="w-full  mx-auto px-6">
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


            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
                className="text-center"
            >

            </motion.div>
        </section>
    );
}
