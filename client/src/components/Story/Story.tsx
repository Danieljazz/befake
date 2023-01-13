import "./story.scss";

type StoryProps = {
  name: string;
  photo: string;
};

export const Story = ({ name, photo }: StoryProps) => {
  return (
    <section
      className="story"
      style={{
        backgroundImage: `url(${photo})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <span>{name}</span>
    </section>
  );
};
