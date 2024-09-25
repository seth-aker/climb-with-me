import { useDatabase } from "../connection";
import { IPost } from "../documentTypes/post.type";

export const handleUserProfileImgChange = async (
  userId: string,
  profImg: string
) => {
  const db = await useDatabase();
  const posts = db.collection<IPost>("posts");

  await posts.updateMany({ authorId: userId }, { $set: { avatar: profImg } });
};
