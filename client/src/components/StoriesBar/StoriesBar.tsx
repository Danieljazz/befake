import "./storiesbar.scss";
import { Story } from "../Story/Story";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useState } from "react";
export const StoriesBar = () => {
  let storiesLen = 9;
  let possibleMove = storiesLen - 7;
  const [move, setMove] = useState<number>(1);
  const moveStories = (direction: string) => {
    if (direction === "right") {
      move > possibleMove
        ? setMove((prev) => (prev = prev + 1))
        : setMove(possibleMove);
    } else {
      move < 1 ? setMove((prev) => (prev = prev - 1)) : setMove(1);
    }
  };
  return (
    <div className="stories-bar">
      <div
        className="stories"
        style={{
          transform: `translateX(${160 - 155 * move}px)`,
        }}
      >
        <Story
          name="Jane Doe"
          photo="https://images.pexels.com/photos/3533228/pexels-photo-3533228.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        />
        <Story
          name="Jane Doe"
          photo="https://images.pexels.com/photos/3533228/pexels-photo-3533228.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        />
        <Story
          name="Jane Doe"
          photo="https://images.pexels.com/photos/3533228/pexels-photo-3533228.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        />
        <Story
          name="Jane Doe"
          photo="https://images.pexels.com/photos/3533228/pexels-photo-3533228.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        />
        <Story
          name="Jane Doe"
          photo="https://images.pexels.com/photos/3533228/pexels-photo-3533228.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        />{" "}
        <Story
          name="Jane Doe"
          photo="https://images.pexels.com/photos/3533228/pexels-photo-3533228.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        />
        <Story
          name="Jane Doe"
          photo="https://images.pexels.com/photos/3533228/pexels-photo-3533228.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        />
        <Story
          name="Jane Doe"
          photo="https://images.pexels.com/photos/3533228/pexels-photo-3533228.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        />
      </div>
      {move > 1 && (
        <button className="left" onClick={() => moveStories("left")}>
          <ArrowBackIosIcon />
        </button>
      )}
      {possibleMove > 1 && move < possibleMove && (
        <button className="right" onClick={() => moveStories("right")}>
          <ArrowForwardIosIcon />
        </button>
      )}
    </div>
  );
};
