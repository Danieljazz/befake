import "./story.scss";

export type StoryProps = {
  id: number;
  storyPhoto: string;
  storyUserId?: number;
  createdAt?: Date;
  name: string;
  surname: string;
};

export const Story = ({ name, surname, storyPhoto, id }: StoryProps) => {
  return (
    <div
      key={id}
      className="story"
      style={{
        backgroundImage: `url(${storyPhoto})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <span>{`${name} ${surname}`}</span>
    </div>
  );
};
