import { IoArrowBackCircleSharp } from "react-icons/io5";
import { IoArrowForwardCircleSharp } from "react-icons/io5";
import "./image-slider.css";
import { useEffect, useState } from "react";

interface ImageSliderProps {
  url: string;
  limit?: number;
  page?: number;
}

interface ImageObject {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
}

export default function ImageSlider({
  url,
  limit = 5,
  page = 1,
}: ImageSliderProps) {
  const [currentImg, setCurrentImg] = useState(0);
  const [images, setImages] = useState<ImageObject[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  async function fetchImages(url: string) {
    try {
      setIsLoading(true);
      const response = await fetch(url);
      const data = await response.json();
      if (data) {
        setImages([...data]);
      }
    } catch (e) {
      if (e instanceof Error) setErrorMsg("Error fetching Data - " + e.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (url !== "") {
      fetchImages(`${url}?page=${page}&limit=${limit}`);
    }
  }, []);

  function handlePrev() {
    currentImg === 0
      ? setCurrentImg(images.length - 1)
      : setCurrentImg((prev) => prev - 1);
  }

  function handleNext() {
    currentImg === images.length - 1
      ? setCurrentImg(0)
      : setCurrentImg((prev) => prev + 1);
  }

  return (
    <div className="imageSliderWrapper">
      <h1>Image Slider</h1>
      {isLoading ? (
        <div className="status">
          <span className="spinner"></span>
          <h4>Fetching Images</h4>
        </div>
      ) : null}
      {errorMsg ? (
        <div className="error">{errorMsg}</div>
      ) : isLoading === false ? (
        <div className="image-slider">
          <IoArrowBackCircleSharp
            className="arrow arrow-left"
            onClick={handlePrev}
          />
          {images.map((image) => (
            <img
              key={image.id}
              src={image.download_url}
              alt={image.download_url}
              className={
                Number(image.id) === currentImg ? "image currImg" : "image"
              }
            />
          ))}
          <IoArrowForwardCircleSharp
            className="arrow arrow-right"
            onClick={handleNext}
          />
          <div className="imageButtons">
            {images.map((image) => (
              <button
                key={image.id}
                className={
                  Number(image.id) === currentImg
                    ? "imgBtn currImgBtn"
                    : "imgBtn"
                }
                onClick={() => setCurrentImg(Number(image.id))}
              ></button>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
