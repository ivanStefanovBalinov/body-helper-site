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
        const user = await User.find({ email: credentials.email });
        console.log("[CREDENTIALS]:", credentials, "[USER]:", user);
      },
    }),
  ],
  callbacks: {
    session({ session, user }) {
      session.user.id = user.id;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
