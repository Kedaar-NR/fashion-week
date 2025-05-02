import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { toast } from "sonner";

// Define types for the brand content structure
interface BrandContent {
  name: string;
  images: string[];
  videos: string[];
}

// Update the props interface to include both brandName and onSelectBrand
interface BrandContentCollageProps {
  brandName?: string;
  onSelectBrand?: (brandName: string) => void;
}

const BrandContentCollage = ({
  brandName,
  onSelectBrand,
}: BrandContentCollageProps) => {
  const [brandContents, setBrandContents] = useState<BrandContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [likedContent, setLikedContent] = useState<Set<string>>(new Set());
  const [lastTapTime, setLastTapTime] = useState(0);

  // Function to load all brand content from the folders
  useEffect(() => {
    setLoading(true);
    const brandFolders = [
      { folder: "badson.us", handle: "badson.us" },
      { folder: "brotherlylove", handle: "brotherlylove" },
      { folder: "derschutze_clo", handle: "derschutze_clo" },
      { folder: "drolandmiller", handle: "drolandmiller" },
      { folder: "haveyoudiedbefore", handle: "haveyoudiedbefore" },
      { folder: "california.arts", handle: "california.arts" },
      { folder: "eraworldwideclub", handle: "eraworldwideclub" },
      { folder: "nomaintenance", handle: "nomaintenance" },
      { folder: "outlw.usa", handle: "outlw.usa" },
      { folder: "poolhousenewyork", handle: "poolhousenewyork" },
      { folder: "thegvgallery", handle: "thegvgallery" },
    ];

    const contents: BrandContent[] = brandFolders.map(({ folder, handle }) => {
      const imageFiles: string[] = [];
      const videoFiles: string[] = [];

      if (folder === "california.arts") {
        imageFiles.push(
          "/brand_content/california.arts/DIjPMsnJNXn_2.jpg",
          "/brand_content/california.arts/DIjPMsnJNXn_1.jpg",
          "/brand_content/california.arts/DIY8mupJrTj.jpg",
          "/brand_content/california.arts/DI36peSp6kR.jpg",
          "/brand_content/california.arts/DE5IeqnPGXb.jpg",
          "/brand_content/california.arts/DC1_FPTSkDh.jpg",
          "/brand_content/california.arts/california.arts_1728226411_3472937314194158105_48483968107.jpg",
          "/brand_content/california.arts/california.arts_1728226411_3472937314143839348_48483968107.jpg",
          "/brand_content/california.arts/california.arts_1736183206_3539683744023456270_48483968107.jpg",
          "/brand_content/california.arts/california.arts_1740324773_3574425725999938156_48483968107.jpg",
          "/brand_content/california.arts/california.arts_1742569614_3593256822345523199_48483968107.jpg",
          "/brand_content/california.arts/california.arts_1744043052_3605616912651518250_48483968107.jpg"
        );
        videoFiles.push(
          "/brand_content/california.arts/DE5IeqnPGXb.mp4",
          "/brand_content/california.arts/DC1_FPTSkDh.mp4",
          "/brand_content/california.arts/california.arts_1724173374_3438936397811838173_48483968107.mp4",
          "/brand_content/california.arts/california.arts_1727455753_3466472295034117471_48483968107.mp4"
        );
      } else if (folder === "eraworldwideclub") {
        imageFiles.push(
          "/brand_content/eraworldwideclub/DC1sp6jMJQJ_1.jpg",
          "/brand_content/eraworldwideclub/C_TN5AWsIwm.jpg",
          "/brand_content/eraworldwideclub/C7E8-aAM77A_2.jpg",
          "/brand_content/eraworldwideclub/C7E8-aAM77A_1.jpg",
          "/brand_content/eraworldwideclub/C5lihFYs1n-.jpg",
          "/brand_content/eraworldwideclub/C583QoyLpOd.jpg",
          "/brand_content/eraworldwideclub/era worldwide 2.png",
          "/brand_content/eraworldwideclub/era worldwide club.png",
          "/brand_content/eraworldwideclub/eraworldwideclub_1711816186_3335278371531741824_5050989260.jpg",
          "/brand_content/eraworldwideclub/eraworldwideclub_1732633645_3509907874177546050_5050989260.jpg",
          "/brand_content/eraworldwideclub/eraworldwideclub_1732633645_3509907874185756014_5050989260.jpg",
          "/brand_content/eraworldwideclub/eraworldwideclub_1731604641_3501275958738001264_5050989260.jpg"
        );
        videoFiles.push(
          "/brand_content/eraworldwideclub/Download (3).mp4",
          "/brand_content/eraworldwideclub/Download (2).mp4"
        );
      } else if (folder === "badson.us") {
        imageFiles.push(
          "/brand_content/badson.us/DC4y3r4y9Hu_5.jpg",
          "/brand_content/badson.us/DC4y3r4y9Hu_4.jpg",
          "/brand_content/badson.us/DC4y3r4y9Hu_3.jpg",
          "/brand_content/badson.us/DC4y3r4y9Hu_2.jpg",
          "/brand_content/badson.us/DC4y3r4y9Hu_10.jpg",
          "/brand_content/badson.us/DC4y3r4y9Hu_1.jpg",
          "/brand_content/badson.us/badsonclothing3.jpg",
          "/brand_content/badson.us/badsonclothing1.jpg",
          "/brand_content/badson.us/fitpic1.jpg",
          "/brand_content/badson.us/badsonclothing2.jpg",
          "/brand_content/badson.us/fitpic2.jpg",
          "/brand_content/badson.us/badsonclothing4.jpg"
        );
        videoFiles.push(
          "/brand_content/badson.us/video2.mp4",
          "/brand_content/badson.us/video.mp4"
        );
      } else if (folder === "brotherlylove") {
        imageFiles.push(
          "/brand_content/brotherlylove/DIUF8U2v-P6_13.jpg",
          "/brand_content/brotherlylove/DIUF8U2v-P6_12.jpg",
          "/brand_content/brotherlylove/DIUF8U2v-P6_11.jpg",
          "/brand_content/brotherlylove/DIUF8U2v-P6_10.jpg",
          "/brand_content/brotherlylove/DIUF8U2v-P6_1.jpg",
          "/brand_content/brotherlylove/C07Vm3gyvpN.jpg",
          "/brand_content/brotherlylove/brotherlylove_1744390954_3608535326026198888_35912611459.jpg",
          "/brand_content/brotherlylove/brotherlylove_1744659711_3610789821000049986_35912611459 (1).jpg",
          "/brand_content/brotherlylove/brotherlylove_1740763306_3578103949422478017_35912611459 (1).jpg",
          "/brand_content/brotherlylove/brotherlylove_1664046007_2934553063320393525_35912611459.jpg",
          "/brand_content/brotherlylove/brotherlylove_1677787329_3049394913503056113_35912611459.jpg",
          "/brand_content/brotherlylove/brotherlylove_1677787329_3049394913502992918_35912611459.jpg"
        );
        videoFiles.push(
          "/brand_content/brotherlylove/DIriNjQThJo_10.mp4",
          "/brand_content/brotherlylove/C07Vm3gyvpN.mp4",
          "/brand_content/brotherlylove/brotherlylove_1664650865_2939625923504481060_35912611459.mp4",
          "/brand_content/brotherlylove/brotherlylove_1679770854_3066439708520407000_35912611459.mp4"
        );
      } else if (folder === "derschutze_clo") {
        imageFiles.push(
          "/brand_content/derschutze_clo/DG03C2-qmr3_12.jpg",
          "/brand_content/derschutze_clo/DG03C2-qmr3_11.jpg",
          "/brand_content/derschutze_clo/DG03C2-qmr3_10.jpg",
          "/brand_content/derschutze_clo/DG03C2-qmr3_1.jpg",
          "/brand_content/derschutze_clo/Cz9dmDSKdzC.jpg",
          "/brand_content/derschutze_clo/C4yL8FaqLtV.jpg",
          "/brand_content/derschutze_clo/derschutze_clo_1729440411_3483121079615674640_2999154756.jpg",
          "/brand_content/derschutze_clo/derschutze_clo_1730653240_3493295032112409900_2999154756.jpg",
          "/brand_content/derschutze_clo/derschutze_clo_1730653240_3493295032154256865_2999154756.jpg",
          "/brand_content/derschutze_clo/derschutze_clo_1740589208_3576643974433799188_2999154756.jpg",
          "/brand_content/derschutze_clo/derschutze_clo_1726419603_3457780706064379282_2999154756.jpg",
          "/brand_content/derschutze_clo/derschutze_clo_1744215594_3607064304582426523_2999154756.jpg"
        );
        videoFiles.push(
          "/brand_content/derschutze_clo/Cz9dmDSKdzC.mp4",
          "/brand_content/derschutze_clo/C4yL8FaqLtV.mp4",
          "/brand_content/derschutze_clo/derschutze_clo_1730653240_3493287896854781068_2999154756.mp4",
          "/brand_content/derschutze_clo/derschutze_clo_1732813918_3511419931263194906_2999154756.mp4",
          "/brand_content/derschutze_clo/derschutze_clo_1738170127_3556350434994725936_2999154756.mp4"
        );
      } else if (folder === "nomaintenance") {
        imageFiles.push(
          "/brand_content/nomaintenance/DI1sn-vvGob_4.jpg",
          "/brand_content/nomaintenance/DI1sn-vvGob_3.jpg",
          "/brand_content/nomaintenance/DI1sn-vvGob_2.jpg",
          "/brand_content/nomaintenance/DI1sn-vvGob_1.jpg",
          "/brand_content/nomaintenance/DHtg3q3PihZ.jpg",
          "/brand_content/nomaintenance/DHJIUMtvfA8.jpg",
          "/brand_content/nomaintenance/nomaintenance_1743281181_3599225877483459256_14713530917.jpg",
          "/brand_content/nomaintenance/no maintenance brent faiyaz.png",
          "/brand_content/nomaintenance/nomaintenance_1731181155_3497723502143598634_14713530917.jpg",
          "/brand_content/nomaintenance/nomaintenance_1743447001_3600616875446826915_14713530917.jpg",
          "/brand_content/nomaintenance/nomaintenance_1743447001_3600616875254000951_14713530917.jpg"
        );
        videoFiles.push(
          "/brand_content/nomaintenance/DHtg3q3PihZ.mp4",
          "/brand_content/nomaintenance/DHJIUMtvfA8.mp4",
          "/brand_content/nomaintenance/nomaintenance_1741875656_3587435150591258684_14713530917.mp4",
          "/brand_content/nomaintenance/nomaintenance_1724433735_3441121480208034927_14713530917.mp4",
          "/brand_content/nomaintenance/nomaintenance_1731181155_3497722262357071585_14713530917.mp4"
        );
      } else if (folder === "outlw.usa") {
        imageFiles.push(
          "/brand_content/outlw.usa/outlw.usa_1744134774_3606386333836194711_44746425000.jpg",
          "/brand_content/outlw.usa/outlw.usa_1744568219_3610022334014086905_44746425000.jpg",
          "/brand_content/outlw.usa/outlw.usa_1728237639_3473031503831846398_44746425000.jpg",
          "/brand_content/outlw.usa/outlw.usa_1728586823_3475960669346648478_44746425000.jpg",
          "/brand_content/outlw.usa/outlw.usa_1728415952_3474527297397457205_44746425000.jpg",
          "/brand_content/outlw.usa/outlw.usa_1711911948_3336081677266137878_44746425000.jpg"
        );
        videoFiles.push(
          "/brand_content/outlw.usa/outlw.usa_1711998039_3336803474856844468_44746425000.mp4",
          "/brand_content/outlw.usa/outlw.usa_1712412338_3340277463214399462_44746425000.mp4"
        );
      } else if (folder === "haveyoudiedbefore") {
        imageFiles.push(
          "/brand_content/haveyoudiedbefore/DEqqTj-ylpr_1.jpg",
          "/brand_content/haveyoudiedbefore/C0m6WIPyup8.jpg",
          "/brand_content/haveyoudiedbefore/C0SHoidSVSZ_4.jpg",
          "/brand_content/haveyoudiedbefore/C0SHoidSVSZ_3.jpg",
          "/brand_content/haveyoudiedbefore/C0SHoidSVSZ_2.jpg",
          "/brand_content/haveyoudiedbefore/C0SHoidSVSZ_1.jpg",
          "/brand_content/haveyoudiedbefore/haveyoudiedbefore_1739559610_3568007080466527587_197862798.jpg",
          "/brand_content/haveyoudiedbefore/haveyoudiedbefore_1717873259_3386088780670284580_197862798.jpg",
          "/brand_content/haveyoudiedbefore/haveyoudiedbefore_1731441695_3499909070206134087_197862798.jpg",
          "/brand_content/haveyoudiedbefore/haveyoudiedbefore_1735071172_3530355332268877561_197862798.jpg",
          "/brand_content/haveyoudiedbefore/haveyoudiedbefore_1735071172_3530355332268842358_197862798.jpg",
          "/brand_content/haveyoudiedbefore/haveyoudiedbefore_1736558281_3542830106731357044_197862798.jpg"
        );
        videoFiles.push(
          "/brand_content/haveyoudiedbefore/DJAQalSTKxw.mp4",
          "/brand_content/haveyoudiedbefore/DIy-r1sPWkR.mp4",
          "/brand_content/haveyoudiedbefore/xu_tokyo_1739188804_3564896272881908827_2057095195.mp4",
          "/brand_content/haveyoudiedbefore/haveyoudiedbefore_1744400417_3608614580894412189_197862798.mp4"
        );
      } else if (folder === "poolhousenewyork") {
        imageFiles.push(
          "/brand_content/poolhousenewyork/DI1s-fFPvbz_5.jpg",
          "/brand_content/poolhousenewyork/DI1s-fFPvbz_4.jpg",
          "/brand_content/poolhousenewyork/DI1s-fFPvbz_3.jpg",
          "/brand_content/poolhousenewyork/DI1s-fFPvbz_2.jpg",
          "/brand_content/poolhousenewyork/DI1s-fFPvbz_10.jpg",
          "/brand_content/poolhousenewyork/DI1s-fFPvbz_1.jpg",
          "/brand_content/poolhousenewyork/poolhousenewyork_1739143070_3564512883298111125_6507428546.jpg",
          "/brand_content/poolhousenewyork/poolhousenewyork_1739931310_3571125122836466566_6507428546.jpg",
          "/brand_content/poolhousenewyork/poolhousenewyork_1739931310_3571125122811444179_6507428546.jpg",
          "/brand_content/poolhousenewyork/poolhousenewyork_1741656635_3585598197533036298_6507428546.jpg",
          "/brand_content/poolhousenewyork/poolhousenewyork_1742515208_3592800426983806367_6507428546.jpg",
          "/brand_content/poolhousenewyork/poolhousenewyork_1744329623_3608020844469225550_6507428546.jpg"
        );
        videoFiles.push(
          "/brand_content/poolhousenewyork/DJISJ-xyzhq.mp4",
          "/brand_content/poolhousenewyork/DI4s1H1TaT-.mp4",
          "/brand_content/poolhousenewyork/poolhousenewyork_1738002753_3554944888771017969_6507428546.mp4",
          "/brand_content/poolhousenewyork/poolhousenewyork_1740785403_3578289499048369644_6507428546.mp4"
        );
      } else if (folder === "thegvgallery") {
        imageFiles.push(
          "/brand_content/thegvgallery/DHuDi2NxFWK_1.jpg",
          "/brand_content/thegvgallery/DHgzfKaPvyb_3.jpg",
          "/brand_content/thegvgallery/DHgzfKaPvyb_2.jpg",
          "/brand_content/thegvgallery/DHgzfKaPvyb_1.jpg",
          "/brand_content/thegvgallery/C7AbnnIvDTO.jpg",
          "/brand_content/thegvgallery/C-Tw-bvtKCi.jpg",
          "/brand_content/thegvgallery/thegvgallery_1727015006_3462775308199889526_1766339506.jpg",
          "/brand_content/thegvgallery/thegvgallery_1727015006_3462775308392835231_1766339506.jpg",
          "/brand_content/thegvgallery/thegvgallery_1719613040_3400683123791920872_1766339506.jpg",
          "/brand_content/thegvgallery/thegvgallery_1707688024_3300648834811556022_1766339506.jpg",
          "/brand_content/thegvgallery/thegvgallery_1687388177_3130361377764292647_1766339506.jpg",
          "/brand_content/thegvgallery/thegvgallery_1742421007_3592010217829254434_1766339506.jpg"
        );
        videoFiles.push(
          "/brand_content/thegvgallery/C7AbnnIvDTO.mp4",
          "/brand_content/thegvgallery/C-Tw-bvtKCi.mp4",
          "/brand_content/thegvgallery/thegvgallery_1700669915_3241774221536147695_1766339506.mp4",
          "/brand_content/thegvgallery/thegvgallery_1715814142_3368813990611006670_1766339506.mp4"
        );
      } else if (folder === "drolandmiller") {
        imageFiles.push(
          "/brand_content/drolandmiller/DG1rL3QssYT_6.jpg",
          "/brand_content/drolandmiller/DG1rL3QssYT_5.jpg",
          "/brand_content/drolandmiller/DG1rL3QssYT_4.jpg",
          "/brand_content/drolandmiller/DG1rL3QssYT_3.jpg",
          "/brand_content/drolandmiller/DG1rL3QssYT_2.jpg",
          "/brand_content/drolandmiller/DG1rL3QssYT_1.jpg",
          "/brand_content/drolandmiller/drolandmiller_1714867259_3360872621028221261_53424805481.jpg",
          "/brand_content/drolandmiller/drolandmiller_1709404302_3315046022618282267_53424805481.jpg",
          "/brand_content/drolandmiller/drolandmiller_1692723090_3175113868220891602_53424805481.jpg",
          "/brand_content/drolandmiller/drolandmiller_1695686439_3199972242833929410_53424805481 (1).jpg",
          "/brand_content/drolandmiller/drolandmiller_1742688020_3594250081742695611_53424805481.jpg",
          "/brand_content/drolandmiller/drolandmiller_1721495976_3416478330364894189_53424805481.jpg"
        );
        videoFiles.push(
          "/brand_content/drolandmiller/Download (1).mp4",
          "/brand_content/drolandmiller/Download.mp4"
        );
      }

      return {
        name: handle,
        images: imageFiles,
        videos: videoFiles,
      };
    });

    setBrandContents(contents);
    setLoading(false);

    // Preload all images and videos for all brands
    brandFolders.forEach(({ folder, handle }) => {
      // Preload images
      const imageFiles = [];
      const videoFiles = [];
      // ... (existing logic for populating imageFiles and videoFiles) ...
      // Preload images
      imageFiles.forEach((src) => {
        const img = new window.Image();
        img.src = src;
      });
      // Preload videos
      videoFiles.forEach((src) => {
        const video = document.createElement("video");
        video.src = src;
      });
    });
  }, []);

  // Preload all images to improve performance
  useEffect(() => {
    brandContents.forEach((brand) => {
      brand.images.forEach((imageSrc) => {
        const img = new Image();
        img.src = imageSrc;
      });
    });
  }, [brandContents]);

  // Handle double tap/click
  const handleContentTap = (contentPath: string, event: React.MouseEvent) => {
    const currentTime = new Date().getTime();
    const tapLength = currentTime - lastTapTime;
    const DOUBLE_TAP_DELAY = 300;

    if (tapLength < DOUBLE_TAP_DELAY && tapLength > 0) {
      // Double tap detected
      event.preventDefault();
      event.stopPropagation();

      // Toggle like
      setLikedContent((prev) => {
        const newLiked = new Set(prev);
        if (newLiked.has(contentPath)) {
          newLiked.delete(contentPath);
          toast.error("Removed from wishlist");
        } else {
          newLiked.add(contentPath);
          toast.success("Added to wishlist");
        }
        return newLiked;
      });
    }
    setLastTapTime(currentTime);
  };

  // Find the selected brand's content
  const selectedContent = brandContents.find(
    (brand) => brand.name === brandName
  );

  return (
    <div className="w-full max-w-[100vw] px-2 sm:px-4 md:px-6 lg:px-8">
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
        </div>
      ) : selectedContent ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="mb-8"
        >
          <div className="grid grid-cols-3 gap-0.5 w-full mx-auto">
            {(() => {
              // Combine videos and images
              const videos = selectedContent.videos || [];
              const images = selectedContent.images || [];
              const allContent = [...videos, ...images];

              // For outlw.usa, take first 6 items for a 3x2 grid
              // For other brands, take first 9 items for a 3x3 grid
              const contentToShow =
                selectedContent.name === "outlw.usa"
                  ? allContent.slice(0, 6)
                  : allContent.slice(0, 9);

              return contentToShow.map((content, index) => {
                if (!content) return null;

                const isVideo = content.endsWith(".mp4");

                return (
                  <motion.div
                    key={`content-${index}`}
                    className="relative overflow-hidden cursor-pointer group aspect-[3/4]"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{
                      opacity: 1,
                      scale: 1,
                      transition: {
                        type: "spring",
                        damping: 20,
                        stiffness: 300,
                        delay: index * 0.1,
                      },
                    }}
                    whileHover={{
                      scale: 1.02,
                      transition: {
                        type: "spring",
                        damping: 15,
                        stiffness: 400,
                      },
                    }}
                    onClick={(e) => {
                      handleContentTap(content, e);
                      if (!e.defaultPrevented) {
                        onSelectBrand?.(selectedContent.name);
                      }
                    }}
                  >
                    {isVideo ? (
                      <video
                        src={content}
                        className="absolute inset-0 w-full h-full object-cover bg-black"
                        autoPlay
                        muted
                        loop
                        playsInline
                      />
                    ) : (
                      <img
                        src={content}
                        alt={`${selectedContent.name} content`}
                        className="absolute inset-0 w-full h-full object-cover bg-black"
                        loading="lazy"
                      />
                    )}

                    {/* Like heart overlay */}
                    {likedContent.has(content) && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <Heart className="w-12 h-12 text-red-500 fill-red-500" />
                      </div>
                    )}

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center"></div>
                  </motion.div>
                );
              });
            })()}
          </div>
        </motion.div>
      ) : null}
    </div>
  );
};

export default BrandContentCollage;
