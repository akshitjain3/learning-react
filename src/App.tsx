import "./App.css";
import Accordion from "./components/accordion/accordion";
import data from "./components/accordion/data";
import ImageSlider from "./components/image-slider/ImageSlider";
import LoadMore from "./components/load-more/load-more";
import RandomColor from "./components/randomcolor/randomcolor";
import StarRating from "./components/StarRating/StarRating";
import treeViewData from "./components/tree-view/data";
import TreeView from "./components/tree-view/TreeView";
import LightDarkThemeElement from "./components/light-dark-theme/LightDarkThemeVisual";
import useLocalStorage from "./components/light-dark-theme/useLocalStorage";
import CustomNavBar from "./components/custom-tab/CustomNavBar";
import { JSX, useState } from "react";
import OpenModalPopup from "./components/OpenModalPopup/OpenModalPopup";
import LoginForm from "./components/dummycomponents/LoginForm";
import SignupForm from "./components/dummycomponents/SignupForm";
import { AnimatePresence } from "framer-motion";
import GithubProfileFinder from "./components/githubprofile-finder/GithubProfileFinder";
import TicTacToe from "./components/tic-tac-toe/TicTacToe";

function App() {
  const [theme, setTheme] = useLocalStorage({ key: "theme", value: "dark" });
  function toggleThemeChange(value: string) {
    if (theme !== value) {
      setTheme(value);
    }
  }
  const tabsList = [
    "All",
    "Accordion",
    "Random Color",
    "Star Rating",
    "Image Slider",
    "LoadMore & Scroll Indicator",
    "Tree Menu",
    "Github Profile Finder",
  ];

  const [content, setContent] = useState<JSX.Element | null>(null);
  function handleContentChange(tabIndex: number) {
    switch (tabIndex) {
      case 0:
        setContent(
          <div className="mainContainer">
            <Accordion itemsList={data} multiSelection={false} />
            <RandomColor />
            <StarRating noOfStars={10} />
            <ImageSlider
              url="https://picsum.photos/v2/list"
              page={1}
              limit={10}
            />
            <LoadMore
              url="https://dummyjson.com/products"
              limit={20}
              max={100}
            />
            <TreeView list={treeViewData} />
            <GithubProfileFinder />
            <TicTacToe />
          </div>
        );
        break;
      case 1:
        setContent(<Accordion itemsList={data} multiSelection={false} />);
        break;

      case 2:
        setContent(<RandomColor />);
        break;

      case 3:
        setContent(<StarRating noOfStars={10} />);
        break;

      case 4:
        setContent(
          <ImageSlider
            url="https://picsum.photos/v2/list"
            page={1}
            limit={10}
          />
        );
        break;

      case 5:
        setContent(
          <LoadMore url="https://dummyjson.com/products" limit={20} max={100} />
        );
        break;

      case 6:
        setContent(<TreeView list={treeViewData} />);
        break;

      case 7:
        setContent(<GithubProfileFinder />);
        break;
      default:
        break;
    }
  }

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<JSX.Element | null>(null);
  const [resetNavBar, setResetNavBar] = useState(0);

  function onModalClose() {
    setIsModalOpen(false);
    setResetNavBar((prev) => prev + 1);
  }

  function handleOpenModal(tabSelected: number) {
    setIsModalOpen(true);
    switch (tabSelected) {
      case 0:
        setModalContent(<LoginForm />);
        break;

      case 1:
        setModalContent(<SignupForm />);
        break;

      default:
        break;
    }
  }

  return (
    <div className="main" data-theme={theme}>
      <LightDarkThemeElement
        toggleThemeChange={toggleThemeChange}
        theme={theme}
      />
      <div className="header">
        <div className="header-title">Learning React</div>
        <div className="header-navbar">
          <CustomNavBar
            tabsList={["Login", "Signup"]}
            handleContentChange={handleOpenModal}
            defaultSelection={false}
            resetNavBar={resetNavBar}
          />
        </div>
      </div>
      <AnimatePresence>
        {isModalOpen && (
          <OpenModalPopup
            body={modalContent ? modalContent : ""}
            onClose={onModalClose}
          />
        )}
      </AnimatePresence>

      <CustomNavBar
        tabsList={tabsList}
        handleContentChange={handleContentChange}
        defaultSelection={true}
      />
      <div className="navbar-content">{content}</div>
    </div>
  );
}

export default App;
