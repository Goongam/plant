import Carousel from "better-react-carousel";

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
      containerStyle={{ backgroundColor: "black", margin: 0 }}
      showDots={!isOneImage}
    >
      {images.map((image, idx) => (
        <Carousel.Item key={`${image}${idx}`}>
          <img
            className="w-full object-cover aspect-square"
            // width="100%"
            src={image}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}
