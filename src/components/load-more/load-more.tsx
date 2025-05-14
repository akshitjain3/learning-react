import { useEffect, useRef } from "react";
import "./load-more.css";
import "../image-slider/image-slider.css";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";

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

type ProductAPIResponse = {
  products: Products[];
  total: number;
  skip: number;
  limit: number;
};

async function fetchProducts({
  queryKey,
  pageParam = 0,
}: {
  queryKey: readonly [string, number, string];
  pageParam?: number;
}): Promise<ProductAPIResponse> {
  const [, limit, url] = queryKey;
  const res = await fetch(
    `${url}?limit=${limit}&skip=${pageParam}&select=title,price,thumbnail`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch products.");
  }
  return res.json();
}

export default function LoadMore({
  url,
  limit = 20,
  max = 100,
}: LoadMoreProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery<
    ProductAPIResponse,
    Error,
    InfiniteData<ProductAPIResponse>,
    readonly [string, number, string],
    number
  >({
    queryKey: ["products", limit, url],
    queryFn: fetchProducts,
    initialPageParam: 0,
    getNextPageParam: (_, allPages) => {
      const totalFetched = allPages.flatMap((page) => page.products).length;
      return totalFetched >= max ? undefined : totalFetched;
    },
  });

  const products = data?.pages.flatMap((page) => page.products) || [];
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
        {isError ? (
          <div className="status">{(error as Error).message}</div>
        ) : (
          <div className="productCont">
            {products.map((product, index) => (
              <div key={product.id} className="product">
                <img src={product.thumbnail} alt={product.title} />
                <h4 className="loadMoreTitle">
                  {index + 1} - {product.title}
                </h4>
                <h4>{product.price}</h4>
              </div>
            ))}
          </div>
        )}
        {hasNextPage && (
          <div className="loadMoreBtnDiv">
            <button
              className="loadMoreBtn"
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
            >
              {isFetchingNextPage ? "Loading..." : "Load More"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
