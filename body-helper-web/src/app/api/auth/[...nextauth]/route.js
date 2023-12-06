import NExtAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import NextAuth from "next-auth/next";
import connectDB from "../../../../../db/connectdb";
import User from "../../../../../db/models/User.Schema";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GCP_CLIENT_ID,
      clientSecret: process.env.GCP_SECRET,
    }),
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

        if (!user) {
          return null;
        }
        return user;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
