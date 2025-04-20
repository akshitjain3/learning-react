import { useState, useRef, useEffect, Fragment } from "react";
import "./accordion.css";

interface AccordionProps {
  itemsList: { id: number; question: string; answer: string }[];
  multiSelection?: boolean;
}

export default function Accordion({
  itemsList,
  multiSelection = false,
}: AccordionProps) {
  const [accordionItems, setAccordionItems] = useState(() =>
    itemsList.map((item) => ({ ...item, hidden: item.id !== 1 }))
  );

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const constantRefs = useRef<HTMLParagraphElement[]>([]);

  function toggleHidden(id: number) {
    setAccordionItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, hidden: !item.hidden }
          : multiSelection
          ? { ...item }
          : { ...item, hidden: true }
      )
    );
  }

  return (
    <div className="accordionWrapper">
      <h1>Accordion </h1>
      <div className="accordion">
        {itemsList && itemsList.length > 0 ? (
          accordionItems.map((item, index) => {
            const ref = (el: HTMLParagraphElement | null) => {
              constantRefs.current[index] = el!;
            };
            const contentHeight =
              constantRefs.current[index]?.scrollHeight || 0;
            const style = {
              height: item.hidden ? "0px" : `${contentHeight}px`,
              overflow: "hidden",
              opacity: item.hidden ? 0 : 1,
            };
            return (
              <Fragment key={index}>
                <div className="accordionItem">
                  <div
                    className="accordionTitle"
                    onClick={() => toggleHidden(item.id)}
                  >
                    <h2>{item.question}</h2>
                    <span>{item.hidden ? "+" : "-"}</span>
                  </div>
                  <p
                    ref={ref}
                    style={
                      item.hidden
                        ? { ...style }
                        : {
                            ...style,
                            marginBottom: "1rem",
                          }
                    }
                    className={item.hidden ? "hidden" : ""}
                  >
                    {item.answer}
                  </p>
                </div>
                {index + 1 < accordionItems.length && <hr />}
              </Fragment>
            );
          })
        ) : (
          <div>No Items present</div>
        )}
      </div>
    </div>
  );
}
