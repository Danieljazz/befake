import "./storiesbar.scss";
import { Story } from "../Story/Story";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { makeRequest } from "../../axiosRequest";
import { StoryProps } from "../Story/Story";
export const StoriesBar = () => {
  //TODO: Add mutation
  const { data, isLoading, isError } = useQuery(["stories"], () =>
    makeRequest.get("/stories/").then((res) => res.data)
  );

  let storiesLen = data ? data?.length : 7;
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
        {data?.map((story: StoryProps) => (
          <Story
            id={story.id}
            name={story.name}
            surname={story.surname}
            storyPhoto={story.storyPhoto}
          />
        ))}
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
