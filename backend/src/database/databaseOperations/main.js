import { db } from "../prisma/prismaClient.js";
import { setupDatabaseForOperations } from "./operations/prepareDatabase.js";
import * as UserOperations from "./operations/userOperations.js";
import * as PostOperations from "./operations/postOperations.js";
import * as CommentOperations from "./operations/commentOperations.js";
import * as TagOperations from "./operations/tagOperations.js";
import * as PostTagOperations from "./operations/postTagOperations.js";
import * as SampleData from "./data/sampleData.js";

async function main() {
  await setupDatabaseForOperations();

  // Register two users
  const registeredUser1 = await UserOperations.registerUser(
    SampleData.user1.username,
    SampleData.user1.password,
    SampleData.user1.email
  );
  console.log("Registered user 1:", registeredUser1);

  const registeredUser2 = await UserOperations.registerUser(
    SampleData.user2.username,
    SampleData.user2.password,
    SampleData.user2.email
  );
  console.log("Registered user 2:", registeredUser2);

  // Retrieve user by their email
  const userByEmail = await UserOperations.getUserByEmail(
    registeredUser1.email
  );
  console.log("User retrieved by email:", userByEmail);

  // Authenticate and log in user 1
  const authenticatedUser = await UserOperations.loginUser(
    SampleData.user1.email,
    SampleData.user1.password
  );
  console.log("Authenticated user:", authenticatedUser);

  // Update user 1's password
  await UserOperations.updateUserPassword(
    registeredUser1.id,
    SampleData.user1.password,
    SampleData.user1.newPassword
  );
  console.log("User 1's password updated");

  // Make user 1 follow user 2
  const followedUser = await UserOperations.followUser(
    registeredUser1.id,
    registeredUser2.id
  );
  console.log("User 1 followed user 2:", followedUser);

  // Check if user 1 is followed user 2
  const isFollowed = await UserOperations.isFollowed(
    registeredUser1.id,
    registeredUser2.id
  );
  console.log("Is user 1 followed user 2:", isFollowed);

  // Retrieve all followers of user 1
  const allFollowers = await UserOperations.readAllFollowers(
    registeredUser1.id
  );
  console.log("All followers of user 1:", allFollowers);

  // Create two new posts for user 1
  const createdPost1 = await PostOperations.createPost(
    registeredUser1.id,
    SampleData.post1.title,
    SampleData.post1.imageUrl,
    SampleData.post1.imageName,
    SampleData.post1.content
  );
  console.log("New post 1 created:", createdPost1);

  const createdPost2 = await PostOperations.createPost(
    registeredUser1.id,
    SampleData.post2.title,
    SampleData.post2.imageUrl,
    SampleData.post2.imageName,
    SampleData.post2.content
  );
  console.log("New post 2 created:", createdPost2);

  // Retrieve all existing posts
  const allPosts = await PostOperations.getAllPosts();
  console.log("All posts retrieved:", allPosts);

  // Retrieve post by its ID
  const postById = await PostOperations.getPostById(
    createdPost1.id
  );
  console.log("Post retrieved by ID:", postById);

  // Create a comment for post 1
  const createdComment = await CommentOperations.createComment(
    registeredUser1.id,
    createdPost1.id,
    SampleData.comment1.content
  );
  console.log("New comment created for post 1:", createdComment);

  // Retrieve all existing comments
  const allComments = await CommentOperations.getAllComments();
  console.log("All comments retrieved:", allComments);

  // Retrieve comment by its ID
  const commentById = await CommentOperations.getCommentById(
    createdComment.id
  );
  console.log("Comment retrieved by ID:", commentById);

  // Create a new tag
  const createdTag = await TagOperations.createTag(
    SampleData.tag1.name
  );
  console.log("New tag created:", createdTag);

  // Retrieve all existing tags
  const allTags = await TagOperations.getAllTags();
  console.log("All tags retrieved:", allTags);

  // Create a post-tag relation for post 1 and the created tag
  const createdPostTag = await PostTagOperations.createPostTag(
    createdPost1.id,
    createdTag.id
  );
  console.log(
    "New post-tag relation created for post 1 and the tag:",
    createdPostTag
  );

  // Create a post-tag relation for post 2 and the created tag
  await PostTagOperations.createPostTag(
    createdPost2.id,
    createdTag.id
  );

  // Retrieve all existing post-tag relations
  const allPostTags = await PostTagOperations.getAllPostTags();
  console.log("All post-tag relations retrieved:", allPostTags);

  // Retrieve post-tag relations by the tag ID
  const postTagByTagId = await PostTagOperations.getPostTagsByTagId(
    createdPostTag.tagId
  );
  console.log(
    "Post-tag relations retrieved by Tag ID:",
    postTagByTagId
  );
  // console.log("Post-tag relations retrieved by Tag ID (JSON):", JSON.stringify(postTagByTagId));
  // console.log("postTagByTagId[0].post.user.name:", postTagByTagId[0].post.user.name);
}

main()
  .catch((e) => console.error(e))
  .finally(() => {
    console.log("Finished database operations.");
    db.$disconnect()
  });
