export const getNotifAction = (action: number): string => {
  switch (action) {
    case 1:
      return "posted";
    case 2:
      return "commented your post";
    case 3:
      return "liked your post";
    default:
      throw "Wrong notif type";
  }
};
