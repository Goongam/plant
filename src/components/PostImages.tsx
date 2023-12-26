import Carousel from "better-react-carousel";
import Image from "next/image";

export default function PostImages({ images }: { images: string[] }) {
  const isOneImage = images.length <= 1;
  return (
    <Carousel
      cols={1}
      rows={1}
      gap={10}
      loop
      hideArrow={isOneImage}
      // style={{margi}}
      containerStyle={{ margin: 0 }}
      showDots={!isOneImage}
    >
      {images.map((image, idx) => (
        <Carousel.Item key={`${image}${idx}`}>
          {/* TODO: 이미지 호스팅 상수 배열 만들기 */}
          {new URL(image).hostname === "i.imgur.com" ? (
            <Image
              className="w-full object-contain aspect-square rounded-sm"
              src={image}
              width={1000}
              height={1000}
              alt="Upload post image"
            />
          ) : (
            <img
              className="w-full object-contain aspect-square rounded-sm"
              // width="100%"
              src={image}
            />
          )}
        </Carousel.Item>
      ))}
    </Carousel>
  );
}
