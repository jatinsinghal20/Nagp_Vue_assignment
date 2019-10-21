import Comment from "./Comment";
export default interface CommentsResponse {
  comments?: (Comment)[] | null;
}
