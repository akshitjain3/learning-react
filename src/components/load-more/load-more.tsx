import { useState, useEffect, useRef } from "react";
import "./load-more.css";
import "../image-slider/image-slider.css";

interface LoadMoreProps {
  url: string;
  limit?: number;
  max?: number;
}

interface Products {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
}

export default function LoadMore({
  url,
  limit = 20,
  max = 100,
}: LoadMoreProps) {
  const [products, setProducts] = useState<Products[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [disBtn, setDisBtn] = useState(false);
  const loaded = products.length;

  const contentRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  async function fetchProducts() {
    try {
      setIsLoading(true);
      const res = await fetch(
        `${url}?limit=${limit}&skip=${loaded}&select=title,price,thumbnail`
      );
      const data = await res.json();
      if (data) {
        const newProducts = [...products, ...data.products];
        setProducts(newProducts);
      }
    } catch (e) {
      if (e instanceof Error) setError(e.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (products.length >= max) {
      setDisBtn(true);
    }
  }, [products]);

  useEffect(() => {
    const contentDiv = contentRef.current;
    const scrollDiv = progressBarRef.current;

    function handleScroll() {
      if (scrollDiv && contentDiv) {
        if (contentDiv.scrollHeight === 0) return;
        const scrollHeight =
          contentDiv?.scrollHeight - contentDiv?.clientHeight;
        const scrollWidthPercentage =
          (contentDiv.scrollTop / scrollHeight) * 100;
        scrollDiv.style.width = scrollWidthPercentage + "%";
      }
    }

    contentDiv?.addEventListener("scroll", handleScroll);

    return () => contentDiv?.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="loadMoreMain">
      <div className="loadMoreHeader">
        <h1>Load More & Scroll Indicator</h1>
        <div className="scrollWrapper">
          <div className="scrollIndicator" ref={progressBarRef}></div>
        </div>
      </div>

      <div className="loadMoreCont" ref={contentRef}>
        {isLoading ? (
          <div className="status">
            <span className="spinner"></span>
            <h4>Fetching Images</h4>
          </div>
        ) : null}
        {error ? (
          <div className="status">{error}</div>
        ) : (
          <div className="productCont">
            {products.map((product, index) => (
              <div key={index + 1} className="product">
                <img src={product.thumbnail} alt={product.title} />
                <h4 className="loadMoreTitle">
                  {index + 1} - {product.title}
                </h4>
                <h4>{product.price}</h4>
              </div>
            ))}
          </div>
        )}
        {disBtn ? null : (
          <div className="loadMoreBtnDiv">
            <button className="loadMoreBtn" onClick={fetchProducts}>
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
