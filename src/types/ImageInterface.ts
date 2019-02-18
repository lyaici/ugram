export default interface Image {
  id: number,
  createdDate: number,
  description: string,
  mentions: string[],
  tags: string[],
  url: string,
  userId: string,
};
