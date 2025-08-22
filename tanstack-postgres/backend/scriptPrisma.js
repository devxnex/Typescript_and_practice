const { PrismaClient } = require("../backend/generated/prisma");

const prisma = new PrismaClient();

const main = async () => {
  // const users = await prisma.user.findUnique({
  //   where: {
  //     email: "onkar@devxnext.com",
  //   },
  // });
  // console.log(users, "finding user by email");
  // if (!users) {
  //   const users = await prisma.user.create({
  //     data: {
  //       email: "onkar@devxnext.com",
  //       name: "New User",
  //     },
  //   });
  //   console.log(users, "created new user");
  // } else {
  //   console.log("User already exists");
  // }
  // const users = await prisma.user.findMany();
  // const users = await prisma.user.findUnique({
  //   where: {
  //     email: "onkar@devxnext.com",
  //   },
  // });

  // const user = await prisma.user.findUnique({
  //   where: {
  //     email: "nadim@devxnext.com",
  //   },
  // });

  // console.log(user, "finding user by email");

  // if (!user) {
  //   const newUser = await prisma.user.create({
  //     data: {
  //       name: "aquib shaikh",
  //       email: "aquib@devxnext.com", // unique email
  //       posts: {
  //         create: { title: "Hello New World" },
  //       },
  //     },
  //   });

  //   console.log(newUser, "created new user with posts");
  // } else {
  //   console.log("User already exists, skipping create");

  //   const posts = await prisma.post.create({
  //     data: {
  //       title: "new aquib post",
  //       content: null,
  //       published: false,
  //       authorId: user.userId,
  //       comments: {
  //         create: {
  //           content: "new comment form aquib",
  //         },
  //       },
  //     },
  //     include: {
  //       comments: true,
  //     },
  //   });

  //   console.log(
  //     posts.authorId,
  //     posts.comments,
  //     "created new post for existing user"
  //   );
  // }

  ////////finding user with posts and comments////////

  // userWithPostsAndComments = await prisma.user.findUnique({
  //   where: { userId: 10 },
  //   include: {
  //     posts: {
  //       include: {
  //         comments: true,
  //       },
  //     },
  //   },
  // });

  // console.log(userWithPostsAndComments, "user with posts and comments");

  // const firstPost = await prisma.post.findFirst({
  //   where: { authorId: 10 },
  //   orderBy: { id: "desc" },
  //   include: { comments: true },
  // });

  // console.log(firstPost, "finding first post with comments");

  //////////////// Update Post Example ////////////////

  //   const updatePublistedPost = await prisma.post.updateMany({
  //     where: {
  //       postId: 4, // Assuming postId 4 exists
  //       published: false,
  //     },
  //     data: {
  //       published: true,
  //     },
  //   });

  //   console.log(updatePublistedPost, "updated post to published");
  // };

  // const updatePublistedPost = await prisma.post.updateMany({
  //   where: {
  //     postId: 4, // Assuming postId 4 exists
  //     published: false,
  //   },
  //   data: {
  //     published: true,
  //   },
  // });

  // console.log(updatePublistedPost, "updated post to published");

  //////////////////Likes table/////////

  ///with composite unique key
  // const existing = await prisma.like.findUnique({
  //   where: {
  //     unique_like_post_user: {
  //       postId: 6,
  //       userId: 14,
  //     },
  //   },
  // });

  ///without composite unique key contrain name prisma handle it if you don't provide it
  //it create postId_userId like that on its own

  // const existing = await prisma.like.findUnique({
  //   where: {
  //     postId_userId: {
  //       postId: 6,
  //       userId: 14,
  //     },
  //   },
  // });

  //without any of this we can also serach it by findFirst

  // const existing = await prisma.like.findFirst({
  //   where: {
  //     postId: 6,
  //     userId: 14,
  //   },
  // });

  // if (existing) {
  //   await prisma.like.delete({ where: { likeId: existing.likeId } });
  //   return console.log("Like already exists for this user and post");
  // }

  // const likes = await prisma.like.create({
  //   data: {
  //     postId: 6,
  //     userId: 14,
  //     createdAt: new Date(),
  //   },
  // });

  ////////////////  // console.log(likes, "created like for postId 6 and userId 14");///////

  //   const likesGet = await prisma.like.findMany({
  //     where: {
  //       userId: 14,
  //     },
  //     include: {
  //       post: true,
  //       user: true, // Assuming you want to include the author of the post
  //     },
  //   });

  //   console.log(
  //     likesGet,
  //     `likes for user ${likesGet[0]?.user.name} with post details`
  //   );
  // };

  /////////////////////Searhing the author name///////
  ///contains mean all the name which contains the string
  ///startWith mean all the name which starts with the string

  // const searchAuthorName = async (authorName) => {
  //   const users = await prisma.user.findMany({
  //     where: {
  //       name: {
  //         contains: authorName,   ///here we can add startWith
  //         mode: "insensitive", // Case-insensitive search
  //       },
  //     },
  //     take: 10, // Limit to 10 results
  //   });
  //   if (users.length === 0) {
  //     console.log(`No users found with name containing "${authorName}"`);
  //   } else {
  //     console.log(`Users found with name containing "${authorName}":`);
  //     users.forEach((user) => {
  //       console.log(`- ${user.name} (ID: ${user.userId})`);
  //     });
  //   }
  // };

  // searchAuthorName("on");

  const authors = await prisma.user.findMany({
    where: {
      name: {
        startsWith: "on",
        mode: "insensitive",
      },
    },
    include: {
      posts: true,
    },
    take: 10,
  });

  console.log(authors, "authors with posts starting with 'on'");

  ///////////////
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

module.exports = prisma;
