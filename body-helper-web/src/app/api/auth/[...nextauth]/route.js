import NExtAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "../../../../../db/models/Users.model";
import NextAuth from "next-auth/next";
import connectDB from "../../../../../db/connectdb";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Email & Password",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Enter your email...",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password...",
        },
      },
      async authorize(credentials, req) {
        await connectDB();
        const user = await User.findOne({ email: credentials.email }).select(
          "+password"
        );

        const isMatch = await user.comparePassword(credentials.password);

        if (!isMatch) {
          throw new Error("Invalid credentials");
        }

        return user;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, user }) {
      if (await user) {
        session.user = {
          id: user._id,
          email: user.email,
          username: user.username,
        };
      }
      console.log("SESSION:", session, "USER:", await user);
      return Promise.resolve(session);
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
